import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const lovableEnvPath = resolve(process.cwd(), ".lovable", "environment_variable.env");
let lovableEnvCache: Record<string, string> | null = null;

function parseEnvFile(content: string): Record<string, string> {
  return content.split(/\r?\n/).reduce<Record<string, string>>((acc, line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return acc;

    const index = trimmed.indexOf("=");
    if (index === -1) return acc;

    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();

    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    acc[key] = value;
    return acc;
  }, {});
}

function loadLovableEnv(): Record<string, string> {
  if (lovableEnvCache) return lovableEnvCache;

  try {
    const fileContents = readFileSync(lovableEnvPath, "utf8");
    lovableEnvCache = parseEnvFile(fileContents);
  } catch {
    lovableEnvCache = {};
  }

  return lovableEnvCache;
}

export function getServerEnvVar(key: string): string | undefined {
  if (process.env[key]) return process.env[key];

  const lovableEnv = loadLovableEnv();
  if (lovableEnv[key]) return lovableEnv[key];

  return undefined;
}
