import { useEffect } from "react";
import Lenis from "lenis";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ContentProvider } from "@/lib/content";
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
import Donate from "@/components/Donate";
import Admin from "@/components/Admin";
import { Toaster } from "@/components/ui/sonner";

function Home() {
  return (
    <>
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
    </>
  );
}

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
    <BrowserRouter>
      <HelmetProvider>
        <ContentProvider>
          <div className="App bg-avani-ivory text-avani-slate font-sans antialiased">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
            <Toaster position="bottom-right" richColors />
          </div>
        </ContentProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
