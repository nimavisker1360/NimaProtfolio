import Link from "next/link";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { HiArrowDownTray, HiArrowTopRightOnSquare } from "react-icons/hi2";
import Seo from "../../components/Seo";
import { DEVELOPMENT_PROJECTS, RESUME_CONTENT, SOCIAL_LINKS, SOCIAL_MEDIA_SHOWCASE, VERIFIED_TOOLS, WHATSAPP_CONTACT } from "../../lib/content";

const Section = ({ title, children }) => <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-7"><h2 className="mb-4 text-xl font-bold text-white">{title}</h2>{children}</section>;

const Resume = () => {
  const { locale } = useRouter();
  const lang = locale === "tr" ? "tr" : "en";
  const copy = RESUME_CONTENT[lang];
  const pdf = lang === "tr" ? "/cv/Nima-Bagheri-CV-TR.pdf" : "/cv/Nima-Bagheri-CV-EN.pdf";

  return (
    <>
      <Seo page="resume" />
      <main className="min-h-screen bg-primary/30 px-4 pb-28 pt-32 sm:px-8 xl:pb-16 xl:pr-28">
        <div className="container mx-auto max-w-6xl">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div><p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-accent">Curriculum Vitae</p><h1 className="text-4xl font-bold sm:text-6xl">Nima Bagheri</h1><p className="mt-3 text-lg font-medium text-white/75">{copy.creativeRole} · Full-Stack Developer</p></div>
            <a href={pdf} download className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-600 px-6 py-3 font-semibold"><HiArrowDownTray />{copy.download}</a>
          </header>

          <div className="grid gap-5 lg:grid-cols-2">
            <Section title={copy.section.summary}><p className="text-white/70">{copy.summary}</p></Section>
            <Section title={copy.section.contact}><div className="space-y-2 text-sm"><a className="flex items-center gap-2 text-accent" href="https://mavisker.com" target="_blank" rel="noopener noreferrer">mavisker.com <HiArrowTopRightOnSquare /></a><a className="flex items-center gap-2 text-white/70 hover:text-accent" href={WHATSAPP_CONTACT.href} target="_blank" rel="noopener noreferrer">{WHATSAPP_CONTACT.label}<HiArrowTopRightOnSquare /></a>{SOCIAL_LINKS.map((social) => <a key={social.key} className="flex items-center gap-2 text-white/70 hover:text-accent" href={social.href} target="_blank" rel="noopener noreferrer">{social.label}<HiArrowTopRightOnSquare /></a>)}</div></Section>
            <Section title={copy.section.creative}><div className="flex flex-wrap gap-2">{copy.creativeSkills.map((skill) => <span key={skill} className="rounded-full bg-purple-500/10 px-3 py-2 text-xs text-purple-100">{skill}</span>)}</div></Section>
            <Section title={copy.section.technical}><div className="flex flex-wrap gap-2">{copy.technicalSkills.map((skill) => <span key={skill} className="rounded-full bg-fuchsia-500/10 px-3 py-2 text-xs text-fuchsia-100">{skill}</span>)}</div></Section>
            <Section title={copy.section.experience}><div className="space-y-5"><div><h3 className="font-semibold text-accent">{copy.creativeRole}</h3><p className="mt-2 text-sm text-white/65">{copy.creativeDescription}</p></div>{copy.experience.map(([role, years]) => <div key={role} className="border-l border-accent/40 pl-4"><h3 className="font-semibold">{role}</h3><p className="text-sm text-accent">{years}</p></div>)}</div></Section>
            <Section title={copy.section.selectedCreative}>
              <p className="text-sm text-white/65">{lang === "tr" ? "Sosyal medya içerik üretimi ve kampanya çalışmalarından seçili Instagram hesapları." : "Selected Instagram accounts featuring social media content production and campaign work."}</p>
              <div className="mt-4 space-y-2">
                {SOCIAL_MEDIA_SHOWCASE.map((account) => <a key={account.handle} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-sm text-white/75 transition hover:border-accent/50 hover:text-accent" href={account.href} target="_blank" rel="noopener noreferrer"><span>{account.label} <span className="text-xs text-accent">{account.handle}</span></span><HiArrowTopRightOnSquare /></a>)}
              </div>
              <Link href="/creative-work?category=social-media" className="mt-4 inline-flex text-sm font-semibold text-accent">{lang === "tr" ? "Tüm sosyal medya çalışmalarını gör" : "View all social media work"}</Link>
            </Section>
            <Section title={copy.section.selectedDevelopment}><div className="grid gap-2 sm:grid-cols-2">{DEVELOPMENT_PROJECTS.map((project) => <a key={project.url} href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl bg-black/15 px-3 py-2 text-sm hover:bg-white/10"><span>{project.title}</span><HiArrowTopRightOnSquare className="text-accent" /></a>)}</div></Section>
            <Section title={copy.section.tools}><div className="flex flex-wrap gap-2">{VERIFIED_TOOLS.map((tool) => <span key={tool} className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/70">{tool}</span>)}</div></Section>
          </div>
        </div>
      </main>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}

export default Resume;
