import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { useTranslation } from "next-i18next";

const ProjectsBtn = () => {
  const { t } = useTranslation("common");

  return (
    <div className="mx-auto xl:mx-0">
      <Link
        href={"/work"}
        className="relative w-[185px] h-[185px] flex justify-center items-center
        bg-circleStar bg-cover bg-center bg-no-repeat group"
        title={t("projectsButton")}
      >
        <Image
          src={"/rounded-text.png"}
          width={141}
          height={148}
          alt={t("projectsButton")}
          className="animate-spin-slow w-full h-full max-w-[140px] max-h-[148px] z-[6]"
        />
        <HiArrowRight className="absolute text-4xl group-hover:translate-x-2 transition-all duration-300 z-[6]" />
      </Link>
    </div>
  );
};

export default ProjectsBtn;
