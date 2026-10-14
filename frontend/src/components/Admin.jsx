import { useEffect, useState } from "react";
import { Lock, LogOut, Save, LoaderCircle, Landmark, QrCode, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Seo from "./Seo";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const EMPTY = {
  account_name: "",
  account_number: "",
  ifsc: "",
  bank_branch: "",
  upi_id: "",
  qr_image: "",
};

const FIELDS = [
  { key: "account_name", label: "Account Name", testId: "admin-account-name-input" },
  { key: "account_number", label: "Account Number", testId: "admin-account-number-input" },
  { key: "ifsc", label: "IFSC Code", testId: "admin-ifsc-input" },
  { key: "bank_branch", label: "Bank & Branch", testId: "admin-bank-branch-input" },
  { key: "upi_id", label: "UPI ID", testId: "admin-upi-id-input" },
];

export default function Admin() {
  const [auth, setAuth] = useState(null); // null = checking, false = logged out, object = admin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [content, setContent] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

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

  const onQrFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("QR image must be under 2 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setContent((c) => ({ ...c, qr_image: reader.result }));
    reader.readAsDataURL(file);
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

  const inputCls =
    "w-full rounded-xl border border-avani-forest/15 bg-avani-ivory px-4 py-3 text-sm text-avani-slate placeholder:text-avani-muted/60 focus:outline-none focus:border-avani-gold focus:ring-2 focus:ring-avani-gold/20 transition-all duration-300";

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
          <div data-testid="admin-editor">
            <h1
              data-testid="admin-editor-heading"
              className="font-serif uppercase text-2xl sm:text-3xl text-avani-forest tracking-tight"
            >
              Donate Page Content
            </h1>
            <p className="mt-2 text-sm text-avani-muted max-w-xl">
              यहाँ बदली गई details तुरंत website के Donate page पर live हो जाती हैं।
            </p>

            <div className="mt-8 bg-avani-cream border border-avani-forest/10 rounded-[2rem] p-7 sm:p-9">
              <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-semibold text-avani-forest">
                <Landmark className="w-4 h-4 text-avani-amber" />
                Bank & UPI Details
              </p>
              <div className="mt-5 grid sm:grid-cols-2 gap-5">
                {FIELDS.map((f) => (
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
                {saving ? (
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save & Publish
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
