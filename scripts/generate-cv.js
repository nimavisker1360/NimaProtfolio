const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const outputDir = path.join(process.cwd(), "public", "cv");
fs.mkdirSync(outputDir, { recursive: true });

const fontCandidates = [
  ["C:/Windows/Fonts/arial.ttf", "C:/Windows/Fonts/arialbd.ttf"],
  [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
  ],
];
const fonts = fontCandidates.find(
  ([regular, bold]) => fs.existsSync(regular) && fs.existsSync(bold),
);

if (!fonts) {
  throw new Error(
    "Arial or DejaVu Sans is required to generate the Unicode CV files.",
  );
}

const profile = {
  name: "Nima Bagheri",
  website: "mavisker.com",
  websiteUrl: "https://mavisker.com",
  contact: [
    {
      label: "LinkedIn",
      value: "nima-bagheri-0805541a8",
      url: "https://www.linkedin.com/in/nima-bagheri-0805541a8/",
    },
    {
      label: "GitHub",
      value: "nimavisker1360",
      url: "https://github.com/nimavisker1360",
    },
    {
      label: "Dribbble",
      value: "nimabt/shots",
      url: "https://dribbble.com/nimabt/shots",
    },
  ],
};

const projects = [
  ["AI Art Showcase", "Frontend", "https://ai-artshowcase.vercel.app/"],
  ["Portfolio Template", "Frontend", "https://visker-portfolio.vercel.app/"],
  ["Ayvision Films", "Frontend", "https://ayvisionfilms.com/"],
  ["Alex Finley", "Frontend", "https://alex-finaly.vercel.app/"],
  ["Damien Tsarantos", "Frontend", "https://damien-tsarantos-rho.vercel.app/"],
  ["Nexus", "Frontend", "https://nexus-seven-beta.vercel.app/"],
  ["Alejandro", "Frontend", "https://responsive-portfolio-website-template.vercel.app/"],
  ["Nico Palmer", "Frontend", "https://nico-palmar.vercel.app/"],
  ["CodeFlex AI", "Full Stack", "https://codeflex-ai-dun.vercel.app/"],
  ["HB Real Estate", "Full Stack", "https://hbrealstate.com/"],
  ["Signals", "Full Stack", "https://signalist-stock-tracker-lime.vercel.app/"],
  ["Care Pulse", "Full Stack", "https://care-pulse-hxyt91keg-nimas-projects-40d42c5f.vercel.app/"],
  ["Cryp-Go Website", "Full Stack", "https://forex-signal-wine.vercel.app/"],
];

const creativeProjectsByRole = {
  video: [
    {
      id: "6a9286d3726e5afd28e13fc8",
      en: "Modern Furnished 1+1 Apartment",
      tr: "Modern ve Eşyalı 1+1 Daire",
    },
    { id: "6a92cd6be7a73fba4dc0dc43", en: "Kibris", tr: "Kibris" },
    {
      id: "6a92f78d817b94dace54afc2",
      en: "Long Beach Coastal Atmosphere",
      tr: "Long Beach’in Sahil Atmosferi",
    },
    {
      id: "6a92f5e8817b94dace54afbf",
      en: "Northern Cyprus",
      tr: "Kuzey Kıbrıs",
    },
  ],
  social: [
    {
      id: "6a928262726e5afd28e13fa6",
      en: "This Key Opens More Than a Door",
      tr: "Bu Anahtar Sadece Bir Kapıyı Açmaz",
    },
    {
      id: "6a92f503817b94dace54afbb",
      en: "About HB Real Estate",
      tr: "Gayrimenkul Alırken Şansa",
    },
    {
      id: "6a92f823817b94dace54afc4",
      en: "Exclusive Living & Investment",
      tr: "Ayrıcalıklı Yaşam ve Yatırım",
    },
    {
      id: "6a92fc92817b94dace54afca",
      en: "Vadi Evleri Campaign",
      tr: "Vadi Evleri Kampanyası",
    },
  ],
  ai: [
    {
      id: "6a92fa78817b94dace54afc6",
      en: "Nigo Online Shop",
      tr: "Nigo Online Shop",
    },
    {
      id: "6a92fc1f817b94dace54afc8",
      en: "HB Kibris",
      tr: "HB Kibris",
    },
    {
      id: "6a92fd01817b94dace54afcc",
      en: "Nigo Avenue Online Shop",
      tr: "Nigo Avenue Online Shop",
    },
    {
      id: "6a92fe84817b94dace54afce",
      en: "HB Real Estate AI Video",
      tr: "HB Real Estate AI Videosu",
    },
  ],
};

const stack = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "Nest.js",
  "MongoDB",
  "Appwrite",
  "WordPress",
  "Figma",
  "Adobe XD",
  "Adobe Photoshop",
  "Git",
  "GitHub",
  "GitLab",
];

const content = {
  en: {
    file: "Nima-Bagheri-CV-EN.pdf",
    documentTitle: "Resume | Nima Bagheri",
    role: "FULL-STACK DEVELOPER  /  AI VIDEO CREATOR  /  GRAPHIC DESIGNER",
    summaryTitle: "PROFILE",
    summary:
      "Multidisciplinary digital creator combining software engineering, visual storytelling and generative AI. I build responsive, scalable digital products and create platform-ready campaigns through a structured workflow—from concept and design to development, production and final delivery.",
    experienceTitle: "EXPERIENCE",
    creativeRole: "AI Content Creator, Video Editor & Graphic Designer",
    creativeYears: "Creative production",
    creativeDescription:
      "Planned and produced AI-assisted promotional content for real estate, construction, fashion, product and corporate campaigns. Managed concepts, scripts, visual references, storyboards, prompts, AI scene generation, camera movement, motion graphics, multilingual overlays, sound cleanup, retouching and final edits. Delivered realistic, brand-consistent 9:16 content for Reels and digital advertising.",
    experience: [
      ["Senior Full Stack Developer", "HB Real Estate", "2025–2026"],
      ["Frontend Developer", "Freelance & Agency Projects", "2024–2025"],
      ["Web Developer", "Remote Client Projects", "2023–2024"],
    ],
    servicesTitle: "SERVICES",
    services: [
      "AI Video Production",
      "Video Editing & Motion Graphics",
      "Graphic Design",
      "Social Media Content",
      "Web & Software Development",
      "UI/UX Design",
    ],
    contactTitle: "CONTACT",
    strengthsTitle: "CORE EXPERTISE",
    strengths: [
      "Full-stack product development",
      "Creative direction & storytelling",
      "Generative AI production",
      "Responsive, user-focused design",
      "End-to-end campaign delivery",
    ],
    highlightsTitle: "EXPERIENCE SNAPSHOT",
    highlights: [
      ["10+", "Years in digital design & creative work"],
      ["6+", "Years in web & software development"],
    ],
    portfolioTitle: "SELECTED DEVELOPMENT PROJECTS",
    portfolioIntro: "Live projects — click any title to visit",
    capabilitiesTitle: "CREATIVE CAPABILITIES",
    creativeSkills: [
      "AI Video Generation",
      "AI Prompt Engineering",
      "Video Editing",
      "Motion Graphics",
      "Storyboarding",
      "Creative Direction",
      "Camera Movement Design",
      "Image Retouching",
      "Social Media Advertising",
      "Short-Form 9:16 Content",
      "Real Estate Video Production",
      "Fashion & Product Content",
    ],
    technicalTitle: "TECHNICAL CAPABILITIES",
    technicalSkills: [
      "Full-Stack Development",
      "Frontend Development",
      "Backend Development",
      "Responsive Web Design",
      "UI/UX Design",
      "API Development",
      "Database Integration",
    ],
    stackTitle: "TOOLS & TECHNOLOGIES",
    creativePortfolioTitle: "CREATIVE PORTFOLIO",
    creativePortfolioText:
      "AI video, editing, motion graphics, graphic design, real estate, fashion, product and social media work.",
    viewPortfolio: "View verified creative work",
    creativeProjectsTitle: "CREATIVE MEDIA PROJECTS",
    creativeProjectsIntro:
      "Selected published work from the portfolio — every project title is a direct, clickable link.",
    creativeRoles: [
      {
        key: "video",
        title: "VIDEO EDITOR & MOTION DESIGNER",
        description:
          "Editing, pacing, transitions, motion graphics, text animation, sound cleanup and polished delivery for vertical advertising and brand films.",
        allLabel: "View all video editing projects",
        category: "video-editing",
      },
      {
        key: "social",
        title: "SOCIAL MEDIA CONTENT SPECIALIST",
        description:
          "Platform-focused concepts and 9:16 content for Instagram Reels and digital campaigns, built for attention, clarity and conversion.",
        allLabel: "View all social media projects",
        category: "social-media",
      },
      {
        key: "ai",
        title: "GENERATIVE AI SPECIALIST",
        description:
          "Prompt engineering, AI scene and image generation, camera-movement direction and visual consistency for realistic promotional content.",
        allLabel: "View all AI video projects",
        category: "ai-videos",
      },
    ],
  },
  tr: {
    file: "Nima-Bagheri-CV-TR.pdf",
    documentTitle: "Özgeçmiş | Nima Bagheri",
    role: "FULL-STACK GELİŞTİRİCİ  /  YAPAY ZEKÂ VİDEO ÜRETİCİSİ  /  GRAFİK TASARIMCI",
    summaryTitle: "PROFİL",
    summary:
      "Yazılım geliştirme, görsel hikâye anlatımı ve üretken yapay zekâyı birleştiren çok yönlü dijital içerik üreticisiyim. Fikir ve tasarımdan geliştirme, üretim ve final teslimine uzanan sistemli bir süreçle responsive, ölçeklenebilir dijital ürünler ve platforma uygun kampanyalar geliştiriyorum.",
    experienceTitle: "DENEYİM",
    creativeRole: "Yapay Zekâ İçerik Üreticisi, Video Editörü ve Grafik Tasarımcı",
    creativeYears: "Yaratıcı içerik üretimi",
    creativeDescription:
      "Gayrimenkul, inşaat, moda, ürün ve kurumsal kampanyalar için yapay zekâ destekli tanıtım içerikleri planladım ve ürettim. Fikir, metin, görsel referans, storyboard, prompt, yapay zekâ sahne üretimi, kamera hareketi, hareketli grafik, çok dilli ekran yazısı, ses temizleme, rötuş ve final kurgu süreçlerini yönettim. Reels ve dijital reklamlar için gerçekçi, marka tutarlılığı yüksek 9:16 içerikler hazırladım.",
    experience: [
      ["Kıdemli Full Stack Geliştirici", "HB Real Estate", "2025–2026"],
      ["Frontend Geliştirici", "Freelance ve Ajans Projeleri", "2024–2025"],
      ["Web Geliştirici", "Uzaktan Müşteri Projeleri", "2023–2024"],
    ],
    servicesTitle: "HİZMETLER",
    services: [
      "Yapay Zekâ Destekli Video Üretimi",
      "Video Kurgu ve Hareketli Grafikler",
      "Grafik Tasarım",
      "Sosyal Medya İçerik Üretimi",
      "Web ve Yazılım Geliştirme",
      "UI/UX Tasarımı",
    ],
    contactTitle: "İLETİŞİM",
    strengthsTitle: "TEMEL UZMANLIK",
    strengths: [
      "Full-stack ürün geliştirme",
      "Yaratıcı yönetim ve hikâye anlatımı",
      "Üretken yapay zekâ ile içerik üretimi",
      "Responsive, kullanıcı odaklı tasarım",
      "Uçtan uca kampanya teslimi",
    ],
    highlightsTitle: "DENEYİM ÖZETİ",
    highlights: [
      ["10+", "Dijital tasarım ve yaratıcı çalışmalarda yıl"],
      ["6+", "Web ve yazılım geliştirmede yıl"],
    ],
    portfolioTitle: "SEÇİLİ YAZILIM PROJELERİ",
    portfolioIntro: "Canlı projeler — ziyaret etmek için başlığa tıklayın",
    capabilitiesTitle: "YARATICI BECERİLER",
    creativeSkills: [
      "Yapay Zekâ Video Üretimi",
      "Yapay Zekâ Prompt Tasarımı",
      "Video Kurgu",
      "Hareketli Grafikler",
      "Storyboard",
      "Yaratıcı Yönetim",
      "Kamera Hareketi Tasarımı",
      "Görsel Rötuş",
      "Sosyal Medya Reklamcılığı",
      "Kısa 9:16 İçerik",
      "Gayrimenkul Video Üretimi",
      "Moda ve Ürün İçeriği",
    ],
    technicalTitle: "TEKNİK BECERİLER",
    technicalSkills: [
      "Full-Stack Geliştirme",
      "Frontend Geliştirme",
      "Backend Geliştirme",
      "Responsive Web Tasarımı",
      "UI/UX Tasarımı",
      "API Geliştirme",
      "Veritabanı Entegrasyonu",
    ],
    stackTitle: "ARAÇLAR VE TEKNOLOJİLER",
    creativePortfolioTitle: "YARATICI PORTFOLYO",
    creativePortfolioText:
      "Yapay zekâ video, kurgu, hareketli grafik, grafik tasarım, gayrimenkul, moda, ürün ve sosyal medya çalışmaları.",
    viewPortfolio: "Doğrulanmış yaratıcı çalışmaları görüntüle",
    creativeProjectsTitle: "YARATICI MEDYA PROJELERİ",
    creativeProjectsIntro:
      "Portfolyoda yayınlanan seçili çalışmalar — her proje başlığı doğrudan ve tıklanabilir bir bağlantıdır.",
    creativeRoles: [
      {
        key: "video",
        title: "VİDEO EDİTÖRÜ VE HAREKETLİ GRAFİK TASARIMCISI",
        description:
          "Dikey reklamlar ve marka filmleri için kurgu, ritim, geçiş, hareketli grafik, metin animasyonu, ses temizleme ve profesyonel final teslimi.",
        allLabel: "Tüm video kurgu projelerini görüntüle",
        category: "video-editing",
      },
      {
        key: "social",
        title: "SOSYAL MEDYA İÇERİK UZMANI",
        description:
          "Instagram Reels ve dijital kampanyalar için dikkat, netlik ve dönüşüm odaklı fikirler ve platforma uygun 9:16 içerikler.",
        allLabel: "Tüm sosyal medya projelerini görüntüle",
        category: "social-media",
      },
      {
        key: "ai",
        title: "ÜRETKEN YAPAY ZEKÂ UZMANI",
        description:
          "Gerçekçi tanıtım içerikleri için prompt tasarımı, yapay zekâ sahne ve görsel üretimi, kamera hareketi yönetimi ve görsel tutarlılık.",
        allLabel: "Tüm yapay zekâ video projelerini görüntüle",
        category: "ai-videos",
      },
    ],
  },
};

const colors = {
  ink: "#161326",
  sidebar: "#17152b",
  purple: "#7c3aed",
  fuchsia: "#c026d3",
  lavender: "#eee8ff",
  muted: "#655f73",
  faint: "#eeeaf3",
  white: "#ffffff",
};

function sectionHeading(doc, title, x, y, width, light = false) {
  const lineColor = light ? "#4a4463" : colors.faint;
  doc
    .font("Bold")
    .fontSize(8.3)
    .fillColor(light ? "#c9b7ff" : colors.purple)
    .text(title, x, y, { width, characterSpacing: 1.25 });
  doc
    .moveTo(x, y + 16)
    .lineTo(x + width, y + 16)
    .lineWidth(0.7)
    .strokeColor(lineColor)
    .stroke();
}

function bulletList(doc, items, x, y, width, options = {}) {
  const size = options.size || 8.25;
  const color = options.color || colors.muted;
  const dotColor = options.dotColor || colors.fuchsia;
  const gap = options.gap || 8;
  let cursor = y;

  items.forEach((item) => {
    doc.circle(x + 2.5, cursor + 4.2, 1.6).fill(dotColor);
    doc
      .font("Regular")
      .fontSize(size)
      .fillColor(color)
      .text(item, x + 11, cursor, { width: width - 11, lineGap: 1 });
    cursor = doc.y + gap;
  });

  return cursor;
}

function tagCloud(doc, items, x, y, width, options = {}) {
  const size = options.size || 7.7;
  const fill = options.fill || "#f5f1fb";
  const textColor = options.textColor || colors.ink;
  const paddingX = 8;
  const tagHeight = 20;
  let cursorX = x;
  let cursorY = y;

  doc.font("Regular").fontSize(size);
  items.forEach((item) => {
    const tagWidth = Math.min(doc.widthOfString(item) + paddingX * 2, width);
    if (cursorX + tagWidth > x + width) {
      cursorX = x;
      cursorY += tagHeight + 5;
    }

    doc.roundedRect(cursorX, cursorY, tagWidth, tagHeight, 6).fill(fill);
    doc
      .font("Regular")
      .fontSize(size)
      .fillColor(textColor)
      .text(item, cursorX + paddingX, cursorY + 5.1, {
        width: tagWidth - paddingX * 2,
        align: "center",
      });
    cursorX += tagWidth + 5;
  });

  return cursorY + tagHeight;
}

function addPageNumber(doc, number) {
  doc
    .font("Bold")
    .fontSize(7.5)
    .fillColor("#8d8699")
    .text(`NIMA BAGHERI   •   ${String(number).padStart(2, "0")}`, 390, 810, {
      width: 160,
      align: "right",
    });
}

function drawFirstPage(doc, copy) {
  const sidebarWidth = 188;
  const sidebarX = 27;
  const sidebarContentWidth = 134;
  const mainX = 220;
  const mainWidth = 330;

  doc.rect(0, 0, sidebarWidth, 841.89).fill(colors.sidebar);
  doc.rect(sidebarWidth, 0, 6, 841.89).fill(colors.purple);
  doc.circle(94, 72, 35).fill(colors.purple);
  doc.circle(104, 63, 25).fill(colors.fuchsia);
  doc
    .font("Bold")
    .fontSize(24)
    .fillColor(colors.white)
    .text("NB", 58, 58, { width: 72, align: "center" });

  sectionHeading(doc, copy.contactTitle, sidebarX, 132, sidebarContentWidth, true);
  doc
    .font("Bold")
    .fontSize(8.6)
    .fillColor(colors.white)
    .text(profile.website, sidebarX, 157, {
      width: sidebarContentWidth,
      link: profile.websiteUrl,
      underline: true,
    });

  let contactY = 179;
  profile.contact.forEach((item) => {
    doc
      .font("Bold")
      .fontSize(7.5)
      .fillColor("#b9a5f6")
      .text(item.label.toUpperCase(), sidebarX, contactY, {
        width: sidebarContentWidth,
      });
    doc
      .font("Regular")
      .fontSize(7.7)
      .fillColor("#f0edf7")
      .text(item.value, sidebarX, contactY + 11, {
        width: sidebarContentWidth,
        link: item.url,
      });
    contactY += 38;
  });

  sectionHeading(doc, copy.highlightsTitle, sidebarX, 300, sidebarContentWidth, true);
  let highlightY = 329;
  copy.highlights.forEach(([value, label]) => {
    doc
      .font("Bold")
      .fontSize(20)
      .fillColor(colors.white)
      .text(value, sidebarX, highlightY, { width: 44 });
    doc
      .font("Regular")
      .fontSize(7.2)
      .fillColor("#c8c3d3")
      .text(label, sidebarX + 48, highlightY + 1, {
        width: sidebarContentWidth - 48,
        lineGap: 1,
      });
    highlightY += 52;
  });

  sectionHeading(doc, copy.strengthsTitle, sidebarX, 442, sidebarContentWidth, true);
  bulletList(doc, copy.strengths, sidebarX, 471, sidebarContentWidth, {
    size: 7.8,
    color: "#ddd8e7",
    dotColor: "#c084fc",
    gap: 9,
  });

  sectionHeading(doc, copy.servicesTitle, sidebarX, 600, sidebarContentWidth, true);
  bulletList(doc, copy.services, sidebarX, 629, sidebarContentWidth, {
    size: 7.7,
    color: "#f0edf7",
    dotColor: "#e879f9",
    gap: 7,
  });

  doc
    .font("Bold")
    .fontSize(29)
    .fillColor(colors.ink)
    .text(profile.name, mainX, 48, { width: mainWidth });
  doc
    .font("Bold")
    .fontSize(7.7)
    .fillColor(colors.purple)
    .text(copy.role, mainX, 88, {
      width: mainWidth,
      lineGap: 2,
      characterSpacing: 0.35,
    });
  doc
    .roundedRect(mainX, 115, 66, 4, 2)
    .fill(colors.purple)
    .roundedRect(mainX + 69, 115, 30, 4, 2)
    .fill(colors.fuchsia);

  sectionHeading(doc, copy.summaryTitle, mainX, 144, mainWidth);
  doc
    .font("Regular")
    .fontSize(9)
    .fillColor(colors.muted)
    .text(copy.summary, mainX, 172, {
      width: mainWidth,
      lineGap: 3.1,
      align: "left",
    });

  sectionHeading(doc, copy.experienceTitle, mainX, 268, mainWidth);
  let experienceY = 299;
  doc.circle(mainX + 3, experienceY + 5, 3).fill(colors.fuchsia);
  doc
    .font("Bold")
    .fontSize(9.8)
    .fillColor(colors.ink)
    .text(copy.creativeRole, mainX + 14, experienceY, {
      width: mainWidth - 14,
    });
  doc
    .font("Bold")
    .fontSize(7.4)
    .fillColor(colors.purple)
    .text(copy.creativeYears.toUpperCase(), mainX + 14, doc.y + 4, {
      width: mainWidth - 14,
      characterSpacing: 0.5,
    });
  doc
    .font("Regular")
    .fontSize(8.2)
    .fillColor(colors.muted)
    .text(copy.creativeDescription, mainX + 14, doc.y + 8, {
      width: mainWidth - 14,
      lineGap: 2.2,
    });
  experienceY = doc.y + 20;

  copy.experience.forEach(([role, company, years]) => {
    doc.circle(mainX + 3, experienceY + 5, 2.6).fill(colors.purple);
    doc
      .font("Bold")
      .fontSize(9.2)
      .fillColor(colors.ink)
      .text(role, mainX + 14, experienceY, { width: 205 });
    doc
      .font("Bold")
      .fontSize(7.6)
      .fillColor(colors.purple)
      .text(years, mainX + 226, experienceY + 1, {
        width: mainWidth - 226,
        align: "right",
      });
    doc
      .font("Regular")
      .fontSize(8)
      .fillColor(colors.muted)
      .text(company, mainX + 14, experienceY + 15, {
        width: mainWidth - 14,
      });
    experienceY += 46;
  });

  doc
    .roundedRect(mainX, 728, mainWidth, 45, 9)
    .fill(colors.lavender);
  doc
    .font("Bold")
    .fontSize(8.4)
    .fillColor(colors.purple)
    .text("PORTFOLIO", mainX + 14, 740, { width: 68 });
  doc
    .font("Regular")
    .fontSize(8.2)
    .fillColor(colors.ink)
    .text("mavisker.com", mainX + 87, 740, {
      width: 120,
      link: profile.websiteUrl,
      underline: true,
    });
  doc
    .font("Regular")
    .fontSize(7.4)
    .fillColor(colors.muted)
    .text("Development  •  Creative Work  •  Contact", mainX + 14, 755, {
      width: mainWidth - 28,
    });

  addPageNumber(doc, 1);
}

function drawSecondPage(doc, copy) {
  const margin = 42;
  const contentWidth = 511;
  const leftWidth = 304;
  const rightX = 371;
  const rightWidth = 182;

  doc.rect(0, 0, 595.28, 92).fill(colors.sidebar);
  doc.rect(0, 88, 595.28, 4).fill(colors.purple);
  doc
    .font("Bold")
    .fontSize(18)
    .fillColor(colors.white)
    .text(profile.name, margin, 29, { width: 210 });
  doc
    .font("Regular")
    .fontSize(8)
    .fillColor("#c9c1d7")
    .text(copy.role, margin, 56, { width: 390, characterSpacing: 0.25 });
  doc
    .font("Bold")
    .fontSize(8.2)
    .fillColor("#d8b4fe")
    .text("02 / 03", 478, 39, { width: 74, align: "right" });

  sectionHeading(doc, copy.portfolioTitle, margin, 119, leftWidth);
  doc
    .font("Regular")
    .fontSize(7.7)
    .fillColor(colors.muted)
    .text(copy.portfolioIntro, margin, 145, { width: leftWidth });

  let projectY = 174;
  projects.forEach(([title, category, url], index) => {
    doc
      .roundedRect(margin, projectY, leftWidth, 31, 6)
      .fill(index % 2 === 0 ? "#f8f6fb" : "#f2eef8");
    doc
      .font("Bold")
      .fontSize(8.5)
      .fillColor(colors.ink)
      .text(`${String(index + 1).padStart(2, "0")}   ${title}`, margin + 10, projectY + 7, {
        width: 195,
        link: url,
        underline: true,
      });
    doc
      .font("Bold")
      .fontSize(6.8)
      .fillColor(category === "Full Stack" ? colors.fuchsia : colors.purple)
      .text(category.toUpperCase(), margin + 215, projectY + 8, {
        width: 78,
        align: "right",
        characterSpacing: 0.35,
      });
    projectY += 36;
  });

  sectionHeading(doc, copy.capabilitiesTitle, rightX, 119, rightWidth);
  let rightY = bulletList(doc, copy.creativeSkills, rightX, 148, rightWidth, {
    size: 7.35,
    gap: 5,
  });

  rightY += 8;
  sectionHeading(doc, copy.technicalTitle, rightX, rightY, rightWidth);
  rightY = bulletList(doc, copy.technicalSkills, rightX, rightY + 29, rightWidth, {
    size: 7.35,
    gap: 5,
    dotColor: colors.purple,
  });

  rightY += 8;
  sectionHeading(doc, copy.creativePortfolioTitle, rightX, rightY, rightWidth);
  doc
    .font("Regular")
    .fontSize(7.6)
    .fillColor(colors.muted)
    .text(copy.creativePortfolioText, rightX, rightY + 29, {
      width: rightWidth,
      lineGap: 2,
    });
  doc
    .font("Bold")
    .fontSize(7.5)
    .fillColor(colors.purple)
    .text(copy.viewPortfolio, rightX, doc.y + 8, {
      width: rightWidth,
      link: `${profile.websiteUrl}/creative-work`,
      underline: true,
    });

  sectionHeading(doc, copy.stackTitle, margin, 672, contentWidth);
  tagCloud(doc, stack, margin, 701, contentWidth, {
    size: 7.2,
    fill: "#f3eff8",
  });

  doc
    .font("Regular")
    .fontSize(7.5)
    .fillColor("#8d8699")
    .text(profile.website, margin, 810, {
      width: 150,
      link: profile.websiteUrl,
    });
  addPageNumber(doc, 2);
}

function creativeProjectUrl(locale, id) {
  const localePath = locale === "tr" ? "/tr" : "";
  return `${profile.websiteUrl}${localePath}/creative-work?project=${id}`;
}

function drawThirdPage(doc, copy, locale) {
  const margin = 42;
  const contentWidth = 511;

  doc.rect(0, 0, 595.28, 92).fill(colors.sidebar);
  doc.rect(0, 88, 595.28, 4).fill(colors.fuchsia);
  doc
    .font("Bold")
    .fontSize(18)
    .fillColor(colors.white)
    .text(profile.name, margin, 29, { width: 210 });
  doc
    .font("Regular")
    .fontSize(8)
    .fillColor("#c9c1d7")
    .text(copy.role, margin, 56, { width: 390, characterSpacing: 0.25 });
  doc
    .font("Bold")
    .fontSize(8.2)
    .fillColor("#f0abfc")
    .text("03 / 03", 478, 39, { width: 74, align: "right" });

  sectionHeading(doc, copy.creativeProjectsTitle, margin, 118, contentWidth);
  doc
    .font("Regular")
    .fontSize(8)
    .fillColor(colors.muted)
    .text(copy.creativeProjectsIntro, margin, 145, {
      width: contentWidth,
    });

  const cardYPositions = [178, 346, 514];
  const cardFills = ["#f5f1fb", "#f8f2f9", "#f2f0fb"];
  const cardAccents = [colors.purple, colors.fuchsia, "#5b4dd8"];

  copy.creativeRoles.forEach((role, roleIndex) => {
    const y = cardYPositions[roleIndex];
    const projectsForRole = creativeProjectsByRole[role.key];
    const accent = cardAccents[roleIndex];

    doc.roundedRect(margin, y, contentWidth, 154, 11).fill(cardFills[roleIndex]);
    doc.roundedRect(margin, y, 6, 154, 3).fill(accent);
    doc
      .font("Bold")
      .fontSize(10.1)
      .fillColor(accent)
      .text(role.title, margin + 20, y + 17, {
        width: 330,
        characterSpacing: 0.45,
      });
    doc
      .font("Bold")
      .fontSize(7.1)
      .fillColor(accent)
      .text(role.allLabel, margin + 357, y + 18, {
        width: 135,
        align: "right",
        link: `${profile.websiteUrl}${locale === "tr" ? "/tr" : ""}/creative-work?category=${role.category}`,
        underline: true,
      });
    doc
      .font("Regular")
      .fontSize(7.8)
      .fillColor(colors.muted)
      .text(role.description, margin + 20, y + 41, {
        width: contentWidth - 40,
        lineGap: 1.5,
      });

    projectsForRole.forEach((project, projectIndex) => {
      const column = projectIndex % 2;
      const row = Math.floor(projectIndex / 2);
      const projectX = margin + 20 + column * 238;
      const projectY = y + 91 + row * 28;
      const label = project[locale] || project.en;

      doc.circle(projectX + 2.5, projectY + 4.5, 1.7).fill(accent);
      doc
        .font("Bold")
        .fontSize(7.4)
        .fillColor(colors.ink)
        .text(label, projectX + 11, projectY, {
          width: 215,
          height: 19,
          lineGap: 0.5,
          link: creativeProjectUrl(locale, project.id),
          underline: true,
          ellipsis: true,
        });
    });
  });

  doc
    .roundedRect(margin, 698, contentWidth, 70, 11)
    .fill(colors.sidebar);
  doc
    .font("Bold")
    .fontSize(10)
    .fillColor(colors.white)
    .text(copy.creativePortfolioTitle, margin + 20, 713, { width: 180 });
  doc
    .font("Regular")
    .fontSize(8)
    .fillColor("#d6d0df")
    .text(copy.creativePortfolioText, margin + 20, 733, {
      width: 345,
      lineGap: 1.5,
    });
  doc
    .roundedRect(442, 716, 91, 30, 8)
    .fill(colors.purple);
  doc
    .font("Bold")
    .fontSize(7.4)
    .fillColor(colors.white)
    .text(locale === "tr" ? "PORTFOLYOYU AÇ" : "OPEN PORTFOLIO", 450, 726, {
      width: 75,
      align: "center",
      link: `${profile.websiteUrl}${locale === "tr" ? "/tr" : ""}/creative-work`,
    });

  doc
    .font("Regular")
    .fontSize(7.5)
    .fillColor("#8d8699")
    .text(profile.website, margin, 810, {
      width: 150,
      link: profile.websiteUrl,
    });
  addPageNumber(doc, 3);
}

function makePdf(locale) {
  const copy = content[locale];
  const outputPath = path.join(outputDir, copy.file);
  const doc = new PDFDocument({
    size: "A4",
    margin: 0,
    autoFirstPage: false,
    bufferPages: true,
    info: {
      Title: copy.documentTitle,
      Author: profile.name,
      Subject: copy.role.replaceAll("  /  ", " · "),
      Keywords:
        "Full-Stack Development, AI Video, Video Editing, Motion Graphics, Graphic Design, UI/UX",
    },
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);
  doc.registerFont("Regular", fonts[0]);
  doc.registerFont("Bold", fonts[1]);

  doc.addPage();
  drawFirstPage(doc, copy);
  doc.addPage();
  drawSecondPage(doc, copy);
  doc.addPage();
  drawThirdPage(doc, copy, locale);
  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", () => resolve(outputPath));
    stream.on("error", reject);
  });
}

Promise.all([makePdf("en"), makePdf("tr")])
  .then((files) => {
    files.forEach((file) => {
      const size = fs.statSync(file).size;
      console.log(`Generated ${path.relative(process.cwd(), file)} (${size} bytes)`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
