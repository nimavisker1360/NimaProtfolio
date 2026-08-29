import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import Socials from "./Socials";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { NAV_ITEMS } from "../lib/content";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const currentLocale = router.locale;

  const toggleMenu = () => setIsMenuOpen((value) => !value);

  const changeLanguage = (locale) => {
    router.push({ pathname, query }, asPath, { locale });
    setIsMenuOpen(false);
  };

  return (
    <header className="absolute z-30 w-full px-4 sm:px-8 lg:items-center xl:px-0 xl:h-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8">
          {/* logo - hidden on mobile, visible on lg screens and up */}
          <div className="hidden lg:flex lg:w-1/3 justify-start">
            <Link href={"/"} className="mb-4 lg:mb-0">
              <Image
                src={"/LOGO.png"}
                width={120}
                height={120}
                alt="Nima Bagheri portfolio"
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
          className="w-11 h-11 flex items-center justify-center bg-[#1F1F3A] rounded-full text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile menu content */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-0 right-0 w-[min(82vw,320px)] h-full bg-[#131424] z-40 transition-all duration-300 shadow-xl ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-stretch justify-start mt-20 p-6 gap-y-6">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-lg px-4 py-2 text-sm ${pathname === item.path ? "bg-accent text-white" : "text-white/80 hover:bg-white/10"}`}
              >
                {item.labels[currentLocale === "tr" ? "tr" : "en"]}
              </Link>
            ))}
          </nav>
          <h2 className="text-white/80 text-base">{currentLocale === "tr" ? "Dil" : "Language"}</h2>
          <div className="flex flex-col space-y-4 w-full">
            <button
              className={`px-6 py-3 rounded w-full text-center ${
                currentLocale === "en"
                  ? "bg-gradient-to-r from-[#4a22bd] to-[#e838cc] text-white"
                  : "bg-[#1F1F3A] text-white/70 hover:text-white"
              }`}
              onClick={() => changeLanguage("en")}
            >
              English
            </button>
            <button
              className={`px-6 py-3 rounded w-full text-center ${
                currentLocale === "tr"
                  ? "bg-gradient-to-r from-[#4a22bd] to-[#e838cc] text-white"
                  : "bg-[#1F1F3A] text-white/70 hover:text-white"
              }`}
              onClick={() => changeLanguage("tr")}
            >
              Türkçe
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
