import { useState, useMemo } from 'react';
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
    <figure className="my-6 rounded-lg overflow-hidden border border-tokyo-border">
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-tokyo-surface border-b border-tokyo-border text-xs">
        <span className="font-mono text-tokyo-muted truncate">{fileName}</span>
        <button onClick={handleCopy} className="text-tokyo-comment hover:text-tokyo-fg transition-colors shrink-0">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-[13px] 3xl:text-[15px] leading-relaxed text-tokyo-fg bg-[#13141c]">
        <code className={`language-${language}`} dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
      {explanation && (
        <figcaption className="px-4 py-3 bg-tokyo-surface border-t border-tokyo-border text-sm text-tokyo-muted leading-relaxed">
          {explanation}
        </figcaption>
      )}
    </figure>
  );
};
