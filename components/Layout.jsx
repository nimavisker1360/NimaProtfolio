import { Sora } from "next/font/google";

//font setting

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",

  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

import Nav from "./Nav";
import Header from "./Header";
import TopLeftImg from "./TopLeftImg";
import LanguageToggle from "./LanguageToggle";
import VisualBackground from "./VisualBackground";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <div className={`${sora.variable} min-h-screen bg-[#0d0e1a] font-sora text-white`}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
    >
      <VisualBackground />
      <TopLeftImg />
      <LanguageToggle />
      <Nav />
      <Header />
      <main id="main-content" className="relative z-[2]">{children}</main>
    </div>
  );
};

export default Layout;
