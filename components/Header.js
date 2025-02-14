import Image from "next/image";

import Link from "next/link";

import Socials from "../components/Socials";

const Header = () => {
  return (
    <header className="absolute z-30 lg:w-[1550px] w-full px-16 lg:items-center xl:px-0 xl:h-[90px] ">
      <div className="container mx-auto">
        <div
          className="flex flex-col lg:w-[1500px] lg:flex-row justify-between items-center gap-y-6
        py-8"
        >
          {/* logo */}

          <Link href={"/"}>
            <Image
              src={"/LOGO.png"}
              width={120}
              height={120}
              alt=""
              priority={true}
            />
          </Link>
          {/* socials */}
          <Socials />
        </div>
      </div>
    </header>
  );
};

export default Header;
