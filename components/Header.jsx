import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Socials from "./Socials";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const currentLocale = router.locale;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (locale) => {
    router.push({ pathname, query }, asPath, { locale });
    setIsMenuOpen(false);
  };

  return (
    <header className="absolute z-30 w-full px-16 lg:items-center xl:px-0 xl:h-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8">
          {/* logo - hidden on mobile, visible on lg screens and up */}
          <div className="hidden lg:flex lg:w-1/3 justify-start">
            <Link href={"/"} className="mb-4 lg:mb-0">
              <Image
                src={"/LOGO.png"}
                width={120}
                height={120}
                alt=""
                priority={true}
              />
            </Link>
          </div>

          {/* socials - left aligned on mobile, center aligned on desktop */}
          <div className="w-full flex justify-start lg:w-1/3 lg:justify-center">
            <Socials />
          </div>

          {/* empty space for language toggle alignment */}
          <div className="lg:w-1/3 hidden lg:block"></div>
        </div>
      </div>

      {/* Mobile hamburger menu - only visible on mobile */}
      <div className="lg:hidden fixed top-6 right-6 z-50">
        <button
          onClick={toggleMenu}
          className="w-10 h-10 flex items-center justify-center bg-[#1F1F3A] rounded-full text-white"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Mobile menu content */}
      <div
        className={`lg:hidden fixed top-0 right-0 w-[200px] h-full bg-[#131424] z-40 transition-all duration-300 shadow-xl ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-start mt-20 p-6 gap-y-8">
          <h2 className="text-white/80 text-xl mb-4">Language</h2>
          <div className="flex flex-col space-y-4 w-full">
            <button
              className={`px-6 py-3 rounded w-full text-center ${
                currentLocale === "en"
                  ? "bg-gradient-to-r from-[#4a22bd] to-[#e838cc] text-white"
                  : "bg-[#1F1F3A] text-white/70 hover:text-white"
              }`}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
            <button
              className={`px-6 py-3 rounded w-full text-center ${
                currentLocale === "tr"
                  ? "bg-gradient-to-r from-[#4a22bd] to-[#e838cc] text-white"
                  : "bg-[#1F1F3A] text-white/70 hover:text-white"
              }`}
              onClick={() => changeLanguage("tr")}
            >
              TR
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
