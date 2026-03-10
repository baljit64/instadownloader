export default function Loading() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <section className="surface-card overflow-hidden rounded-[40px] px-6 pb-12 pt-12 sm:px-10 lg:px-14 lg:pb-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-6 flex items-center gap-5">
            <div className="h-20 w-20 animate-pulse rounded-[1.75rem] bg-[linear-gradient(135deg,#ff8a5b,#ff4f9b_54%,#7c3aed)] opacity-70" />
            <div className="h-20 w-20 animate-pulse rounded-[1.75rem] bg-[linear-gradient(135deg,#0f172a,#2d7cff)] opacity-70" />
          </div>
          <div className="h-14 w-full max-w-3xl animate-pulse rounded-full bg-[#ece8ff]" />
          <div className="mt-5 h-6 w-full max-w-2xl animate-pulse rounded-full bg-[#f2eeff]" />
          <div className="mt-10 h-32 w-full max-w-3xl animate-pulse rounded-[2rem] bg-white/80" />
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="surface-card rounded-[28px] px-6 py-8"
          >
            <div className="h-[4.5rem] w-[4.5rem] animate-pulse rounded-[22px] bg-[#ddd5ff]" />
            <div className="mt-6 h-8 w-40 animate-pulse rounded-full bg-[#ece8ff]" />
            <div className="mt-3 h-20 animate-pulse rounded-[1.25rem] bg-[#f3f0ff]" />
          </div>
        ))}
      </section>
    </main>
  );
}
