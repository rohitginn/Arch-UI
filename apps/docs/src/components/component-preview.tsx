import { useState } from 'react';
import { Copy, Check, Code, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Framework = 'react' | 'vue';

/* ─────────────────────────────────────────────────────────
   Lightweight syntax highlighter
   Tokenizes JSX/TSX/Vue code into colored spans.
   No external dependencies.
   ───────────────────────────────────────────────────────── */
type Token = { type: string; value: string };

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  const patterns: Array<{ type: string; re: RegExp }> = [
    // Block comment
    { type: 'comment', re: /^\/\*[\s\S]*?\*\// },
    // Line comment
    { type: 'comment', re: /^\/\/[^\n]*/ },
    // Template literal (backtick string)
    { type: 'string', re: /^`(?:[^`\\]|\\.)*`/ },
    // Double-quoted string
    { type: 'string', re: /^"(?:[^"\\]|\\.)*"/ },
    // Single-quoted string
    { type: 'string', re: /^'(?:[^'\\]|\\.)*'/ },
    // JSX self-closing or closing tag
    { type: 'tag', re: /^<\/?[A-Za-z][A-Za-z0-9.]*/ },
    // JSX closing bracket
    { type: 'punct', re: /^\/?>/ },
    // Numbers
    { type: 'number', re: /^\b\d+(?:\.\d+)?\b/ },
    // Keywords
    {
      type: 'keyword',
      re: /^\b(?:import|export|from|default|function|const|let|var|return|if|else|class|extends|new|type|interface|enum|implements|async|await|for|of|in|while|do|switch|case|break|continue|try|catch|finally|throw|typeof|instanceof|void|null|undefined|true|false|this|super|static|abstract|readonly|as|declare|namespace|module|require|keyof|infer|never)\b/,
    },
    // JSX attribute value (prop=)
    { type: 'attr', re: /^[a-zA-Z][a-zA-Z0-9]*(?==)/ },
    // Identifiers
    { type: 'ident', re: /^[A-Za-z_$][A-Za-z0-9_$]*/ },
    // Operators & punctuation
    { type: 'op', re: /^[{}()[\]<>.,;:=+\-*/!&|%^~?@#]/ },
    // Whitespace
    { type: 'ws', re: /^\s+/ },
    // Anything else
    { type: 'other', re: /^./ },
  ];

  while (i < code.length) {
    let matched = false;
    for (const { type, re } of patterns) {
      const m = code.slice(i).match(re);
      if (m) {
        tokens.push({ type, value: m[0] });
        i += m[0].length;
        matched = true;
        break;
      }
    }
    if (!matched) { tokens.push({ type: 'other', value: code[i] }); i++; }
  }
  return tokens;
}

const tokenColors: Record<string, string> = {
  keyword: 'text-violet-400',
  string:  'text-emerald-400',
  comment: 'text-slate-500 italic',
  tag:     'text-sky-400',
  punct:   'text-slate-400',
  number:  'text-amber-400',
  attr:    'text-sky-300',
  ident:   'text-slate-200',
  op:      'text-slate-400',
  ws:      '',
  other:   'text-slate-300',
};

function SyntaxCode({ code }: { code: string }) {
  const tokens = tokenize(code);
  return (
    <>
      {tokens.map((tok, i) => (
        <span key={i} className={tokenColors[tok.type] ?? ''}>
          {tok.value}
        </span>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   Dot-grid preview background SVG
   Shows glass effect naturally against a subtle pattern
   ───────────────────────────────────────────────────────── */
const PREVIEW_BG = `
  radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 60%),
  radial-gradient(circle at 80% 20%, rgba(139,92,246,0.04) 0%, transparent 50%)
`.trim();

interface ComponentPreviewProps {
  children: React.ReactNode;
  code?: string;
  vueCode?: string;
  className?: string;
}

export function ComponentPreview({ children, code, vueCode, className = '' }: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false);
  const [framework, setFramework] = useState<Framework>('react');
  const [copied, setCopied] = useState(false);

  const currentCode = framework === 'react' ? code : vueCode;
  const hasCode = code || vueCode;
  const hasBothFrameworks = code && vueCode;

  const copyCode = () => {
    if (currentCode) {
      navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="rounded-xl border border-[hsl(var(--border))] overflow-hidden shadow-sm">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 px-3 py-2">
        <div className="flex gap-1">
          <button
            onClick={() => setShowCode(false)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${!showCode
              ? 'bg-[hsl(var(--background))] text-[hsl(var(--foreground))] shadow-sm border border-[hsl(var(--border))]'
              : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]/50'
              }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
          {hasCode && (
            <button
              onClick={() => setShowCode(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${showCode
                ? 'bg-[hsl(var(--background))] text-[hsl(var(--foreground))] shadow-sm border border-[hsl(var(--border))]'
                : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]/50'
                }`}
            >
              <Code className="h-3.5 w-3.5" />
              Code
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Framework Toggle */}
          {showCode && hasBothFrameworks && (
            <div className="flex items-center rounded-md border border-[hsl(var(--border))] overflow-hidden text-xs">
              <button
                onClick={() => setFramework('react')}
                className={`px-2.5 py-1 font-medium transition-colors ${framework === 'react'
                  ? 'bg-sky-500/15 text-sky-500 dark:text-sky-400'
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                  }`}
              >
                React
              </button>
              <div className="h-4 w-px bg-[hsl(var(--border))]" />
              <button
                onClick={() => setFramework('vue')}
                className={`px-2.5 py-1 font-medium transition-colors ${framework === 'vue'
                  ? 'bg-emerald-500/15 text-emerald-500 dark:text-emerald-400'
                  : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                  }`}
              >
                Vue
              </button>
            </div>
          )}
          {hasCode && showCode && (
            <motion.button
              onClick={copyCode}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))] transition-colors"
              title="Copy code"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  </motion.span>
                ) : (
                  <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Copy className="h-3.5 w-3.5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait" initial={false}>
        {showCode && currentCode ? (
          <motion.div
            key="code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="bg-[#0d1117] dark:bg-[#0d1117]"
          >
            <pre className="overflow-x-auto p-5 text-sm leading-relaxed font-mono">
              <SyntaxCode code={currentCode} />
            </pre>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className={`relative flex items-center justify-center min-h-[320px] w-full p-10 ${className}`}
            style={{
              background: `
                ${PREVIEW_BG},
                radial-gradient(circle at 1px 1px, hsl(var(--foreground) / 0.06) 1px, transparent 0)
              `,
              backgroundSize: '100% 100%, 24px 24px',
              backgroundColor: 'hsl(var(--muted) / 0.3)',
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CodeBlockProps {
  code: string;
  vueCode?: string;
}

export function CodeBlock({ code, vueCode }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [framework, setFramework] = useState<Framework>('react');

  const currentCode = framework === 'react' ? code : (vueCode || code);
  const hasBothFrameworks = code && vueCode;

  const copyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden border border-[hsl(var(--border))] shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#161b22] px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/50" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
          <div className="h-3 w-3 rounded-full bg-green-500/50" />
        </div>
        <div className="flex items-center gap-2">
          {hasBothFrameworks && (
            <div className="flex items-center rounded-md border border-white/10 overflow-hidden text-xs">
              <button
                onClick={() => setFramework('react')}
                className={`px-2.5 py-1 font-medium transition-colors ${framework === 'react'
                  ? 'bg-sky-500/20 text-sky-400'
                  : 'text-slate-500 hover:text-slate-300'
                  }`}
              >
                React
              </button>
              <div className="h-4 w-px bg-white/10" />
              <button
                onClick={() => setFramework('vue')}
                className={`px-2.5 py-1 font-medium transition-colors ${framework === 'vue'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'text-slate-500 hover:text-slate-300'
                  }`}
              >
                Vue
              </button>
            </div>
          )}
          <motion.button
            onClick={copyCode}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-white/10 hover:text-slate-200 transition-colors"
            title="Copy code"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                </motion.span>
              ) : (
                <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Copy className="h-3.5 w-3.5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
      {/* Code */}
      <div className="bg-[#0d1117]">
        <pre className="overflow-x-auto p-5 text-sm leading-relaxed font-mono">
          <SyntaxCode code={currentCode} />
        </pre>
      </div>
    </div>
  );
}
