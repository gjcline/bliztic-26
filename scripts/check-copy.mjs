import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(root, "../src/lib/copy.ts"), "utf8");
const strings = [...source.matchAll(/(["'`])(?:\\.|(?!\1).)*\1/g)].map((match) =>
  match[0].slice(1, -1),
);

const banned = /[-–—]/;
const offenders = strings.filter((value) => banned.test(value));

if (offenders.length > 0) {
  console.error("Visible copy cannot contain hyphens or dashes.");
  for (const value of offenders) {
    console.error(`  ${value}`);
  }
  process.exit(1);
}

console.log(`Checked ${strings.length} copy strings. Clean.`);
