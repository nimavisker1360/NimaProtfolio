import Link from "next/link";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { HiArrowRight, HiCodeBracket, HiComputerDesktop, HiFilm, HiPhoto, HiPlayCircle, HiShare } from "react-icons/hi2";
import Seo from "../../components/Seo";

const services = [
  {
    icon: HiPlayCircle,
    href: "/creative-work?category=ai-videos",
    en: ["AI Video Production", "Production of realistic AI-assisted promotional videos, including creative direction, prompt engineering, scene generation, camera movement planning and visual consistency."],
    tr: ["Yapay Zekâ Destekli Video Üretimi", "Yaratıcı yönetim, prompt tasarımı, sahne üretimi, kamera hareketi planlaması ve görsel tutarlılık dahil olmak üzere gerçekçi yapay zekâ destekli tanıtım videoları."],
  },
  {
    icon: HiFilm,
    href: "/creative-work?category=video-editing",
    en: ["Video Editing & Motion Graphics", "Professional editing for advertisements, Instagram Reels, property presentations, product videos and corporate content, including motion graphics, text animation and sound cleanup."],
    tr: ["Video Kurgu ve Hareketli Grafikler", "Reklamlar, Instagram Reels, gayrimenkul tanıtımları, ürün videoları ve kurumsal içerikler için hareketli grafikler, metin animasyonları ve ses temizleme dahil profesyonel video kurgusu."],
  },
  {
    icon: HiPhoto,
    href: "/creative-work?category=graphic-design",
    en: ["Graphic Design", "Social media banners, advertising creatives, promotional layouts, brand visuals and campaign-specific graphic design."],
    tr: ["Grafik Tasarım", "Sosyal medya bannerları, reklam görselleri, tanıtım tasarımları, marka görselleri ve kampanyaya özel grafik tasarım çalışmaları."],
  },
  {
    icon: HiShare,
    href: "/creative-work?category=social-media",
    en: ["Social Media Content", "Platform-focused content planning and production for Instagram, Reels and digital campaigns, optimized for attention, clarity and conversion."],
    tr: ["Sosyal Medya İçerik Üretimi", "Instagram, Reels ve dijital kampanyalar için dikkat, anlaşılabilirlik ve dönüşüm odaklı içerik planlama ve üretimi."],
  },
  {
    icon: HiCodeBracket,
    href: "/work",
    en: ["Web & Software Development", "Modern, responsive and scalable web applications using technologies such as Next.js, React, TypeScript, Node.js and modern databases."],
    tr: ["Web ve Yazılım Geliştirme", "Next.js, React, TypeScript, Node.js ve modern veritabanları kullanılarak geliştirilen hızlı, responsive ve ölçeklenebilir web uygulamaları."],
  },
  {
    icon: HiComputerDesktop,
    href: "/creative-work?category=web-development",
    en: ["UI/UX Design", "User-focused interfaces, responsive layouts, design systems and practical digital experiences aligned with business goals."],
    tr: ["UI/UX Tasarımı", "İş hedefleriyle uyumlu, kullanıcı odaklı arayüzler, responsive tasarımlar, tasarım sistemleri ve işlevsel dijital deneyimler."],
  },
];

const Services = () => {
  const { locale } = useRouter();
  const lang = locale === "tr" ? "tr" : "en";

  return (
    <>
      <Seo page="services" />
      <section className="min-h-screen bg-primary/30 px-4 pb-28 pt-32 sm:px-8 xl:pb-16 xl:pr-28">
        <div className="container mx-auto">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-accent">{lang === "tr" ? "Yaratıcı + Teknik" : "Creative + Technical"}</p>
            <h1 className="text-4xl font-bold sm:text-6xl">{lang === "tr" ? "Hizmetlerim" : "My services"}<span className="text-accent">.</span></h1>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              const [title, description] = service[lang];
              return (
                <article key={title} className="group flex min-h-[280px] flex-col rounded-3xl border border-white/10 bg-[#191a31]/75 p-6 backdrop-blur-md transition hover:-translate-y-1 hover:border-accent/50 hover:bg-purple-950/35">
                  <Icon aria-hidden="true" className="mb-5 text-4xl text-accent" />
                  <h2 className="mb-3 text-xl font-semibold">{title}</h2>
                  <p className="mb-6 flex-1 text-sm text-white/65">{description}</p>
                  <Link href={service.href} className="inline-flex items-center gap-2 self-start text-sm font-semibold text-white transition group-hover:text-accent">
                    {lang === "tr" ? "İlgili çalışmaları gör" : "View related work"}<HiArrowRight aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}

export default Services;
