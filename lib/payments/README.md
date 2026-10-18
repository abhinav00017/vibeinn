# Payments

Not decided yet. When chosen, add one file here (`razorpay.ts` or `stripe.ts`) that exposes
`createCheckout(lines) -> { url }` and a webhook handler under `app/api/payments/`.
