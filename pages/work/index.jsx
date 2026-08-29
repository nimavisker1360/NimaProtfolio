import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import Seo from "../../components/Seo";
import WorkSlider from "../../components/WorkSlider";

const content = {
  en: {
    eyebrow: "Software & Development",
    title: "Development projects",
    description: "I build websites, landing pages and full-stack products from concept to deployment. I assess UI/UX designs for technical feasibility and connect business goals with maintainable frontend and backend solutions.",
  },
  tr: {
    eyebrow: "Yazılım ve Geliştirme",
    title: "Yazılım projeleri",
    description: "Web siteleri, açılış sayfaları ve full-stack ürünleri fikir aşamasından yayına kadar geliştiriyorum. UI/UX tasarımlarını teknik uygulanabilirlik açısından değerlendiriyor, iş hedeflerini sürdürülebilir frontend ve backend çözümleriyle birleştiriyorum.",
  },
};

const Work = () => {
  const { locale } = useRouter();
  const lang = locale === "tr" ? "tr" : "en";
  const copy = content[lang];
  return (
    <>
      <Seo page="development" />
      <section id="development-projects" className="min-h-screen bg-primary/30 px-4 pb-28 pt-32 sm:px-8 xl:pb-16 xl:pr-28">
        <div className="container mx-auto">
          <header className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-accent">{copy.eyebrow}</p>
            <h1 className="mb-4 text-4xl font-bold sm:text-6xl">{copy.title}<span className="text-accent">.</span></h1>
            <p className="text-base text-white/70 sm:text-lg">{copy.description}</p>
          </header>
          <WorkSlider />
        </div>
      </section>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}

export default Work;
