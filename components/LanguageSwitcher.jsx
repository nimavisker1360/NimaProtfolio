import { useRouter } from "next/router";
import Link from "next/link";

const LanguageSwitcher = () => {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  return (
    <div className="flex items-center space-x-2">
      <Link
        href={{ pathname, query }}
        as={asPath}
        locale="en"
        className={`text-sm ${
          locale === "en"
            ? "font-bold text-accent"
            : "text-white/70 hover:text-white"
        }`}
      >
        EN
      </Link>
      <span className="text-white/50">|</span>
      <Link
        href={{ pathname, query }}
        as={asPath}
        locale="tr"
        className={`text-sm ${
          locale === "tr"
            ? "font-bold text-accent"
            : "text-white/70 hover:text-white"
        }`}
      >
        TR
      </Link>
    </div>
  );
};

export default LanguageSwitcher;
