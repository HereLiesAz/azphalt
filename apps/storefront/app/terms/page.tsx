/**
 * The terms of service, at `https://www.azphalt.store/terms`.
 *
 * Like the privacy policy, this describes how the system actually works rather than asserting a
 * generic marketplace arrangement. The parts that matter and are easy to get wrong:
 *
 * - Extensions are licensed by their authors, not by Azphalt. Licences genuinely differ per package
 *   (proprietary, GPL, and model wrappers that defer to their upstream), so the terms must not imply
 *   one blanket licence.
 * - Paid extensions are buy-once perpetual, verified offline — so "we can revoke your access" would
 *   be false as well as unfriendly.
 * - Quarantine is automatic at a threshold of trusted reports (spec/marketplace-integrity.md), which
 *   is a real, describable process rather than unbounded discretion.
 */
import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service — Azphalt",
  description: "The terms for using the Azphalt store, buying extensions, and publishing them.",
};

const UPDATED = "27 July 2026";

export default function Terms() {
  return (
    <main className={styles.page}>
      <h1>Terms of Service</h1>
      <p className={styles.updated}>Last updated {UPDATED}</p>

      <div className={styles.callout}>
        <p>
          <strong>Azphalt is a marketplace, not the author of what it sells.</strong> Each extension is
          licensed to you by whoever wrote it, under that extension&rsquo;s own licence — which is
          shown on its listing and included in the package.
        </p>
      </div>

      <p>
        These terms cover the Azphalt store at <code>azphalt.store</code>, the Azphalt Android app, and
        the documentation at <code>azphalt.org</code>. Using any of them means you accept these terms.
      </p>

      <h2>1. What Azphalt is</h2>
      <p>
        Azphalt is an open standard for creative-app extensions and a store that distributes them. The
        standard and this store&rsquo;s own source code are published under the MIT licence.
        Extensions distributed through the store are <strong>not</strong> covered by that licence —
        they carry their own.
      </p>

      <h2>2. Using the store</h2>
      <p>
        No account is required. You may browse, search and download free extensions freely. You agree
        not to:
      </p>
      <ul>
        <li>attack, overload or attempt to gain unauthorised access to the service;</li>
        <li>publish malware, or content you do not have the rights to distribute;</li>
        <li>misrepresent who authored a package, or impersonate another publisher;</li>
        <li>use the abuse-report system to file knowingly false claims.</li>
      </ul>

      <h2>3. Extension licences</h2>
      <p>
        Every package declares a licence in its manifest and ships the full licence text inside the
        package. Licences vary genuinely across the catalogue — some extensions are proprietary, some
        are copyleft, and packages that wrap third-party models defer to that model&rsquo;s own
        upstream terms.
      </p>
      <p>
        <strong>Read the licence of anything you intend to rely on</strong>, especially commercially.
        Azphalt does not grant you rights in an extension; its author does.
      </p>

      <h2>4. Buying extensions</h2>
      <p>
        A paid extension is sold <strong>buy-once and perpetual</strong> unless its listing says
        otherwise. Your licence is issued as a signed token your app verifies offline, so it keeps
        working without contacting us — including if this store later goes away.
      </p>
      <ul>
        <li>
          <strong>Web purchases</strong> are processed by Stripe and are also subject to Stripe&rsquo;s
          terms.
        </li>
        <li>
          <strong>Android purchases</strong> are processed by Google Play Billing and are also subject
          to Google&rsquo;s terms, including Google&rsquo;s refund policy.
        </li>
      </ul>
      <p>
        Refunds for Play purchases are handled by Google. For web purchases, contact us — extensions
        are digital goods delivered immediately, so refunds are considered case by case, and we will
        not be unreasonable about an extension that does not work as described.
      </p>

      <h2>5. Publishing extensions</h2>
      <p>By publishing, you confirm that:</p>
      <ul>
        <li>you have the right to distribute everything in the package, including any assets or model weights;</li>
        <li>the licence you declare is accurate, and any upstream attribution requirements are met;</li>
        <li>the capabilities you declare match what your code actually uses;</li>
        <li>the package contains no malicious behaviour and no deliberately hidden functionality.</li>
      </ul>
      <p>
        You keep all ownership of what you publish. You grant Azphalt only what it needs to run a
        store: to host, display, and distribute your package, and to show its metadata and preview
        imagery in listings.
      </p>
      <p>
        For paid extensions, Azphalt operates on consignment: you set the price, payouts run through
        Stripe Connect, and the revenue split is the one shown at the time you list.
      </p>

      <h2>6. Moderation and removal</h2>
      <p>
        Users can report a package. When a version accumulates enough reports from trusted reporters it
        is <strong>quarantined automatically</strong> pending review, and we may remove or yank a
        version that is malicious, infringing, or misrepresented.
      </p>
      <p>
        Removing a package from the store stops further distribution. It does not reach into your
        device: an extension you already installed is yours, and a licence you already bought remains
        valid and verifiable offline.
      </p>
      <p>
        If you believe your work has been published by someone else, file an intellectual-property
        claim from the package&rsquo;s listing, or contact us directly.
      </p>

      <h2>7. Third-party extensions and services</h2>
      <p>
        Extensions are made by third parties. Azphalt reviews what it can and enforces a sandbox that
        denies code extensions network, filesystem and sensor access — but it does not audit every
        line of every package, and it makes no warranty about what a third-party extension does or how
        well it does it.
      </p>
      <p>
        Companion apps and MCP servers run outside that sandbox by design, under permissions you grant
        them and terms their operators set.
      </p>

      <h2>8. No warranty</h2>
      <p>
        The service and the extensions distributed through it are provided <strong>&ldquo;as
        is&rdquo;</strong>, without warranty of any kind, express or implied, including merchantability,
        fitness for a particular purpose, and non-infringement.
      </p>
      <p>
        Runtime data such as ratings, download counts and abuse reports is held in memory and resets on
        redeploy. It is informational, and no guarantee is made that it persists.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Azphalt is not liable for indirect, incidental,
        special, consequential or punitive damages, or for lost profits, data or goodwill, arising from
        your use of the service or of any extension.
      </p>
      <p>
        Nothing here limits liability that cannot be limited by law, including for fraud or for death
        or personal injury caused by negligence. If you are a consumer, your statutory rights are
        unaffected.
      </p>

      <h2>10. Changes</h2>
      <p>
        These terms may change; the date at the top changes with them, and the full history is public
        in the store&rsquo;s repository. Continuing to use the service after a change means accepting
        it. A change is not applied retroactively to a purchase you have already made.
      </p>

      <h2>11. Contact</h2>
      <p>
        <a href="mailto:hereliesaz@gmail.com">hereliesaz@gmail.com</a>
      </p>

      <p className={styles.footer}>
        See also the <a href="/privacy">Privacy Policy</a>.
      </p>
    </main>
  );
}
