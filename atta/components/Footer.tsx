"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { LOGO, C, soft } from "./config";
import { useLang } from "./i18n";
import { Line, Meta } from "./ui";

const GOLD_FILL =
  "linear-gradient(100deg,#7a5a22 0%,#c6a15b 18%,#f3dfa8 32%,#b8893a 46%,#e9cf8c 60%,#8f6a2b 78%,#d9b56e 100%)";
const LETTERS = ["A", "T", "T", "A"];

/** One letter: drifts in from a wider spacing, scroll-linked */
function Letter({ ch, i, p }: { ch: string; i: number; p: MotionValue<number> }) {
  const spread = (i - 1.5) * 9; // vw — outer letters travel further
  const x = useTransform(p, [0, 0.75], [`${spread}vw`, "0vw"]);
  const y = useTransform(p, [0, 0.75], [`${8 + Math.abs(i - 1.5) * 6}%`, "0%"]);
  const blur = useTransform(p, [0, 0.6], [8, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  return (
    <motion.span className="inline-block" style={{ x, y, filter }}>
      {ch}
    </motion.span>
  );
}

function Word({ p, style }: { p: MotionValue<number>; style: React.CSSProperties }) {
  return (
    <span className="flex justify-center" style={style} aria-hidden>
      {LETTERS.map((ch, i) => (
        <Letter key={i} ch={ch} i={i} p={p} />
      ))}
    </span>
  );
}

export function Footer() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.4 });

  const fill = useTransform(p, [0.35, 0.95], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const swoosh = useTransform(p, [0.55, 1], [0, 1]);
  const subOp = useTransform(p, [0.7, 1], [0, 1]);
  const glowOp = useTransform(p, [0.5, 1], [0, 1]);

  const type: React.CSSProperties = {
    fontFamily: "'Cinzel', serif",
    fontWeight: 500,
    fontSize: "clamp(88px, 19vw, 340px)",
    lineHeight: 1,
  };

  return (
    <footer className="px-6 pb-28 md:px-10 md:pb-8" style={{ background: C.bg }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&display=swap');`}</style>
      <Line />
      <div className="flex flex-col justify-between gap-6 py-10 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <img src={LOGO} alt="ATTA" className="h-12 w-12 rounded-full object-cover" />
          <Meta>ATTA — {t.brandSub}</Meta>
        </div>
        <Meta>{t.footer}</Meta>
      </div>

      {/* ---------- WORDMARK ---------- */}
      <div ref={ref} dir="ltr" role="img" aria-label="ATTA" className="relative select-none overflow-hidden pb-6 pt-24 md:pt-32">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ opacity: glowOp, background: "radial-gradient(ellipse, rgba(198,161,91,0.16), transparent 70%)" }}
        />

        <div className="relative">
          {/* hairline outline */}
          <Word p={p} style={{ ...type, color: "transparent", WebkitTextStroke: "1px rgba(198,161,91,0.45)" }} />

          {/* brushed gold fill, revealed by scroll, with a slow sheen */}
          <motion.div className="absolute inset-0" style={{ clipPath: fill }}>
            <motion.div
              className="h-full w-full"
              style={{
                backgroundImage: GOLD_FILL,
                backgroundSize: "250% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <Word p={p} style={{ ...type, color: "transparent" }} />
            </motion.div>
          </motion.div>
        </div>

        {/* swoosh — echoes the arc in the logo */}
        <svg viewBox="0 0 1000 60" className="mx-auto -mt-[2.2vw] block w-[78%] max-w-[1100px]" fill="none" aria-hidden>
          <defs>
            <linearGradient id="atta-swoosh" x1="0" x2="1">
              <stop offset="0" stopColor="#c6a15b" stopOpacity="0" />
              <stop offset="0.35" stopColor="#f3dfa8" />
              <stop offset="0.7" stopColor="#c6a15b" />
              <stop offset="1" stopColor="#c6a15b" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path d="M10 50 C 280 4, 720 4, 990 34" stroke="url(#atta-swoosh)" strokeWidth="1.6" strokeLinecap="round" style={{ pathLength: swoosh }} />
        </svg>

        <motion.div className="mt-6 flex items-center justify-center gap-5" style={{ opacity: subOp }}>
          <span className="h-px w-10 md:w-24" style={{ background: "linear-gradient(90deg,transparent,#c6a15b)" }} />
          <span className="text-[10px] uppercase tracking-[0.45em] md:text-xs" style={{ fontFamily: "'Cinzel', serif", color: C.gold }}>
            Engineering & Contracting
          </span>
          <span className="h-px w-10 md:w-24" style={{ background: "linear-gradient(90deg,#c6a15b,transparent)" }} />
        </motion.div>
      </div>

      <motion.div className="mt-14 flex justify-between" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: soft }}>
        <Meta>© 2026 ATTA — {t.rights}</Meta>
        <Meta>{t.place}</Meta>
      </motion.div>
    </footer>
  );
}
