import { execSync } from "child_process";
import { readFileSync, unlinkSync, writeFileSync } from "fs";
import path from "path";
import { visit } from "unist-util-visit";

export function remarkDiagram() {
  return function (tree, { __ }) {
    visit(tree, "code", (node) => {
      if (node.lang == "mermaid") {
        const tempInputFile = path.join(process.cwd(), "temp-mermaid-input.mmd");
        const tempOutputFile = path.join(process.cwd(), "temp-mermaid-output.svg");

        writeFileSync(tempInputFile, node.value);

        try {
          execSync(`npx mmdc -i ${tempInputFile} -o ${tempOutputFile}`);

          const svgContent = readFileSync(tempOutputFile, "utf8");

          node.type = "html";
          node.value = svgContent;

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
