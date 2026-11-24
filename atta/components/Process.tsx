"use client";

import { C } from "./config";
import { useLang } from "./i18n";
import { Meta, Fade } from "./ui";

export function Process() {
  const { t } = useLang();
  return (
    <section className="px-6 py-24 md:px-10 md:py-32" style={{ background: C.bg }}>
      <div className="mb-20 grid grid-cols-12 gap-6">
        <Meta className="col-span-12 md:col-span-3">{t.processMeta}</Meta>
        <h2 className="display col-span-12 font-display text-4xl font-extralight leading-[1.15] md:col-span-9 md:text-6xl" style={{ color: C.ink }}>
          {t.processTitle} <span className="accent font-serif-i" style={{ color: C.gold }}>{t.processAccent}</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-4">
        {t.steps.map(([title, d], i) => (
          <Fade key={i} delay={i * 0.12} className="border-t border-white/10 py-10 md:border-s md:border-t-0 md:px-8 md:first:border-s-0 md:first:ps-0">
            <span className="font-display text-sm" style={{ color: C.mute }}>0{i + 1}</span>
            <h3 className="display mt-16 font-display text-3xl font-light uppercase" style={{ color: C.ink }}>{title}</h3>
            <p className="mt-6 text-sm leading-relaxed" style={{ color: C.mute }}>{d}</p>
          </Fade>
        ))}
      </div>
    </section>
  );
}
