import { useRouter } from "next/router";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import Seo from "../../components/Seo";
import PortfolioGallery from "../../components/PortfolioGallery";
import { SOCIAL_MEDIA_SHOWCASE } from "../../lib/content";

const copy = {
  en: {
    title: "Creative AI & Media Portfolio",
    description: "A selection of AI-generated commercials, video editing projects, motion graphics, social media campaigns and graphic design work created for real estate, construction, fashion, product and corporate brands.",
  },
  tr: {
    title: "Yaratıcı Yapay Zekâ ve Medya Portfolyosu",
    description: "Gayrimenkul, inşaat, moda, ürün ve kurumsal markalar için hazırlanan yapay zekâ destekli reklam videoları, video kurgu projeleri, hareketli grafikler, sosyal medya kampanyaları ve grafik tasarım çalışmalarından seçmeler.",
  },
};

const CreativeWork = ({ items }) => {
  const { locale } = useRouter();
  const lang = locale === "tr" ? "tr" : "en";
  return (
    <>
      <Seo page="creative" />
      <section id="creative-portfolio" className="min-h-screen bg-primary/30 px-4 pb-28 pt-32 sm:px-8 xl:pb-16 xl:pr-28">
        <div className="container mx-auto">
          <header className="mb-10 max-w-4xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-accent">Creative AI & Media</p>
            <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-6xl">{copy[lang].title}</h1>
            <p className="text-base text-white/70 sm:text-lg">{copy[lang].description}</p>
          </header>
          <aside className="mb-10 rounded-3xl border border-fuchsia-400/20 bg-gradient-to-r from-purple-950/45 to-fuchsia-950/25 p-5 sm:p-7" aria-labelledby="social-media-accounts-title">
            <div className="mb-5 max-w-3xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Social Media Portfolio</p>
              <h2 id="social-media-accounts-title" className="text-xl font-bold sm:text-2xl">{lang === "tr" ? "Sosyal medya çalışmalarım" : "Social media work"}</h2>
              <p className="mt-2 text-sm text-white/65">{lang === "tr" ? "İçerik üretimi ve sosyal medya çalışmalarımdan seçili Instagram hesapları." : "Selected Instagram accounts featuring my content production and social media work."}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_MEDIA_SHOWCASE.map((account) => (
                <a key={account.handle} href={account.href} target="_blank" rel="noopener noreferrer" className="group inline-flex min-w-[250px] items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 transition hover:border-fuchsia-300/50 hover:bg-white/10">
                  <span><span className="block text-sm font-semibold text-white">{account.label}</span><span className="text-xs text-fuchsia-200">{account.handle}</span></span>
                  <HiArrowTopRightOnSquare aria-hidden="true" className="text-lg text-fuchsia-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </aside>
          <PortfolioGallery items={items} />
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps() {
  let items = [];
  if (process.env.MONGODB_URI) {
    try {
      const [{ connectDatabase }, { default: PortfolioItem }] = await Promise.all([import("../../lib/db"), import("../../models/PortfolioItem")]);
      await connectDatabase();
      const records = await PortfolioItem.find({ published: true }).sort({ featured: -1, order: 1, createdAt: -1 }).lean();
      items = JSON.parse(JSON.stringify(records));
    } catch {
      items = [];
    }
  }
  return { props: { items } };
}

export default CreativeWork;
