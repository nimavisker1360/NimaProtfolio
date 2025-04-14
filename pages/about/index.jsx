import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
// icons
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaWordpress,
  FaFigma,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiFramer,
  SiAdobexd,
  SiAdobephotoshop,
} from "react-icons/si";

//component
import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";

//counters
import CountUp from "react-countup";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

//  data
const aboutData = {
  en: [
    {
      title: "skills",
      info: [
        {
          title: "Web Development",
          icons: [
            <FaHtml5 key="html5" />,
            <FaCss3 key="css3" />,
            <FaJs key="js" />,
            <FaReact key="react" />,
            <SiNextdotjs key="nextjs" />,
            <SiFramer key="framer" />,
            <FaWordpress key="wordpress" />,
          ],
        },
        {
          title: "UI/UX Design",
          icons: [
            <FaFigma key="figma" />,
            <SiAdobexd key="adobexd" />,
            <SiAdobephotoshop key="adobephotoshop" />,
          ],
        },
      ],
    },

    {
      title: "experience",
      info: [
        {
          title: "UX/UI Designer, FullStack Developer - Mabna Company",
          stage: "2020 - 2023",
        },
        {
          title: "Web Developer - Zebra-studio Agency",
          stage: "2017 - 2020",
        },
        {
          title: "Intern - Saba Studio Corporation",
          stage: "2016 - 2017",
        },
      ],
    },
    {
      title: "credentials",
      info: [
        {
          title: "Web Development - Hoze University",
          stage: "2016",
        },
        {
          title: "Computer Science Diploma - IranAzad Technical Institute",
          stage: "2012",
        },
        {
          title: "Certified Graphic Designer - ABC Institute, Tehran, Iran",
          stage: "2010",
        },
      ],
    },
  ],
  tr: [
    {
      title: "yetenekler",
      info: [
        {
          title: "Web Geliştirme",
          icons: [
            <FaHtml5 key="html5" />,
            <FaCss3 key="css3" />,
            <FaJs key="js" />,
            <FaReact key="react" />,
            <SiNextdotjs key="nextjs" />,
            <SiFramer key="framer" />,
            <FaWordpress key="wordpress" />,
          ],
        },
        {
          title: "UI/UX Tasarımı",
          icons: [
            <FaFigma key="figma" />,
            <SiAdobexd key="adobexd" />,
            <SiAdobephotoshop key="adobephotoshop" />,
          ],
        },
      ],
    },

    {
      title: "deneyim",
      info: [
        {
          title: "UX/UI Tasarımcı, FullStack Geliştirici - Mabna Şirketi",
          stage: "2020 - 2023",
        },
        {
          title: "Web Geliştirici - Zebra-studio Ajansı",
          stage: "2017 - 2020",
        },
        {
          title: "Stajyer - Saba Studio Şirketi",
          stage: "2016 - 2017",
        },
      ],
    },
    {
      title: "eğitim",
      info: [
        {
          title: "Web Geliştirme - Hoze Üniversitesi",
          stage: "2016",
        },
        {
          title: "Bilgisayar Bilimi Diploması - IranAzad Teknik Enstitüsü",
          stage: "2012",
        },
        {
          title: "Sertifikalı Grafik Tasarımcı - ABC Enstitüsü, Tahran, İran",
          stage: "2010",
        },
      ],
    },
  ],
};

const About = () => {
  const [index, setIndex] = useState(0);
  const { t, i18n } = useTranslation("common");
  const currentLanguage = i18n.language
    ? i18n.language.startsWith("tr")
      ? "tr"
      : "en"
    : "en";

  // Description text based on language
  const descriptionText = {
    en: "6 years ago, I began freelancing as a developer. Since then, I've done remote work for agencies, consulted for startups, and collaborated on digital products for business and consumer use.",
    tr: "6 yıl önce, serbest geliştirici olarak çalışmaya başladım. O zamandan beri, ajanslar için uzaktan çalıştım, startuplar için danışmanlık yaptım ve işletmeler ve tüketiciler için dijital ürünlerde işbirliği yaptım.",
  };

  // Heading text based on language
  const headingText = {
    en: "Captivating stories birth magnificent designs.",
    tr: "Etkileyici hikayeler muhteşem tasarımlar doğurur.",
  };

  // Counter labels based on language
  const counterLabels = {
    en: {
      yearsExperience: "Years of experience",
      satisfiedClients: "Satisfied clients",
      finishedProjects: "Finished Projects",
    },
    tr: {
      yearsExperience: "Yıllık deneyim",
      satisfiedClients: "Memnun müşteriler",
      finishedProjects: "Tamamlanan projeler",
    },
  };

  return (
    <div className="h-full bg-primary/30 py-32 text-center xl:text-left">
      <Circles />
      {/* avatar img */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0 -left-[370px]"
      >
        <Avatar />
      </motion.div>

      <div
        className="container mx-auto h-full flex flex-col items-center xl:flex-row
      gap-x-6"
      >
        {/* text */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2"
          >
            {headingText[currentLanguage]}
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12
          px-2 xl:px-0"
          >
            {descriptionText[currentLanguage]}
          </motion.p>
          {/* counters */}
          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0
          mb-8"
          >
            <div className="flex flex-1 xl:gap-x-6">
              {/* experience */}
              <div
                className="relative flex-1 after:w-[1px]
              after:h-full after:bg-white/10 after:absolute after:top-0
              after:right-0"
              >
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={10} duration={5} />+
                </div>
                <div
                  className="text-xs uppercase tracking-[1px] leading-[1.4]
                max-w-[100px]"
                >
                  {counterLabels[currentLanguage].yearsExperience}
                </div>
              </div>
              {/* clients */}
              <div
                className="relative flex-1 after:w-[1px]
              after:h-full after:bg-white/10 after:absolute after:top-0
              after:right-0"
              >
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={50} duration={5} />+
                </div>
                <div
                  className="text-xs uppercase tracking-[1px] leading-[1.4]
                max-w-[100px]"
                >
                  {counterLabels[currentLanguage].satisfiedClients}
                </div>
              </div>
              {/* Projects */}
              <div className="relative flex-1 ">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={20} duration={5} />+
                </div>
                <div
                  className="text-xs uppercase tracking-[1px] leading-[1.4]
                max-w-[100px]"
                >
                  {counterLabels[currentLanguage].finishedProjects}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        {/* info */}
        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col w-full xl:max-w-[48%] h-[480px]"
        >
          <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4 ">
            {aboutData[currentLanguage].map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className={`${
                    index === itemIndex &&
                    "text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300"
                  } cursor-pointer capitalize xl:text-lg relative after:w-8 
                  after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0 z-[8]`}
                  onClick={() => setIndex(itemIndex)}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
          <div
            className=" py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center
          xl:items-start"
          >
            {aboutData[currentLanguage][index].info.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className="flex-1 flex flex-col md:flex-row md:text-[16px] 
                max-w-max gap-x-1 items-center text-white/60  "
                >
                  {/* title */}
                  <div className="font-light  mb-2 md:mb-0">{item.title}</div>
                  <div className="hidden md:flex mb-2">,</div>
                  <div className="text-accent">{item.stage}</div>
                  <div className="flex gap-x-4">
                    {/* icons */}
                    {item.icons ? (
                      <div className="flex gap-x-4">
                        {item.icons.map((icon, itemIndex) => {
                          return (
                            <div
                              key={itemIndex}
                              className="text-2xl text-white"
                            >
                              {icon}
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
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

export default About;
