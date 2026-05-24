import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export type ContentDoc<F = Record<string, unknown>> = {
  frontmatter: F;
  html: string;
  raw: string;
};

export function loadDoc<F = Record<string, unknown>>(
  ...segments: string[]
): ContentDoc<F> {
  const filePath = path.join(CONTENT_ROOT, ...segments) + ".md";
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content, { async: false }) as string;
  return {
    frontmatter: data as F,
    html,
    raw: content,
  };
}
