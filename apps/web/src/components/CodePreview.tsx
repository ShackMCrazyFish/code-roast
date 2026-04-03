// Вариант 1: prismjs + react-syntax-highlighter (легкий)
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export function CodePreview({ code, language, maxLines = 5 }: { code: string, language: string, maxLines: number }) {
  const lines = code.split('\n').slice(0, maxLines);
  const isTruncated = code.split('\n').length > maxLines;
  
  return (
    <div className="relative">
      <SyntaxHighlighter
        language={language}
        style={vs} // легкая тема
        customStyle={{ margin: 0, borderRadius: '0.375rem', fontSize: '0.875rem' }}
        showLineNumbers={false}
      >
        {lines.join('\n') + (isTruncated ? '\n// ...' : '')}
      </SyntaxHighlighter>
      
      {isTruncated && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
      )}
    </div>
  );
}