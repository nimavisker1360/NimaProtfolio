import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import { HiPlay, HiXMark } from "react-icons/hi2";
import { PORTFOLIO_CATEGORIES } from "../lib/content";

const ratioClass = { "9:16": "aspect-[9/16]", "16:9": "aspect-video", "1:1": "aspect-square" };

const LazyVideo = ({ item, previewing, onPreview, onOpen, lang }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: "250px" });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (previewing) video.play().catch(() => setShowVideo(false));
    else {
      video.pause();
      video.currentTime = 0;
    }
  }, [previewing]);

  const title = item.title?.[lang] || item.title?.en || (lang === "tr" ? "İsimsiz proje" : "Untitled project");
  const meta = [item.clientIndustry, item.year].filter(Boolean).join(" · ");
  return (
    <article ref={containerRef} className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#191a31]/85 ${item.aspectRatio === "9:16" ? "sm:row-span-2" : ""}`}>
      <button type="button" onClick={onOpen} onMouseEnter={() => onPreview()} onMouseLeave={() => onPreview(null)} onFocus={() => onPreview()} onBlur={() => onPreview(null)} aria-label={`${lang === "tr" ? "Videoyu oynat" : "Play video"}: ${title}`} className="block h-full w-full text-left">
        <div className={`relative overflow-hidden bg-black/30 ${ratioClass[item.aspectRatio] || "aspect-video"}`}>
          {/* Cloudinary cover URLs are user-managed at runtime, so keep the original asset instead of proxying it. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.cover.url} alt="" loading="lazy" decoding="async" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${showVideo ? "opacity-0" : "opacity-100"}`} />
          <video ref={videoRef} muted playsInline loop preload="none" poster={item.cover.url} onPlaying={() => previewing && setShowVideo(true)} onPause={() => setShowVideo(false)} onWaiting={() => setShowVideo(false)} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${showVideo ? "opacity-100" : "opacity-0"}`} aria-label={title}>
            {nearViewport ? <source src={item.video.url} /> : null}
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#111222] via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-black/55 p-3 text-white backdrop-blur-sm transition group-hover:scale-110" aria-hidden="true"><HiPlay /></span>
          {item.featured ? <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider">{lang === "tr" ? "Öne Çıkan" : "Featured"}</span> : null}
          <div className="absolute inset-x-0 bottom-0 p-5">
            {meta ? <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">{meta}</p> : null}
            <h2 className="text-lg font-bold text-white">{title}</h2>
          </div>
        </div>
      </button>
    </article>
  );
};

const VideoModal = ({ item, lang, onClose }) => {
  useEffect(() => {
    if (!item) return undefined;

    const close = (event) => event.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = previousOverflow;
    };
  }, [item, onClose]);

  if (!item || typeof document === "undefined") return null;
  const title = item.title?.[lang] || item.title?.en || (lang === "tr" ? "İsimsiz proje" : "Untitled project");
  const description = item.description?.[lang] || "";
  const tools = Array.isArray(item.tools) ? item.tools.filter(Boolean) : [];
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-auto rounded-2xl border border-white/15 bg-[#131424] p-3 shadow-2xl sm:p-5">
        <button type="button" onClick={onClose} aria-label={lang === "tr" ? "Videoyu kapat" : "Close video"} className="absolute right-4 top-4 z-10 rounded-full bg-black/70 p-3 text-xl"><HiXMark /></button>
        <video controls autoPlay playsInline preload="metadata" poster={item.cover.url} className={`mx-auto max-h-[72vh] w-full rounded-xl bg-black object-contain ${item.aspectRatio === "9:16" ? "max-w-md" : ""}`}>
          <source src={item.video.url} />
        </video>
        <div className="p-3 sm:p-5">
          <h2 className="mb-2 text-2xl font-bold">{title}</h2>
          {description ? <p className="mb-4 text-white/70">{description}</p> : null}
          {item.clientIndustry || item.role || tools.length ? <dl className="grid gap-3 text-sm sm:grid-cols-3">
            {item.clientIndustry ? <div><dt className="text-white/45">{lang === "tr" ? "Müşteri / Sektör" : "Client / Industry"}</dt><dd>{item.clientIndustry}</dd></div> : null}
            {item.role ? <div><dt className="text-white/45">{lang === "tr" ? "Rol" : "Role"}</dt><dd>{item.role}</dd></div> : null}
            {tools.length ? <div><dt className="text-white/45">{lang === "tr" ? "Araçlar" : "Tools"}</dt><dd>{tools.join(", ")}</dd></div> : null}
          </dl> : null}
        </div>
      </div>
    </div>,
    document.body
  );
};

const PortfolioGallery = ({ items }) => {
  const router = useRouter();
  const lang = router.locale === "tr" ? "tr" : "en";
  const requested = typeof router.query.category === "string" ? router.query.category : "all";
  const [filter, setFilter] = useState(PORTFOLIO_CATEGORIES.some((item) => item.value === requested) ? requested : "all");
  const [previewId, setPreviewId] = useState(null);
  const [modalItem, setModalItem] = useState(null);
  const filtered = filter === "all" ? items : items.filter((item) => item.categories.includes(filter));

  const changeFilter = (value) => {
    setFilter(value);
    setPreviewId(null);
    router.replace({ pathname: router.pathname, query: value === "all" ? {} : { category: value } }, undefined, { shallow: true, locale: router.locale });
  };

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label={lang === "tr" ? "Portfolyo filtreleri" : "Portfolio filters"}>
        <button type="button" onClick={() => changeFilter("all")} aria-pressed={filter === "all"} className={`rounded-full px-4 py-2 text-sm ${filter === "all" ? "bg-accent text-white" : "bg-white/5 text-white/65 hover:bg-white/10"}`}>{lang === "tr" ? "Tümü" : "All"}</button>
        {PORTFOLIO_CATEGORIES.map((category) => <button key={category.value} type="button" onClick={() => changeFilter(category.value)} aria-pressed={filter === category.value} className={`rounded-full px-4 py-2 text-sm ${filter === category.value ? "bg-accent text-white" : "bg-white/5 text-white/65 hover:bg-white/10"}`}>{category[lang]}</button>)}
      </div>
      {filtered.length ? (
        <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => <LazyVideo key={item._id} item={item} lang={lang} previewing={previewId === item._id} onPreview={(value = item._id) => setPreviewId(value)} onOpen={() => setModalItem(item)} />)}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/20 bg-white/[0.03] px-6 py-16 text-center">
          <h2 className="mb-2 text-xl font-semibold">{lang === "tr" ? "Henüz yayınlanmış çalışma yok" : "No published work yet"}</h2>
          <p>{lang === "tr" ? "Doğrulanmış proje medyaları ve ayrıntıları yönetim panelinden eklendiğinde burada görünecek." : "Verified project media and details will appear here after they are published through the portfolio manager."}</p>
        </div>
      )}
      <VideoModal item={modalItem} lang={lang} onClose={() => setModalItem(null)} />
    </>
  );
};

export default PortfolioGallery;
