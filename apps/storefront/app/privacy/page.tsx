/**
 * The privacy policy, at `https://www.azphalt.store/privacy`.
 *
 * Written against what the code actually does rather than from a template. Every factual claim below
 * was checked against this repository before it was written down:
 *
 * - No cookies: production sets no `Set-Cookie` on the site or the API, and there is no
 *   `localStorage` / `sessionStorage` / analytics call anywhere in `apps/storefront`.
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

const UPDATED = "27 July 2026";

export default function Privacy() {
  return (
    <main className={styles.page}>
      <h1>Privacy Policy</h1>
      <p className={styles.updated}>Last updated {UPDATED}</p>

      <div className={styles.callout}>
        <p>
          <strong>Azphalt has no user accounts, sets no cookies, and runs no analytics.</strong> You can
          browse the store and download free extensions without identifying yourself in any way.
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
          <strong>No analytics or tracking.</strong> There is no analytics SDK, tag manager, tracking
          pixel, session recorder, or advertising identifier in the site or the app.
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
        The Azphalt Android app requests two permissions: internet access, to reach the store, and
        billing, to purchase paid extensions. It requests no access to your files, camera, microphone,
        contacts, or location.
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
          <strong>Google</strong> — Play Billing for in-app purchases, and Play distribution.
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
