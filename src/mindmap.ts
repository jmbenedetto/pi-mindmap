export function outlineToMermaid(title: string, outline: string): string {
  const root = sanitizeLabel(title || "Mind Map");
  const lines = outline
    .split(/\r?\n/)
    .map((line) => line.replace(/\t/g, "  "))
    .filter((line) => line.trim().length > 0);

  const body = lines.map((line) => {
    const indent = line.match(/^ */)?.[0].length ?? 0;
    const level = Math.floor(indent / 2) + 1;
    const text = line.replace(/^\s*[-*+]\s?/, "").trim();
    return `${"  ".repeat(level)}${sanitizeLabel(text)}`;
  });

  return ["mindmap", `  root((${root}))`, ...body].join("\n");
}

function sanitizeLabel(value: string): string {
  return value
    .replace(/[\r\n]+/g, " ")
    .replace(/[(){}[\]]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
