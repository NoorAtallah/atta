"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, animate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { C, ease, soft } from "./config";
import { useLang } from "./i18n";

export function Grain() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-[-50%] z-[90] opacity-[0.07] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
      animate={{ x: ["0%", "-5%", "3%", "-2%", "0%"], y: ["0%", "4%", "-3%", "2%", "0%"] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHover(!!(e.target as HTMLElement).closest("a,button,[data-hover]"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden rounded-full mix-blend-difference md:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", background: C.ink }}
      animate={{ width: hover ? 56 : 8, height: hover ? 56 : 8 }}
      transition={{ duration: 0.4, ease: soft }}
    />
  );
}

/** Rises from a mask. Latin splits by character; Arabic by word (keeps letters joined). */
export function Split({ text, delay = 0, inView = false }: { text: string; delay?: number; inView?: boolean }) {
  const { lang } = useLang();
  const parts = lang === "ar" ? text.split(" ") : text.split("");
  const stagger = lang === "ar" ? 0.09 : 0.025;
  // the trigger lives on the (visible) wrapper — children start clipped, so they can't observe themselves
  return (
    <motion.span
      key={lang}
      className="inline-block overflow-hidden pb-[0.18em] align-bottom"
      initial="hidden"
      {...(inView ? { whileInView: "show", viewport: { once: true, amount: 0.2 } } : { animate: "show" })}
    >
      {parts.map((p, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
          transition={{ duration: 1.1, delay: delay + i * stagger, ease }}
        >
          {p === " " ? "\u00A0" : p}
          {lang === "ar" && i < parts.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Line({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="h-px w-full origin-left rtl:origin-right"
      style={{ background: C.line }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, delay, ease }}
    />
  );
}

export function Meta({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`meta text-[10px] font-medium uppercase tracking-[0.28em] ${className}`} style={{ color: C.mute }}>
      {children}
    </p>
  );
}

export function Fade({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, delay, ease: soft }}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export const Arrow = ({ size = 18 }: { size?: number }) => <ArrowUpRight size={size} strokeWidth={1} className="rtl:-scale-x-100" />;
