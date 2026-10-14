import { createContext, useContext, useEffect, useState } from "react";
import { IMAGES, CONTACT, FOCUS_AREAS, INITIATIVES } from "../data/site";

export const CONTENT_DEFAULTS = {
  contact: {
    email: CONTACT.email,
    location: CONTACT.location,
    instagram: CONTACT.instagram,
    instagram_handle: CONTACT.instagramHandle,
    linkedin: "",
  },
  hero: {
    line1: "Every Woman",
    line2: "Deserves the",
    line3: "Opportunity to",
    line4: "Shape Her Future.",
    subtext:
      "AVANI Foundation is being built to help women and girls turn their potential into opportunity through digital skills, AI, content creation, entrepreneurship, mentorship and access to opportunities.",
  },
  about: {
    para1:
      "AVANI Foundation is an emerging initiative dedicated to advancing women's empowerment, digital inclusion and economic independence.",
    para2:
      "We aim to bridge the gap between a woman's potential and the opportunities available to her. Through skills, guidance, mentorship and access to resources, AVANI seeks to help women and girls navigate a changing world with confidence and purpose.",
    para3:
      "Our approach recognises that every woman has her own aspirations. Our role is to help her discover those aspirations, build the capabilities to pursue them and access opportunities to realise them.",
    vision: "A world where every woman has the confidence to define her own future.",
    mission:
      "To bridge the gap between potential and opportunity by building confidence and equipping women with future-ready skills in AI, digital technologies, entrepreneurship and leadership — enabling meaningful careers, sustainable livelihoods and lifelong economic independence.",
  },
  images: {
    logo: "",
    hero: "",
    womenCircle: "",
    programmes: "",
    founderPortrait: "",
    founderEvent: "",
    founderG20: "",
  },
  focusAreas: FOCUS_AREAS.map(({ icon, title, tagline, text }) => ({
    icon,
    title,
    tagline,
    text,
  })),
  initiatives: INITIATIVES.map(({ icon, text }) => ({ icon, text })),
};

const IMAGE_DEFAULTS = {
  logo: IMAGES.logo,
  hero: IMAGES.girlTablet,
  womenCircle: IMAGES.womenCircle,
  programmes: IMAGES.programmes,
  founderPortrait: IMAGES.founderPortrait,
  founderEvent: IMAGES.founderEvent,
  founderG20: IMAGES.founderG20,
};

const pickNonEmpty = (defaults, overrides) => {
  const out = { ...defaults };
  if (!overrides) return out;
  Object.keys(out).forEach((k) => {
    if (typeof overrides[k] === "string" && overrides[k].trim() !== "") out[k] = overrides[k];
  });
  return out;
};

export const contentImg = (content, key) =>
  (content.images && content.images[key]) || IMAGE_DEFAULTS[key];

const ContentContext = createContext(CONTENT_DEFAULTS);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(CONTENT_DEFAULTS);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/content/site`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        setContent({
          contact: pickNonEmpty(CONTENT_DEFAULTS.contact, data.contact),
          hero: pickNonEmpty(CONTENT_DEFAULTS.hero, data.hero),
          about: pickNonEmpty(CONTENT_DEFAULTS.about, data.about),
          images: { ...CONTENT_DEFAULTS.images, ...(data.images || {}) },
          focusAreas:
            Array.isArray(data.focus_areas) && data.focus_areas.length
              ? data.focus_areas
              : CONTENT_DEFAULTS.focusAreas,
          initiatives:
            Array.isArray(data.initiatives) && data.initiatives.length
              ? data.initiatives
              : CONTENT_DEFAULTS.initiatives,
        });
      })
      .catch(() => {});
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);
