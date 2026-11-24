"use client";

import { motion } from "framer-motion";
import { C } from "./config";
import { type Lang, useLang } from "./i18n";

export function LangSwitch({ dark = false, id = "top" }: { dark?: boolean; id?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      dir="ltr"
      className="relative flex h-8 items-center rounded-full border p-0.5 text-[10px] font-medium"
      style={{ borderColor: dark ? "rgba(0,0,0,0.15)" : C.line }}
    >
      {(["en", "ar"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className="relative z-10 h-full w-10 rounded-full"
          style={{ color: lang === l ? "#000" : dark ? "#000" : C.ink }}
          aria-label={l === "en" ? "English" : "العربية"}
        >
          {lang === l && (
            <motion.span
              layoutId={`lang-pill-${id}`}
              className="absolute inset-0 -z-10 rounded-full"
              style={{ background: dark ? C.gold : C.ink }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <span className={l === "ar" ? "font-arabic text-[12px]" : "tracking-[0.15em]"}>{l === "en" ? "EN" : "ع"}</span>
        </button>
      ))}
    </div>
  );
}
