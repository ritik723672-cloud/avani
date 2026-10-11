import { useState, useEffect } from "react";
import { Mail, MapPin, Instagram, Linkedin, Send, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { CONTACT, INTERESTS } from "../data/site";
import { Reveal, SectionHeading } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INITIAL = {
  name: "",
  email: "",
  organisation: "",
  interest: INTERESTS[0],
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const onDonate = () =>
      setForm((f) => ({
        ...f,
        interest: "Donation / Support",
        message:
          f.message ||
          "I would like to support AVANI Foundation with a donation. Please share the details.",
      }));
    window.addEventListener("avani:donate", onDonate);
    return () => window.removeEventListener("avani:donate", onDonate);
  }, []);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch(`${API}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success("Thank you — your enquiry has been sent. We will be in touch soon.");
      setForm(INITIAL);
    } catch {
      toast.error(`Something went wrong. Please email us directly at ${CONTACT.email}.`);
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-avani-forest/15 bg-avani-ivory px-4 py-3 text-sm text-avani-slate placeholder:text-avani-muted/60 focus:outline-none focus:border-avani-gold focus:ring-2 focus:ring-avani-gold/20 transition-all duration-300";

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="bg-avani-ivory py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            overline="Contact Us"
            title="Let's Build Opportunities Together"
            testId="contact-heading"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 text-avani-muted leading-relaxed text-sm max-w-md">
              We welcome enquiries from potential partners, volunteers, mentors,
              institutions and supporters who want to advance women's
              empowerment and inclusive development.
            </p>
          </Reveal>

          <div className="mt-10 space-y-6">
            <Reveal delay={0.1}>
              <a
                data-testid="contact-email-link"
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-4 group"
              >
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-avani-forest text-avani-goldsoft group-hover:bg-avani-moss transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-avani-muted">
                    Email
                  </span>
                  <span className="block text-sm font-medium text-avani-forest group-hover:text-avani-amber transition-colors">
                    {CONTACT.email}
                  </span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="flex items-center gap-4" data-testid="contact-location">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-avani-forest text-avani-goldsoft">
                  <MapPin className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-avani-muted">
                    Location
                  </span>
                  <span className="block text-sm font-medium text-avani-forest">
                    {CONTACT.location}
                  </span>
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-avani-forest text-avani-goldsoft">
                  <Instagram className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-avani-muted">
                    Instagram
                  </span>
                  <span className="block text-sm font-medium text-avani-muted" data-testid="contact-instagram">
                    Coming soon
                  </span>
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.34}>
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-avani-forest text-avani-goldsoft">
                  <Linkedin className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-avani-muted">
                    LinkedIn
                  </span>
                  <span className="block text-sm font-medium text-avani-muted" data-testid="contact-linkedin">
                    Coming soon
                  </span>
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <form
              data-testid="contact-form"
              onSubmit={submit}
              className="bg-avani-cream border border-avani-forest/10 rounded-[2rem] p-7 sm:p-10"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-[10px] uppercase tracking-[0.22em] font-semibold text-avani-forest mb-2">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    data-testid="contact-name-input"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your full name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-[10px] uppercase tracking-[0.22em] font-semibold text-avani-forest mb-2">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    data-testid="contact-email-input"
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.org"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="contact-organisation" className="block text-[10px] uppercase tracking-[0.22em] font-semibold text-avani-forest mb-2">
                    Organisation <span className="text-avani-muted normal-case tracking-normal">(optional)</span>
                  </label>
                  <input
                    id="contact-organisation"
                    data-testid="contact-organisation-input"
                    value={form.organisation}
                    onChange={set("organisation")}
                    placeholder="Company, institution or NGO"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="contact-interest" className="block text-[10px] uppercase tracking-[0.22em] font-semibold text-avani-forest mb-2">
                    I am interested in
                  </label>
                  <select
                    id="contact-interest"
                    data-testid="contact-interest-select"
                    value={form.interest}
                    onChange={set("interest")}
                    className={inputCls}
                  >
                    {INTERESTS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="contact-message" className="block text-[10px] uppercase tracking-[0.22em] font-semibold text-avani-forest mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  data-testid="contact-message-input"
                  required
                  minLength={10}
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Tell us how you would like to be part of AVANI's journey…"
                  className={`${inputCls} resize-none`}
                />
              </div>
              <button
                data-testid="contact-submit-btn"
                type="submit"
                disabled={sending}
                className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-avani-forest px-8 py-4 text-sm font-semibold text-avani-ivory transition-all duration-300 hover:bg-avani-moss hover:shadow-xl hover:shadow-avani-forest/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    Sending
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send Enquiry
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
