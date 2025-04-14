// testimonial slider data
const testimonialData = {
  en: [
    {
      image: "/t-avt-1.png",
      name: "Anne Smith",
      position: "Customer",
      message:
        "Outstanding developer! Delivered my project on time with exceptional quality. The UI/UX design was beyond expectations",
    },
    {
      image: "/t-avt-2.png",
      name: "Jane Doe",
      position: "Customer",
      message:
        "Very professional and knowledgeable. Developed a seamless web application that boosted my business significantly.",
    },
    {
      image: "/t-avt-3.png",
      name: "Morteza Dezpholi",
      position: "Customer",
      message:
        "Highly recommend! A talented full-stack developer with great problem-solving skills and attention to detail.",
    },
  ],
  tr: [
    {
      image: "/t-avt-1.png",
      name: "Anne Smith",
      position: "Müşteri",
      message:
        "Olağanüstü geliştirici! Projemi zamanında ve istisnai kalitede teslim etti. UI/UX tasarımı beklentilerin ötesindeydi.",
    },
    {
      image: "/t-avt-2.png",
      name: "Jane Doe",
      position: "Müşteri",
      message:
        "Çok profesyonel ve bilgili. İşimi önemli ölçüde artıran sorunsuz bir web uygulaması geliştirdi.",
    },
    {
      image: "/t-avt-3.png",
      name: "Morteza Dezpholi",
      position: "Müşteri",
      message:
        "Kesinlikle tavsiye ederim! Harika problem çözme becerileri ve detaylara dikkat eden yetenekli bir full-stack geliştirici.",
    },
  ],
};

// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper";
import { useTranslation } from "next-i18next";

// icons
import { FaQuoteLeft } from "react-icons/fa";
// next image
import Image from "next/image";

const TestimonialSlider = () => {
  const { i18n } = useTranslation("common");
  const currentLang = i18n.language || "en";
  const testimonialSlider = testimonialData[currentLang] || testimonialData.en;

  return (
    <Swiper
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className="h-[400px]"
    >
      {testimonialSlider.map((person, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center md:flex-row gap-x-8 h-full px-16">
              {/* avatar, name, position */}
              <div className="w-full max-w-[300px] flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0">
                <div className="flex flex-col justify-center text-center">
                  {/* avatar */}
                  <div className="mb-2 mx-auto">
                    <Image src={person.image} width={100} height={100} alt="" />
                  </div>
                  {/* name */}
                  <div className="text-lg">{person.name}</div>
                  {/* position */}
                  <div className="text-[12px] uppercase font-extralight tracking-widest">
                    {person.position}
                  </div>
                </div>
              </div>
              {/* quote & message */}
              <div className="flex-1 flex flex-col justify-center before:w-[1px] xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-[200px] relative xl:pl-20">
                {/* quote icon */}
                <div className="mb-4">
                  <FaQuoteLeft className="text-4xl xl:text-6xl text-white/20 mx-auto md:mx-0" />
                </div>
                {/* message */}
                <div className="xl:text-lg text-center md:text-left">
                  {person.message}
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TestimonialSlider;
