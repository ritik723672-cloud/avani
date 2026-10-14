import {
  PenTool,
  Cpu,
  Landmark,
  Store,
  Megaphone,
  Leaf,
  Salad,
  Compass,
  Sparkles,
  Heart,
  BookOpen,
  GraduationCap,
  Globe2,
  Users,
  Lightbulb,
  HandHeart,
  Briefcase,
  ShieldCheck,
  Sprout,
  Rocket,
  Target,
  Coins,
  Palette,
  Camera,
  Mic,
} from "lucide-react";

// Curated icon set for CMS-editable lists (Focus Areas / Programmes).
// Stored in MongoDB as the `value` string; resolved to a component at render time.
export const ICON_OPTIONS = [
  { value: "pen-tool", label: "Content / Pen", component: PenTool },
  { value: "cpu", label: "Technology / AI", component: Cpu },
  { value: "landmark", label: "Government / Bank", component: Landmark },
  { value: "store", label: "Business / Store", component: Store },
  { value: "megaphone", label: "Voice / Leadership", component: Megaphone },
  { value: "leaf", label: "Nature / Climate", component: Leaf },
  { value: "salad", label: "Nutrition / Food", component: Salad },
  { value: "compass", label: "Guidance / Career", component: Compass },
  { value: "sparkles", label: "Sparkles", component: Sparkles },
  { value: "heart", label: "Care / Heart", component: Heart },
  { value: "book-open", label: "Education / Book", component: BookOpen },
  { value: "graduation-cap", label: "Study / Degree", component: GraduationCap },
  { value: "globe", label: "Global / World", component: Globe2 },
  { value: "users", label: "Community / People", component: Users },
  { value: "lightbulb", label: "Ideas / Innovation", component: Lightbulb },
  { value: "hand-heart", label: "Support / Giving", component: HandHeart },
  { value: "briefcase", label: "Jobs / Work", component: Briefcase },
  { value: "shield-check", label: "Safety / Trust", component: ShieldCheck },
  { value: "sprout", label: "Growth / Sprout", component: Sprout },
  { value: "rocket", label: "Launch / Rocket", component: Rocket },
  { value: "target", label: "Goals / Target", component: Target },
  { value: "coins", label: "Finance / Money", component: Coins },
  { value: "palette", label: "Art / Creativity", component: Palette },
  { value: "camera", label: "Media / Camera", component: Camera },
  { value: "mic", label: "Speaking / Mic", component: Mic },
];

export const ICONS = Object.fromEntries(
  ICON_OPTIONS.map((o) => [o.value, o.component])
);

export const iconFor = (name) => ICONS[name] || Sparkles;
