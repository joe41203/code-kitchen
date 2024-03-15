import { execSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import path from "path";
import { visit } from "unist-util-visit";

export function remarkMermaid() {
  return function (tree, { __ }) {
    visit(tree, "code", (node) => {
      if (node.lang == "mermaid") {
        const tempDir = path.join(process.cwd(), "tmp");
        const tempInputFile = path.join(tempDir, "mermaid-input.mmd");
        const tempOutputFile = path.join(tempDir, "mermaid-output.svg");

        if (!existsSync(tempDir)) {
          mkdirSync(tempDir);
        }

        writeFileSync(tempInputFile, node.value);

        try {
          execSync(`npx mmdc -i ${tempInputFile} -o ${tempOutputFile} -c mermaid.config.json`);

          const svgContent = readFileSync(tempOutputFile, "utf8");
          const styledSvgContent = `<div style="width: 100%; overflow: auto;">${svgContent}</div>`;

          node.type = "html";
          node.value = styledSvgContent;

        } catch (error) {
          console.error("Error processing Mermaid diagram:", error);
          node.value = `<pre>Error processing Mermaid diagram:\n${error.message}</pre>`;
        } finally {
          // 一時ファイルを削除する
          unlinkSync(tempInputFile);
          unlinkSync(tempOutputFile);
        }
      }
    });
  };
}
