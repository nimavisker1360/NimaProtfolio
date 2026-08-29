import Head from "next/head";
import { useRouter } from "next/router";
import { PAGE_META, SITE_URL } from "../lib/content";

const Seo = ({ page = "home", noindex = false }) => {
  const router = useRouter();
  const locale = router.locale === "tr" ? "tr" : "en";
  const meta = PAGE_META[page]?.[locale] || PAGE_META.home[locale];
  const path = router.asPath.split("?")[0];
  const canonical = `${SITE_URL}${locale === "en" ? "" : "/tr"}${path === "/" ? "" : path}`;
  const image = `${SITE_URL}/LOGO.png`;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}${path === "/" ? "" : path}`} />
      <link rel="alternate" hrefLang="tr" href={`${SITE_URL}/tr${path === "/" ? "" : path}`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path === "/" ? "" : path}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Nima Bagheri" />
      <meta property="og:locale" content={locale === "tr" ? "tr_TR" : "en_US"} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default Seo;
