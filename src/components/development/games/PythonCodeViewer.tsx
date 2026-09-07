import { useState, type ReactNode } from "react";

/**
 * A small, dependency-free Python syntax highlighter + VS Code–style file
 * viewer (dark tab strip, line numbers, Dark+ theme colors) — just enough
 * tokenizing to make these two short files read the way they would in an
 * actual editor, without pulling in a highlighting library for two files.
 */

interface CodeFile {
  name: string;
  source: string;
}

const TOKEN_REGEX =
  /(?<comment>#[^\n]*)|(?<string>"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(?<number>\b\d+\.?\d*\b)|(?<keyword>\b(?:def|class|import|from|return|if|elif|else|for|while|in|not|and|or|is|None|True|False|lambda|as|with|try|except|finally|pass|break|continue|global|yield|self)\b)|(?<decorator>@\w+)|(?<call>\b[A-Za-z_][A-Za-z0-9_]*(?=\())/gs;

// VS Code Dark+ inspired token colors.
const TOKEN_CLASS: Record<string, string> = {
  comment: "text-[#6A9955] italic",
  string: "text-[#CE9178]",
  number: "text-[#B5CEA8]",
  keyword: "text-[#569CD6]",
  decorator: "text-[#DCDCAA]",
  call: "text-[#DCDCAA]",
};

function highlight(source: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of source.matchAll(TOKEN_REGEX)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      nodes.push(<span key={key++}>{source.slice(lastIndex, index)}</span>);
    }
    const groupName = Object.keys(match.groups ?? {}).find((g) => match.groups?.[g] !== undefined);
    const className = groupName ? TOKEN_CLASS[groupName] : undefined;
    nodes.push(
      <span key={key++} className={className}>
        {match[0]}
      </span>,
    );
    lastIndex = index + match[0].length;
  }
  if (lastIndex < source.length) {
    nodes.push(<span key={key++}>{source.slice(lastIndex)}</span>);
  }
  return nodes;
}

const PythonCodeViewer = ({ files }: { files: CodeFile[] }) => {
  const [active, setActive] = useState(0);
  const file = files[active];
  const lines = file.source.replace(/\n$/, "").split("\n");

  return (
    <div className="overflow-hidden rounded-xl border border-border/50" style={{ background: "#1E1E1E" }}>
      {/* VS Code–style tab strip */}
      <div className="flex items-stretch" style={{ background: "#252526" }}>
        {files.map((f, i) => (
          <button
            key={f.name}
            type="button"
            onClick={() => setActive(i)}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-mono border-r border-black/20 transition-colors"
            style={{
              background: i === active ? "#1E1E1E" : "transparent",
              color: i === active ? "#FFFFFF" : "#8C8C8C",
              borderTop: i === active ? "2px solid #569CD6" : "2px solid transparent",
            }}
          >
            <span>🐍</span>
            {f.name}
          </button>
        ))}
      </div>

      {/* Code with line numbers */}
      <div className="overflow-x-auto">
        <pre className="flex p-0 text-xs leading-relaxed">
          <code className="select-none px-3 py-4 text-right font-mono" style={{ color: "#858585" }}>
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </code>
          <code className="flex-1 whitespace-pre px-3 py-4 font-mono" style={{ color: "#D4D4D4" }}>
            {highlight(file.source.replace(/\n$/, ""))}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default PythonCodeViewer;
