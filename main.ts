import { chmodSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-star alien review of Earth that still gives five stars for the food.
const LINE =
  "One star: Earth towed my saucer, charged me rent for the air, and honked at me in a language I don't speak — but the dumplings were worth the nine-light-year trip.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";

// Clear only the directory's contents, never the directory itself:
// the grader mounts this directory and removing it breaks the run.
try {
  for (const entry of readdirSync(outDir)) {
    rmSync(join(outDir, entry), { recursive: true, force: true });
  }
} catch {
  // Directory does not exist yet; create it below.
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, { encoding: "utf8", mode: 0o644 });
// writeFileSync's mode is masked by the umask; set 0644 explicitly.
chmodSync(join(outDir, "entry.txt"), 0o644);
