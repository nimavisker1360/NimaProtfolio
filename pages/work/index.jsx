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
      ? "text-[36px] lg:text-[46px] font-primary xl:mt-12 mb-8"
      : "h2 xl:mt-12 mb-4";

  return (
    <div className="h-full bg-primary/30 py-36 flex items-center">
      <Circles />
      <ParticlesContainer />
      <div className="container mx-auto text-sm">
        <div className="flex flex-col xl:flex-row gap-x-8">
          {/* language toggle */}
          <div className="absolute top-8 right-8 z-10">
            <div className="flex space-x-2">
      
            </div>
          </div>

          {/* text */}
          <div className="text-left pt-[120px] flex xl:w-[30vw] xl:pt-0 flex-col lg:text-left mb-4">
            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className={titleClassName}
            >
              {content.title} <span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 max-w-[400px] mx-auto lg:mx-0"
            >
              • {content.point1}
              <br />• {content.point2}
              <br />• {content.point3}
            </motion.p>
          </div>

          {/* slider */}
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:max-w-[65%]"
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
