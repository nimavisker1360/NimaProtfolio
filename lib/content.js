export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mavisker.com";

export const WHATSAPP_CONTACT = {
  label: "WhatsApp · 0552 607 8900",
  href: "https://wa.me/905526078900",
};

export const SOCIAL_LINKS = [
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nima-bagheri-0805541a8/",
  },
  {
    key: "dribbble",
    label: "Dribbble",
    href: "https://dribbble.com/nimabt/shots",
  },
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/nimavisker1360",
  },
];

export const SOCIAL_MEDIA_SHOWCASE = [
  {
    handle: "@hb_gayrimenkul_international",
    label: "HB Gayrimenkul International",
    href: "https://www.instagram.com/hb_gayrimenkul_international/",
  },
  {
    handle: "@nigo.avenue",
    label: "Nigo Avenue",
    href: "https://www.instagram.com/nigo.avenue/",
  },
];

export const NAV_ITEMS = [
  { key: "home", path: "/", labels: { en: "Home", tr: "Ana Sayfa" } },
  { key: "about", path: "/about", labels: { en: "About", tr: "Hakkımda" } },
  { key: "services", path: "/services", labels: { en: "Services", tr: "Hizmetler" } },
  { key: "creative", path: "/creative-work", labels: { en: "Creative Work", tr: "Yaratıcı Çalışmalar" } },
  { key: "development", path: "/work", labels: { en: "Development", tr: "Yazılım Projeleri" } },
  { key: "resume", path: "/resume", labels: { en: "Resume", tr: "Özgeçmiş" } },
  { key: "testimonials", path: "/testimonials", labels: { en: "Testimonials", tr: "Referanslar" } },
  { key: "contact", path: "/contact", labels: { en: "Contact", tr: "İletişim" } },
];

export const PORTFOLIO_CATEGORIES = [
  { value: "ai-videos", en: "AI Videos", tr: "Yapay Zekâ Videoları" },
  { value: "video-editing", en: "Video Editing", tr: "Video Kurgu" },
  { value: "motion-graphics", en: "Motion Graphics", tr: "Hareketli Grafikler" },
  { value: "graphic-design", en: "Graphic Design", tr: "Grafik Tasarım" },
  { value: "real-estate", en: "Real Estate", tr: "Gayrimenkul" },
  { value: "fashion-product", en: "Fashion & Product", tr: "Moda ve Ürün" },
  { value: "social-media", en: "Social Media", tr: "Sosyal Medya" },
  { value: "web-development", en: "Web Development", tr: "Web Geliştirme" },
];

export const PAGE_META = {
  home: {
    en: {
      title: "Nima Bagheri | Full-Stack Developer & AI Content Creator",
      description: "Full-stack development, AI-assisted video production and graphic design for modern digital products and brand campaigns.",
    },
    tr: {
      title: "Nima Bagheri | Full-Stack Geliştirici ve Yapay Zekâ İçerik Üreticisi",
      description: "Modern dijital ürünler ve marka kampanyaları için full-stack geliştirme, yapay zekâ destekli video üretimi ve grafik tasarım.",
    },
  },
  about: {
    en: { title: "About | Nima Bagheri", description: "A multidisciplinary workflow combining software engineering, visual design and generative AI." },
    tr: { title: "Hakkımda | Nima Bagheri", description: "Yazılım geliştirme, görsel tasarım ve üretken yapay zekâyı birleştiren çok yönlü çalışma süreci." },
  },
  services: {
    en: { title: "Services | Nima Bagheri", description: "AI video, video editing, motion graphics, graphic design, web development and UI/UX services." },
    tr: { title: "Hizmetler | Nima Bagheri", description: "Yapay zekâ video, video kurgu, hareketli grafikler, grafik tasarım, web geliştirme ve UI/UX hizmetleri." },
  },
  creative: {
    en: { title: "Creative AI & Media Portfolio | Nima Bagheri", description: "Selected AI-assisted video, editing, motion graphics, social media and graphic design work." },
    tr: { title: "Yaratıcı Yapay Zekâ ve Medya Portfolyosu | Nima Bagheri", description: "Yapay zekâ destekli video, kurgu, hareketli grafikler, sosyal medya ve grafik tasarım çalışmalarından seçmeler." },
  },
  development: {
    en: { title: "Development Projects | Nima Bagheri", description: "Selected web and software development projects built with modern frontend and backend technologies." },
    tr: { title: "Yazılım Projeleri | Nima Bagheri", description: "Modern frontend ve backend teknolojileriyle geliştirilen seçili web ve yazılım projeleri." },
  },
  resume: {
    en: { title: "Resume | Nima Bagheri", description: "Professional resume covering creative production, full-stack development, design and selected projects." },
    tr: { title: "Özgeçmiş | Nima Bagheri", description: "Yaratıcı içerik üretimi, full-stack geliştirme, tasarım ve seçili projeleri kapsayan profesyonel özgeçmiş." },
  },
  testimonials: {
    en: { title: "Testimonials | Nima Bagheri", description: "Verified professional references and client feedback." },
    tr: { title: "Referanslar | Nima Bagheri", description: "Doğrulanmış profesyonel referanslar ve müşteri geri bildirimleri." },
  },
  contact: {
    en: { title: "Contact | Nima Bagheri", description: "Contact Nima Bagheri about software, AI video, editing and design projects." },
    tr: { title: "İletişim | Nima Bagheri", description: "Yazılım, yapay zekâ video, kurgu ve tasarım projeleri için Nima Bagheri ile iletişime geçin." },
  },
};

export const DEVELOPMENT_PROJECTS = [
  { title: "AI Art Showcase", image: "/resume/banner01.jpg", url: "https://ai-artshowcase.vercel.app/", category: "Frontend" },
  { title: "Portfolio Template", image: "/resume/banner02.jpg", url: "https://visker-portfolio.vercel.app/", category: "Frontend" },
  { title: "Ayvision Films", image: "/resume/banner03.jpg", url: "https://ayvisionfilms.com/", category: "Frontend" },
  { title: "Alex Finley", image: "/Alex-Finley.jpg", url: "https://alex-finaly.vercel.app/", category: "Frontend" },
  { title: "Damien Tsarantos", image: "/damien-tsarantos.jpg", url: "https://damien-tsarantos-rho.vercel.app/", category: "Frontend" },
  { title: "Nexus", image: "/Nexus.jpg", url: "https://nexus-seven-beta.vercel.app/", category: "Frontend" },
  { title: "Alejandro", image: "/alejandro.jpg", url: "https://responsive-portfolio-website-template.vercel.app/", category: "Frontend" },
  { title: "Nico Palmer", image: "/project-3.jpg", url: "https://nico-palmar.vercel.app/", category: "Frontend" },
  { title: "CodeFlex AI", image: "/ai-avatar.png", url: "https://codeflex-ai-dun.vercel.app/", category: "Full Stack" },
  { title: "HB Real Estate", image: "/hbrealstate.svg", url: "https://hbrealstate.com/", category: "Full Stack" },
  { title: "Signals", image: "/signals.png", url: "https://signalist-stock-tracker-lime.vercel.app/", category: "Full Stack" },
  { title: "Care Pulse", image: "/care.jpg", url: "https://care-pulse-hxyt91keg-nimas-projects-40d42c5f.vercel.app/", category: "Full Stack" },
  { title: "Cryp-Go Website", image: "/resume/banner04.jpg", url: "https://forex-signal-wine.vercel.app/", category: "Full Stack" },
];

export const RESUME_CONTENT = {
  en: {
    summary: "Multidisciplinary digital creator combining full-stack development, UI/UX design, graphic design, video editing and AI-assisted content production. I build modern digital products and create platform-ready visual campaigns with a structured, end-to-end workflow.",
    section: { summary: "Professional Summary", creative: "Creative Skills", technical: "Technical Skills", experience: "Professional Experience", selectedCreative: "Selected Creative Projects", selectedDevelopment: "Selected Development Projects", tools: "Tools & Technologies", contact: "Contact Information" },
    creativeSkills: ["AI Video Generation", "AI Prompt Engineering", "Video Editing", "Motion Graphics", "Storyboarding", "Creative Direction", "Camera Movement Design", "Image Retouching", "Social Media Advertising", "Short-Form 9:16 Content", "Real Estate Video Production", "Fashion and Product Content"],
    technicalSkills: ["Full-Stack Development", "Frontend Development", "Backend Development", "Responsive Web Design", "UI/UX Design", "API Development", "Database Integration"],
    creativeRole: "AI Content Creator, Video Editor & Graphic Designer",
    creativeDescription: "Planned and produced AI-assisted promotional content for real estate, construction, fashion, product and corporate campaigns. Managed the complete creative workflow, including concept development, scripts, visual references, storyboards, prompt engineering, AI image and video generation, camera movement direction, motion graphics, multilingual text overlays, sound cleanup, image retouching and final editing. Produced platform-optimized vertical videos and advertising visuals for Instagram Reels and digital marketing campaigns while maintaining brand consistency and realistic visual quality.",
    experience: [
      ["Senior Full Stack Developer — HB Real Estate", "2025–2026"],
      ["Frontend Developer — Freelance & Agency Projects", "2024–2025"],
      ["Web Developer — Remote Client Projects", "2023–2024"],
    ],
    creativeProjectsEmpty: "Creative projects are published only after their verified media and project details are added through the portfolio manager.",
    download: "Download English CV",
    website: "Website",
  },
  tr: {
    summary: "Full-stack geliştirme, UI/UX tasarımı, grafik tasarım, video kurgu ve yapay zekâ destekli içerik üretimini bir araya getiren çok yönlü dijital içerik üreticisi. Yapılandırılmış ve uçtan uca bir süreçle modern dijital ürünler ve platforma uygun görsel kampanyalar geliştiriyorum.",
    section: { summary: "Profesyonel Özet", creative: "Yaratıcı Beceriler", technical: "Teknik Beceriler", experience: "Profesyonel Deneyim", selectedCreative: "Seçili Yaratıcı Projeler", selectedDevelopment: "Seçili Yazılım Projeleri", tools: "Araçlar ve Teknolojiler", contact: "İletişim Bilgileri" },
    creativeSkills: ["Yapay Zekâ Video Üretimi", "Yapay Zekâ Prompt Tasarımı", "Video Kurgu", "Hareketli Grafikler", "Storyboard", "Yaratıcı Yönetim", "Kamera Hareketi Tasarımı", "Görsel Rötuş", "Sosyal Medya Reklamcılığı", "Kısa 9:16 İçerik", "Gayrimenkul Video Üretimi", "Moda ve Ürün İçeriği"],
    technicalSkills: ["Full-Stack Geliştirme", "Frontend Geliştirme", "Backend Geliştirme", "Responsive Web Tasarımı", "UI/UX Tasarımı", "API Geliştirme", "Veritabanı Entegrasyonu"],
    creativeRole: "Yapay Zekâ İçerik Üreticisi, Video Editörü ve Grafik Tasarımcı",
    creativeDescription: "Gayrimenkul, inşaat, moda, ürün ve kurumsal kampanyalar için yapay zekâ destekli tanıtım içerikleri planladım ve ürettim. Fikir geliştirme, metin yazımı, görsel referans hazırlama, storyboard, prompt tasarımı, yapay zekâ ile görsel ve video üretimi, kamera hareketi yönetimi, hareketli grafikler, çok dilli ekran yazıları, ses temizleme, görsel rötuş ve final kurgu dahil olmak üzere tüm yaratıcı süreci yönettim. Marka tutarlılığını ve gerçekçi görsel kaliteyi koruyarak Instagram Reels ve dijital reklam kampanyaları için platforma uygun dikey videolar ve reklam görselleri hazırladım.",
    experience: [
      ["Kıdemli Full Stack Geliştirici — HB Real Estate", "2025–2026"],
      ["Frontend Geliştirici — Freelance ve Ajans Projeleri", "2024–2025"],
      ["Web Geliştirici — Uzaktan Müşteri Projeleri", "2023–2024"],
    ],
    creativeProjectsEmpty: "Yaratıcı projeler yalnızca doğrulanmış medya ve proje bilgileri portfolyo yöneticisine eklendikten sonra yayınlanır.",
    download: "Türkçe CV’yi İndir",
    website: "Web Sitesi",
  },
};

export const VERIFIED_TOOLS = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS",
  "Framer Motion", "Node.js", "Nest.js", "MongoDB", "Appwrite", "WordPress",
  "Figma", "Adobe XD", "Adobe Photoshop", "Git", "GitHub", "GitLab",
];
