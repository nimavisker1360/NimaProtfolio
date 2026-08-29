import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import Seo from "../../components/Seo";

const content = {
  en: {
    title: "Technology, creativity and AI in one workflow.",
    paragraphs: [
      "I am a multidisciplinary digital creator with experience in full-stack development, UI/UX design, graphic design, video editing and AI-assisted content production.",
      "Alongside building modern web applications, I plan and produce short-form promotional videos from concept to final delivery. My work includes campaign ideation, scriptwriting, storyboarding, AI-generated scenes, prompt engineering, camera-movement design, image retouching, motion graphics, multilingual on-screen text, sound cleanup and final editing.",
      "I have created visual content for real estate, construction, fashion, product and corporate campaigns, with a strong focus on vertical 9:16 videos for Instagram Reels and digital advertising. Every project is adapted to the brand, audience and platform while maintaining visual consistency and a natural, realistic result.",
      "My technical background allows me to combine creativity with structured problem-solving, producing content and digital products that are both visually engaging and commercially effective.",
    ],
    stats: [
      ["10+", "years in digital design and creative work"],
      ["6+", "years in web and software development"],
    ],
  },
  tr: {
    title: "Teknoloji, yaratıcılık ve yapay zekâ tek bir çalışma sürecinde.",
    paragraphs: [
      "Full-stack geliştirme, UI/UX tasarımı, grafik tasarım, video kurgu ve yapay zekâ destekli içerik üretimi alanlarında deneyime sahip çok yönlü bir dijital içerik üreticisiyim.",
      "Modern web uygulamaları geliştirmenin yanı sıra, fikir aşamasından final teslimine kadar kısa tanıtım videoları planlıyor ve üretiyorum. Çalışmalarım; kampanya fikri geliştirme, metin yazımı, storyboard, yapay zekâ ile sahne üretimi, prompt tasarımı, kamera hareketi planlaması, görsel rötuş, hareketli grafikler, çok dilli ekran yazıları, ses temizleme ve final kurguyu kapsıyor.",
      "Gayrimenkul, inşaat, moda, ürün ve kurumsal kampanyalar için; özellikle Instagram Reels ve dijital reklam formatlarına uygun 9:16 dikey içerikler hazırladım. Her projeyi markanın kimliğine, hedef kitlesine ve kullanılacağı platforma göre şekillendirirken görsel tutarlılığı ve doğal, gerçekçi sonucu ön planda tutuyorum.",
      "Teknik altyapım sayesinde yaratıcılığı sistemli problem çözme yaklaşımıyla birleştiriyor; hem görsel açıdan güçlü hem de ticari hedeflere uygun içerikler ve dijital ürünler geliştiriyorum.",
    ],
    stats: [
      ["10+", "Dijital tasarım ve yaratıcı çalışmalarda yıl"],
      ["6+", "Web ve yazılım geliştirmede yıl"],
    ],
  },
};

const About = () => {
  const { locale } = useRouter();
  const lang = locale === "tr" ? "tr" : "en";
  const copy = content[lang];

  return (
    <>
      <Seo page="about" />
      <section className="min-h-screen bg-primary/30 px-4 pb-28 pt-32 sm:px-8 xl:pb-16 xl:pr-28">
        <div className="container mx-auto grid gap-10 lg:grid-cols-[1fr_300px]">
          <motion.article initial={{ opacity: 1, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-[#17182c]/75 p-6 shadow-2xl backdrop-blur-md sm:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">{lang === "tr" ? "Hakkımda" : "About"}</p>
            <h1 className="mb-8 max-w-4xl text-3xl font-bold leading-tight sm:text-5xl">{copy.title}</h1>
            <div className="space-y-5 text-left">
              {copy.paragraphs.map((paragraph) => <p key={paragraph} className="text-base text-white/70 sm:text-lg">{paragraph}</p>)}
            </div>
          </motion.article>
          <aside className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1" aria-label={lang === "tr" ? "Deneyim özeti" : "Experience summary"}>
            {copy.stats.map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-800/35 to-fuchsia-900/15 p-7 backdrop-blur-md">
                <div className="mb-2 text-5xl font-bold text-accent">{value}</div>
                <p className="text-sm font-medium text-white/75">{label}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}

export default About;
