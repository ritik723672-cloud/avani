import { useEffect, useState } from "react";
import { Landmark, Smartphone, QrCode, Copy, ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { IMAGES, CONTACT } from "../data/site";
import { Reveal } from "./Reveal";
import Seo from "./Seo";
import Footer from "./Footer";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Fallbacks if the CMS content has not been saved yet
const DEFAULTS = {
  accountName: "AVANI Foundation",
  accountNumber: "XXXX XXXX XXXX",
  ifsc: "XXXX0000000",
  bankBranch: "To be updated",
  upiId: "avanifoundation@upi",
  qrImage: "",
};

export default function Donate() {
  const [bank, setBank] = useState(DEFAULTS);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API}/content/donate`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        setBank({
          accountName: data.account_name || DEFAULTS.accountName,
          accountNumber: data.account_number || DEFAULTS.accountNumber,
          ifsc: data.ifsc || DEFAULTS.ifsc,
          bankBranch: data.bank_branch || DEFAULTS.bankBranch,
          upiId: data.upi_id || DEFAULTS.upiId,
          qrImage: data.qr_image || "",
        });
      })
      .catch(() => {});
  }, []);

  const copy = (text, label) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success(`${label} copied`))
      .catch(() => toast.error("Could not copy — please copy it manually"));
  };

  return (
    <div data-testid="donate-page" className="bg-avani-ivory min-h-screen">
      <Seo
        title="Donate to AVANI Foundation — Support Women's Empowerment"
        description="Support AVANI Foundation with a donation via bank transfer or UPI. Your contribution brings digital skills, mentorship and opportunity to women and girls in India."
        canonical="https://avanifoundation.org/donate"
      />
      <header className="bg-avani-deep border-b border-avani-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-avani-ivory rounded-xl p-1 inline-flex">
              <img
                src={IMAGES.logo}
                alt="AVANI Foundation logo"
                className="h-10 w-10 object-cover object-top rounded-lg"
              />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-xl tracking-[0.18em] text-avani-ivory">
                AVANI
              </span>
              <span className="block text-[8px] tracking-[0.42em] text-avani-gold mt-0.5">
                FOUNDATION
              </span>
            </span>
          </div>
          <a
            href="/"
            data-testid="donate-back-home-btn"
            className="group flex items-center gap-2 rounded-full border border-avani-ivory/25 px-5 py-2.5 text-[13px] font-semibold text-avani-ivory transition-all duration-300 hover:bg-avani-ivory hover:text-avani-forest"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to Home
          </a>
        </div>
      </header>

      <section className="grain relative bg-avani-ivory py-16 lg:py-24 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[32rem] h-[32rem] rounded-full bg-avani-leaf/10 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[26rem] h-[26rem] rounded-full bg-avani-gold/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-avani-moss">
              Support AVANI
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              data-testid="donate-heading"
              className="mt-4 font-serif uppercase text-3xl sm:text-4xl lg:text-5xl text-avani-forest tracking-tight leading-[1.08] max-w-3xl"
            >
              Your Contribution{" "}
              <span className="italic normal-case text-avani-leaf">
                Shapes Her Future.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-avani-muted">
              Every contribution helps us bring digital skills, mentorship and
              opportunity to women and girls who need them most. Donate via
              bank transfer or UPI — whichever is easier for you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Reveal className="h-full">
            <div
              data-testid="donate-bank-card"
              className="group relative h-full bg-white border border-avani-forest/10 rounded-3xl p-8 overflow-hidden hover:border-avani-gold/60 hover:shadow-xl hover:shadow-avani-forest/10 transition-all duration-500"
            >
              <span className="absolute top-0 left-0 h-1 w-10 bg-avani-gold/70 group-hover:w-full transition-all duration-700" />
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-avani-forest text-avani-goldsoft">
                <Landmark className="w-5 h-5" />
              </span>
              <h2 className="mt-5 font-serif uppercase text-xl tracking-wide text-avani-forest">
                Bank Transfer
              </h2>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-avani-muted">
                    Account Name
                  </dt>
                  <dd className="mt-1 font-medium text-avani-slate">{bank.accountName}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-avani-muted">
                    Account Number
                  </dt>
                  <dd className="mt-1 font-medium text-avani-slate" data-testid="donate-account-number">
                    {bank.accountNumber}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-avani-muted">
                    IFSC Code
                  </dt>
                  <dd className="mt-1 font-medium text-avani-slate" data-testid="donate-ifsc">
                    {bank.ifsc}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-avani-muted">
                    Bank & Branch
                  </dt>
                  <dd className="mt-1 font-medium text-avani-muted">{bank.bankBranch}</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="h-full">
            <div
              data-testid="donate-upi-card"
              className="group relative h-full bg-avani-forest border border-avani-gold/25 rounded-3xl p-8 overflow-hidden hover:shadow-xl hover:shadow-avani-forest/25 transition-all duration-500"
            >
              <span className="absolute top-0 left-0 h-1 w-10 bg-avani-gold group-hover:w-full transition-all duration-700" />
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-avani-gold text-avani-deep">
                <Smartphone className="w-5 h-5" />
              </span>
              <h2 className="mt-5 font-serif uppercase text-xl tracking-wide text-avani-ivory">
                UPI
              </h2>
              <p className="mt-2 text-sm text-avani-ivory/60">
                Works with GPay, PhonePe, Paytm and any UPI app
              </p>
              <div className="mt-6 bg-avani-deep/60 border border-avani-gold/20 rounded-2xl px-5 py-4 flex items-center justify-between gap-3">
                <span
                  data-testid="donate-upi-id"
                  className="font-mono text-sm text-avani-goldsoft truncate"
                >
                  {bank.upiId}
                </span>
                <button
                  data-testid="donate-upi-copy-btn"
                  onClick={() => copy(bank.upiId, "UPI ID")}
                  className="shrink-0 flex items-center gap-1.5 rounded-full bg-avani-gold px-4 py-2 text-xs font-semibold text-avani-deep transition-colors duration-300 hover:bg-avani-goldsoft"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.24} className="h-full">
            <div
              data-testid="donate-qr-card"
              className="group relative h-full bg-white border border-avani-forest/10 rounded-3xl p-8 overflow-hidden hover:border-avani-gold/60 hover:shadow-xl hover:shadow-avani-forest/10 transition-all duration-500"
            >
              <span className="absolute top-0 left-0 h-1 w-10 bg-avani-gold/70 group-hover:w-full transition-all duration-700" />
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-avani-forest text-avani-goldsoft">
                <QrCode className="w-5 h-5" />
              </span>
              <h2 className="mt-5 font-serif uppercase text-xl tracking-wide text-avani-forest">
                Scan & Pay
              </h2>
              {bank.qrImage ? (
                <div className="mt-6 aspect-square rounded-2xl border border-avani-forest/15 bg-white flex items-center justify-center p-4">
                  <img
                    src={bank.qrImage}
                    alt="AVANI Foundation UPI QR code"
                    data-testid="donate-qr-image"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="mt-6 aspect-square rounded-2xl border-2 border-dashed border-avani-forest/20 bg-avani-cream/60 flex flex-col items-center justify-center gap-3">
                  <QrCode className="w-10 h-10 text-avani-forest/30" />
                  <p className="text-xs text-avani-muted text-center px-6">
                    UPI QR code coming soon — please donate via UPI ID until then
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <div className="bg-avani-cream border border-avani-gold/30 rounded-3xl p-7 sm:p-9 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-avani-forest text-avani-goldsoft shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <p className="text-sm leading-relaxed text-avani-slate">
                After donating, email your transaction reference to{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  data-testid="donate-receipt-email-link"
                  className="font-semibold text-avani-forest underline decoration-avani-gold underline-offset-4 hover:text-avani-amber transition-colors"
                >
                  {CONTACT.email}
                </a>{" "}
                and we will send your receipt.
              </p>
              <span className="sm:ml-auto flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-avani-muted shrink-0">
                <Mail className="w-4 h-4 text-avani-amber" />
                Receipt by email
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
