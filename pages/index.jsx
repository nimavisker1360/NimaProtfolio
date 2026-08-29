import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { HiArrowDownTray, HiArrowRight } from "react-icons/hi2";
import Seo from "../components/Seo";

const copy = {
  en: {
    role: "Full-Stack Developer, AI Video Creator & Graphic Designer",
    intro: "I combine software engineering, visual storytelling and generative AI to build modern digital products and create high-impact visual content for brands.",
    creative: "View Creative Work",
    development: "View Development Projects",
    cv: "Download CV",
    contact: "Let’s Work Together",
  },
  tr: {
    role: "Full-Stack Geliştirici, Yapay Zekâ Video Üreticisi ve Grafik Tasarımcı",
    intro: "Yazılım geliştirme, görsel hikâye anlatımı ve üretken yapay zekâyı bir araya getirerek modern dijital ürünler ve markalar için etkili görsel içerikler üretiyorum.",
    creative: "Yaratıcı Çalışmaları Gör",
    development: "Yazılım Projelerini Gör",
    cv: "CV’mi İndir",
    contact: "Birlikte Çalışalım",
  },
};

const Home = () => {
  const { locale } = useRouter();
  const lang = locale === "tr" ? "tr" : "en";
  const content = copy[lang];
  const cv = lang === "tr" ? "/cv/Nima-Bagheri-CV-TR.pdf" : "/cv/Nima-Bagheri-CV-EN.pdf";

  return (
    <>
      <Seo page="home" />
      <section className="relative flex min-h-screen w-full max-w-full items-center overflow-hidden bg-primary/25 px-4 pb-28 pt-32 sm:px-8 xl:pb-16 xl:pt-28">
        <div className="container relative z-10 mx-auto grid w-full min-w-0 max-w-full items-center gap-10 xl:grid-cols-[1.08fr_.92fr] xl:pr-24">
          <motion.div
            initial={{ opacity: 1, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="w-full min-w-0 max-w-full text-center xl:text-left"
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-accent">Portfolio · 2026</p>
            <h1 className="mb-4 break-words text-4xl font-bold leading-tight sm:text-6xl xl:text-7xl">Nima Bagheri</h1>
            <h2 className="mx-auto mb-6 w-full max-w-3xl break-words text-xl font-semibold leading-relaxed text-white/90 sm:text-2xl xl:mx-0 xl:text-3xl">
              {content.role}
            </h2>
            <p className="mx-auto mb-8 w-full max-w-2xl break-words text-base text-white/70 sm:text-lg xl:mx-0">{content.intro}</p>
            <div className="mx-auto flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center xl:mx-0 xl:justify-start">
              <Link href="/creative-work" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-600 px-5 py-3 text-center text-sm font-semibold shadow-lg shadow-purple-950/30 transition hover:-translate-y-0.5 sm:w-auto">
                {content.creative}<HiArrowRight aria-hidden="true" />
              </Link>
              <Link href="/work" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-center text-sm font-semibold transition hover:border-accent hover:bg-accent/10 sm:w-auto">
                {content.development}<HiArrowRight aria-hidden="true" />
              </Link>
              <a href={cv} download className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3 text-center text-sm font-semibold transition hover:border-accent hover:bg-accent/10 sm:w-auto">
                {content.cv}<HiArrowDownTray aria-hidden="true" />
              </a>
              <Link href="/contact" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-accent/70 bg-accent/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-accent/20 sm:w-auto">
                {content.contact}<HiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto hidden aspect-square w-full max-w-[560px] xl:block"
          >
            <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-purple-500/35 via-fuchsia-500/10 to-transparent blur-3xl" />
            <Image src="/avatar.png" fill priority sizes="(min-width: 1280px) 44vw, 1px" alt={lang === "tr" ? "Nima Bagheri portre görseli" : "Portrait of Nima Bagheri"} className="object-contain object-bottom drop-shadow-2xl" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}

export default Home;
