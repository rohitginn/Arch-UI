'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface TerminalLine {
  /** Command text */
  text: string;
  /** Whether this is output (no prompt prefix) */
  isOutput?: boolean;
  /** Delay before typing starts (ms) */
  delay?: number;
}

export interface HeroTerminalProps {
  /** Badge above heading */
  badge?: string;
  /** Main headline */
  heading: string;
  /** Supporting copy */
  subheading?: string;
  /** Terminal lines to type out */
  lines: TerminalLine[];
  /** Terminal window title */
  terminalTitle?: string;
  /** Typing speed (ms per character) */
  typingSpeed?: number;
  /** Background element */
  background?: React.ReactNode;
  /** Primary CTA */
  primaryCta?: { label: string; href: string; onClick?: () => void };
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Terminal component                                                  */
/* ------------------------------------------------------------------ */

function Terminal({
  lines,
  title = 'Terminal',
  typingSpeed = 40,
}: {
  lines: TerminalLine[];
  title?: string;
  typingSpeed?: number;
}) {
  const [displayedLines, setDisplayedLines] = React.useState<string[]>([]);
  const [currentLine, setCurrentLine] = React.useState(0);
  const [currentChar, setCurrentChar] = React.useState(0);
  const [showCursor, setShowCursor] = React.useState(true);

  React.useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, []);

  React.useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    const fullText = line.isOutput ? line.text : `$ ${line.text}`;

    if (line.isOutput) {
      // Show output instantly after delay
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, fullText]);
        setCurrentLine((prev) => prev + 1);
        setCurrentChar(0);
      }, line.delay ?? 300);
      return () => clearTimeout(timeout);
    }

    if (currentChar < fullText.length) {
      const timeout = setTimeout(
        () => {
          setDisplayedLines((prev) => {
            const updated = [...prev];
            updated[currentLine] = fullText.slice(0, currentChar + 1);
            return updated;
          });
          setCurrentChar((prev) => prev + 1);
        },
        currentChar === 0 ? (line.delay ?? 500) : typingSpeed
      );
      return () => clearTimeout(timeout);
    }

    // Line complete, move to next
    const timeout = setTimeout(() => {
      setCurrentLine((prev) => prev + 1);
      setCurrentChar(0);
    }, 400);
    return () => clearTimeout(timeout);
  }, [currentLine, currentChar, lines, typingSpeed]);

  return (
    <div
      className={cn(
        'w-full max-w-2xl rounded-xl overflow-hidden',
        'border border-white/10',
        'bg-zinc-900/90 backdrop-blur-xl',
        'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]'
      )}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-zinc-500 ml-2 font-mono">{title}</span>
      </div>

      {/* Terminal body */}
      <div className="p-4 font-mono text-sm leading-relaxed min-h-[200px]">
        {displayedLines.map((line, i) => (
          <div key={i} className="flex">
            <span
              className={cn(
                line.startsWith('$')
                  ? 'text-emerald-400'
                  : 'text-zinc-400'
              )}
            >
              {line}
            </span>
            {i === currentLine && showCursor && (
              <span className="ml-[1px] w-2 h-5 bg-emerald-400 inline-block" />
            )}
          </div>
        ))}
        {currentLine >= lines.length && showCursor && (
          <div className="flex">
            <span className="text-emerald-400">$ </span>
            <span className="ml-[1px] w-2 h-5 bg-emerald-400 inline-block" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HeroTerminal                                                        */
/* ------------------------------------------------------------------ */

function HeroTerminal({
  badge,
  heading,
  subheading,
  lines,
  terminalTitle,
  typingSpeed = 40,
  background,
  primaryCta,
  className,
}: HeroTerminalProps) {
  return (
    <SectionWrapper padding="hero" background={background} className={className}>
      <div className="flex flex-col items-center text-center gap-10">
        {/* Copy */}
        <div className="max-w-3xl">
          {badge && (
            <span
              className={cn(
                'inline-flex items-center mb-6',
                'rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase',
                'bg-blue-500/10 text-blue-600 border border-blue-500/20',
                'dark:bg-blue-400/10 dark:text-blue-400 dark:border-blue-400/20'
              )}
            >
              {badge}
            </span>
          )}

          <h1
            className={cn(
              'text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]',
              'text-slate-900 dark:text-white'
            )}
          >
            {heading}
          </h1>

          {subheading && (
            <p
              className={cn(
                'mt-6 text-lg lg:text-xl leading-relaxed max-w-xl mx-auto',
                'text-slate-600 dark:text-slate-400'
              )}
            >
              {subheading}
            </p>
          )}
        </div>

        {/* Terminal */}
        <Terminal lines={lines} title={terminalTitle} typingSpeed={typingSpeed} />

        {/* CTA */}
        {primaryCta && (
          <a
            href={primaryCta.href}
            onClick={primaryCta.onClick}
            className={cn(
              'inline-flex items-center justify-center gap-2',
              'rounded-xl px-8 py-3.5 text-sm font-medium',
              'bg-blue-600 text-white border border-blue-700',
              'hover:bg-blue-700 hover:-translate-y-[1px]',
              'active:scale-[0.97] active:transition-transform active:duration-75',
              'shadow-[0_2px_8px_-2px_rgba(59,130,246,0.5)]',
              'transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
              'dark:bg-blue-500 dark:border-blue-400/30 dark:hover:bg-blue-400'
            )}
          >
            {primaryCta.label}
          </a>
        )}
      </div>
    </SectionWrapper>
  );
}

HeroTerminal.displayName = 'HeroTerminal';

export { HeroTerminal };
