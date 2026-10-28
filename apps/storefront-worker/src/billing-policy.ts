/**
 * Which payment route a buyer gets inside a Play-distributed app, by the buyer's Play country.
 *
 * This is the one place the region decision lives. Google changes these programmes often; when it
 * does, edit {@link PLAY_BILLING_PROGRAMS} (and its `checkedOn`/`sources`) and the tests in
 * `test/billing-policy.test.ts`, nothing else.
 *
 * The rules:
 * - A build that did not come from Google Play (the GitHub APK, a sideload) never uses Play Billing:
 *   it always gets Stripe.
 * - In a Play build, Stripe is offered only where a Google programme allows a non-Play billing system
 *   for that country AND the app is enrolled in that programme (`PLAY_BILLING_PROGRAMS` env, per app).
 *   Not enrolled, or a country no programme covers: Play Billing.
 * - Programmes that require Play Billing to be offered side by side resolve to `choice`: the app shows
 *   Google's choice screen and only runs Stripe when the buyer picks it. Programmes that do not
 *   require Play Billing resolve to `stripe`.
 * - Every alternative-billing sale in a Play build is reported to Google (externalTransactions API,
 *   within 24 hours) and owes Google a reduced service fee: `reportToGoogle` says so.
 *
 * The device also checks availability with the Play Billing Library before using a programme
 * (`isBillingProgramAvailableAsync` / `isAlternativeBillingOnlyAvailableAsync`). Google answers
 * "unavailable" for an app that is not enrolled, so a stale server flag still falls back to Play.
 */

/** A Google programme that lets a Play app bill outside Play Billing. */
export type PlayBillingProgram =
  | "us_alternative_billing"
  | "billing_choice"
  | "user_choice_billing";

/** The Play Billing Library API the app uses for a programme. */
export type ClientBillingApi =
  /** `enableAlternativeBillingOnly()` + `createAlternativeBillingOnlyReportingDetailsAsync`. */
  | "alternative_billing_only"
  /** PBL 9.1+ `enableBillingProgram(BILLING_CHOICE)` + `enableDeveloperBillingOption`. */
  | "billing_choice"
  /** `enableUserChoiceBilling(UserChoiceBillingListener)`. */
  | "user_choice";

export interface ProgrammeRule {
  program: PlayBillingProgram;
  /** ISO 3166-1 alpha-2 Play countries the programme covers. */
  regions: readonly string[];
  clientApi: ClientBillingApi;
  /** True when Google requires Play Billing to be offered next to the alternative. */
  playBillingAlongside: boolean;
  /** First day (UTC, inclusive) the programme is open in these regions. */
  from: string;
  /** Last day (UTC, inclusive), when Google has announced one. */
  until?: string;
  /** Google's service fee on an alternative-billing one-time sale, in basis points, for new installs. */
  serviceFeeBps: number;
  /** When this row was last checked against the sources. */
  checkedOn: string;
  sources: readonly string[];
  note?: string;
}

/** EU-27 plus Iceland, Liechtenstein and Norway. */
export const EEA: readonly string[] = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT",
  "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO",
];

const BILLING_CHOICE_REQUIREMENTS = "https://support.google.com/googleplay/android-developer/answer/17161464";
const BILLING_CHOICE_API = "https://developer.android.com/google/play/billing/billingchoice";

/**
 * The policy table. Order matters only when two rows cover the same country on the same day: the
 * first match wins, so list the programme the app should prefer first.
 */
export const PLAY_BILLING_PROGRAMS: readonly ProgrammeRule[] = [
  {
    program: "us_alternative_billing",
    regions: ["US"],
    clientApi: "alternative_billing_only",
    playBillingAlongside: false,
    from: "2025-12-09",
    // The Epic v. Google injunction runs three years from its effective date (2025-10-29).
    until: "2028-10-29",
    // Google's US fee schedule was not published in the sources below; 20% matches the settlement's
    // proposed non-game rate. Configure the real rate with PLAY_ALT_SERVICE_FEE_BPS once known.
    serviceFeeBps: 2000,
    checkedOn: "2026-10-28",
    sources: [
      "https://support.google.com/googleplay/android-developer/answer/15582165",
    ],
    note:
      "Epic v. Google injunction. Programmes launched 2025-12-09; Google 'will not require the use of " +
      "Google Play Billing'. Enrolled developers report transactions and pay fees from 2026-10-01.",
  },
  {
    program: "billing_choice",
    regions: [...EEA, "GB"],
    clientApi: "billing_choice",
    playBillingAlongside: true,
    from: "2026-06-30",
    serviceFeeBps: 2000,
    checkedOn: "2026-10-28",
    sources: [BILLING_CHOICE_REQUIREMENTS, BILLING_CHOICE_API],
    note: "Billing choice (DMA in the EEA, DMCC in the UK). Play Billing Library 9.1+.",
  },
  {
    program: "billing_choice",
    regions: ["AU", "JP"],
    clientApi: "billing_choice",
    playBillingAlongside: true,
    from: "2026-09-30",
    serviceFeeBps: 2000,
    checkedOn: "2026-10-28",
    sources: [
      BILLING_CHOICE_REQUIREMENTS,
      BILLING_CHOICE_API,
      "https://support.google.com/googleplay/android-developer/answer/16787536",
    ],
    note: "Japan's older external payments programme closes to new enrolments 2026-09-30.",
  },
  {
    program: "user_choice_billing",
    regions: ["IN", "KR"],
    clientApi: "user_choice",
    playBillingAlongside: true,
    from: "2023-01-01",
    // A 4% reduction on the standard 15% fee.
    serviceFeeBps: 1100,
    checkedOn: "2026-10-28",
    sources: [
      "https://developer.android.com/google/play/billing/alternative",
    ],
    note: "User choice billing. India also needs administrativeArea on every reported transaction.",
  },
];

export type Distribution = "play" | "direct";

export type PaymentRoute =
  /** Play Billing only. */
  | "play"
  /** Stripe only. */
  | "stripe"
  /** Play Billing with Google's choice screen offering Stripe. */
  | "choice";

export interface RouteDecision {
  route: PaymentRoute;
  /** The programme that allows Stripe, for a Play build. */
  program?: PlayBillingProgram;
  clientApi?: ClientBillingApi;
  /** The sale must be reported to Google's externalTransactions API. */
  reportToGoogle: boolean;
  /** Why Stripe is not offered, when it is not. */
  reason?: "no_programme" | "not_enrolled" | "unknown_country";
}

export interface RouteInput {
  distribution: Distribution;
  /** The buyer's Play country (BillingConfig.getCountryCode), ISO 3166-1 alpha-2. */
  country?: string;
  /** Programmes this app is enrolled in. */
  enrolled: ReadonlySet<PlayBillingProgram>;
  now?: Date;
  table?: readonly ProgrammeRule[];
}

function day(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** The programme covering [country] on [now], if any. */
export function programmeFor(
  country: string,
  now: Date = new Date(),
  table: readonly ProgrammeRule[] = PLAY_BILLING_PROGRAMS,
): ProgrammeRule | undefined {
  const cc = country.toUpperCase();
  const today = day(now);
  return table.find((rule) =>
    rule.regions.includes(cc) && rule.from <= today && (rule.until === undefined || today <= rule.until),
  );
}

export function decideRoute(input: RouteInput): RouteDecision {
  if (input.distribution === "direct") return { route: "stripe", reportToGoogle: false };
  const country = (input.country ?? "").trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(country)) return { route: "play", reportToGoogle: false, reason: "unknown_country" };
  const rule = programmeFor(country, input.now, input.table);
  if (!rule) return { route: "play", reportToGoogle: false, reason: "no_programme" };
  if (!input.enrolled.has(rule.program)) {
    return { route: "play", reportToGoogle: false, reason: "not_enrolled", program: rule.program };
  }
  return {
    route: rule.playBillingAlongside ? "choice" : "stripe",
    program: rule.program,
    clientApi: rule.clientApi,
    reportToGoogle: true,
  };
}

const PROGRAMS = new Set<PlayBillingProgram>(["us_alternative_billing", "billing_choice", "user_choice_billing"]);

/**
 * Parse `PLAY_BILLING_PROGRAMS`: comma-separated `<applicationId>:<program>` pairs naming the
 * programmes each app is enrolled in, e.g. `com.hereliesaz.graffux:us_alternative_billing`.
 * Unknown programmes are ignored, so a typo fails closed (Play Billing).
 */
export function enrolledPrograms(raw: string | undefined, appId: string): Set<PlayBillingProgram> {
  const out = new Set<PlayBillingProgram>();
  for (const part of (raw ?? "").split(",")) {
    const [app, program] = part.trim().split(":").map((s) => s.trim());
    if (app === appId && PROGRAMS.has(program as PlayBillingProgram)) out.add(program as PlayBillingProgram);
  }
  return out;
}
