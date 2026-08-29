import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
  HiSparkles,
  HiDocumentText,
} from "react-icons/hi2";
import Link from "next/link";
import { useRouter } from "next/router";
import { NAV_ITEMS } from "../lib/content";

const icons = {
  home: <HiHome />,
  about: <HiUser />,
  services: <HiRectangleGroup />,
  creative: <HiSparkles />,
  development: <HiViewColumns />,
  resume: <HiDocumentText />,
  testimonials: <HiChatBubbleBottomCenterText />,
  contact: <HiEnvelope />,
};

const Nav = () => {
  const router = useRouter();
  const locale = router.locale === "tr" ? "tr" : "en";

  return (
    <nav
      aria-label={locale === "tr" ? "Ana navigasyon" : "Primary navigation"}
      className="fixed inset-x-0 bottom-0 z-50 xl:inset-y-0 xl:left-auto xl:right-[1.5%] xl:flex xl:w-20 xl:items-center"
    >
      <div className="mobile-nav-scroll flex h-[78px] w-full items-stretch gap-1 overflow-x-auto border-t border-white/10 bg-[#131424]/95 px-2 py-2 backdrop-blur-md xl:h-auto xl:flex-col xl:items-stretch xl:gap-2 xl:overflow-visible xl:rounded-2xl xl:border xl:px-2 xl:py-3">
        {NAV_ITEMS.map((item) => {
          const active = router.pathname === item.path;
          const label = item.labels[locale];
          return (
            <Link
              href={item.path}
              key={item.key}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={`group relative flex min-w-[76px] flex-col items-center justify-center gap-1 rounded-lg px-2 py-1 text-[10px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent xl:min-w-0 xl:px-2 xl:py-2 xl:text-xl ${active ? "bg-accent/20 text-accent" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
            >
              <span aria-hidden="true" className="text-lg xl:text-xl">{icons[item.key]}</span>
              <span className="whitespace-nowrap xl:sr-only">{label}</span>
              <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded bg-white px-3 py-2 text-xs font-semibold text-secondary opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 xl:block">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Nav;
