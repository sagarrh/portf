"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── FILESYSTEM ─────────────────────────────────────────────
const FILES: Record<string, string> = {
  "about.txt": `Name:     Sagar Harsora
Role:     Software Engineer
Location: Mumbai, IN
Status:   Available

I enjoy sidequesting and building things with LLMs.
Currently working at Vibe Engine on Generative Engine Optimization.`,

  "stack.txt": `Languages:   TypeScript, Python
Frontend:    Next.js, React, Tailwind
Backend:     Node.js, FastAPI
AI/ML:       OpenAI, Anthropic, LangChain
Infra:       Vercel, Supabase, Railway
Editor:      Cursor
Terminal:    Warp`,

  "links.txt": `GitHub:    https://github.com/sagarrh
Twitter:   https://twitter.com/SagarHarsora13
Instagram: https://instagram.com/sagarr.h
Email:     harsorasagar04@gmail.com
Work:      https://vibe-engine.ai`,

  "now.txt": `What I'm doing right now:

→ Building at Vibe Engine
→ Experimenting with AI agents
→ Reading: thinking about latent space
→ Listening to too much music

Last updated: Feb 2026`,
};

const COMMANDS: Record<string, string[]> = {
  ls: Object.keys(FILES),
};

// ── COMMAND HANDLER ────────────────────────────────────────
function runCommand(input: string): { output: string; clear?: boolean } {
  const parts = input.trim().split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const arg = parts[1];

  switch (cmd) {
    case "":
      return { output: "" };

    case "help":
      return {
        output: `Available commands:

  help          show this message
  whoami        who are you talking to
  ls            list files
  cat <file>    read a file
  pwd           current directory
  echo <text>   echo text back
  date          current date and time
  clear         clear the terminal
  exit          close the terminal
  open <link>   open a link (github, twitter, email, instagram)`,
      };

    case "whoami":
      return { output: "sagar — engineer, sidequester, LLM builder." };

    case "pwd":
      return { output: "/home/sagar" };

    case "date":
      return {
        output: new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
          timeStyle: "short",
        }),
      };

    case "ls":
      return { output: COMMANDS.ls.join("  ") };

    case "cat":
      if (!arg) return { output: "cat: missing operand\nUsage: cat <filename>" };
      if (FILES[arg]) return { output: FILES[arg] };
      return { output: `cat: ${arg}: No such file or directory` };

    case "echo":
      return { output: parts.slice(1).join(" ") || "" };

    case "clear":
      return { output: "", clear: true };

    case "exit":
      return { output: "__EXIT__" };

    case "open": {
      const targets: Record<string, string> = {
        github: "https://github.com/sagarrh",
        twitter: "https://twitter.com/SagarHarsora13",
        instagram: "https://instagram.com/sagarr.h",
        email: "mailto:harsorasagar04@gmail.com",
      };
      const target = arg?.toLowerCase();
      if (targets[target]) {
        window.open(targets[target], "_blank");
        return { output: `Opening ${target}...` };
      }
      return { output: `open: unknown target '${arg}'\nTry: github, twitter, instagram, email` };
    }

    case "sudo":
      return { output: "Nice try." };

    case "rm":
      return { output: "rm: cannot remove '/home/sagar': Permission denied" };

    case "git":
      return { output: "On branch main\nnothing to commit, working tree clean" };

    case "vim":
    case "nano":
    case "emacs":
      return { output: "error: no time for that" };

    case "curl":
      return { output: `{"name":"Sagar Harsora","role":"Software Engineer","status":"available"}` };

    default:
      return { output: `${cmd}: command not found\nType 'help' to see available commands.` };
  }
}

// ── TYPES ──────────────────────────────────────────────────
interface Line {
  type: "input" | "output";
  content: string;
}

// ── TERMINAL ───────────────────────────────────────────────
export function Terminal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", content: `sagar@portfolio ~ % ` },
    {
      type: "output",
      content: `Welcome. Type 'help' for available commands.\n`,
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const submit = useCallback(() => {
    const trimmed = input.trim();
    const { output, clear } = runCommand(trimmed);

    if (output === "__EXIT__") {
      onClose();
      return;
    }

    if (clear) {
      setLines([]);
      setInput("");
      setHistoryIdx(-1);
      return;
    }

    setLines((prev) => [
      ...prev,
      { type: "input", content: trimmed },
      ...(output ? [{ type: "output" as const, content: output }] : []),
    ]);

    if (trimmed) {
      setHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
    }
    setInput("");
    setHistoryIdx(-1);
  }, [input, onClose]);

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        submit();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const idx = Math.min(historyIdx + 1, history.length - 1);
        setHistoryIdx(idx);
        setInput(history[idx] ?? "");
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const idx = Math.max(historyIdx - 1, -1);
        setHistoryIdx(idx);
        setInput(idx === -1 ? "" : history[idx]);
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setLines([]);
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [submit, history, historyIdx, onClose]
  );

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-2xl rounded-xl overflow-hidden border border-gray-200 shadow-2xl"
        style={{ background: "#fafaf8", fontFamily: "'apple2mono', monospace" }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-gray-200"
          style={{ background: "#f0ede4" }}
        >
          <div className="flex items-center gap-1.5">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
            />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-[11px] text-gray-400 tracking-widest uppercase">
            sagar@portfolio ~ %
          </span>
          <div className="w-16" />
        </div>

        {/* Output */}
        <div
          className="px-5 pt-4 pb-2 h-80 overflow-y-auto text-[12px] leading-relaxed"
          style={{ color: "#2a2520" }}
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {line.type === "input" ? (
                <span>
                  <span className="text-indigo-500 select-none">❯ </span>
                  <span>{line.content}</span>
                </span>
              ) : (
                <span className="text-gray-600">{line.content}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center px-5 pb-4 gap-2">
          <span className="text-indigo-500 text-[12px] select-none">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            className="flex-1 bg-transparent outline-none text-[12px] text-gray-800 placeholder-gray-300"
            placeholder="type a command..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}