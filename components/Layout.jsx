import { Sora } from "@next/font/google";

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

const Layout = ({ children }) => {
  return (
    <div
      className={`page bg-site text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}
    >
      <TopLeftImg />
      <LanguageToggle />
      <Nav />
      <Header />
      {children}
    </div>
  );
};

export default Layout;
