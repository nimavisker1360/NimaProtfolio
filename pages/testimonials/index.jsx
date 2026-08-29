import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import Seo from "../../components/Seo";

const Testimonials = () => {
  const { locale } = useRouter();
  const tr = locale === "tr";
  return (
    <>
      <Seo page="testimonials" />
      <section className="flex min-h-screen items-center bg-primary/30 px-4 pb-28 pt-32 sm:px-8 xl:pb-16 xl:pr-28">
        <div className="container mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[#191a31]/75 p-8 text-center backdrop-blur-md sm:p-14">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-accent">{tr ? "Referanslar" : "Testimonials"}</p>
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">{tr ? "Doğrulanmış geri bildirimler" : "Verified client feedback"}</h1>
          <p className="text-white/65">{tr ? "Bu bölüm yalnızca doğrulanmış ve yayınlanması onaylanmış müşteri geri bildirimlerini gösterecektir. Şu anda yayınlanmış bir referans bulunmuyor." : "This section is reserved for verified client feedback approved for publication. No testimonials are currently published."}</p>
        </div>
      </section>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}

export default Testimonials;
