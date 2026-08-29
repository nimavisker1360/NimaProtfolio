import { useRouter } from "next/router";
import Seo from "../../components/Seo";
import PortfolioGallery from "../../components/PortfolioGallery";

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
