"use client";

/**
 * Buy button for a consigned package. Posts to the checkout API and shows the resulting (stubbed)
 * checkout session inline. The stub payment provider moves no real money — the UI says so plainly,
 * so nothing here can be mistaken for a real purchase.
 */
import { useState } from "react";

interface CheckoutResponse {
  stub: boolean;
  message?: string;
  session?: { id: string; url: string; status: string };
  error?: string;
}

export function BuyButton({ packageId }: { packageId: string }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<CheckoutResponse | null>(null);

  async function buy() {
    setState("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        // A demo buyer id — a real deployment authenticates the buyer first.
        body: JSON.stringify({ packageId, buyerId: "buyer_demo" }),
      });
      const data = (await res.json()) as CheckoutResponse;
      setResult(data);
      setState(res.ok ? "done" : "error");
    } catch (e) {
      setResult({ stub: true, error: (e as Error).message });
      setState("error");
    }
  }

  return (
    <div>
      <button className="btn buy" onClick={buy} disabled={state === "loading"}>
        {state === "loading" ? "Starting checkout…" : "Buy on consignment"}
      </button>

      {state === "done" && result?.session ? (
        <p className="note">
          Stubbed checkout session <code>{result.session.id}</code> created (status{" "}
          {result.session.status}). No real money moved — this dev storefront simulates the payment
          provider.
        </p>
      ) : null}
      {state === "error" ? (
        <p className="note">Checkout failed: {result?.error ?? "unknown error"}.</p>
      ) : null}
    </div>
  );
}
