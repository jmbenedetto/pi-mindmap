import { Type } from "@earendil-works/pi-ai";
import { defineTool, type ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { outlineToMermaid } from "../src/mindmap.js";

const mindmapTool = defineTool({
  name: "mindmap_generate",
  label: "Mind Map",
  description: "Convert a plain-text outline into Mermaid mindmap syntax.",
  promptSnippet: "Convert outlines into Mermaid mindmap diagrams.",
  promptGuidelines: [
    "Use mindmap_generate when the user asks to turn an outline, topic breakdown, or brainstorm into a Mermaid mind map.",
  ],
  parameters: Type.Object({
    title: Type.String({ description: "Root title for the mind map." }),
    outline: Type.String({
      description:
        "Indented outline. Use two spaces per nesting level; bullets are optional.",
    }),
  }),
  async execute(_toolCallId, params) {
    const mermaid = outlineToMermaid(params.title, params.outline);
    return {
      content: [
        {
          type: "text",
          text: `\`\`\`mermaid\n${mermaid}\n\`\`\``,
        },
      ],
      details: { mermaid },
    };
  },
});

export default function piMindmap(pi: ExtensionAPI) {
  pi.registerTool(mindmapTool);

  pi.registerCommand("mindmap", {
    description: "Ask the agent to create a Mermaid mind map for a topic or outline.",
    handler: async (args, ctx) => {
      const prompt = args?.trim();
      if (!prompt) {
        ctx.ui.notify("Usage: /mindmap <topic or outline>", "info");
        return;
      }

      pi.sendUserMessage(
        `Create a concise Mermaid mindmap for the following topic or outline. Use the mindmap_generate tool and then briefly explain the structure.\n\n${prompt}`,
        { deliverAs: ctx.isIdle() ? undefined : "followUp" },
      );
    },
  });
}
