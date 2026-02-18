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
          title: "Senior Full Stack Developer - HB Real State",
          stage: "2025 - 2026",
        },
        {
          title: "Frontend Developer - Freelance & Agency Projects",
          stage: "2024 - 2025",
        },
        {
          title: "Web Developer - Remote Client Projects",
          stage: "2023 - 2024",
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
          title: "Kıdemli Full Stack Geliştirici - HB Real State",
          stage: "2025 - 2026",
        },
        {
          title: "Frontend Geliştirici - Freelance ve Ajans Projeleri",
          stage: "2024 - 2025",
        },
        {
          title: "Web Geliştirici - Uzaktan Müşteri Projeleri",
          stage: "2023 - 2024",
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
    en: [
      "I started my journey as a freelance developer over 6 years ago, and since then I have worked with startups, agencies, and independent clients across different industries.",
      "My focus is building fast, scalable, and user-friendly digital products from idea to launch. I work across frontend and backend, and I care deeply about clean architecture, performance, and maintainable code.",
      "Beyond shipping features, I help teams make better product decisions by connecting business goals with practical technical solutions. I value communication, ownership, and delivering reliable results on time.",
    ],
    tr: [
      "6 yildan fazla once freelance gelistirici olarak calismaya basladim ve o gunden beri startup, ajans ve bireysel musterilerle farkli sektorlerde projeler gelistirdim.",
      "Odak noktam, fikir asamasindan yayina kadar hizli, olceklenebilir ve kullanici dostu dijital urunler olusturmaktir. Frontend ve backend tarafinda calisirken temiz mimari, performans ve surdurulebilir kod kalitesine oncelik veririm.",
      "Sadece ozellik gelistirmekle kalmam, is hedeflerini dogru teknik cozumlerle birlestirerek ekiplerin daha iyi urun kararleri almasina da destek olurum. Iletisim, sorumluluk ve zamaninda kaliteli teslim benim icin temel prensiplerdir.",
    ],
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
        className="container mx-auto h-full flex flex-col items-center xl:items-start xl:flex-row gap-y-10 xl:gap-x-12"
      >
        {/* text */}
        <div className="flex-1 xl:basis-[56%] flex flex-col justify-center xl:pr-4">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 max-w-[640px] mx-auto xl:mx-0"
          >
            {headingText[currentLanguage]}
          </motion.h2>
          <motion.div
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-[640px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0 text-justify space-y-5"
          >
            {descriptionText[currentLanguage].map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>{paragraph}</p>
            ))}
          </motion.div>
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
          className="flex flex-col w-full xl:basis-[44%] xl:max-w-[44%] min-h-[420px]"
        >
          <div className="flex w-full gap-x-4 xl:gap-x-8 mb-6 justify-center xl:justify-start">
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
            className="py-2 xl:py-4 flex flex-col gap-y-3 xl:gap-y-4 items-start"
          >
            {aboutData[currentLanguage][index].info.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className="w-full flex flex-col md:flex-row md:text-[16px] gap-x-2 items-start md:items-center text-white/70"
                >
                  {/* title */}
                  <div className="font-light mb-1 md:mb-0">{item.title}</div>
                  {item.stage ? <div className="hidden md:flex mb-1">,</div> : null}
                  {item.stage ? <div className="text-accent">{item.stage}</div> : null}
                  <div className="flex gap-x-4 mt-1 md:mt-0">
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

