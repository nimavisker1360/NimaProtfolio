// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// icons
import { RxReader, RxRocket, RxArrowTopRight } from "react-icons/rx";

import { MdOutlineDeveloperMode } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { AiOutlineAntDesign } from "react-icons/ai";

// import required modules
import { FreeMode, Pagination } from "swiper";
import { useTranslation } from "next-i18next";

// service data
const getServiceData = (language) => {
  if (language === "tr") {
    return [
      {
        icon: <MdOutlineDeveloperMode />,
        title: "Frontend:",
        description:
          "React.js, Next.js, HTML, CSS, Tailwind CSS, JavaScript, TypeScript",
      },
      {
        icon: <FaDatabase />,
        title: "Backend ve Veritabanları",
        description: "Node.js, Nest.js, MongoDB, AppWrite",
      },
      {
        icon: <AiOutlineAntDesign />,
        title: "UI/UX Tasarımı",
        description: "Figma, Duyarlı Tasarım",
      },
      {
        icon: <RxReader />,
        title: "Sürüm Kontrolü",
        description: "Git, GitHub, GitLab",
      },
      {
        icon: <RxRocket />,
        title: "Diğer",
        description: "API Geliştirme, Ödeme Geçidi Entegrasyonu",
      },
    ];
  } else {
    return [
      {
        icon: <MdOutlineDeveloperMode />,
        title: "Frontend:",
        description:
          "React.js, Next.js, HTML, CSS, Tailwind CSS, JavaScript, TypeScript",
      },
      {
        icon: <FaDatabase />,
        title: "Backend & Databases",
        description: "Node.js, Nest.js, MongoDB, AppWrite",
      },
      {
        icon: <AiOutlineAntDesign />,
        title: "UI/UX Design",
        description: "Figma, Responsive Design",
      },
      {
        icon: <RxReader />,
        title: "Version Control",
        description: "Git, GitHub, GitLab",
      },
      {
        icon: <RxRocket />,
        title: "Other",
        description: "API Development, Payment Gateway Integration",
      },
    ];
  }
};

const ServiceSlider = () => {
  const { i18n } = useTranslation("common");
  const serviceData = getServiceData(i18n.language);

  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },

        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      }}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className="h-[240px] sm:h-[340px] "
    >
      {serviceData.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="bg-[rgba(65,47,123,0.15)] h-max rounded-lg px-6 py-0 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300">
              {/* icon */}
              <div className="text-4xl text-accent mb-4">{item.icon}</div>
              {/* title & desc */}
              <div className="mb-8">
                <div className="mb-2 text-lg">{item.title}</div>
                <p className="max-w-[350px] leading-normal">
                  {item.description}
                </p>
              </div>
              {/* arrow */}
              <div className="text-3xl">
                <RxArrowTopRight className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300" />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ServiceSlider;
