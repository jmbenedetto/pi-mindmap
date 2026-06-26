# pi-mindmap

A Pi package that adds a small mind-map helper extension.

## What it provides

- `mindmap_generate` tool: converts an indented outline into Mermaid `mindmap` syntax.
- `/mindmap <topic or outline>` command: asks the agent to build a mind map for the provided input.

## Install

```bash
pi install git:github.com/jmbenedetto/pi-mindmap
```

Or test directly from a local checkout:

```bash
pi -e ./extensions/index.ts
```

## Development

```bash
npm install
npm run typecheck
```

## Example

Input outline:

```text
Discovery
  Users
  Jobs to be done
Solution
  Extension command
  Mind map tool
```

Generated Mermaid:

```mermaid
mindmap
  root((Product Plan))
    Discovery
      Users
      Jobs to be done
    Solution
      Extension command
      Mind map tool
```

## License

MIT
