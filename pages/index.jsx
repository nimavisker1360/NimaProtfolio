import Image from "next/image";
import StarsCanvas from "../components/sub/StartComponent";
import ParticleContainer from "../components/ParticlesContainer";
import projectsBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";
import { motion } from "framer-motion";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { fadeIn } from "../variants";
import ProjectsBtn from "../components/ProjectsBtn";

const Home = () => {
  const { t, i18n } = useTranslation("common");
  const currentLanguage = i18n.language;

  return (
    <div className="bg-primary/60 h-full">
      {/* text */}
      <div
        className="w-full h-full bg-gradient-to-r from-primary/10
      via-black/30 to-black/10"
      >
        <div className="text-center flex flex-col xl:ml-[12rem] justify-center xl:pt-40 xl:text-left h-full container mx-auto">
          {/* title */}
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1"
          >
            {currentLanguage === "tr"
              ? "Fikirleri Dönüştürmek"
              : "Transforming Ideas"}{" "}
            <br />
            {currentLanguage === "tr" ? (
              <span className="text-red-500">Dijital Gerçekliğe</span>
            ) : (
              <>
                Into <span className="text-red-500">Digital Reality</span>
              </>
            )}
          </motion.h1>
          {/* subtitle */}
          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
          >
            {t("developer")}
          </motion.p>
          {/* btn */}
          <div className="flex justify-center xl:hidden relative">
            <ProjectsBtn />
          </div>
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden xl:flex"
          >
            <ProjectsBtn />
          </motion.div>
        </div>
      </div>
      {/* image */}
      <div className="w-[1200px] h-[800px] absolute right-0 bottom-0">
        {/* bg image */}
        <div
          className="bg-none xl:bg-native xl:bg-cover xl:bg-right xl:bg-no-repeat opacity-50 
        w-full h-full absolute mix-blend-color-dodge translate-z-0"
        ></div>
        {/* particles */}
        <ParticleContainer />
        {/* avatar */}
        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full h-full max-w-[737px] max-h-[678px] absolute -bottom-32 lg:bottom-0 lg:right-[8%]"
        >
          <Avatar />
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

export default Home;
