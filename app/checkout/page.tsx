export const metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto mt-16 max-w-md text-center">
      <h1 className="text-xs font-medium uppercase tracking-[0.18em]">Checkout</h1>
      <p className="mt-4 text-sm text-muted">
        Payments are not wired up yet. The cart is saved in your browser, so nothing is lost.
      </p>
    </div>
  );
}
