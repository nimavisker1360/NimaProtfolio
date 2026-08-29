import { useRouter } from "next/router";

const LanguageToggle = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const currentLocale = router.locale;

  const changeLanguage = (locale) => {
    router.push({ pathname, query }, asPath, { locale });
  };

  return (
    <div className="absolute top-8 right-8 z-[100] hidden lg:block" aria-label="Language selection">
      <div className="flex space-x-2">
        <button
          className={`px-3 py-1 rounded ${
            currentLocale === "en"
              ? "bg-accent text-white"
              : "bg-gray-800 text-gray-400"
          }`}
          onClick={() => changeLanguage("en")}
          aria-label="Switch language to English"
          aria-pressed={currentLocale === "en"}
        >
          EN
        </button>
        <span className="text-white/50 flex items-center">|</span>
        <button
          className={`px-3 py-1 rounded ${
            currentLocale === "tr"
              ? "bg-accent text-white"
              : "bg-gray-800 text-gray-400"
          }`}
          onClick={() => changeLanguage("tr")}
          aria-label="Dili Türkçe olarak değiştir"
          aria-pressed={currentLocale === "tr"}
        >
          TR
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;
