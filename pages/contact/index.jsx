import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import { BsArrowRight } from "react-icons/bs";
import Seo from "../../components/Seo";
import { SOCIAL_LINKS } from "../../lib/content";

const copy = {
  en: { eyebrow: "Start a project", title: "Let’s work together.", description: "Tell me about your software, AI video, editing or design project. I’ll respond through the contact channel configured for this site.", name: "Name", email: "Email", subject: "Subject", message: "Message", submit: "Send message", success: "Your message was sent successfully.", failed: "The message could not be sent. Please use one of the professional links below.", unavailable: "The contact form is being configured. You can reach me through the verified professional links below." },
  tr: { eyebrow: "Bir proje başlatın", title: "Birlikte çalışalım.", description: "Yazılım, yapay zekâ video, kurgu veya tasarım projenizden bahsedin. Bu site için yapılandırılmış iletişim kanalı üzerinden yanıt vereceğim.", name: "İsim", email: "E-posta", subject: "Konu", message: "Mesaj", submit: "Mesaj gönder", success: "Mesajınız başarıyla gönderildi.", failed: "Mesaj gönderilemedi. Lütfen aşağıdaki profesyonel bağlantılardan birini kullanın.", unavailable: "İletişim formu yapılandırılıyor. Aşağıdaki doğrulanmış profesyonel bağlantılardan bana ulaşabilirsiniz." },
};

const Contact = () => {
  /** @type {React.MutableRefObject<HTMLFormElement | null>} */
  const form = useRef(null);
  const { locale } = useRouter();
  const lang = locale === "tr" ? "tr" : "en";
  const content = copy[lang];
  const [status, setStatus] = useState({ sending: false, type: "", message: "" });
  const config = {
    service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    key: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  };
  const configured = Boolean(config.service && config.template && config.key);

  const sendEmail = async (event) => {
    event.preventDefault();
    if (!configured) return setStatus({ sending: false, type: "error", message: content.unavailable });
    setStatus({ sending: true, type: "", message: "" });
    try {
      await emailjs.sendForm(config.service, config.template, form.current, config.key);
      if (form.current) form.current.reset();
      setStatus({ sending: false, type: "success", message: content.success });
    } catch {
      setStatus({ sending: false, type: "error", message: content.failed });
    }
  };

  return (
    <>
      <Seo page="contact" />
      <section className="min-h-screen bg-primary/30 px-4 pb-28 pt-32 sm:px-8 xl:pb-16 xl:pr-28">
        <div className="container mx-auto grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/40 to-fuchsia-950/20 p-6 backdrop-blur-md sm:p-9">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-accent">{content.eyebrow}</p>
            <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-6xl">{content.title}</h1>
            <p className="mb-8 text-white/70">{content.description}</p>
            <div className="space-y-2">{SOCIAL_LINKS.map((social) => <a key={social.key} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm hover:border-accent"><span>{social.label}</span><BsArrowRight aria-hidden="true" /></a>)}</div>
          </div>
          <form ref={form} onSubmit={sendEmail} className="rounded-3xl border border-white/10 bg-[#191a31]/75 p-6 backdrop-blur-md sm:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium">{content.name}<input required type="text" name="name" autoComplete="name" className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3" /></label>
              <label className="text-sm font-medium">{content.email}<input required type="email" name="email" autoComplete="email" className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3" /></label>
            </div>
            <label className="mt-5 block text-sm font-medium">{content.subject}<input required type="text" name="subject" className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3" /></label>
            <label className="mt-5 block text-sm font-medium">{content.message}<textarea required name="message" rows={7} className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-black/20 px-4 py-3" /></label>
            {!configured && !status.message ? <p className="mt-4 text-sm text-amber-200/80">{content.unavailable}</p> : null}
            {status.message ? <p role="status" aria-live="polite" className={`mt-4 rounded-xl p-3 text-sm ${status.type === "success" ? "bg-green-500/15 text-green-200" : "bg-red-500/15 text-red-200"}`}>{status.message}</p> : null}
            <button disabled={status.sending || !configured} className="mt-6 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-700 to-fuchsia-600 px-7 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-45">{status.sending ? "…" : content.submit}<BsArrowRight aria-hidden="true" /></button>
          </form>
        </div>
      </section>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}

export default Contact;
