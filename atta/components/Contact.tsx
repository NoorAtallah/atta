"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Camera } from "lucide-react";
import { PHONE, WHATSAPP, EMAIL, INSTAGRAM, IMG, C, GRADE } from "./config";
import { useLang } from "./i18n";
import { Split, Meta, Fade, Magnetic, Arrow } from "./ui";

export function Contact() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const [sent, setSent] = useState(false);
  const field = "w-full border-b border-white/10 bg-transparent py-5 text-sm outline-none transition-colors placeholder:text-[#5a5650] focus:border-[#c6a15b]";

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden" style={{ background: C.bg }}>
      <div className="relative min-h-screen overflow-hidden">
        <motion.img src={IMG.statement} alt="" className="absolute inset-x-0 -top-[15%] h-[130%] w-full object-cover" style={{ y, filter: `${GRADE} brightness(0.45)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a09] via-transparent to-[#0a0a09]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0a09] via-[#0a0a09]/70 to-transparent" />
        <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center">
          <Meta>{t.ctaMeta}</Meta>
          <h2 className="display mt-8 font-display text-[16vw] font-extralight uppercase leading-[0.9] md:text-[10vw]" style={{ color: C.ink }}>
            <Split text={t.cta} inView /><br />
            <span className="accent font-serif-i normal-case" style={{ color: C.gold }}><Split text={t.ctaAccent} inView delay={0.2} /></span>
          </h2>
          <Magnetic className="mt-14">
            <WhatsAppSeal />
          </Magnetic>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 px-6 py-28 md:px-10">
        <div className="col-span-12 space-y-8 md:col-span-4">
          {[
            { i: Phone, l: t.contact.phone, v: PHONE, h: `tel:${PHONE.replace(/\s/g, "")}`, ltr: true },
            { i: Mail, l: t.contact.email, v: EMAIL, h: `mailto:${EMAIL}`, ltr: true },
            { i: Camera, l: t.contact.insta, v: "@atta_office", h: INSTAGRAM, ltr: true },
            { i: MapPin, l: t.contact.office, v: t.contact.place, h: "#", ltr: false },
          ].map((c, idx) => (
            <Fade key={idx} delay={idx * 0.08}>
              <Meta>{c.l}</Meta>
              <a href={c.h} target={c.h.startsWith("http") ? "_blank" : undefined} className="mt-2 flex items-center gap-3 text-lg font-light" style={{ color: C.ink }}>
                <c.i size={15} strokeWidth={1.2} style={{ color: C.gold }} />
                <span dir={c.ltr ? "ltr" : undefined}>{c.v}</span>
              </a>
            </Fade>
          ))}
        </div>

        <form className="col-span-12 md:col-span-7 md:col-start-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-16">
                <p className="display font-display text-5xl font-extralight uppercase" style={{ color: C.ink }}>
                  {t.form.thanks} <span className="accent font-serif-i normal-case" style={{ color: C.gold }}>{t.form.thanksAccent}</span>
                </p>
                <p className="mt-4 text-sm" style={{ color: C.mute }}>{t.form.thanksSub}</p>
              </motion.div>
            ) : (
              <motion.div key="f" exit={{ opacity: 0 }} className="grid gap-2 md:grid-cols-2 md:gap-x-10" style={{ color: C.ink }}>
                <input required placeholder={t.form.name} className={field} />
                <input required type="tel" placeholder={t.form.phone} className={field} />
                <select defaultValue="" className={`${field} md:col-span-2 [&>option]:bg-black`}>
                  <option value="" disabled>{t.form.type}</option>
                  {t.form.types.map((o) => <option key={o}>{o}</option>)}
                </select>
                <textarea rows={3} placeholder={t.form.msg} className={`${field} resize-none md:col-span-2`} />
                <div className="mt-10 md:col-span-2">
                  <button type="submit" className="group flex items-center gap-4 text-[11px] uppercase tracking-[0.3em]" style={{ color: C.ink }}>
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 transition-colors duration-500 group-hover:bg-[#e8e3d9] group-hover:text-black">
                      <Arrow />
                    </span>
                    {t.form.send}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}

const EASE = [0.76, 0, 0.24, 1] as const;

function Corner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const v = pos[0] === "t" ? "top" : "bottom";
  const h = pos[1] === "l" ? "left" : "right";
  const dx = h === "left" ? -6 : 6;
  const dy = v === "top" ? -6 : 6;
  return (
    <motion.span
      className="pointer-events-none absolute h-3 w-3"
      style={{
        [v]: -1,
        [h]: -1,
        borderColor: C.gold,
        borderTopWidth: v === "top" ? 1 : 0,
        borderBottomWidth: v === "bottom" ? 1 : 0,
        borderLeftWidth: h === "left" ? 1 : 0,
        borderRightWidth: h === "right" ? 1 : 0,
      }}
      variants={{ rest: { x: 0, y: 0 }, hover: { x: dx, y: dy } }}
      transition={{ duration: 0.5, ease: EASE }}
    />
  );
}

function RollText({ children }: { children: string }) {
  return (
    <span className="relative block overflow-hidden">
      <motion.span className="block" variants={{ rest: { y: "0%" }, hover: { y: "-100%" } }} transition={{ duration: 0.55, ease: EASE }}>
        {children}
      </motion.span>
      <motion.span className="absolute inset-0 block" variants={{ rest: { y: "100%" }, hover: { y: "0%" } }} transition={{ duration: 0.55, ease: EASE }}>
        {children}
      </motion.span>
    </span>
  );
}

function WhatsAppSeal() {
  const { lang } = useLang();
  const label = lang === "ar" ? "ابدأ مشروعك" : "Start your project";
  const kicker = lang === "ar" ? "عبر واتساب" : "via WhatsApp";
  const d = lang === "ar" ? -1 : 1;

  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP}`}
      target="_blank"
      className="relative flex items-stretch"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />

      {/* label block */}
      <span className="relative flex items-center gap-5 overflow-hidden border px-8 py-5 backdrop-blur-md md:px-10" style={{ borderColor: "rgba(198,161,91,0.28)", background: "rgba(10,10,9,0.35)" }}>
        {/* gold sweep */}
        <motion.span
          className="absolute inset-0 origin-left rtl:origin-right"
          style={{ background: "linear-gradient(100deg,#8f6a2b,#c6a15b 35%,#f3dfa8 60%,#c6a15b)" }}
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        <motion.span className="relative" variants={{ rest: { color: C.gold }, hover: { color: "#0a0a09" } }} transition={{ duration: 0.4, delay: 0.1 }}>
          <MessageCircle size={18} strokeWidth={1.1} />
        </motion.span>
        <span className="relative text-start">
          <motion.span className="meta block text-[9px] uppercase tracking-[0.35em]" variants={{ rest: { color: C.mute }, hover: { color: "rgba(10,10,9,0.6)" } }} transition={{ duration: 0.4, delay: 0.1 }}>
            {kicker}
          </motion.span>
          <motion.span
            className="mt-1 block text-sm font-light uppercase tracking-[0.25em] md:text-base"
            variants={{ rest: { color: C.ink }, hover: { color: "#0a0a09" } }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <RollText>{label}</RollText>
          </motion.span>
        </span>
      </span>

      {/* arrow block */}
      <span className="relative flex w-16 items-center justify-center overflow-hidden border border-s-0 md:w-20" style={{ borderColor: "rgba(198,161,91,0.28)", background: C.gold }}>
        <motion.span className="absolute" style={{ color: "#0a0a09" }} variants={{ rest: { x: 0, y: 0, opacity: 1 }, hover: { x: 22 * d, y: -22, opacity: 0 } }} transition={{ duration: 0.45, ease: EASE }}>
          <Arrow size={20} />
        </motion.span>
        <motion.span className="absolute" style={{ color: "#0a0a09" }} variants={{ rest: { x: -22 * d, y: 22, opacity: 0 }, hover: { x: 0, y: 0, opacity: 1 } }} transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}>
          <Arrow size={20} />
        </motion.span>
      </span>
    </motion.a>
  );
}
