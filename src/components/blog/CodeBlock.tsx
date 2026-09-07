import { useState, useMemo } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { TerminalHeader } from '../ui/TerminalHeader';
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';

interface CodeBlockProps {
  fileName: string;
  language: string;
  code: string;
  explanation?: string;
}

export const CodeBlock = ({ fileName, language, code, explanation }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const highlightedCode = useMemo(() => {
    const langKey = language.toLowerCase();
    const grammar = Prism.languages[langKey] || Prism.languages.typescript || Prism.languages.go;
    if (grammar) {
      return Prism.highlight(code, grammar, langKey);
    }
    return code;
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-tokyo-surface bg-tokyo-surface/80 shadow-xl">
      <TerminalHeader
        centerTitle={false}
        className="py-2 sm:py-2.5 border-tokyo-surface/80"
        rightSlot={
          <>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-tokyo-purple bg-tokyo-purple/10 px-1.5 sm:px-2 py-0.5 rounded border border-tokyo-purple/20">
              {language}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-mono text-tokyo-muted hover:text-tokyo-cyan bg-tokyo-surface hover:bg-tokyo-base px-2 sm:px-2.5 py-1 rounded transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-[#27c93f]" />
                  <span className="text-[#27c93f] hidden xs:inline">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span className="hidden xs:inline">Copy</span>
                </>
              )}
            </button>
          </>
        }
      >
        <div className="flex items-center gap-1.5 text-xs font-mono text-tokyo-muted min-w-0">
          <Terminal size={13} className="text-tokyo-cyan shrink-0 hidden xs:inline" />
          <span className="text-tokyo-fg font-semibold truncate max-w-[150px] xs:max-w-[200px] sm:max-w-md">
            {fileName}
          </span>
        </div>
      </TerminalHeader>

      {/* Code Area */}
      <div className="p-3 sm:p-4 md:p-5 overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed text-tokyo-fg bg-[#13141c]">
        <pre className="selection:bg-tokyo-purple selection:text-tokyo-base">
          <code 
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>

      {/* Optional Explanation Footer */}
      {explanation && (
        <div className="px-4 py-2.5 bg-tokyo-base/60 border-t border-tokyo-surface/60 text-xs font-sans text-tokyo-muted italic">
          💡 <span className="font-semibold text-tokyo-cyan not-italic">Architectural Note:</span> {explanation}
        </div>
      )}
    </div>
  );
};
