const navigation = ["Home", "Language", "Chrome Extension", "About"];

const formats = ["Video", "Photo", "Reel", "Story", "Carousel"];

const features = [
  {
    id: "01",
    title: "Easy peasy",
    description:
      "Drop a public Instagram link into the box and get a clean, guided download flow.",
  },
  {
    id: "02",
    title: "Super fast",
    description:
      "Designed for quick turnaround with a focused UI that keeps the main action obvious.",
  },
  {
    id: "03",
    title: "Well secure",
    description:
      "A server-ready layout that can plug into route handlers and validation when you add APIs.",
  },
];

const trustPoints = ["No account needed", "Works for reels and posts", "Built for mobile"];

const checklist = [
  "Download photos, reels, stories, and carousel posts",
  "Keep a clean handoff for future API integration",
  "Responsive layout with strong visual hierarchy",
];

function PostPreviewCard() {
  return (
    <div className="preview-card mx-auto w-full max-w-[420px] p-5">
      <div className="flex items-center justify-between text-sm text-[#7a739a]">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-[linear-gradient(135deg,#8b5cf6,#ec4899)] p-[2px]">
            <div className="h-full w-full rounded-full bg-white p-[2px]">
              <div className="h-full w-full rounded-full bg-[linear-gradient(135deg,#5eead4,#7c3aed)]" />
            </div>
          </div>
          <div>
            <p className="font-semibold text-[#2b2355]">@ocean.weekend</p>
            <p>New Delhi, India</p>
          </div>
        </div>
        <span className="text-xl leading-none">...</span>
      </div>

      <div className="preview-media preview-media-ocean mt-5 h-[320px] p-6">
        <div className="mx-auto mt-6 h-[210px] w-[26px] rounded-full bg-[#c47d4b] shadow-[0_16px_35px_rgba(82,45,18,0.22)]" />
      </div>

      <div className="mt-5 flex items-center justify-between text-[#7a739a]">
        <div className="flex gap-3 text-lg">
          <span>heart</span>
          <span>share</span>
        </div>
        <span>save</span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-[#70688f]">
        <p>
          Liked by <span className="font-semibold text-[#2b2355]">Yen</span> and{" "}
          <span className="font-semibold text-[#2b2355]">127 others</span>
        </p>
        <p>
          <span className="font-semibold text-[#2b2355]">@ocean.weekend</span> Lazy
          weekend
        </p>
        <p>Wed, 26 January 2021</p>
      </div>
    </div>
  );
}

function ReelPreviewCard() {
  return (
    <div className="preview-card mx-auto w-full max-w-[430px] p-5">
      <div className="rounded-[28px] border border-white/70 bg-white/80 p-4 shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
        <div className="flex items-center justify-between text-sm text-[#7a739a]">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-[linear-gradient(135deg,#111827,#7c3aed)]" />
            <div>
              <p className="font-semibold text-[#2b2355]">@city.frames</p>
              <p>Reel preview</p>
            </div>
          </div>
          <span className="rounded-full bg-[#f3efff] px-3 py-1 text-xs font-semibold text-[#5c4fd1]">
            HD
          </span>
        </div>

        <div className="preview-media preview-media-night mt-4 flex h-[360px] items-end p-5">
          <div className="w-full rounded-[22px] border border-white/10 bg-white/8 p-4 text-white backdrop-blur">
            <p className="text-xs uppercase tracking-[0.28em] text-white/70">Reel</p>
            <p className="mt-2 text-2xl font-semibold">Download in one tap</p>
            <p className="mt-2 max-w-[240px] text-sm text-white/72">
              Keep the interface focused while your API handles the heavy lifting.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-[#70688f]">
          <span>Format MP4</span>
          <span>Audio ready</span>
          <span>Cover saved</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="landing-grid" />
      <div className="landing-orb landing-orb-left" />
      <div className="landing-orb landing-orb-right" />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-6 sm:px-6 lg:px-8">
        <a className="flex items-center gap-3" href="#">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6e5cff,#9f8cff)] text-sm font-extrabold text-white shadow-[0_16px_30px_rgba(98,81,232,0.28)]">
            ID
          </div>
          <div>
            <p className="font-display text-xl font-bold tracking-tight text-[#2c2457]">
              instadown.io
            </p>
            <p className="text-sm text-[#7c749c]">Modern downloader landing page</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-[#736a94] md:flex">
          {navigation.map((item) => (
            <a
              key={item}
              className="transition hover:text-[#3d2fb2]"
              href={item === "Home" ? "#" : "#formats"}
            >
              {item}
            </a>
          ))}
        </nav>

        <button
          className="rounded-2xl bg-[linear-gradient(135deg,#6a5eff,#8878ff)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(108,91,255,0.24)] transition hover:translate-y-[-1px]"
          type="button"
        >
          Learn more
        </button>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <section className="hero-panel surface-card overflow-hidden rounded-[40px] px-6 pb-10 pt-10 sm:px-8 lg:px-12 lg:pb-14">
          <div className="hero-glow hero-glow-pink" />
          <div className="hero-glow hero-glow-blue" />

          <div className="float-chip left-6 top-24">link</div>
          <div className="float-chip float-chip-delayed right-10 top-16">story</div>
          <div className="float-chip bottom-[4.5rem] left-10">video</div>
          <div className="float-chip float-chip-delayed right-6 bottom-20">secure</div>

          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <span className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#716995] shadow-[0_10px_24px_rgba(115,96,255,0.08)]">
              Fast Instagram downloader
            </span>

            <h1 className="font-display mt-8 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[#352796] sm:text-5xl lg:text-6xl">
              Paste Instagram URL here.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#696187] sm:text-xl">
              Paste the URL of an Instagram video, photo, story, reel, or carousel
              post you want to download.
            </p>

            <div className="surface-card mt-10 w-full max-w-3xl rounded-[28px] p-4 sm:p-5">
              <div className="flex flex-col gap-3 md:flex-row">
                <label className="flex min-h-16 flex-1 items-center gap-3 rounded-[22px] border border-white/70 bg-[#f8f6ff] px-5 text-left text-[#847da6]">
                  <span className="text-sm font-semibold uppercase tracking-[0.22em]">
                    Url
                  </span>
                  <input
                    className="w-full bg-transparent text-base text-[#2c2457] outline-none placeholder:text-[#aaa3c6]"
                    placeholder="Paste link here..."
                    type="text"
                  />
                </label>

                <button
                  className="min-h-16 rounded-[22px] bg-[linear-gradient(135deg,#7b6cff,#9384ff)] px-8 text-base font-semibold text-white shadow-[0_20px_38px_rgba(112,92,255,0.28)] transition hover:translate-y-[-1px] md:min-w-[11rem]"
                  type="button"
                >
                  Download
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-3 px-1 text-sm text-[#7d759d] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {formats.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#ebe6ff] bg-white px-3 py-1.5 font-medium shadow-[0_8px_18px_rgba(104,84,255,0.06)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <button className="font-semibold text-[#6557d8]" type="button">
                  More options
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-medium text-[#6e6690]">
              {trustPoints.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/70 bg-white/65 px-4 py-2 shadow-[0_10px_20px_rgba(115,96,255,0.06)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="surface-card rounded-[30px] px-6 py-8 text-center"
            >
              <div className="mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#6b5cff,#98adff)] text-xl font-bold text-white shadow-[0_16px_30px_rgba(107,92,255,0.24)]">
                {feature.id}
              </div>
              <h2 className="font-display mt-6 text-3xl font-bold text-[#241c4c]">
                {feature.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-[#726a92]">
                {feature.description}
              </p>
            </article>
          ))}
        </section>

        <section
          className="grid items-center gap-10 rounded-[38px] px-2 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-4"
          id="formats"
        >
          <PostPreviewCard />

          <div className="max-w-xl">
            <span className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#716995]">
              Photo Download
            </span>
            <h2 className="font-display mt-6 text-4xl font-bold leading-tight text-[#241c4c] sm:text-5xl">
              Instagram photo download with a cleaner modern layout
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#6b638a]">
              This section mirrors the card-and-copy balance from the reference,
              while staying reusable for real download results later.
            </p>

            <div className="mt-8 grid gap-3">
              {checklist.map((item) => (
                <div
                  key={item}
                  className="surface-card flex items-center gap-4 rounded-[22px] px-5 py-4 text-[#5f5781]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#6f61ff,#9cb1ff)] text-sm font-bold text-white">
                    ok
                  </div>
                  <p className="text-base leading-7">{item}</p>
                </div>
              ))}
            </div>

            <a
              className="mt-8 inline-flex items-center rounded-full bg-[#2a2452] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(42,36,82,0.16)] transition hover:bg-[#1f1a42]"
              href="#"
            >
              Learn more
            </a>
          </div>
        </section>

        <section className="grid items-center gap-10 rounded-[38px] px-2 pb-6 pt-2 lg:grid-cols-[0.92fr_1.08fr] lg:px-4">
          <div className="max-w-xl">
            <span className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#716995]">
              Reel and video
            </span>
            <h2 className="font-display mt-6 text-4xl font-bold leading-tight text-[#241c4c] sm:text-5xl">
              Built so you can add APIs behind it without redesigning the front end
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#6b638a]">
              The hero input, preview cards, and content blocks are already arranged for
              route handlers like <code>/api/download</code> when you decide to wire the
              backend.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="surface-card rounded-[24px] px-5 py-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b83ad]">
                  Format
                </p>
                <p className="font-display mt-3 text-3xl font-bold text-[#241c4c]">MP4</p>
              </div>
              <div className="surface-card rounded-[24px] px-5 py-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b83ad]">
                  Ready
                </p>
                <p className="font-display mt-3 text-3xl font-bold text-[#241c4c]">
                  API
                </p>
              </div>
              <div className="surface-card rounded-[24px] px-5 py-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b83ad]">
                  Layout
                </p>
                <p className="font-display mt-3 text-3xl font-bold text-[#241c4c]">
                  Mobile
                </p>
              </div>
            </div>
          </div>

          <ReelPreviewCard />
        </section>
      </main>
    </div>
  );
}
