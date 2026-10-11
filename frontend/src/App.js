import { useEffect } from "react";
import Lenis from "lenis";
import "@/App.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Approach from "@/components/Approach";
import About from "@/components/About";
import FocusAreas from "@/components/FocusAreas";
import Support from "@/components/Support";
import Programmes from "@/components/Programmes";
import Founder from "@/components/Founder";
import Partner from "@/components/Partner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="App bg-avani-ivory text-avani-slate font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Approach />
        <About />
        <FocusAreas />
        <Support />
        <Programmes />
        <Founder />
        <Partner />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;
