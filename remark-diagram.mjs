import { visit } from "unist-util-visit";

export function remarkDiagram() {
  return function (tree, { _ }) {
    visit(tree, "code", (node) => {
      if (node.lang == "mermaid") {
        node.type = "html";
        node.value = '<div class ="' + node.lang + '">' + node.value + "</div>";
      }
    });
  };
}
