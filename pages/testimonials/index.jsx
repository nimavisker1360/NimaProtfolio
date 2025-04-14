// components
import TestimonialSlider from "../../components/TestimonialSlider";
import ParticlesContainer from "../../components/ParticlesContainer";
// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
// i18n
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Testimonials = () => {
  const { t, i18n } = useTranslation("common");

  const testimonialTranslations = {
    en: {
      title: "What clients",
      say: "say.",
    },
    tr: {
      title: "Müşteriler ne",
      say: "diyor.",
    },
  };

  const currentLang = i18n.language || "en";
  const content =
    testimonialTranslations[currentLang] || testimonialTranslations.en;

  return (
    <div className="h-full bg-primary/30 py-32 text-center">
      <div className="container mx-auto h-full flex flex-col justify-center">
        <ParticlesContainer />
        {/* language toggle - hidden on mobile, visible on md screens and up */}
        <div className="absolute top-8 right-8 z-10 hidden md:block">
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded ${
                i18n.language === "en"
                  ? "bg-accent text-white"
                  : "bg-gray-800 text-gray-400"
              }`}
              onClick={() => i18n.changeLanguage("en")}
            >
              EN
            </button>
            <span className="text-white/50 flex items-center">|</span>
            <button
              className={`px-3 py-1 rounded ${
                i18n.language === "tr"
                  ? "bg-accent text-white"
                  : "bg-gray-800 text-gray-400"
              }`}
              onClick={() => i18n.changeLanguage("tr")}
            >
              TR
            </button>
          </div>
        </div>
        {/* title */}
        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="h2 mb-8 xl:mb-0"
        >
          {content.title} <span className="text-accent">{content.say}</span>
        </motion.h2>
        {/* slider */}
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <TestimonialSlider />
        </motion.div>
      </div>
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

export default Testimonials;
