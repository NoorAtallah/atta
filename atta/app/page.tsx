"use client";

import { useCallback, useEffect, useState } from "react";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Loader } from "@/components/Loader";
import { Navigation } from "@/components/Navigation";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Statement } from "@/components/Statement";
import { C } from "@/components/config";
import { T, type Lang, LangCtx } from "@/components/i18n";
import { Grain } from "@/components/ui";

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const [lang, setLangState] = useState<Lang>("en");
  const onDone = useCallback(() => setReady(true), []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("atta-lang");
      if (saved === "ar" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("atta-lang", l);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <LangCtx.Provider value={{ lang, t: T[lang], setLang }}>
      <main dir={lang === "ar" ? "rtl" : "ltr"} style={{ background: C.bg, color: C.ink }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@200;300;400;500&family=Instrument+Serif:ital@1&family=Tajawal:wght@200;300;400;500&family=Amiri:ital@1&display=swap');
          html{background:${C.bg};scroll-behavior:smooth}
          body{font-family:'Inter Tight',sans-serif;-webkit-font-smoothing:antialiased}
          .font-display{font-family:'Inter Tight',sans-serif}
          .font-serif-i{font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;letter-spacing:-0.01em}
          .font-arabic{font-family:'Tajawal',sans-serif}
          ::selection{background:${C.gold};color:#000}
          /* Arabic: no letter-spacing (breaks joining), Tajawal for type, Amiri for the gold accent */
          main[dir=rtl], main[dir=rtl] *{letter-spacing:0 !important}
          main[dir=rtl], main[dir=rtl] .font-display, main[dir=rtl] .meta{font-family:'Tajawal',sans-serif}
          main[dir=rtl] .display{font-weight:300;line-height:1.2}
          main[dir=rtl] .accent{font-family:'Amiri',serif;font-style:italic}
          main[dir=rtl] .meta{font-size:12px}
        `}</style>
        <Loader onDone={onDone} />
        <Grain />
        <Navigation ready={ready} />
        <Hero ready={ready} />
        <Statement />
        <Services />
        <Projects />
        <Process />
        <Contact />
        <Footer />
      </main>
    </LangCtx.Provider>
  );
}
