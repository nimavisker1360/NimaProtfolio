// components
import WorkSlider from "../../components/WorkSlider";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import ParticlesContainer from "../../components/ParticlesContainer";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Work = () => {
  const { t, i18n } = useTranslation("common");

  const workTranslations = {
    en: {
      title: "My work",
      point1:
        "Implemented websites, and landing pages 𝐟𝐫𝐨𝐦 𝐜𝐨𝐧𝐜𝐞𝐩𝐭 𝐭𝐨 𝐝𝐞𝐩𝐥𝐨𝐲𝐦𝐞𝐧𝐭.",
      point2: "Assessed UX and UI designs for technical feasibility.",
      point3:
        "We have a talented pool of technical professionals experienced in the latest technology solutions, skilled and passionate for 𝐅𝐫𝐨𝐧𝐭-𝐞𝐧𝐝 , 𝐁𝐚𝐜𝐤𝐞𝐧𝐝",
    },
    tr: {
      title: "Çalışmalarım",
      point1:
        "Konseptten yayına kadar web siteleri ve açılış sayfaları uyguladım.",
      point2:
        "UX ve UI tasarımlarını teknik fizibilite açısından değerlendirdim.",
      point3:
        "En son teknoloji çözümlerinde deneyimli, 𝐅𝐫𝐨𝐧𝐭-𝐞𝐧𝐝 ve 𝐁𝐚𝐜𝐤𝐞𝐧𝐝 konularında yetenekli ve tutkulu teknik profesyonellerden oluşan yetenekli bir havuzumuz var.",
    },
  };

  const currentLang = i18n.language || "en";
  const content = workTranslations[currentLang] || workTranslations.en;

  // Define title class based on language
  const titleClassName =
    currentLang === "tr"
      ? "text-[28px] md:text-[32px] lg:text-[38px] font-primary mb-3"
      : "text-[28px] md:text-[32px] lg:text-[38px] font-primary mb-3";

  return (
    <div className="h-full bg-primary/30 pt-16 pb-10 flex items-center">
      <Circles />
      <ParticlesContainer />
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col xl:flex-row gap-y-6 gap-x-12 items-center">
          {/* text */}
          <div className="text-center xl:text-left pt-4 flex flex-col xl:w-[30vw] mb-4 xl:mb-0 xl:border-l-2 xl:border-accent/60 xl:pl-6">
            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className={titleClassName}
            >
              {content.title} <span className="text-accent">.</span>
            </motion.h2>
            <motion.div
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-3 max-w-[450px] mx-auto xl:mx-0 text-left text-sm md:text-base"
            >
              <p className="mb-2 pl-2 border-l-2 border-accent/60 ml-2 xl:border-l-0 xl:pl-0 xl:ml-0 xl:mb-4">
                {content.point1}
              </p>
              <p className="mb-2 pl-2 border-l-2 border-accent/60 ml-2 xl:border-l-0 xl:pl-0 xl:ml-0 xl:mb-4">
                {content.point2}
              </p>
              <p className="pl-2 border-l-2 border-accent/60 ml-2 xl:border-l-0 xl:pl-0 xl:ml-0">
                {content.point3}
              </p>
            </motion.div>
          </div>

          {/* slider */}
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:max-w-[62%] scale-95 origin-top px-1 xl:px-0"
          >
            <WorkSlider />
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Work;
