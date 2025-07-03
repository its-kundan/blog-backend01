// utils/markdownToHtml.ts
import { marked } from "marked";

export async function markdownToHtml(markdown: string): Promise<string> {
  return marked.parse(markdown);
}