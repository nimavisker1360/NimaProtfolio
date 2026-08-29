// links
import Link from "next/link";

// icons
import {
  RiLinkedinBoxFill,
  RiDribbbleLine,
  RiGithubFill,
} from "react-icons/ri";
import { SOCIAL_LINKS } from "../lib/content";

const icons = {
  linkedin: <RiLinkedinBoxFill />,
  dribbble: <RiDribbbleLine />,
  github: <RiGithubFill />,
};

const Socials = () => {
  return (
    <div className="flex flex-row items-center gap-4 text-xl">
      {SOCIAL_LINKS.map((social) => (
        <Link
          key={social.key}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="rounded p-1 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent transition-all duration-300"
        >
          {icons[social.key]}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
