import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const STATIC_META_IDS = [
  "seo-desc",
  "seo-canonical",
  "seo-og-title",
  "seo-og-desc",
  "seo-og-url",
  "seo-tw-title",
  "seo-tw-desc",
];

export default function Seo({ title, description, canonical }) {
  useEffect(() => {
    const removed = [];
    STATIC_META_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        removed.push(el);
        el.remove();
      }
    });
    return () => {
      removed.forEach((el) => document.head.appendChild(el));
    };
  }, []);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
