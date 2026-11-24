"use client";

import { useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { IMG, C, ease, soft, GRADE } from "./config";
import { useLang } from "./i18n";
import { Split, Line, Meta } from "./ui";

export const SERVICE_IMGS = [IMG.s1, IMG.s2, IMG.s3];

export function Services() {
  const { t } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });

  return (
    <section
      id="services"
      className="relative px-6 py-24 md:px-10 md:py-32"
      style={{ background: C.bg }}
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
    >
      <div className="mb-16 flex items-end justify-between">
        <h2 className="display font-display text-6xl font-extralight uppercase leading-[0.9] md:text-[8vw]" style={{ color: C.ink }}>
          <Split text={t.servicesTitle} inView />
        </h2>
        <Meta>{t.servicesMeta}</Meta>
      </div>

      <div onMouseLeave={() => setActive(null)}>
        {t.services.map((s, i) => (
          <div key={i} data-hover onMouseEnter={() => setActive(i)} className="group relative">
            <Line delay={i * 0.1} />
            <div className="grid grid-cols-12 items-center gap-6 py-10 md:py-14">
              <span className="col-span-2 font-display text-sm md:col-span-1" style={{ color: C.mute }}>0{i + 1}</span>
              <motion.h3
                className="display col-span-10 font-display text-5xl font-extralight uppercase md:col-span-6 md:text-[6vw] md:leading-none"
                animate={{ color: active === null || active === i ? C.ink : "#3a3833" }}
                transition={{ duration: 0.6, ease: soft }}
              >
                {s.t}
              </motion.h3>
              <span className="col-span-4 col-start-3 text-xl md:col-span-1 md:col-start-auto" style={{ color: C.gold }}>{s.alt}</span>
              <p className="col-span-8 text-sm leading-relaxed md:col-span-3" style={{ color: C.mute }}>{s.d}</p>
              <motion.span className="col-span-1 hidden justify-self-end md:block" animate={{ rotate: active === i ? 45 : 0 }} transition={{ duration: 0.5, ease: soft }}>
                <Plus size={22} strokeWidth={1} style={{ color: C.ink }} />
              </motion.span>
            </div>
          </div>
        ))}
        <Line />
      </div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[340px] w-[260px] overflow-hidden rounded-lg md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: active !== null ? 1 : 0, scale: active !== null ? 1 : 0.6 }}
        transition={{ duration: 0.5, ease: soft }}
      >
        <AnimatePresence mode="popLayout">
          {active !== null && (
            <motion.img
              key={active}
              src={SERVICE_IMGS[active]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: GRADE }}
              initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.3 }}
              animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
