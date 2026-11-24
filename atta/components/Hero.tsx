"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { IMG, C, ease, soft, GRADE } from "./config";
import { useLang } from "./i18n";
import { Split, Meta } from "./ui";

export function Hero({ ready }: { ready: boolean }) {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const clip = useTransform(scrollYProgress, [0, 0.6], ["inset(0% 0% 0% 0% round 0px)", "inset(14% 8% 14% 8% round 18px)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-30%"]);
  const textOp = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const cardOp = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0.45, 0.7], [40, 0]);

  return (
    <section ref={ref} className="relative h-[220vh]" style={{ background: C.bg }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: clip }}>
          <motion.img
            src={IMG.hero}
            alt=""
            className="h-full w-full object-cover"
            style={{ scale }}
            initial={{ filter: `${GRADE} brightness(0.1)` }}
            animate={ready ? { filter: `${GRADE} brightness(0.7)` } : {}}
            transition={{ duration: 3, ease: soft }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/50" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />
        </motion.div>

        <motion.div style={{ y: textY, opacity: textOp }} className="relative z-10 flex h-full flex-col justify-end px-6 pb-14 md:px-10">
          {ready && (
            <div key={lang}>
              <div className="mb-10 grid grid-cols-12 items-end gap-6">
                <motion.div className="col-span-12 md:col-span-4 md:col-start-9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1.2 }}>
                  <p className="max-w-xs text-[13px] leading-relaxed" style={{ color: C.ink }}>{t.heroIntro}</p>
                </motion.div>
              </div>
              <h1 className="display font-display text-[15vw] font-extralight uppercase leading-[0.82] tracking-[-0.03em] md:text-[10.5vw]" style={{ color: C.ink }}>
                <span className="block"><Split text={t.hero1} delay={0.2} /></span>
                <span className="block">
                  <Split text={t.hero2} delay={0.45} />{" "}
                  <span className="accent font-serif-i normal-case tracking-normal" style={{ color: C.gold }}>
                    <Split text={t.heroAccent} delay={0.65} />
                  </span>
                </span>
              </h1>
              <div className="mt-10 flex items-center justify-between">
                <Meta>{t.heroMeta}</Meta>
                <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}>
                  <ArrowDown size={16} strokeWidth={1.2} style={{ color: C.ink }} />
                </motion.span>
                <Meta className="hidden md:block">31.95° N — 35.91° E</Meta>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div style={{ opacity: cardOp }} className="pointer-events-none absolute inset-0 z-20">
          <div className="absolute left-[8%] right-[8%] top-[calc(14%-36px)] flex justify-between">
            <Meta>{t.frameL}</Meta>
            <Meta>{t.frameR}</Meta>
          </div>
          <motion.div style={{ y: cardY, insetInlineStart: "calc(8% + 28px)" }} className="absolute bottom-[calc(14%+28px)]">
            <h2 className="display font-display text-5xl font-extralight uppercase leading-[0.95] md:text-7xl" style={{ color: C.ink }}>
              {t.frame[0]}<br />{t.frame[1]}<br />
              <span className="accent font-serif-i normal-case" style={{ color: C.gold }}>{t.frameAccent}</span>
            </h2>
          </motion.div>
          <motion.div
            style={{ y: cardY, insetInlineEnd: "calc(8% + 28px)" }}
            className="absolute bottom-[calc(14%+28px)] hidden w-64 rounded-xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur-xl md:block"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display text-3xl font-extralight" style={{ color: C.ink }}>360°</span>
              <Meta>{t.cardTag}</Meta>
            </div>
            <p className="mt-3 text-xs leading-relaxed" style={{ color: C.mute }}>{t.card}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
