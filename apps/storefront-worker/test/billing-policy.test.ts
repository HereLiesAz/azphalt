import { describe, expect, it } from "vitest";
import { decideRoute, EEA, enrolledPrograms, PLAY_BILLING_PROGRAMS, programmeFor, type PlayBillingProgram } from "../src/billing-policy";

const all = new Set<PlayBillingProgram>(["us_alternative_billing", "billing_choice", "user_choice_billing"]);
const at = (d: string) => new Date(d + "T12:00:00Z");

describe("billing policy table", () => {
  it("non-Play builds always use Stripe, with nothing reported to Google", () => {
    for (const country of ["US", "DE", "BR", "", undefined]) {
      expect(decideRoute({ distribution: "direct", country, enrolled: new Set() })).toEqual({ route: "stripe", reportToGoogle: false });
    }
  });

  it("US: Stripe without Play alongside, once enrolled", () => {
    expect(decideRoute({ distribution: "play", country: "us", enrolled: all, now: at("2026-10-28") })).toMatchObject({
      route: "stripe", program: "us_alternative_billing", clientApi: "alternative_billing_only", reportToGoogle: true,
    });
  });

  it("EEA and UK: Google's choice screen from 2026-06-30, Play before", () => {
    for (const c of ["DE", "FR", "NO", "IS", "LI", "GB"]) {
      expect(decideRoute({ distribution: "play", country: c, enrolled: all, now: at("2026-10-28") })).toMatchObject({ route: "choice", program: "billing_choice", clientApi: "billing_choice" });
      expect(decideRoute({ distribution: "play", country: c, enrolled: all, now: at("2026-06-29") }).route).toBe("play");
    }
    expect(EEA).toHaveLength(30);
  });

  it("Australia and Japan open 2026-09-30", () => {
    expect(decideRoute({ distribution: "play", country: "JP", enrolled: all, now: at("2026-09-29") }).route).toBe("play");
    expect(decideRoute({ distribution: "play", country: "AU", enrolled: all, now: at("2026-09-30") }).route).toBe("choice");
  });

  it("India and South Korea use user choice billing", () => {
    expect(decideRoute({ distribution: "play", country: "IN", enrolled: all }).clientApi).toBe("user_choice");
    expect(decideRoute({ distribution: "play", country: "KR", enrolled: all }).route).toBe("choice");
  });

  it("not enrolled falls back to Play Billing, naming the programme to sign up for", () => {
    expect(decideRoute({ distribution: "play", country: "US", enrolled: new Set(["billing_choice"]) })).toEqual({
      route: "play", reportToGoogle: false, reason: "not_enrolled", program: "us_alternative_billing",
    });
  });

  it("uncovered and unknown countries use Play Billing", () => {
    expect(decideRoute({ distribution: "play", country: "BR", enrolled: all })).toMatchObject({ route: "play", reason: "no_programme" });
    expect(decideRoute({ distribution: "play", country: "", enrolled: all })).toMatchObject({ route: "play", reason: "unknown_country" });
    expect(decideRoute({ distribution: "play", country: "USA", enrolled: all }).route).toBe("play");
  });

  it("the US programme ends with the injunction", () => {
    expect(programmeFor("US", at("2028-10-30"))).toBeUndefined();
  });

  it("every row is documented with sources and a check date", () => {
    for (const rule of PLAY_BILLING_PROGRAMS) {
      expect(rule.sources.length).toBeGreaterThan(0);
      expect(rule.sources.every((s) => s.startsWith("https://"))).toBe(true);
      expect(rule.checkedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(rule.regions.every((r) => /^[A-Z]{2}$/.test(r))).toBe(true);
    }
  });

  it("parses enrolment per app and ignores typos", () => {
    const raw = "com.hereliesaz.graffux:us_alternative_billing, com.hereliesaz.graffux:billing_choise, other.app:billing_choice";
    expect([...enrolledPrograms(raw, "com.hereliesaz.graffux")]).toEqual(["us_alternative_billing"]);
    expect([...enrolledPrograms(undefined, "x")]).toEqual([]);
  });
});
