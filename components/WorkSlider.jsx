import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { DEVELOPMENT_PROJECTS } from "../lib/content";

const WorkSlider = () => {
  const { locale } = useRouter();
  const lang = locale === "tr" ? "tr" : "en";
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Frontend", "Full Stack"];
  const visible = filter === "All" ? DEVELOPMENT_PROJECTS : DEVELOPMENT_PROJECTS.filter((project) => project.category === filter);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label={lang === "tr" ? "Proje filtresi" : "Project filter"}>
        {categories.map((category) => (
          <button key={category} type="button" onClick={() => setFilter(category)} aria-pressed={filter === category} className={`rounded-full px-4 py-2 text-sm transition ${filter === category ? "bg-gradient-to-r from-purple-700 to-fuchsia-600 text-white" : "bg-white/5 text-white/65 hover:bg-white/10"}`}>
            {category === "All" ? (lang === "tr" ? "Tümü" : "All") : category}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <a key={project.url} href={project.url} target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-2xl border border-white/10 bg-[#191a31]/80 transition hover:-translate-y-1 hover:border-accent/50">
            <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
              <Image src={project.image} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw" alt={`${project.title} ${lang === "tr" ? "proje kapağı" : "project cover"}`} className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131424] via-transparent to-transparent" />
            </div>
            <div className="flex items-center justify-between gap-4 p-4">
              <div>
                <h2 className="font-semibold">{project.title}</h2>
                <p className="text-xs text-white/50">{project.category}</p>
              </div>
              <HiArrowTopRightOnSquare aria-hidden="true" className="text-xl text-accent" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default WorkSlider;
