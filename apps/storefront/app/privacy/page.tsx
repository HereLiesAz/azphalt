/**
 * The privacy policy, at `https://www.azphalt.store/privacy`.
 *
 * Written against what the code actually does rather than from a template. Every factual claim below
 * was checked against this repository before it was written down:
 *
 * - No cookies: production sets no `Set-Cookie` on the site or the API, and there is no
 *   `localStorage` / `sessionStorage` / analytics call anywhere in `apps/storefront`.
 * - The Android app is the one exception, and it is stated as one. `apps/storefront-cmp` depends on
 *   `com.google.firebase:firebase-analytics`; the permissions it actually ships with are the merged
 *   manifest's, not the ones the source file lists, which is why the advertising-ID and ad-services
 *   permissions are explicitly `tools:node="remove"`d there and the collection flags set to false.
 *   The web store carries no Firebase and no analytics of any kind.
 * - Ratings, reports and download tallies live in process memory and reset on redeploy — see the
 *   "Runtime-mutable state" note in `lib/baked.ts`.
 * - Checkout takes `{ packageId, buyerId }` and no name, email or address (`api/checkout/route.ts`).
 * - Entitlement `subject` is an opaque marketplace-side id; the registry is identity-agnostic
 *   (`packages/registry/src/entitlement.ts`).
 *
 * A privacy policy that overstates what is collected is merely useless; one that understates it is
 * a false statement to users and to app stores. If the behaviour above changes, this page changes
 * with it — that is the point of documenting *why* each claim is true.
 */
import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — Azphalt",
  description: "What Azphalt collects, what it does not, and who else is involved.",
};

const UPDATED = "28 July 2026";

export default function Privacy() {
  return (
    <main className={styles.page}>
      <h1>Privacy Policy</h1>
      <p className={styles.updated}>Last updated {UPDATED}</p>

      <div className={styles.callout}>
        <p>
          <strong>Azphalt has no user accounts and sets no cookies.</strong> You can browse the store
          and download free extensions without identifying yourself in any way. The website runs no
          analytics at all; the Android app includes Firebase Analytics, which is described{" "}
          <a href="#app-analytics">below</a>.
        </p>
      </div>

      <p>
        This policy covers the Azphalt store at <code>azphalt.store</code>, the documentation site at{" "}
        <code>azphalt.org</code>, and the Azphalt Android app. It explains what is collected, what is
        deliberately not collected, and which third parties are involved when you pay for something.
      </p>

      <h2>What we do not collect</h2>
      <ul>
        <li>
          <strong>No cookies.</strong> The store and its API set no cookies at all — not for sessions,
          not for preferences, not for tracking.
        </li>
        <li>
          <strong>No analytics on the website.</strong> There is no analytics SDK, tag manager,
          tracking pixel or session recorder on <code>azphalt.store</code>. The Android app is
          different and is described <a href="#app-analytics">below</a>.
        </li>
        <li>
          <strong>No advertising identifier.</strong> Neither the site nor the app reads your device
          advertising ID or Android ID. The app removes the advertising permissions that Firebase
          would otherwise add, and switches that collection off in the SDK as well.
        </li>
        <li>
          <strong>No advertising.</strong> Azphalt shows no ads, has no advertising partners, and does
          not share anything for ad targeting or measurement.
        </li>
        <li>
          <strong>No accounts.</strong> There is nothing to sign up for. Browsing, searching and
          downloading free extensions require no identity.
        </li>
        <li>
          <strong>No browser storage.</strong> The store does not write to <code>localStorage</code> or{" "}
          <code>sessionStorage</code>.
        </li>
        <li>
          <strong>No access to your work.</strong> Azphalt never receives the images, video, audio or
          projects you use extensions on. Extensions run inside your own app, on your own device.
        </li>
      </ul>

      <h2>What is collected</h2>

      <h3>Server logs</h3>
      <p>
        The store is hosted on Vercel, which keeps standard web-server logs of requests — including IP
        address, timestamp, requested URL and user-agent. These are operational records used to keep
        the service running and to investigate abuse. They are not linked to an identity, because
        there is no identity to link them to.
      </p>

      <h3>Ratings, reports and download counts</h3>
      <p>
        If you rate a package or file an abuse report, that submission is recorded against the{" "}
        <em>package</em>, not against you — no identifier of the submitter is stored. Download tallies
        are aggregate counters.
      </p>
      <p>
        These live in the running server&rsquo;s memory and are reset whenever the store is
        redeployed. They are not written to a database and are not backed up.
      </p>
      <p>
        One exception is worth stating plainly: an intellectual-property claim can optionally include a{" "}
        <code>claimant</code> field. That field is provided by you, and only if you choose to identify
        yourself. Anything you type into it is stored with the claim.
      </p>

      <h3 id="app-analytics">App usage (Android app only)</h3>
      <p>
        The Android app includes{" "}
        <a href="https://firebase.google.com/support/privacy">Firebase Analytics</a>, a Google
        service, so we can see how many people install the app and which parts of it get used. The
        website has no equivalent and gets none of this.
      </p>
      <p>What Firebase sends to Google from the app:</p>
      <ul>
        <li>
          An <strong>app-instance ID</strong> — a random identifier created when you install the app.
          It is not your device ID and not an advertising ID; deleting the app&rsquo;s data or
          uninstalling it destroys it, and a reinstall gets a new one.
        </li>
        <li>
          <strong>Device and app information</strong> — device model, operating-system version, app
          version, language, and an approximate region derived from the IP address (the IP itself is
          not retained by Analytics).
        </li>
        <li>
          <strong>Usage events</strong> — first launch, sessions, screens viewed, and in-app purchase
          events reported by Google Play.
        </li>
      </ul>
      <p>
        What it does <em>not</em> send: your advertising ID, your Android ID, your name or email, the
        other apps on your device, or anything you make with an extension. Which extensions you browse
        or download is not reported to Analytics as identifiable activity.
      </p>
      <p>
        Google processes this data as described in{" "}
        <a href="https://firebase.google.com/support/privacy">Firebase&rsquo;s privacy documentation</a>
        . If you would rather not send it, browse the same catalogue on the web at{" "}
        <code>azphalt.store</code>, which has no analytics.
      </p>

      <h3>Purchases</h3>
      <p>
        Azphalt never sees or stores your payment-card details. Payment is handled entirely by a
        payment provider:
      </p>
      <ul>
        <li>
          <strong>On the web</strong> — by <a href="https://stripe.com/privacy">Stripe</a>. Checkout
          happens on Stripe&rsquo;s own pages. The store sends Stripe the item and price; Stripe
          handles the card.
        </li>
        <li>
          <strong>In the Android app</strong> — by{" "}
          <a href="https://policies.google.com/privacy">Google Play Billing</a>. The app receives a
          purchase token from Google and sends it to the Azphalt registry to confirm the purchase is
          genuine. The token identifies the transaction, not you.
        </li>
      </ul>
      <p>
        What Azphalt records for a purchase is a <strong>licence</strong>: which package was bought and
        an opaque buyer identifier. Your name, email address and billing address are held by the
        payment provider, not by Azphalt.
      </p>
      <p>
        Licences are issued as signed tokens your app can verify <strong>offline</strong>. Using a
        paid extension does not phone home, so we do not learn when or how often you use anything you
        bought.
      </p>

      <h3>Sellers</h3>
      <p>
        If you sell extensions, payouts run through Stripe Connect. Stripe collects the identity and
        bank details it needs to pay you and to meet its legal obligations. Azphalt stores the
        resulting Stripe account reference so it knows where to route your earnings — it does not
        receive or store your bank details.
      </p>

      <h2>The Android app</h2>
      <p>
        The Azphalt Android app requests internet and network-state access, to reach the store;
        billing, to purchase paid extensions; and a small number of background permissions that
        Firebase Analytics adds for its own use — keeping the device awake long enough to upload a
        batch of events, and reading the Play install referrer. It requests no access to your files,
        camera, microphone, contacts, or location, and no advertising permissions.
      </p>
      <p>
        When another app asks Azphalt to fetch an extension for it, Azphalt is told which app is
        asking — so it can show only extensions that app can use, and so it can tell you who it is
        acting for. It hands back the extension file and nothing else. It does not report your
        installed apps or your activity in them.
      </p>

      <h2>Extensions themselves</h2>
      <p>
        Code extensions run in a sandbox with <strong>no network access, no filesystem access outside
        their own package, and no access to your device&rsquo;s sensors</strong>. An extension cannot
        send your work anywhere, because it cannot reach anywhere.
      </p>
      <p>
        Two categories are different, and are labelled as such in the store:
      </p>
      <ul>
        <li>
          <strong>Companion apps</strong> are separate applications with their own permissions, granted
          by you to that app. You are asked before anything is handed to one.
        </li>
        <li>
          <strong>MCP servers</strong> connect to a service you configure. Their operator&rsquo;s
          privacy practices apply, not ours.
        </li>
      </ul>

      <h2>Who else receives data</h2>
      <ul>
        <li>
          <strong>Vercel</strong> — hosting and server logs.
        </li>
        <li>
          <strong>Stripe</strong> — web payments and seller payouts.
        </li>
        <li>
          <strong>Google</strong> — Play Billing for in-app purchases, Play distribution, and Firebase
          Analytics in the Android app.
        </li>
        <li>
          <strong>GitHub</strong> — where extension source and the store&rsquo;s own code are hosted.
          Contributing is public by nature.
        </li>
      </ul>
      <p>
        Azphalt does not sell data, does not share it for advertising, and has no advertising
        partners.
      </p>

      <h2>Your rights</h2>
      <p>
        Because there are no accounts and almost nothing is retained, most data-subject requests have
        no data to act on — there is no profile to export or delete. Where something does exist, such
        as a purchase licence or a claim you submitted, you can ask us to provide or remove it.
      </p>
      <p>
        For payment records, contact the payment provider directly; they hold that data and can act on
        it.
      </p>
      <p>
        For the app&rsquo;s analytics, the identifier everything is keyed to is destroyed by clearing
        the app&rsquo;s data or uninstalling it, which leaves the past events with nothing to link
        them to. Ask us if you would like the underlying records deleted as well.
      </p>

      <h2>Children</h2>
      <p>
        Azphalt is not directed at children under 13 and does not knowingly collect their data. Some
        extensions are flagged by their developers as adult content and are age-gated in the store.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the date at the top changes with it. The history of this page is public
        in the store&rsquo;s repository, so any change is visible as a diff.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy, or a request about your data:{" "}
        <a href="mailto:hereliesaz@gmail.com">hereliesaz@gmail.com</a>.
      </p>

      <p className={styles.footer}>
        See also the <a href="/terms">Terms of Service</a>.
      </p>
    </main>
  );
}
