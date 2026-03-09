import HeroDownloadForm from "./components/HeroDownloadForm";

const navigation = ["Home", "How to use", "FAQs"];

const formats = ["Post", "Reel", "IGTV", "Carousel"];

const features = [
  {
    id: "01",
    title: "Completely free",
    description:
      "Use the downloader without subscriptions, hidden limits, or extra installation steps.",
  },
  {
    id: "02",
    title: "No software installation",
    description:
      "Everything runs in the browser with a direct API request to fetch the Instagram media.",
  },
  {
    id: "03",
    title: "Works on any device",
    description:
      "The interface stays responsive on desktop and mobile while keeping the same download flow.",
  },
];

const floatingBadges = [
  { label: "IG", className: "left-2 top-[4.5rem] bg-[linear-gradient(135deg,#ff7b72,#ff3fa4)] text-white lg:left-[-1.5rem]" },
  { label: "RL", className: "left-20 top-5 bg-[linear-gradient(135deg,#6f61ff,#9b8cff)] text-white" },
  { label: "TV", className: "right-8 top-14 bg-white text-[#12131b]" },
  { label: "DL", className: "right-[4.5rem] top-52 bg-[#2d7cff] text-white" },
  { label: "CR", className: "left-4 top-60 bg-[#2374e1] text-white lg:left-[-1rem]" },
  { label: "PX", className: "right-6 top-80 bg-[#ff3c7a] text-white lg:right-[-0.75rem]" },
];

const supportTicker = [
  "POPULAR",
  "INSTAGRAM",
  "DOWNLOADS",
  "FAST",
  "SECURE",
  "PREVIEW",
];

const supportTiles = [
  { label: "Instagram Post", tag: "IG", accent: "bg-[linear-gradient(135deg,#ff8a5b,#ff4f9b)] text-white" },
  { label: "Instagram Reel", tag: "RL", accent: "bg-[linear-gradient(135deg,#111827,#2d7cff)] text-white" },
  { label: "IGTV", tag: "TV", accent: "bg-[linear-gradient(135deg,#6f61ff,#8ba3ff)] text-white" },
  { label: "Carousel", tag: "CR", accent: "bg-[linear-gradient(135deg,#0ea5e9,#38bdf8)] text-white" },
  { label: "Public URL", tag: "URL", accent: "bg-[linear-gradient(135deg,#334155,#0f172a)] text-white" },
  { label: "Direct Preview", tag: "PV", accent: "bg-[linear-gradient(135deg,#10b981,#22c55e)] text-white" },
  { label: "Proxy Download", tag: "PX", accent: "bg-[linear-gradient(135deg,#f97316,#fb7185)] text-white" },
  { label: "Mobile Ready", tag: "MB", accent: "bg-[linear-gradient(135deg,#2563eb,#60a5fa)] text-white" },
  { label: "Desktop Ready", tag: "DT", accent: "bg-[linear-gradient(135deg,#7c3aed,#c084fc)] text-white" },
  { label: "Fast Fetch", tag: "FF", accent: "bg-[linear-gradient(135deg,#0f766e,#14b8a6)] text-white" },
  { label: "Clean Results", tag: "RS", accent: "bg-[linear-gradient(135deg,#ec4899,#fb7185)] text-white" },
  { label: "API Ready", tag: "API", accent: "bg-[linear-gradient(135deg,#1d4ed8,#2563eb)] text-white" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="landing-grid" />
      <div className="landing-orb landing-orb-left" />
      <div className="landing-orb landing-orb-right" />

      <header className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-white/8 bg-[linear-gradient(90deg,#12131b,#1e2029)] px-5 py-4 text-white shadow-[0_28px_70px_rgba(13,17,29,0.32)] sm:px-7">
          <div className="flex items-center justify-between gap-6">
            <a className="flex items-center gap-3" href="#">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#12c2e9,#6f61ff)] text-sm font-extrabold text-white shadow-[0_12px_24px_rgba(34,120,255,0.32)]">
                ID
              </div>
              <div>
                <p className="font-display text-lg font-bold tracking-tight text-white">
                  Insta Downloader
                </p>
                <p className="text-xs text-white/55">Fast public Instagram media fetch</p>
              </div>
            </a>

            <nav className="hidden items-center gap-8 text-sm font-semibold text-white/62 md:flex">
              {navigation.map((item, index) => (
                <a
                  key={item}
                  className={`transition hover:text-white ${index === 0 ? "text-white" : ""}`}
                  href={index === 0 ? "#" : "#details"}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <section className="hero-panel surface-card relative overflow-hidden rounded-[40px] px-6 pb-12 pt-12 sm:px-10 lg:px-14 lg:pb-16">
          <div className="hero-glow hero-glow-pink" />
          <div className="hero-glow hero-glow-blue" />

          <div className="hero-soft-disc" />

          {floatingBadges.map((item) => (
            <div
              key={item.label}
              className={`floating-social-badge ${item.className}`}
            >
              {item.label}
            </div>
          ))}

          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-5">
              <div className="hero-brand-badge hero-brand-badge-instagram">IG</div>
              <div className="hero-brand-badge hero-brand-badge-primary">DL</div>
            </div>

            <h1 className="font-display max-w-4xl text-4xl font-bold leading-tight tracking-tight text-[#13151f] sm:text-5xl lg:text-[4.4rem]">
              Instagram{" "}
              <span className="relative inline-block text-[#2d7cff]">
                Downloader
                <span className="hero-title-underline" />
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6e6a86] sm:text-xl">
              Free online Instagram downloader for posts, reels, IGTV, and carousel
              media from public links.
            </p>

            <HeroDownloadForm formats={formats} />
          </div>
        </section>

        <section className="surface-card rounded-[38px] px-6 py-10 text-center sm:px-8" id="details">
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
            Our Features
          </span>
          <h2 className="font-display mt-4 text-4xl font-bold text-[#171923]">
            Effortless Instagram downloads at your fingertips
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#726a92]">
            The design changed, but the working behavior stayed the same: paste a valid
            Instagram URL, validate it with `antd`, fetch the media, and download from
            the preview cards.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="rounded-[28px] border border-white/80 bg-white/72 px-6 py-8 shadow-[0_20px_50px_rgba(118,99,255,0.1)]"
            >
              <div className="mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[22px] bg-[linear-gradient(135deg,#2d7cff,#66a6ff)] text-lg font-bold text-white shadow-[0_16px_30px_rgba(45,124,255,0.22)]">
                {feature.id}
              </div>
              <h2 className="font-display mt-6 text-3xl font-bold text-[#171923]">
                {feature.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-[#726a92]">
                {feature.description}
              </p>
            </article>
          ))}
          </div>
        </section>

        <section className="support-ticker" aria-hidden="true">
          <div className="support-ticker-track">
            {[...supportTicker, ...supportTicker].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </section>

        <section className="surface-card rounded-[38px] px-6 py-10 text-center sm:px-8">
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
            Supported Formats
          </span>
          <h2 className="font-display mt-4 text-4xl font-bold text-[#171923]">
            Popular Instagram download targets
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#726a92]">
            This keeps the same working Instagram flow while visually following the
            supported-platform grid structure from your reference.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {supportTiles.map((tile) => (
              <article
                key={tile.label}
                className="rounded-[24px] border border-white/80 bg-white/76 px-5 py-6 text-left shadow-[0_18px_40px_rgba(118,99,255,0.08)]"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-[18px] text-sm font-bold ${tile.accent}`}>
                  {tile.tag}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#171923]">{tile.label}</h3>
                <p className="mt-2 text-sm leading-6 text-[#726a92]">
                  Styled as a supported tile while staying aligned with the current
                  Instagram-only functionality.
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
