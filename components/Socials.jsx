// links
import Link from "next/link";

// icons
import {
  RiYoutubeLine,
  RiTelegramFill,
  RiLinkedinBoxFill,
  RiDribbbleLine,
  RiGithubFill,
} from "react-icons/ri";

const Socials = () => {
  return (
    <div className="flex flex-row items-center gap-4 text-xl">
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
