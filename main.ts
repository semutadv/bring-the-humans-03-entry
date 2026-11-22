// bring-the-humans-03 entry program (Node 22, standard library only).
//
// The entry itself is the TikTok video; this program's whole job is to
// hand the video's address to the grader. It copies VIDEO.json from the
// repository root into the output directory, where the gate reads it.
//
// Directory contract:
//   - source dir: MAKEFUN_BOT_DIR, falling back to /bot
//   - output dir: MAKEFUN_OUTPUT_DIR, falling back to /output
// The output directory is a mount point in the grader, so this program
// creates it when missing but never deletes it (deleting a mount point
// throws EBUSY and would fail the run).

import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const sourceDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourceFile = join(sourceDir, 'VIDEO.json');
const outputFile = join(outputDir, 'VIDEO.json');

if (!existsSync(sourceFile)) {
  console.error(`error: VIDEO.json not found in source directory ${sourceDir}`);
  process.exit(1);
}

// Fail loudly here, not at the gate: VIDEO.json must be a JSON object whose
// url is a TikTok video address. The placeholder shipped before the video
// is posted has the same shape, so it passes; anything malformed does not.
let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(sourceFile, 'utf8'));
} catch (err) {
  console.error(`error: VIDEO.json is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}
const url = (parsed as { url?: unknown })?.url;
if (typeof url !== 'string' || !url.startsWith('https://www.tiktok.com/@')) {
  console.error('error: VIDEO.json must carry a "url" naming a TikTok video');
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
copyFileSync(sourceFile, outputFile);
console.log(`copied VIDEO.json from ${sourceFile} to ${outputFile}`);
