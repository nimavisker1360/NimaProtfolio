import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { BsArrowRight } from "react-icons/bs";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import Circles from "../../components/Circles";
import ParticlesContainer from "../../components/ParticlesContainer";
// i18n
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Contact = () => {
  const form = useRef();
  const { t, i18n } = useTranslation("common");

  const contactTranslations = {
    en: {
      title: "Let's",
      connect: "connect.",
      name: "name",
      email: "email",
      subject: "subject",
      message: "message",
      button: "Let's talk",
    },
    tr: {
      title: "İletişime",
      connect: "geçelim.",
      name: "isim",
      email: "e-posta",
      subject: "konu",
      message: "mesaj",
      button: "Konuşalım",
    },
  };

  const currentLang = i18n.language || "en";
  const content = contactTranslations[currentLang] || contactTranslations.en;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_fgg4q89",
        "template_cqkwxlg",
        form.current,
        "Aew0_alQl4fz_0v1x"
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          alert("Message sent successfully!");
        },
        (error) => {
          console.log("Error:", error.text);
          alert("Failed to send message.");
        }
      );
  };

  return (
    <div className="h-full bg-primary/30">
      <div className="container mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full">
        <Circles />
        <ParticlesContainer />

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

        <div className="flex flex-col w-full max-w-[700px]  z-[50]">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-center mb-12"
          >
            {content.title}
            <span className="text-accent">{content.connect}</span>
          </motion.h2>
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex-1 flex flex-col gap-6 w-full mx-auto"
          >
            <div className="flex gap-x-6 w-full">
              <input
                type="text"
                name="name"
                placeholder={content.name}
                className="input"
                required
              />
              <input
                type="email"
                name="email"
                placeholder={content.email}
                className="input"
                required
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder={content.subject}
              className="input"
              required
            />
            <textarea
              name="message"
              placeholder={content.message}
              className="textarea"
              required
            ></textarea>
            <button
              type="submit"
              className="btn rounded-full border border-white max-w-[170px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group"
            >
              <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
                {content.button}
              </span>
              <BsArrowRight className="-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]" />
            </button>
          </motion.form>
        </div>
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

export default Contact;
