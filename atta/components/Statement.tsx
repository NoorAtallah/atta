"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { C } from "./config";
import { useLang } from "./i18n";
import { Meta, Fade } from "./ui";

export function Word({ w, range, p }: { w: string; range: [number, number]; p: MotionValue<number> }) {
  const op = useTransform(p, range, [0.12, 1]);
  return <motion.span style={{ opacity: op }} className="me-[0.25em] inline-block">{w}</motion.span>;
}

export function Statement() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });
  const words = t.statement.split(" ");

  return (
    <section id="studio" className="px-6 py-28 md:px-10 md:py-36" style={{ background: C.bg }}>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <Meta>{t.studioMeta}</Meta>
          <p className="mt-6 text-sm leading-loose" style={{ color: C.mute }}>
            {t.studioSide[0]}<br />{t.studioSide[1]}
          </p>
        </div>
        <div ref={ref} className="col-span-12 md:col-span-9">
          <p key={lang} className="display font-display text-3xl font-light leading-[1.3] tracking-[-0.01em] md:text-[3.2vw]" style={{ color: C.ink }}>
            {words.map((w, i) => (
              <Word key={i} w={w} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
          </p>
        </div>
      </div>
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4">
        {t.stats.map(([n, l], i) => (
          <div key={i} className="border-t border-white/10 py-8 pe-6">
            <Fade delay={i * 0.1}>
              <p className="font-display text-6xl font-extralight md:text-7xl" style={{ color: C.ink }}>{n}</p>
              <Meta className="mt-4">{l}</Meta>
            </Fade>
          </div>
        ))}
      </div>
    </section>
  );
}
