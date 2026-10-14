import { useEffect, useState } from "react";
import { Lock, LogOut, Save, LoaderCircle, Landmark, QrCode, ArrowLeft, Mail, Type, Image as ImageIcon, RotateCcw, Plus, Trash2, ArrowUp, ArrowDown, Layers, ListChecks } from "lucide-react";
import { toast } from "sonner";
import Seo from "./Seo";
import { CONTENT_DEFAULTS, contentImg } from "../lib/content";
import { ICON_OPTIONS, iconFor } from "../lib/icons";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const EMPTY = {
  account_name: "",
  account_number: "",
  ifsc: "",
  bank_branch: "",
  upi_id: "",
  qr_image: "",
};

const SITE_EMPTY = {
  contact: { email: "", location: "", instagram: "", instagram_handle: "", linkedin: "" },
  hero: { line1: "", line2: "", line3: "", line4: "", subtext: "" },
  about: { para1: "", para2: "", para3: "", vision: "", mission: "" },
  images: { hero: "", womenCircle: "", programmes: "", founderPortrait: "", founderEvent: "", founderG20: "" },
  focus_areas: [],
  initiatives: [],
};

const DONATE_FIELDS = [
  { key: "account_name", label: "Account Name", testId: "admin-account-name-input" },
  { key: "account_number", label: "Account Number", testId: "admin-account-number-input" },
  { key: "ifsc", label: "IFSC Code", testId: "admin-ifsc-input" },
  { key: "bank_branch", label: "Bank & Branch", testId: "admin-bank-branch-input" },
  { key: "upi_id", label: "UPI ID", testId: "admin-upi-id-input" },
];

const CONTACT_FIELDS = [
  { key: "email", label: "Contact Email (displayed on website)" },
  { key: "location", label: "Location" },
  { key: "instagram", label: "Instagram URL" },
  { key: "instagram_handle", label: "Instagram Handle (e.g. @avani_impact)" },
  { key: "linkedin", label: "LinkedIn URL (खाली छोड़ें तो Coming soon दिखेगा)" },
];

const IMAGE_SLOTS = [
  { key: "hero", label: "Home — Hero Image", hint: "1000×1250 px · portrait (4:5)" },
  { key: "womenCircle", label: "About — Community Circle", hint: "1200×1000 px · landscape" },
  { key: "programmes", label: "Programmes — Section Image", hint: "1200×800 px · landscape (3:2)" },
  { key: "founderPortrait", label: "Founder — Portrait", hint: "900×1100 px · portrait" },
  { key: "founderEvent", label: "Get Involved — Event Photo", hint: "1200×500 px · wide" },
  { key: "founderG20", label: "Founder — G20 Banner", hint: "1600×550 px · wide banner" },
];

export default function Admin() {
  const [auth, setAuth] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [content, setContent] = useState(EMPTY);
  const [site, setSite] = useState(SITE_EMPTY);
  const [saving, setSaving] = useState(false);
  const [savingSite, setSavingSite] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API}/admin/me`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : false))
      .then((data) => setAuth(data || false))
      .catch(() => setAuth(false));
  }, []);

  useEffect(() => {
    if (!auth) return;
    fetch(`${API}/content/donate`)
      .then((r) => r.json())
      .then((data) => setContent({ ...EMPTY, ...data }))
      .catch(() => toast.error("Could not load current donation details"));
    fetch(`${API}/content/site`)
      .then((r) => r.json())
      .then((data) => {
        if (!data) return;
        setSite({
          contact: { ...SITE_EMPTY.contact, ...(data.contact || {}) },
          hero: { ...SITE_EMPTY.hero, ...(data.hero || {}) },
          about: { ...SITE_EMPTY.about, ...(data.about || {}) },
          images: { ...SITE_EMPTY.images, ...(data.images || {}) },
          focus_areas:
            Array.isArray(data.focus_areas) && data.focus_areas.length
              ? data.focus_areas
              : CONTENT_DEFAULTS.focusAreas,
          initiatives:
            Array.isArray(data.initiatives) && data.initiatives.length
              ? data.initiatives
              : CONTENT_DEFAULTS.initiatives,
        });
      })
      .catch(() => toast.error("Could not load site content"));
  }, [auth]);

  const login = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const detail = data.detail;
        throw new Error(typeof detail === "string" ? detail : "Login failed");
      }
      setAuth(await res.json());
      toast.success("Welcome back, Admin");
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = async () => {
    await fetch(`${API}/admin/logout`, { method: "POST", credentials: "include" });
    setAuth(false);
    toast.success("Logged out");
  };

  const set = (key) => (e) => setContent({ ...content, [key]: e.target.value });
  const setSiteField = (section, key) => (e) =>
    setSite({ ...site, [section]: { ...site[section], [key]: e.target.value } });

  const setListItem = (listKey, idx, field) => (e) =>
    setSite((s) => ({
      ...s,
      [listKey]: s[listKey].map((it, i) =>
        i === idx ? { ...it, [field]: e.target.value } : it
      ),
    }));

  const moveListItem = (listKey, idx, dir) =>
    setSite((s) => {
      const arr = [...s[listKey]];
      const j = idx + dir;
      if (j < 0 || j >= arr.length) return s;
      [arr[idx], arr[j]] = [arr[j], arr[idx]];
      return { ...s, [listKey]: arr };
    });

  const removeListItem = (listKey, idx) =>
    setSite((s) => ({
      ...s,
      [listKey]: s[listKey].filter((_, i) => i !== idx),
    }));

  const addListItem = (listKey, blank) => {
    if (site[listKey].length >= 12) {
      toast.error("Maximum 12 items allowed");
      return;
    }
    setSite((s) => ({ ...s, [listKey]: [...s[listKey], blank] }));
  };

  const fileToBase64 = (file, cb) => {
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => cb(reader.result);
    reader.readAsDataURL(file);
  };

  const onQrFile = (e) => {
    const file = e.target.files?.[0];
    if (file) fileToBase64(file, (b64) => setContent((c) => ({ ...c, qr_image: b64 })));
  };

  const onImageFile = (key) => (e) => {
    const file = e.target.files?.[0];
    if (file)
      fileToBase64(file, (b64) =>
        setSite((s) => ({ ...s, images: { ...s.images, [key]: b64 } }))
      );
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/admin/content/donate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error();
      toast.success("Donation details updated — live on the website");
    } catch {
      toast.error("Save failed. Please log in again and retry.");
    } finally {
      setSaving(false);
    }
  };

  const saveSite = async () => {
    setSavingSite(true);
    try {
      const res = await fetch(`${API}/admin/content/site`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(site),
      });
      if (!res.ok) throw new Error();
      toast.success("Site content updated — live on the website");
    } catch {
      toast.error("Save failed. Please log in again and retry.");
    } finally {
      setSavingSite(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-avani-forest/15 bg-avani-ivory px-4 py-3 text-sm text-avani-slate placeholder:text-avani-muted/60 focus:outline-none focus:border-avani-gold focus:ring-2 focus:ring-avani-gold/20 transition-all duration-300";

  const fieldLabel = "block text-[10px] uppercase tracking-[0.22em] font-semibold text-avani-forest mb-2";

  const IconSelect = ({ value, onChange, testId }) => {
    const Current = iconFor(value);
    return (
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-avani-forest text-avani-goldsoft shrink-0">
          <Current className="w-4 h-4" />
        </span>
        <select
          data-testid={testId}
          value={value}
          onChange={onChange}
          className={inputCls}
        >
          {ICON_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const ListControls = ({ listKey, idx, total, name }) => (
    <div className="flex items-center gap-1.5">
      <button
        data-testid={`admin-${name}-${idx + 1}-up-btn`}
        onClick={() => moveListItem(listKey, idx, -1)}
        disabled={idx === 0}
        aria-label="Move up"
        className="flex items-center justify-center w-8 h-8 rounded-full border border-avani-forest/20 text-avani-forest transition-colors hover:bg-avani-forest hover:text-avani-goldsoft disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-avani-forest"
      >
        <ArrowUp className="w-3.5 h-3.5" />
      </button>
      <button
        data-testid={`admin-${name}-${idx + 1}-down-btn`}
        onClick={() => moveListItem(listKey, idx, 1)}
        disabled={idx === total - 1}
        aria-label="Move down"
        className="flex items-center justify-center w-8 h-8 rounded-full border border-avani-forest/20 text-avani-forest transition-colors hover:bg-avani-forest hover:text-avani-goldsoft disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-avani-forest"
      >
        <ArrowDown className="w-3.5 h-3.5" />
      </button>
      <button
        data-testid={`admin-${name}-${idx + 1}-delete-btn`}
        onClick={() => removeListItem(listKey, idx)}
        aria-label="Delete"
        className="flex items-center justify-center w-8 h-8 rounded-full border border-red-200 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  const SiteInput = ({ section, field, label, textarea = false }) => (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.22em] font-semibold text-avani-forest mb-2">
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={3}
          value={site[section][field.key]}
          onChange={setSiteField(section, field.key)}
          placeholder={CONTENT_DEFAULTS[section][field.key]}
          className={`${inputCls} resize-none`}
        />
      ) : (
        <input
          value={site[section][field.key]}
          onChange={setSiteField(section, field.key)}
          placeholder={CONTENT_DEFAULTS[section][field.key]}
          className={inputCls}
        />
      )}
    </div>
  );

  return (
    <div data-testid="admin-page" className="min-h-screen bg-avani-ivory">
      <Seo
        title="Admin — AVANI Foundation"
        description="AVANI Foundation website content editor."
        canonical="https://avanifoundation.org/admin"
      />
      <header className="bg-avani-deep border-b border-avani-gold/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <span className="leading-none">
            <span className="block font-serif text-xl tracking-[0.18em] text-avani-ivory">
              AVANI
            </span>
            <span className="block text-[8px] tracking-[0.42em] text-avani-gold mt-0.5">
              CONTENT EDITOR
            </span>
          </span>
          <div className="flex items-center gap-3">
            <a
              href="/"
              data-testid="admin-back-home-btn"
              className="flex items-center gap-2 rounded-full border border-avani-ivory/25 px-4 py-2 text-xs font-semibold text-avani-ivory transition-all duration-300 hover:bg-avani-ivory hover:text-avani-forest"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Website
            </a>
            {auth && (
              <button
                data-testid="admin-logout-btn"
                onClick={logout}
                className="flex items-center gap-2 rounded-full bg-avani-gold px-4 py-2 text-xs font-semibold text-avani-deep transition-colors hover:bg-avani-goldsoft"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {auth === null && (
          <p className="text-center text-avani-muted text-sm">Loading…</p>
        )}

        {auth === false && (
          <form
            data-testid="admin-login-form"
            onSubmit={login}
            className="max-w-md mx-auto bg-avani-cream border border-avani-forest/10 rounded-[2rem] p-8 sm:p-10"
          >
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-avani-forest text-avani-goldsoft mx-auto">
              <Lock className="w-5 h-5" />
            </span>
            <h1
              data-testid="admin-login-heading"
              className="mt-5 text-center font-serif uppercase text-2xl text-avani-forest tracking-tight"
            >
              Admin Login
            </h1>
            <p className="mt-2 text-center text-xs text-avani-muted">
              AVANI Foundation — Website Content Editor
            </p>
            <div className="mt-8 space-y-4">
              <input
                data-testid="admin-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin email"
                className={inputCls}
              />
              <input
                data-testid="admin-password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={inputCls}
              />
              {loginError && (
                <p data-testid="admin-login-error" className="text-xs text-red-600">
                  {loginError}
                </p>
              )}
              <button
                data-testid="admin-login-btn"
                type="submit"
                disabled={loggingIn}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-avani-leaf px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#B08A20] disabled:opacity-60"
              >
                {loggingIn ? <LoaderCircle className="w-4 h-4 animate-spin" /> : "Log In"}
              </button>
            </div>
          </form>
        )}

        {auth && (
          <div data-testid="admin-editor" className="space-y-10">
            {/* Donate page */}
            <section>
              <h1
                data-testid="admin-editor-heading"
                className="font-serif uppercase text-2xl sm:text-3xl text-avani-forest tracking-tight"
              >
                Donate Page Content
              </h1>
              <p className="mt-2 text-sm text-avani-muted max-w-xl">
                यहाँ बदली गई details तुरंत website के Donate page पर live हो जाती हैं।
              </p>

              <div className="mt-6 bg-avani-cream border border-avani-forest/10 rounded-[2rem] p-7 sm:p-9">
                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-avani-forest">
                  <Landmark className="w-4 h-4 text-avani-amber" />
                  Bank & UPI Details
                </p>
                <div className="mt-5 grid sm:grid-cols-2 gap-5">
                  {DONATE_FIELDS.map((f) => (
                    <div key={f.key}>
                      <label className="block text-[10px] uppercase tracking-[0.22em] font-semibold text-avani-forest mb-2">
                        {f.label}
                      </label>
                      <input
                        data-testid={f.testId}
                        value={content[f.key]}
                        onChange={set(f.key)}
                        className={inputCls}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-avani-forest">
                    <QrCode className="w-4 h-4 text-avani-amber" />
                    UPI QR Code Image
                    <span className="normal-case tracking-normal text-avani-muted font-normal">
                      — Recommended: 500×500 px · square
                    </span>
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row items-start gap-6">
                    <label
                      data-testid="admin-qr-upload-label"
                      className="cursor-pointer rounded-full border border-avani-forest/30 px-6 py-3 text-sm font-semibold text-avani-forest transition-all duration-300 hover:bg-avani-forest hover:text-avani-goldsoft"
                    >
                      {content.qr_image ? "Change QR Image" : "Upload QR Image"}
                      <input
                        data-testid="admin-qr-input"
                        type="file"
                        accept="image/*"
                        onChange={onQrFile}
                        className="hidden"
                      />
                    </label>
                    {content.qr_image ? (
                      <img
                        src={content.qr_image}
                        alt="UPI QR preview"
                        data-testid="admin-qr-preview"
                        className="w-36 h-36 object-contain rounded-2xl border border-avani-forest/15 bg-white p-2"
                      />
                    ) : (
                      <p className="text-xs text-avani-muted self-center">
                        कोई QR अभी upload नहीं है — PNG/JPG, max 2 MB
                      </p>
                    )}
                  </div>
                </div>

                <button
                  data-testid="admin-save-btn"
                  onClick={save}
                  disabled={saving}
                  className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-avani-leaf px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#B08A20] disabled:opacity-60"
                >
                  {saving ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save & Publish
                </button>
              </div>
            </section>

            {/* Contact info */}
            <section>
              <h2 className="font-serif uppercase text-2xl sm:text-3xl text-avani-forest tracking-tight">
                Contact Info & Social Links
              </h2>
              <p className="mt-2 text-sm text-avani-muted max-w-xl">
                Contact section और footer में दिखने वाली details। खाली field = website पर default text दिखेगा।
              </p>
              <div className="mt-6 bg-avani-cream border border-avani-forest/10 rounded-[2rem] p-7 sm:p-9">
                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-avani-forest">
                  <Mail className="w-4 h-4 text-avani-amber" />
                  Contact Details
                </p>
                <div className="mt-5 grid sm:grid-cols-2 gap-5">
                  {CONTACT_FIELDS.map((f) => (
                    <div key={f.key}>
                      <label className="block text-[10px] uppercase tracking-[0.22em] font-semibold text-avani-forest mb-2">
                        {f.label}
                      </label>
                      <input
                        data-testid={`admin-contact-${f.key}-input`}
                        value={site.contact[f.key]}
                        onChange={setSiteField("contact", f.key)}
                        placeholder={CONTENT_DEFAULTS.contact[f.key] || ""}
                        className={inputCls}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Hero & About text */}
            <section>
              <h2 className="font-serif uppercase text-2xl sm:text-3xl text-avani-forest tracking-tight">
                Website Text
              </h2>
              <p className="mt-2 text-sm text-avani-muted max-w-xl">
                Home page की headline और About section का text। खाली field = default text।
              </p>
              <div className="mt-6 bg-avani-cream border border-avani-forest/10 rounded-[2rem] p-7 sm:p-9 space-y-6">
                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-avani-forest">
                  <Type className="w-4 h-4 text-avani-amber" />
                  Hero Section
                </p>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { key: "line1", label: "Headline Line 1" },
                    { key: "line2", label: "Headline Line 2" },
                    { key: "line3", label: "Headline Line 3" },
                    { key: "line4", label: "Headline Line 4 (gold italic)" },
                  ].map((f) => (
                    <SiteInput key={f.key} section="hero" field={f} label={f.label} />
                  ))}
                </div>
                <SiteInput section="hero" field={{ key: "subtext" }} label="Hero Paragraph" textarea />

                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-avani-forest pt-4">
                  <Type className="w-4 h-4 text-avani-amber" />
                  About Section
                </p>
                <SiteInput section="about" field={{ key: "para1" }} label="Paragraph 1" textarea />
                <SiteInput section="about" field={{ key: "para2" }} label="Paragraph 2" textarea />
                <SiteInput section="about" field={{ key: "para3" }} label="Paragraph 3" textarea />
                <SiteInput section="about" field={{ key: "vision" }} label="Our Vision" textarea />
                <SiteInput section="about" field={{ key: "mission" }} label="Our Mission" textarea />
              </div>
            </section>

            {/* Focus Areas */}
            <section>
              <h2 className="font-serif uppercase text-2xl sm:text-3xl text-avani-forest tracking-tight">
                Focus Areas
              </h2>
              <p className="mt-2 text-sm text-avani-muted max-w-xl">
                Home page के Focus Area cards — नया add करें, edit करें, delete करें या ऊपर/नीचे shift करें (अधिकतम 12)। Save करने के बाद website पर live हो जाएगा।
              </p>
              <div className="mt-6 space-y-5">
                {site.focus_areas.map((area, idx) => (
                  <div
                    key={idx}
                    data-testid={`admin-focus-area-${idx + 1}`}
                    className="bg-avani-cream border border-avani-forest/10 rounded-[2rem] p-6 sm:p-7"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-avani-forest">
                        <Layers className="w-4 h-4 text-avani-amber" />
                        Focus Area {idx + 1}
                      </p>
                      <ListControls listKey="focus_areas" idx={idx} total={site.focus_areas.length} name="focus-area" />
                    </div>
                    <div className="mt-5 grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={fieldLabel}>Icon</label>
                        <IconSelect
                          testId={`admin-focus-area-${idx + 1}-icon-select`}
                          value={area.icon}
                          onChange={setListItem("focus_areas", idx, "icon")}
                        />
                      </div>
                      <div>
                        <label className={fieldLabel}>Title</label>
                        <input
                          data-testid={`admin-focus-area-${idx + 1}-title-input`}
                          value={area.title}
                          maxLength={120}
                          onChange={setListItem("focus_areas", idx, "title")}
                          placeholder="e.g. Digital Careers & Creator Economy"
                          className={inputCls}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className={fieldLabel}>Tagline (italic line under title)</label>
                      <input
                        data-testid={`admin-focus-area-${idx + 1}-tagline-input`}
                        value={area.tagline}
                        maxLength={200}
                        onChange={setListItem("focus_areas", idx, "tagline")}
                        placeholder="e.g. Helping women turn digital access into opportunities."
                        className={inputCls}
                      />
                    </div>
                    <div className="mt-4">
                      <label className={fieldLabel}>Detail Text (card खोलने पर दिखता है)</label>
                      <textarea
                        data-testid={`admin-focus-area-${idx + 1}-text-input`}
                        rows={3}
                        maxLength={1500}
                        value={area.text}
                        onChange={setListItem("focus_areas", idx, "text")}
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                  </div>
                ))}
                <button
                  data-testid="admin-add-focus-area-btn"
                  onClick={() =>
                    addListItem("focus_areas", { icon: "sparkles", title: "", tagline: "", text: "" })
                  }
                  className="inline-flex items-center gap-2 rounded-full border border-dashed border-avani-forest/30 px-6 py-3 text-sm font-semibold text-avani-forest transition-all duration-300 hover:bg-avani-forest hover:text-avani-goldsoft"
                >
                  <Plus className="w-4 h-4" />
                  Add Focus Area
                </button>
              </div>
            </section>

            {/* Programmes — Initiatives */}
            <section>
              <h2 className="font-serif uppercase text-2xl sm:text-3xl text-avani-forest tracking-tight">
                Programmes — Initiatives
              </h2>
              <p className="mt-2 text-sm text-avani-muted max-w-xl">
                Programmes section की "Our future initiatives" list — add, edit, delete या reorder करें (अधिकतम 12)।
              </p>
              <div className="mt-6 space-y-5">
                {site.initiatives.map((item, idx) => (
                  <div
                    key={idx}
                    data-testid={`admin-initiative-${idx + 1}`}
                    className="bg-avani-cream border border-avani-forest/10 rounded-[2rem] p-6 sm:p-7"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-avani-forest">
                        <ListChecks className="w-4 h-4 text-avani-amber" />
                        Initiative {idx + 1}
                      </p>
                      <ListControls listKey="initiatives" idx={idx} total={site.initiatives.length} name="initiative" />
                    </div>
                    <div className="mt-5 grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={fieldLabel}>Icon</label>
                        <IconSelect
                          testId={`admin-initiative-${idx + 1}-icon-select`}
                          value={item.icon}
                          onChange={setListItem("initiatives", idx, "icon")}
                        />
                      </div>
                      <div>
                        <label className={fieldLabel}>Text</label>
                        <input
                          data-testid={`admin-initiative-${idx + 1}-text-input`}
                          value={item.text}
                          maxLength={300}
                          onChange={setListItem("initiatives", idx, "text")}
                          placeholder="e.g. Digital and AI skills workshops."
                          className={inputCls}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  data-testid="admin-add-initiative-btn"
                  onClick={() => addListItem("initiatives", { icon: "sparkles", text: "" })}
                  className="inline-flex items-center gap-2 rounded-full border border-dashed border-avani-forest/30 px-6 py-3 text-sm font-semibold text-avani-forest transition-all duration-300 hover:bg-avani-forest hover:text-avani-goldsoft"
                >
                  <Plus className="w-4 h-4" />
                  Add Initiative
                </button>
              </div>
            </section>

            {/* Images */}
            <section>
              <h2 className="font-serif uppercase text-2xl sm:text-3xl text-avani-forest tracking-tight">
                Website Images
              </h2>
              <p className="mt-2 text-sm text-avani-muted max-w-xl">
                कोई भी photo बदलें — PNG/JPG, max 2 MB। हर photo के नीचे उसका recommended size लिखा है। "Use Default" से मूल photo वापस आ जाती है।
              </p>
              <div className="mt-6 bg-avani-cream border border-avani-forest/10 rounded-[2rem] p-7 sm:p-9">
                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-avani-forest">
                  <ImageIcon className="w-4 h-4 text-avani-amber" />
                  Photos
                </p>
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {IMAGE_SLOTS.map((slot) => (
                    <div key={slot.key} className="border border-avani-forest/10 rounded-2xl p-4 bg-white">
                      <img
                        src={contentImg({ images: site.images }, slot.key)}
                        alt={slot.label}
                        data-testid={`admin-image-preview-${slot.key}`}
                        className="w-full h-32 object-cover rounded-xl border border-avani-forest/10"
                      />
                      <p className="mt-3 text-xs font-semibold text-avani-forest">{slot.label}</p>
                      <p data-testid={`admin-image-hint-${slot.key}`} className="mt-0.5 text-[10px] text-avani-muted">
                        Recommended: {slot.hint}
                      </p>
                      {site.images[slot.key] && (
                        <p className="text-[10px] text-avani-amber">Custom image active</p>
                      )}
                      <div className="mt-3 flex items-center gap-2">
                        <label
                          data-testid={`admin-image-upload-${slot.key}`}
                          className="cursor-pointer rounded-full border border-avani-forest/30 px-4 py-2 text-xs font-semibold text-avani-forest transition-all duration-300 hover:bg-avani-forest hover:text-avani-goldsoft"
                        >
                          Change
                          <input
                            type="file"
                            accept="image/*"
                            onChange={onImageFile(slot.key)}
                            className="hidden"
                          />
                        </label>
                        {site.images[slot.key] && (
                          <button
                            data-testid={`admin-image-reset-${slot.key}`}
                            onClick={() =>
                              setSite((s) => ({ ...s, images: { ...s.images, [slot.key]: "" } }))
                            }
                            className="flex items-center gap-1 rounded-full border border-avani-forest/15 px-3 py-2 text-xs text-avani-muted hover:text-avani-forest transition-colors"
                          >
                            <RotateCcw className="w-3 h-3" />
                            Default
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <button
              data-testid="admin-save-site-btn"
              onClick={saveSite}
              disabled={savingSite}
              className="inline-flex items-center gap-2.5 rounded-full bg-avani-forest px-8 py-4 text-sm font-semibold text-avani-ivory transition-all duration-300 hover:bg-avani-moss disabled:opacity-60"
            >
              {savingSite ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save All Website Content
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
