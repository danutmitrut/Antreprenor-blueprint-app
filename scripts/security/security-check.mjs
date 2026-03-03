#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const THIS_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_CONFIG_PATH = path.resolve(THIS_DIR, "..", "default-config.json");
const SEVERITY_ORDER = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1, INFO: 0 };

function parseArgs(argv) {
  const parsed = {
    format: "text",
    root: process.cwd(),
    configPath: DEFAULT_CONFIG_PATH,
    failOn: null
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--format=json") parsed.format = "json";
    if (arg === "--format=text") parsed.format = "text";
    if (arg === "--root" && argv[i + 1]) parsed.root = path.resolve(argv[i + 1]);
    if (arg === "--config" && argv[i + 1]) parsed.configPath = path.resolve(argv[i + 1]);
    if (arg === "--fail-on" && argv[i + 1]) {
      parsed.failOn = argv[i + 1]
        .split(",")
        .map((v) => v.trim().toUpperCase())
        .filter(Boolean);
    }
  }
  return parsed;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isTextFile(filePath, textExtensions) {
  return textExtensions.has(path.extname(filePath).toLowerCase());
}

function walk(dirPath, ignoreDirs, textExtensions, maxFileSizeBytes, out = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (ignoreDirs.has(entry.name)) continue;
      walk(fullPath, ignoreDirs, textExtensions, maxFileSizeBytes, out);
      continue;
    }
    if (!entry.isFile()) continue;

    try {
      const st = fs.statSync(fullPath);
      if (st.size > maxFileSizeBytes) continue;
      if (!isTextFile(fullPath, textExtensions)) continue;
      out.push(fullPath);
    } catch {
      // Ignore unreadable files.
    }
  }
  return out;
}

function readTextSafe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function getLineCol(content, index) {
  const prefix = content.slice(0, index);
  const parts = prefix.split("\n");
  const line = parts.length;
  const col = parts[parts.length - 1].length + 1;
  return { line, col };
}

function toPosixRelative(root, absPath) {
  return path.relative(root, absPath).replaceAll("\\", "/");
}

function addFinding(findings, finding) {
  findings.push(finding);
}

function getTrackedFiles(root) {
  try {
    const output = execSync("git ls-files", { cwd: root, stdio: ["ignore", "pipe", "ignore"] })
      .toString("utf8")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    return new Set(output);
  } catch {
    return null;
  }
}

function detectEnvFiles(root, absFile, findings, trackedFiles) {
  const base = path.basename(absFile);
  if (!base.startsWith(".env")) return;
  if (base === ".env.example" || base === ".env.template") return;
  const rel = toPosixRelative(root, absFile);
  const isTracked = trackedFiles ? trackedFiles.has(rel) : false;
  addFinding(findings, {
    severity: isTracked ? "HIGH" : "LOW",
    code: "ENV_FILE_PRESENT",
    file: rel,
    line: 1,
    col: 1,
    message: isTracked
      ? "An .env file is tracked by git. Remove from git history and keep only .env.example templates."
      : "An .env file exists locally. Verify it remains gitignored and never committed.",
    evidence: base
  });
}

function detectRegexRules(root, absFile, content, rules, findings) {
  for (const rule of rules) {
    const re = new RegExp(rule.regex, rule.flags ?? "g");
    let match;
    while ((match = re.exec(content)) !== null) {
      const { line, col } = getLineCol(content, match.index);
      addFinding(findings, {
        severity: rule.severity,
        code: rule.id,
        file: toPosixRelative(root, absFile),
        line,
        col,
        message: rule.description,
        evidence: String(match[0]).slice(0, 120)
      });
      if (match.index === re.lastIndex) re.lastIndex += 1;
    }
  }
}

function detectMissingApiAuth(root, absFile, content, findings) {
  const rel = toPosixRelative(root, absFile);
  if (!rel.includes("app/api/")) return;
  if (!rel.endsWith("/route.ts") && !rel.endsWith("/route.js")) return;
  const hasMethod = /export\s+async\s+function\s+(GET|POST|PUT|PATCH|DELETE)\s*\(/.test(content);
  if (!hasMethod) return;

  const touchesData =
    /supabase\.from\s*\(/.test(content) ||
    /\.from\s*\(/.test(content) ||
    /(select|insert|update|delete)\s*\(/i.test(content);
  if (!touchesData) return;

  const hasAuthEvidence =
    /auth\.getUser\s*\(/.test(content) ||
    /createServerClient\s*\(/.test(content) ||
    /getSupabaseServerClient\s*\(/.test(content) ||
    /requireUser\s*\(/.test(content) ||
    /assertAuth\s*\(/.test(content);

  if (!hasAuthEvidence) {
    addFinding(findings, {
      severity: "MEDIUM",
      code: "API_ROUTE_MISSING_AUTH_CHECK",
      file: rel,
      line: 1,
      col: 1,
      message: "API route appears to access data without explicit server-side auth check (heuristic).",
      evidence: "export async function ... + data access"
    });
  }
}

function detectHighConfidenceSqlInjection(root, absFile, content, findings) {
  const rel = toPosixRelative(root, absFile);
  if (!/\.(js|mjs|cjs|ts|tsx|jsx|sql)$/i.test(rel)) return;

  const patterns = [
    {
      regex: /(?:query|execute|unsafe|prepare)\s*\(\s*`[^`]*\$\{[^`]*`/gi,
      evidence: "raw query API with template interpolation"
    },
    {
      regex: /(?:query|execute|unsafe|prepare)\s*\(\s*["'][^"']*(SELECT|INSERT|UPDATE|DELETE)[^"']*["']\s*\+\s*[a-zA-Z_]/gi,
      evidence: "raw SQL string concatenation"
    },
    {
      regex: /sql\.unsafe\s*\(\s*`[^`]*\$\{[^`]*`/gi,
      evidence: "sql.unsafe template interpolation"
    }
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.regex.exec(content)) !== null) {
      const { line, col } = getLineCol(content, match.index);
      addFinding(findings, {
        severity: "HIGH",
        code: "INJECTION_RAW_SQL_CONCAT",
        file: rel,
        line,
        col,
        message: "Possible SQL injection via raw SQL interpolation/concatenation in query API.",
        evidence: pattern.evidence
      });
      if (match.index === pattern.regex.lastIndex) pattern.regex.lastIndex += 1;
    }
  }
}

function detectServiceRoleClientUsage(root, absFile, content, findings) {
  const rel = toPosixRelative(root, absFile);
  const isApiRoute = rel.includes("app/api/") && (rel.endsWith("/route.ts") || rel.endsWith("/route.js"));
  const isClientComponent = /^\s*["']use client["'];?/m.test(content);
  const inPublicLikePath =
    rel.includes("public/") ||
    rel.includes("/components/") ||
    rel.includes("src/components/") ||
    rel.includes("src/pages/");
  if (isApiRoute) return;
  if (!isClientComponent && !inPublicLikePath) return;
  const mentionsServiceRole =
    /SUPABASE_SERVICE_ROLE_KEY/.test(content) ||
    /process\.env\.SUPABASE_SERVICE_ROLE_KEY/.test(content);
  if (!mentionsServiceRole) return;
  addFinding(findings, {
    severity: "CRITICAL",
    code: "SUPABASE_SERVICE_ROLE_IN_CLIENT_CODE",
    file: rel,
    line: 1,
    col: 1,
    message: "Service role key usage appears in client/public code path.",
    evidence: "SUPABASE_SERVICE_ROLE_KEY"
  });
}

function dedupeFindings(findings) {
  const seen = new Set();
  const out = [];
  for (const f of findings) {
    const key = `${f.code}|${f.file}|${f.line}|${f.col}|${f.message}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(f);
  }
  return out;
}

function summarize(findings) {
  const counts = {};
  for (const f of findings) {
    counts[f.severity] = (counts[f.severity] ?? 0) + 1;
  }
  return counts;
}

function printText(findings, counts, shouldFail, failOn) {
  console.log("SECURITY CHECK REPORT");
  console.log("=====================");
  console.log(
    `CRITICAL: ${counts.CRITICAL ?? 0} | HIGH: ${counts.HIGH ?? 0} | MEDIUM: ${counts.MEDIUM ?? 0} | LOW: ${counts.LOW ?? 0} | INFO: ${counts.INFO ?? 0}`
  );
  console.log("");

  const grouped = {};
  for (const finding of findings) {
    if (!grouped[finding.severity]) grouped[finding.severity] = [];
    grouped[finding.severity].push(finding);
  }

  for (const severity of ["CRITICAL", "HIGH", "MEDIUM", "LOW", "INFO"]) {
    if (!grouped[severity]?.length) continue;
    console.log(`${severity}:`);
    for (const finding of grouped[severity]) {
      console.log(`- [${finding.code}] ${finding.file}:${finding.line}:${finding.col} - ${finding.message}`);
      console.log(`  evidence: ${finding.evidence}`);
    }
    console.log("");
  }

  console.log(`Fail policy: ${Array.from(failOn).join(", ")}`);
  console.log(`Result: ${shouldFail ? "FAIL" : "PASS"}`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const config = readJson(args.configPath);
  const ignoreDirs = new Set(config.ignoreDirs ?? []);
  const textExtensions = new Set(config.textExtensions ?? []);
  const maxFileSizeBytes = config.maxFileSizeBytes ?? 2_000_000;
  const failOn = new Set(args.failOn ?? config.failOn ?? ["CRITICAL", "HIGH"]);

  const absFiles = walk(args.root, ignoreDirs, textExtensions, maxFileSizeBytes);
  const trackedFiles = getTrackedFiles(args.root);
  const findings = [];

  for (const absFile of absFiles) {
    const content = readTextSafe(absFile);
    if (content === null) continue;

    detectEnvFiles(args.root, absFile, findings, trackedFiles);
    detectRegexRules(args.root, absFile, content, config.rules ?? [], findings);
    detectMissingApiAuth(args.root, absFile, content, findings);
    detectHighConfidenceSqlInjection(args.root, absFile, content, findings);
    detectServiceRoleClientUsage(args.root, absFile, content, findings);
  }

  const deduped = dedupeFindings(findings).sort((a, b) => {
    const sevDelta = (SEVERITY_ORDER[b.severity] ?? 0) - (SEVERITY_ORDER[a.severity] ?? 0);
    if (sevDelta !== 0) return sevDelta;
    if (a.file !== b.file) return a.file.localeCompare(b.file);
    return a.line - b.line;
  });
  const counts = summarize(deduped);
  const shouldFail = deduped.some((f) => failOn.has(f.severity));

  if (args.format === "json") {
    console.log(
      JSON.stringify(
        {
          ok: !shouldFail,
          failOn: Array.from(failOn),
          counts,
          findings: deduped
        },
        null,
        2
      )
    );
  } else {
    printText(deduped, counts, shouldFail, failOn);
  }

  process.exit(shouldFail ? 2 : 0);
}

main();
