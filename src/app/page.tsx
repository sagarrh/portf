"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Terminal } from "@/components/Terminal";

// ── GREETINGS ──────────────────────────────────────────────
const greetings = ["Hey", "Hola", "Ciao", "नमस्ते", "Hei", "Salut", "やあ"];

// ── SHORTCUTS ──────────────────────────────────────────────
const shortcuts: Record<string, string> = {
  g: "https://github.com/sagarrh",
  t: "https://twitter.com/SagarHarsora13",
  i: "https://instagram.com/sagarr.h",
  e: "mailto:harsorasagar04@gmail.com",
};
const shortcutHints = [
  { key: "G", label: "GitHub" },
  { key: "T", label: "Twitter" },
  { key: "I", label: "Instagram" },
  { key: "E", label: "Email" },
];

// ── CURSOR TRAIL ───────────────────────────────────────────
function CursorTrail() {
  const dotsRef = useRef<{ x: number; y: number; id: number }[]>([]);
  const [dots, setDots] = useState<{ x: number; y: number; id: number }[]>([]);
  const counterRef = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const id = counterRef.current++;
      dotsRef.current = [...dotsRef.current.slice(-12), { x: e.clientX, y: e.clientY, id }];
      setDots([...dotsRef.current]);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {dots.map((dot, i) => {
        const age = i / dots.length;
        return (
          <span
            key={dot.id}
            style={{
              position: "fixed",
              left: dot.x,
              top: dot.y,
              width: 5 * age,
              height: 5 * age,
              borderRadius: "50%",
              background: `rgba(99,102,241,${age * 0.5})`,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
}

// ── SCROLL PROGRESS ────────────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = document.getElementById("page-scroll");
    if (!el) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const pct = scrollHeight === clientHeight ? 0 : (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(pct);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent">
      <div
        className="h-full bg-indigo-500 transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ── LIVE CLOCK ─────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;
  return (
    <span className="font-apple2mono text-[10px] text-quaternary uppercase tracking-widest">
      {time} IST
    </span>
  );
}

// ── TABLE ROW ──────────────────────────────────────────────
interface TableRowProps {
  href: string;
  title: ReactNode;
  subtitle?: string;
  shortcut?: string;
  copyable?: boolean;
}

function TableRow({ href, title, subtitle, shortcut, copyable }: TableRowProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!copyable) return;
    e.preventDefault();
    navigator.clipboard.writeText(href.replace("mailto:", "")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <a
      href={href}
      target={copyable ? undefined : "_blank"}
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group flex items-center gap-3 py-2.5 transition-all duration-150 cursor-pointer"
    >
      <span className="text-sm font-medium text-primary group-hover:text-indigo-600 transition-colors duration-150 flex-none">
        {title}
      </span>
      <span className="w-full shrink border-t border-dashed border-gray-300 group-hover:border-indigo-300 transition-colors duration-150" />
      {subtitle && (
        <span className="text-xs text-tertiary group-hover:text-gray-500 flex-none transition-colors duration-150">
          {copied ? <span className="text-indigo-500 font-medium">Copied!</span> : subtitle}
        </span>
      )}
      {shortcut && (
        <kbd className="hidden md:flex items-center px-1.5 py-0.5 rounded border border-gray-200 bg-gray-50 font-apple2mono text-[9px] text-quaternary flex-none">
          {shortcut}
        </kbd>
      )}
    </a>
  );
}

// ── SECTION LABEL ──────────────────────────────────────────
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-apple2mono text-[10px] uppercase tracking-widest text-quaternary mb-3">
      {children}
    </p>
  );
}

// ── PAGE ───────────────────────────────────────────────────
export default function Home() {
  const [greeting, setGreeting] = useState("Hey");

  useEffect(() => {
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Konami-style: just press ` (backtick) to open terminal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // backtick opens terminal
      if (e.key === "`") {
        setTerminalOpen((v) => !v);
        return;
      }

      if (terminalOpen) return; // don't fire shortcuts while terminal is open

      const key = e.key.toLowerCase();
      if (shortcuts[key]) {
        setLastKey(key.toUpperCase());
        window.open(shortcuts[key], "_blank");
        setTimeout(() => setLastKey(null), 1500);
      }
    },
    [terminalOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <CursorTrail />
      <ScrollProgress />
      {terminalOpen && <Terminal onClose={() => setTerminalOpen(false)} />}

      <div
        id="page-scroll"
        className="scrollbar-hide relative flex h-full w-full flex-col overflow-y-scroll"
      >
        <div className="mx-auto w-full max-w-2xl px-5 pt-14 pb-28 md:px-10">

          {/* ── HEADER ── */}
          <div className="mb-12 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Image
                src="/static/img/firstone.png"
                alt="Sagar Harsora"
                width={52}
                height={52}
                priority
                className="rounded-xl"
              />
              <div>
                <h1 className="font-grenette text-2xl text-primary tracking-tight leading-none mb-1">
                  Sagar Harsora
                </h1>
                <div className="flex items-center gap-2">
                  <p className="font-apple2mono text-[10px] text-quaternary uppercase tracking-widest">
                    Mumbai ·
                  </p>
                  <LiveClock />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="font-apple2mono text-[9px] text-quaternary uppercase tracking-widest">
                available
              </span>
            </div>
          </div>

          {/* ── BIO ── */}
          <div className="mb-12">
            <p className="text-[15px] leading-relaxed text-secondary max-w-md">
              {greeting}, I'm Sagar — Software Engineer at{" "}
              <Link
                href="https://vibe-engine.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:text-indigo-600 transition-colors underline underline-offset-2 decoration-gray-300 hover:decoration-indigo-400"
              >
                Vibe Engine
              </Link>
              . I enjoy sidequesting and building things.{" "}
              <Link
                href="mailto:harsorasagar04@gmail.com"
                className="text-primary font-medium hover:text-indigo-600 transition-colors underline underline-offset-2 decoration-gray-300 hover:decoration-indigo-400"
              >
                Reach out
              </Link>{" "}
              if you want to chat.:-/
            </p>
          </div>

          <div className="border-t border-gray-200 mb-12" />

          {/* ── WORK ── */}
          <section className="mb-12">
            <SectionLabel>Work</SectionLabel>
            <div className="flex flex-col divide-y divide-gray-100">
              <TableRow href="https://vibe-engine.ai/" title="Vibe Engine" subtitle="Generative Engine Optimization" />
              <TableRow href="https://networkscience.ai/" title="Network Science" subtitle="AI Productivity Suite" />
              <TableRow href="https://arconnet.com/" title="Arcon" subtitle="Securing Data, Systems & Identities" />
            </div>
          </section>

          {/* ── ONLINE ── */}
          <section className="mb-12">
            <SectionLabel>Digital</SectionLabel>
            <div className="flex flex-col divide-y divide-gray-100">
              <TableRow href="mailto:harsorasagar04@gmail.com" title="Email" subtitle="harsorasagar04@gmail.com" shortcut="E" copyable />
              <TableRow href="https://github.com/sagarrh" title="GitHub" subtitle="sagarrh" shortcut="G" />
              <TableRow href="https://twitter.com/SagarHarsora13" title="Twitter" subtitle="@SagarHarsora13" shortcut="T" />
              <TableRow href="https://instagram.com/sagarr.h" title="Instagram" subtitle="sagarr.h" shortcut="I" />
            </div>
          </section>

          {/* ── MUSIC ── */}
          <section className="mb-12">
            <SectionLabel>Music</SectionLabel>
            <div className="rounded-xl overflow-hidden border border-gray-200">
              <iframe
                src="https://open.spotify.com/embed/playlist/2a18vHH0uJsjNHgcUE2nVX?utm_source=generator"
                width="100%"
                height="380"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                style={{ display: "block" }}
              />
            </div>
          </section>

          {/* ── FOOTER ── */}
          <div className="border-t border-gray-200 pt-5 flex flex-col gap-4">
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {shortcutHints.map(({ key, label }) => (
                <span
                  key={key}
                  className={`flex items-center gap-1.5 transition-opacity duration-200 ${
                    lastKey === key ? "opacity-100" : "opacity-40"
                  }`}
                >
                  <kbd className="inline-flex items-center px-1.5 py-0.5 rounded border border-gray-300 bg-gray-50 font-apple2mono text-[9px] text-gray-500">
                    {key}
                  </kbd>
                  <span className="font-apple2mono text-[9px] uppercase tracking-widest text-quaternary">
                    {label}
                  </span>
                </span>
              ))}

              {/* terminal hint */}
              <span className="flex items-center gap-1.5 opacity-40">
                <kbd className="inline-flex items-center px-1.5 py-0.5 rounded border border-gray-300 bg-gray-50 font-apple2mono text-[9px] text-gray-500">
                  `
                </kbd>
                <span className="font-apple2mono text-[9px] uppercase tracking-widest text-quaternary">
                  terminal
                </span>
              </span>
            </div>

            <p className="font-apple2mono text-[9px] uppercase tracking-widest text-quaternary">
              © 2026 Sagar Harsora.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}