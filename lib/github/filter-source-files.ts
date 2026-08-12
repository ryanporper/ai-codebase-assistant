import type { GitHubFile } from "@/types/github";

const SUPPORTED_EXTENSIONS = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".py",
  ".java",
  ".cs",
  ".html",
  ".css",
  ".scss",
  ".sql",
  ".json",
  ".md",
];

const IGNORED_PATHS = [
  "node_modules/",
  ".next/",
  "dist/",
  "build/",
  "coverage/",
  ".git/",
];

const IGNORED_FILES = [
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
];

export function filterSourceFiles(files: GitHubFile[]) {
  return files.filter((file) => {
    if (file.type !== "blob") {
      return false;
    }

    if (IGNORED_PATHS.some((path) => file.path.includes(path))) {
      return false;
    }

    if (IGNORED_FILES.some((name) => file.path.endsWith(name))) {
      return false;
    }

    return SUPPORTED_EXTENSIONS.some((extension) =>
      file.path.toLowerCase().endsWith(extension)
    );
  });
}