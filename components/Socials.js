// links
import Link from "next/link";

// icons
import {
  RiYoutubeLine,
  RiTelegramFill,
  RiLinkedinBoxFill,
  RiDribbbleLine,
  RiBehanceLine,
  RiGithubFill,
} from "react-icons/ri";

const Socials = () => {
  return (
    <div className="relative flex flex-row xl:max-w-md xl:right-[8%]  bottom-0 mt-auto   items-center justify-center  gap-x-5 text-[1.2rem] w-full">
      <Link href={""} className="hover:text-accent transition-all duration-300">
        <RiYoutubeLine />
      </Link>
      <Link
        href={"https://www.linkedin.com/in/nima-bagheri-0805541a8/"}
        className="hover:text-accent transition-all duration-300"
      >
        <RiLinkedinBoxFill />
      </Link>
      <Link
        href={"https://t.me/suportVpnCentral"}
        className="hover:text-accent transition-all duration-300"
      >
        <RiTelegramFill />
      </Link>
      <Link
        href={"https://dribbble.com/nimabt/shots"}
        className="hover:text-accent transition-all duration-300"
      >
        <RiDribbbleLine />
      </Link>
   
      <Link
        href={"https://github.com/nimavisker1360"}
        className="hover:text-accent transition-all duration-300"
      >
        <RiGithubFill />
      </Link>
    </div>
  );
};

export default Socials;
