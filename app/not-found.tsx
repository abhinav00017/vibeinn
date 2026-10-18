import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto mt-16 max-w-md text-center">
      <h1 className="text-xs font-medium uppercase tracking-[0.18em]">Not found</h1>
      <p className="mt-4 text-sm text-muted">That page does not exist.</p>
      <Link href="/collections/all" className="mt-6 inline-block text-xs uppercase tracking-[0.18em] underline underline-offset-4">
        Shop all
      </Link>
    </div>
  );
}
