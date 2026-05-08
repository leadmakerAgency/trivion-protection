import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { buildLlmsFullTxt, buildLlmsTxt } from "@/lib/llm-text";

const publicDir = path.join(process.cwd(), "public");

mkdirSync(publicDir, { recursive: true });
writeFileSync(path.join(publicDir, "llms.txt"), buildLlmsTxt(), "utf8");
writeFileSync(path.join(publicDir, "llms-full.txt"), buildLlmsFullTxt(), "utf8");
