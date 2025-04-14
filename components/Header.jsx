import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Socials from "./Socials";

const Header = () => {
  return (
    <header className="absolute z-30 w-full px-16 lg:items-center xl:px-0 xl:h-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8">
          {/* logo */}
          <div className="lg:w-1/3 flex justify-start">
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

          {/* socials */}
          <div className="lg:w-1/3 flex justify-center">
            <Socials />
          </div>

          {/* empty space for language toggle alignment */}
          <div className="lg:w-1/3 hidden lg:block"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
