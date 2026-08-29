const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const outputDir = path.join(process.cwd(), "public", "cv");
fs.mkdirSync(outputDir, { recursive: true });

const fontCandidates = [
  ["C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/arialbd.ttf"],
  ["/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"],
];
const fonts = fontCandidates.find(([regular, bold]) => fs.existsSync(regular) && fs.existsSync(bold));
if (!fonts) throw new Error("A Unicode Arial or DejaVu Sans font is required to generate the CV files.");

const projects = ["AI Art Showcase", "Portfolio Template", "Ayvision Films", "CodeFlex AI", "HB Real Estate", "Signals", "Care Pulse", "Cryp-Go Website"];
const tools = "HTML · CSS · JavaScript · TypeScript · React · Next.js · Tailwind CSS · Framer Motion · Node.js · Nest.js · MongoDB · Appwrite · WordPress · Figma · Adobe XD · Adobe Photoshop · Git · GitHub · GitLab";

const data = {
  en: {
    file: "Nima-Bagheri-CV-EN.pdf",
    subtitle: "Full-Stack Developer · AI Content Creator · Video Editor · Graphic Designer",
    summaryTitle: "PROFESSIONAL SUMMARY",
    summary: "Multidisciplinary digital creator combining full-stack development, UI/UX design, graphic design, video editing and AI-assisted content production. I build modern digital products and produce platform-ready visual campaigns through a structured end-to-end workflow.",
    skillsTitle: "CREATIVE & TECHNICAL SKILLS",
    skills: "AI Video Generation · AI Prompt Engineering · Video Editing · Motion Graphics · Storyboarding · Creative Direction · Camera Movement Design · Image Retouching · Social Media Advertising · Short-Form 9:16 Content · Full-Stack Development · Responsive Web Design · API Development · Database Integration",
    experienceTitle: "PROFESSIONAL EXPERIENCE",
    creativeRole: "AI Content Creator, Video Editor & Graphic Designer",
    creative: "Planned and produced AI-assisted promotional content for real estate, construction, fashion, product and corporate campaigns. Managed concept development, scripts, visual references, storyboards, prompt engineering, AI image and video generation, camera movement direction, motion graphics, multilingual text overlays, sound cleanup, image retouching and final editing. Produced platform-optimized vertical videos and advertising visuals for Instagram Reels and digital marketing campaigns while maintaining brand consistency and realistic visual quality.",
    experience: [["Senior Full Stack Developer — HB Real Estate", "2025–2026"], ["Frontend Developer — Freelance & Agency Projects", "2024–2025"], ["Web Developer — Remote Client Projects", "2023–2024"]],
    projectsTitle: "SELECTED DEVELOPMENT PROJECTS",
    creativeTitle: "SELECTED CREATIVE PROJECTS",
    creativeNote: "Verified creative work is available at mavisker.com/creative-work as projects are published.",
    toolsTitle: "TOOLS & TECHNOLOGIES",
    contactTitle: "CONTACT",
  },
  tr: {
    file: "Nima-Bagheri-CV-TR.pdf",
    subtitle: "Full-Stack Geliştirici · Yapay Zekâ İçerik Üreticisi · Video Editörü · Grafik Tasarımcı",
    summaryTitle: "PROFESYONEL ÖZET",
    summary: "Full-stack geliştirme, UI/UX tasarımı, grafik tasarım, video kurgu ve yapay zekâ destekli içerik üretimini bir araya getiren çok yönlü dijital içerik üreticisi. Yapılandırılmış ve uçtan uca bir süreçle modern dijital ürünler ve platforma uygun görsel kampanyalar geliştiriyorum.",
    skillsTitle: "YARATICI VE TEKNİK BECERİLER",
    skills: "Yapay Zekâ Video Üretimi · Prompt Tasarımı · Video Kurgu · Hareketli Grafikler · Storyboard · Yaratıcı Yönetim · Kamera Hareketi Tasarımı · Görsel Rötuş · Sosyal Medya Reklamcılığı · Kısa 9:16 İçerik · Full-Stack Geliştirme · Responsive Web Tasarımı · API Geliştirme · Veritabanı Entegrasyonu",
    experienceTitle: "PROFESYONEL DENEYİM",
    creativeRole: "Yapay Zekâ İçerik Üreticisi, Video Editörü ve Grafik Tasarımcı",
    creative: "Gayrimenkul, inşaat, moda, ürün ve kurumsal kampanyalar için yapay zekâ destekli tanıtım içerikleri planladım ve ürettim. Fikir geliştirme, metin yazımı, görsel referans, storyboard, prompt tasarımı, yapay zekâ ile görsel ve video üretimi, kamera hareketi yönetimi, hareketli grafikler, çok dilli ekran yazıları, ses temizleme, görsel rötuş ve final kurgu dahil tüm yaratıcı süreci yönettim. Instagram Reels ve dijital reklam kampanyaları için platforma uygun dikey videolar ve reklam görselleri hazırladım.",
    experience: [["Kıdemli Full Stack Geliştirici — HB Real Estate", "2025–2026"], ["Frontend Geliştirici — Freelance ve Ajans Projeleri", "2024–2025"], ["Web Geliştirici — Uzaktan Müşteri Projeleri", "2023–2024"]],
    projectsTitle: "SEÇİLİ YAZILIM PROJELERİ",
    creativeTitle: "SEÇİLİ YARATICI PROJELER",
    creativeNote: "Doğrulanmış yaratıcı çalışmalar, projeler yayınlandıkça mavisker.com/creative-work adresinde yer alır.",
    toolsTitle: "ARAÇLAR VE TEKNOLOJİLER",
    contactTitle: "İLETİŞİM",
  },
};

function makePdf(locale) {
  const copy = data[locale];
  const doc = new PDFDocument({ size: "A4", margins: { top: 42, bottom: 42, left: 46, right: 46 }, info: { Title: `${locale === "tr" ? "Özgeçmiş" : "Resume"} | Nima Bagheri`, Author: "Nima Bagheri" } });
  doc.pipe(fs.createWriteStream(path.join(outputDir, copy.file)));
  doc.registerFont("Regular", fonts[0]);
  doc.registerFont("Bold", fonts[1]);
  const purple = "#7e22ce";
  const ink = "#171323";
  const muted = "#5f596a";
  const section = (title) => { doc.moveDown(0.7).font("Bold").fontSize(10).fillColor(purple).text(title, { characterSpacing: 1.1 }); doc.moveDown(0.25).strokeColor("#ded5e8").lineWidth(0.7).moveTo(doc.x, doc.y).lineTo(549, doc.y).stroke().moveDown(0.45); };
  const paragraph = (value, size = 9.2) => doc.font("Regular").fontSize(size).fillColor(muted).text(value, { lineGap: 2.2 });

  doc.rect(0, 0, 595.28, 116).fill("#171323");
  doc.font("Bold").fontSize(27).fillColor("#ffffff").text("Nima Bagheri", 46, 39);
  doc.font("Regular").fontSize(10.5).fillColor("#d8c9e9").text(copy.subtitle, 46, 76, { width: 500 });
  doc.x = 46; doc.y = 132;
  section(copy.summaryTitle); paragraph(copy.summary);
  section(copy.skillsTitle); paragraph(copy.skills, 8.8);
  section(copy.experienceTitle);
  doc.font("Bold").fontSize(10.5).fillColor(ink).text(copy.creativeRole);
  doc.moveDown(0.25); paragraph(copy.creative, 8.7);
  copy.experience.forEach(([role, years]) => { doc.moveDown(0.45).font("Bold").fontSize(9.4).fillColor(ink).text(role); doc.font("Regular").fontSize(8.5).fillColor(purple).text(years); });

  doc.addPage();
  doc.rect(0, 0, 595.28, 24).fill("#7e22ce");
  doc.x = 46; doc.y = 42;
  section(copy.projectsTitle); paragraph(projects.join("  ·  "), 9.3);
  section(copy.creativeTitle); paragraph(copy.creativeNote);
  section(copy.toolsTitle); paragraph(tools, 9);
  section(copy.contactTitle);
  doc.font("Bold").fontSize(10).fillColor(ink).text("mavisker.com", { link: "https://mavisker.com", underline: true });
  doc.moveDown(0.25).font("Regular").fontSize(8.8).fillColor(muted).text("LinkedIn  linkedin.com/in/nima-bagheri-0805541a8/", { link: "https://www.linkedin.com/in/nima-bagheri-0805541a8/" });
  doc.text("GitHub  github.com/nimavisker1360", { link: "https://github.com/nimavisker1360" });
  doc.text("Dribbble  dribbble.com/nimabt/shots", { link: "https://dribbble.com/nimabt/shots" });
  doc.font("Regular").fontSize(7.5).fillColor("#8a8292").text("mavisker.com", 46, 790, { align: "right", width: 503 });
  doc.end();
}

makePdf("en");
makePdf("tr");
