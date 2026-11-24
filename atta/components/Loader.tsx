"use client";

import { useEffect, useState } from "react";
import { motion, animate, AnimatePresence } from "framer-motion";
import { LOGO, C, ease, soft } from "./config";
import { useLang } from "./i18n";
import { Meta } from "./ui";

export function Loader({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const [n, setN] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const c = animate(0, 100, {
      duration: 2.2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => {
        setShow(false);
        onDone();
      },
    });
    return () => c.stop();
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between p-8"
          style={{ background: C.bg }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 1.2, ease }}
        >
          <div className="flex justify-between">
            <Meta>{t.loaderL}</Meta>
            <Meta>{t.loaderR}</Meta>
          </div>
          <motion.img
            src={LOGO}
            alt=""
            className="mx-auto h-28 w-28 rounded-full object-cover"
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: soft }}
          />
          <div className="flex items-end justify-between">
            <Meta>{t.loaderB}</Meta>
            <span dir="ltr" className="font-display text-[18vw] font-extralight leading-[0.8] tabular-nums md:text-[11vw]" style={{ color: C.ink }}>
              {n.toString().padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
