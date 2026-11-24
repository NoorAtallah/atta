"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, X } from "lucide-react";
import { LangSwitch } from "./LangSwitch";
import { LOGO, PHONE, WHATSAPP, INSTAGRAM, C, ease, soft } from "./config";
import { useLang } from "./i18n";
import { Arrow } from "./ui";

export const SECTION_IDS = ["studio", "services", "projects", "contact"];

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

export function Navigation({ ready }: { ready: boolean }) {
  const { t } = useLang();
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const ring = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCompact(y > window.innerHeight * 1.6);
    setHidden(y > 120 && y > prev);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const topVisible = ready && !hidden && !compact;

  return (
    <>
      {/* ---------- TOP BAR ---------- */}
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: topVisible ? 0 : -90, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: soft }}
      >
        <div className="flex items-center justify-between px-6 py-5 md:px-10">
          <a href="#" className="font-display text-sm font-medium tracking-[0.5em]" style={{ color: C.ink }}>
            ATTA
          </a>
          <nav className="hidden gap-10 md:flex">
            {t.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="group relative overflow-hidden text-[11px] uppercase tracking-[0.22em]" style={{ color: C.ink }}>
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">{n.l}</span>
                <span className="absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0">{n.l}</span>
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <LangSwitch id="top" />
            <a href="#contact" className="hidden text-[11px] uppercase tracking-[0.22em] md:block" style={{ color: C.ink }}>
              {t.start}
            </a>
            <button onClick={() => setOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 md:hidden" aria-label={t.menu} style={{ color: C.ink }}>
              <Menu size={16} strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ---------- DESKTOP COMPACT PILL ---------- */}
      <AnimatePresence>
        {ready && compact && (
          <motion.nav
            className="fixed left-1/2 top-5 z-50 hidden items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1.5 backdrop-blur-xl md:flex"
            style={{ x: "-50%" }}
            initial={{ y: -40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: soft }}
          >
            <a href="#" className="mx-1">
              <img src={LOGO} alt="ATTA" className="h-8 w-8 rounded-full object-cover" />
            </a>
            {t.nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="relative rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.18em]" style={{ color: active === n.id ? "#000" : C.ink }}>
                {active === n.id && (
                  <motion.span layoutId="nav-active" className="absolute inset-0 rounded-full" style={{ background: C.gold }} transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span className="relative">{n.l}</span>
              </a>
            ))}
            <span className="mx-1 h-5 w-px bg-white/15" />
            <LangSwitch id="pill" />
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ---------- MOBILE BOTTOM DOCK ---------- */}
      <AnimatePresence>
        {ready && compact && !open && (
          <motion.div
            className="fixed inset-x-4 z-50 flex items-center justify-between rounded-full border border-white/10 bg-black/55 p-2 backdrop-blur-xl md:hidden"
            style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <a href="#" className="flex items-center gap-3 ps-1">
              <img src={LOGO} alt="ATTA" className="h-9 w-9 rounded-full object-cover" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={active ?? "top"}
                  className="meta text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: C.mute }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {t.nav.find((n) => n.id === active)?.l ?? "ATTA"}
                </motion.span>
              </AnimatePresence>
            </a>
            <div className="flex items-center gap-2">
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: C.gold }} aria-label="WhatsApp">
                <MessageCircle size={18} strokeWidth={1.4} color="#000" />
              </a>
              <button onClick={() => setOpen(true)} className="relative flex h-11 w-11 items-center justify-center rounded-full" style={{ background: C.ink }} aria-label={t.menu}>
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="20.5" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="1.5" />
                  <motion.circle cx="22" cy="22" r="20.5" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" style={{ pathLength: ring }} />
                </svg>
                <Menu size={17} strokeWidth={1.4} color="#000" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- FULLSCREEN MENU ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col justify-between p-6"
            style={{ background: C.ink, color: "#000" }}
            initial={{ clipPath: "circle(0% at 85% 92%)" }}
            animate={{ clipPath: "circle(150% at 85% 92%)" }}
            exit={{ clipPath: "circle(0% at 85% 92%)" }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="flex items-center justify-between">
              <img src={LOGO} alt="ATTA" className="h-10 w-10 rounded-full object-cover" />
              <LangSwitch dark id="menu" />
              <button onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15" aria-label={t.close}>
                <X size={18} strokeWidth={1.3} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {t.nav.map((n, i) => (
                <div key={n.id} className="overflow-hidden">
                  <motion.a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-black/10 py-3"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.8, delay: 0.25 + i * 0.07, ease }}
                  >
                    <span className="display font-display text-5xl font-extralight uppercase">{n.l}</span>
                    <span className="font-display text-xs text-black/40">0{i + 1}</span>
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div className="flex items-end justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <div className="space-y-1 text-sm">
                <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="block" dir="ltr">{PHONE}</a>
                <a href={INSTAGRAM} target="_blank" className="block text-black/50" dir="ltr">@atta_office</a>
              </div>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-[11px] uppercase tracking-[0.2em]" style={{ color: C.ink }}>
                {t.startShort} <Arrow size={14} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
