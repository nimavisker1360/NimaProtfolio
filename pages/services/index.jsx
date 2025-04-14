// components
import React from "react";
import ServiceSlider from "../../components/ServiceSlider";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import ParticlesContainer from "../../components/ParticlesContainer";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Services = () => {
  const { t, i18n } = useTranslation("common");

  const servicesTranslations = {
    en: {
      title: "My services",
      services: "Frontend\nBackend\nUI/UX Design\nDatabases",
    },
    tr: {
      title: "Hizmetlerim",
      services: "Frontend\nBackend\nUI/UX Tasarımı\nVeritabanları",
    },
  };

  const currentLang = i18n.language || "en";
  const content = servicesTranslations[currentLang] || servicesTranslations.en;

  return (
    <div className="h-full bg-primary/30 py-36 flex items-center">
      <ParticlesContainer />

      <Circles />

      <div className="container mx-auto">
        {/* language toggle */}
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

        <div className="flex flex-col xl:flex-row gap-x-8 ">
          {/* text */}
          <div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0 font-bold ">
            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-8"
            >
              {content.title} <span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 max-w-[400px] mx-auto lg:mx-1"
            >
              {content.services.split("\n").map((service, index) => (
                <React.Fragment key={index}>
                  {service}
                  <br />
                </React.Fragment>
              ))}
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
            <ServiceSlider />
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

export default Services;
