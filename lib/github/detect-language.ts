const LANGUAGE_MAP: Record<string, string> = {
  ".js": "javascript",
  ".jsx": "javascript",
  ".ts": "typescript",
  ".tsx": "typescript",
  ".py": "python",
  ".java": "java",
  ".cs": "csharp",
  ".html": "html",
  ".css": "css",
  ".scss": "scss",
  ".sql": "sql",
  ".json": "json",
  ".md": "markdown",
};

export function detectLanguage(path: string): string {
  const lowerPath = path.toLowerCase();

  const extension = Object.keys(LANGUAGE_MAP).find((extension) =>
    lowerPath.endsWith(extension)
  );

  return extension ? LANGUAGE_MAP[extension] : "text";
}