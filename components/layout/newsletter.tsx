export function Newsletter() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em]">Hear about the next drop</p>
        <form className="mt-4 flex max-w-md gap-2" action="/api/newsletter" method="post">
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="h-11 flex-1 border border-ink bg-transparent px-4 text-sm outline-none placeholder:text-muted"
          />
          <button className="h-11 bg-ink px-5 text-xs font-medium uppercase tracking-[0.18em] text-paper">
            Join
          </button>
        </form>
      </div>
    </section>
  );
}
