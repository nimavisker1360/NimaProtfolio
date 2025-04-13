// work slider data
export const workSlider = {
  slides: [
    {
      category: "frontend",
      images: [
        {
          title: "ai-artshowcase",
          path: "/resume/banner01.jpg",
          source: "https://ai-artshowcase.vercel.app/",
        },
        {
          title: "Portfolio-template",
          path: "/resume/banner02.jpg",
          source: "https://visker-portfolio.vercel.app/",
        },
        {
          title: "Ayvision Films-website",
          path: "/resume/banner03.jpg",
          source: "https://ayvisionfilms.com/",
        },
 
      ],
    },
    {
      category: "frontend",
      images: [
        {
          title: "Alex-Finley",
          path: "/Alex-Finley.jpg",
          source: "https://alex-finaly.vercel.app/",
        },
        {
          title: "damien-tsarantos",
          path: "/damien-tsarantos.jpg",
          source: "https://damien-tsarantos-rho.vercel.app/",
        },
        {
          title: "Nexus",
          path: "/Nexus.jpg",
          source: "https://nexus-seven-beta.vercel.app/",
        },
        {
          title: "alejandro",
          path: "/alejandro.jpg",
          source: "https://responsive-portfolio-website-template.vercel.app/",
        },
        {
          title: "NICO-Palmer",
          path: "/project-3.jpg",
          source:
            "https://nico-palmar-6qeqrwx0d-nimas-projects-40d42c5f.vercel.app/",
        },
        {
          title: "NICO-Palmer",
          path: "/project-3.jpg",
          source:
            "https://nico-palmar-6qeqrwx0d-nimas-projects-40d42c5f.vercel.app/",
        },
        {
          title: "NICO-Palmer",
          path: "/project-3.jpg",
          source:
            "https://nico-palmar-6qeqrwx0d-nimas-projects-40d42c5f.vercel.app/",
        },
      ],
    },
    // Add a new slide here
    {
      category: "backend",
      images: [
        {
          title: "Property-pulse",
          path: "/Property-pulse.png",
          source: "https://property-pulse-hazel.vercel.app/",
        },
        {
          title: "Care pulse",
          path: "/care.jpg",
          source:
            "https://care-pulse-hxyt91keg-nimas-projects-40d42c5f.vercel.app/",
        },
        {
          title: "Cryp-Go Website",
          path: "/resume/banner04.jpg",
          source: "https://forex-signal-wine.vercel.app/",
        },
      ],
    },
  ],
};

// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import { useState } from "react";

// icons
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
// next image
import Image from "next/image";

const WorkSlider = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  // Filter slides based on active category
  const categorySlides = workSlider.slides.filter(
    (slide) => slide.category === activeCategory
  );

  // Get all images from all slides of the active category
  const allImages = categorySlides.reduce((acc, slide) => {
    return [...acc, ...slide.images];
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(allImages.length / itemsPerPage);

  // Get current page images
  const currentImages = allImages.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Functions to handle pagination
  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex justify-center mb-8">
        <div
          className="flex space-x-4 bg-[#1F1F3A] rounded-full p-1"
          style={{ zIndex: 10 }}
        >
          <button
            className={`py-2 px-6 rounded-full transition-all ${
              activeCategory === "frontend"
                ? "bg-gradient-to-r from-[#4a22bd] to-[#e838cc] text-white"
                : "text-white/50 hover:text-white"
            }`}
            onClick={() => {
              console.log("Switching to frontend");
              setActiveCategory("frontend");
              setCurrentPage(0); // Reset to first page when switching category
            }}
          >
            Frontend
          </button>
          <button
            className={`py-2 px-6 rounded-full transition-all ${
              activeCategory === "backend"
                ? "bg-gradient-to-r from-[#4a22bd] to-[#e838cc] text-white"
                : "text-white/50 hover:text-white"
            }`}
            onClick={() => {
              console.log("Switching to backend");
              setActiveCategory("backend");
              setCurrentPage(0); // Reset to first page when switching category
            }}
          >
            Backend
          </button>
        </div>
      </div>

      {/* Grid layout with max 4 items */}
      <div className="grid grid-cols-2 grid-rows-2 gap-4 cursor-pointer h-[280px] sm:h-[480px]">
        {currentImages.map((image, index) => {
          return (
            <div
              className="relative rounded-lg overflow-hidden flex items-center justify-center group"
              onClick={() => window.open(image.source, "_blank")}
              key={index}
            >
              <div className="flex items-center justify-center relative overflow-hidden group">
                {/* image */}
                <Image src={image.path} width={500} height={300} alt="" />
                {/* overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#e838cc] to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700"></div>
                {/* title */}
                <div className="absolute bottom-0 translate-y-full group-hover:-translate-y-10 group-hover:xl:-translate-y-20 transition-all duration-300">
                  <div className="flex items-center gap-x-2 text-[13px] tracking-[0.2em]">
                    {/* title part 1 */}
                    <div className="delay-100">{image.title}</div>
                    {/* title part 2 */}

                    {/* icon */}
                    <div className="text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-200">
                      <BsArrowRight />
                    </div>

                    <div className="text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div
          className="flex justify-center items-center mt-6 space-x-4"
          style={{ position: "relative", zIndex: 20 }}
        >
          <button
            onClick={goToPrevPage}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1F1F3A] text-white hover:bg-gradient-to-r from-[#4a22bd] to-[#e838cc]"
          >
            <BsArrowLeft />
          </button>
          <div className="text-white font-medium">
            Page {currentPage + 1} of {totalPages}
          </div>
          <button
            onClick={goToNextPage}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1F1F3A] text-white hover:bg-gradient-to-r from-[#4a22bd] to-[#e838cc]"
          >
            <BsArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkSlider;
