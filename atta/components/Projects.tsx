"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { IMG, C, GRADE } from "./config";
import { useLang } from "./i18n";
import { Split, Meta, Magnetic, Arrow } from "./ui";

export const PROJECT_IMGS = [IMG.p1, IMG.p2, IMG.p3, IMG.p4];
export const PROJECT_YEARS = ["2025", "2025", "2024", "2024"];

export function ProjectCard({ i, total, progress }: { i: number; total: number; progress: MotionValue<number> }) {
  const { t } = useLang();
  const p = t.projects[i];
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.04]);
  const bright = useTransform(progress, [start, Math.min(start + 0.35, 1)], [0.8, 0.4]);
  const filter = useTransform(bright, (b) => `${GRADE} brightness(${b})`);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: own } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const imgScale = useTransform(own, [0, 1], [1.35, 1]);

  return (
    <div ref={ref} className="sticky top-0 flex h-screen items-center justify-center px-4 md:px-10">
      <motion.div className="relative h-[82vh] w-full overflow-hidden rounded-2xl" style={{ scale, top: i * 22 }}>
        <motion.img src={PROJECT_IMGS[i]} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ scale: imgScale, filter }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
        <div className="relative flex h-full flex-col justify-between p-6 md:p-10">
          <div className="flex justify-between">
            <Meta className="!text-[#e8e3d9]">( {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} )</Meta>
            <Meta className="!text-[#e8e3d9]">{PROJECT_YEARS[i]}</Meta>
          </div>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Meta className="mb-4 !text-[#c6a15b]">{p.type}</Meta>
              <h3 className="display font-display text-6xl font-extralight uppercase leading-[0.9] md:text-[7vw]" style={{ color: C.ink }}>{p.t}</h3>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-lg" style={{ color: C.ink }}>{p.alt}</span>
              <Magnetic>
                <a href="#contact" className="flex h-20 w-20 items-center justify-center rounded-full border border-white/25 backdrop-blur-md" style={{ color: C.ink }}>
                  <Arrow size={20} />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section id="projects" style={{ background: C.bg }}>
      <div className="flex items-end justify-between px-6 pb-16 pt-24 md:px-10">
        <h2 className="display font-display text-6xl font-extralight uppercase leading-[0.9] md:text-[8vw]" style={{ color: C.ink }}>
          <Split text={t.workTitle} inView /><br />
          <span className="accent font-serif-i normal-case" style={{ color: C.gold }}><Split text={t.workAccent} inView delay={0.2} /></span>
        </h2>
        <Meta>{t.workMeta}</Meta>
      </div>
      <div ref={ref} className="relative">
        {t.projects.map((_, i) => (
          <ProjectCard key={i} i={i} total={t.projects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
