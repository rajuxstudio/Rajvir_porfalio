// Coral "Let's talk" card with the illustrated mailbox: clicking the card (or dragging the letter
// onto the box) drops the letter in, raises the flag, then calls `onOpen` (the contact form).
// Used by the Profile page (NewProfileUIDetail).
import { useEffect, useRef, useState } from "react";
import Mailbox from "./Mailbox";

const SERIF = "'DM Serif Display', Georgia, serif";

export default function LetsTalkCard({
  onOpen,
  className = "",
  style,
  headingClass = "text-4xl sm:text-5xl",
  mailboxClass,
}: {
  onOpen: () => void;
  className?: string;
  style?: React.CSSProperties;
  headingClass?: string;
  mailboxClass?: string;
}) {
  const [sending, setSending] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const send = () => {
    if (sending) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSending(true);
    timers.current.push(
      window.setTimeout(onOpen, calm ? 0 : 1050),
      // the box resets behind the open form, ready for the next letter
      window.setTimeout(() => setSending(false), calm ? 600 : 2400),
    );
  };

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-[28px] bg-[#e8735f] p-6 text-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(140,50,30,0.55)] dark:bg-[#d9644f] sm:p-7 ${className}`}
      style={style}
    >
      {/* the whole card is one button; the mailbox above it stays draggable */}
      <button
        type="button"
        aria-label="Let's talk: drop a letter and open the contact form"
        onClick={send}
        className="absolute inset-0 z-0 rounded-[inherit] focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white/60"
      />
      <div className="pointer-events-none relative z-[1] flex h-full flex-col">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">Let's talk</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="min-w-0 pb-2">
            <p className={`leading-[1.05] ${headingClass}`} style={{ fontFamily: SERIF }}>
              Have a project <span className="italic">in mind?</span>
            </p>
            <p className="mt-3 text-sm text-white/85" aria-live="polite">
              {sending ? "Letter sent! Opening the form…" : "Drop a letter in my mailbox ✉"}
            </p>
          </div>
          <Mailbox sending={sending} onSend={send} className={mailboxClass} />
        </div>
      </div>
    </div>
  );
}
