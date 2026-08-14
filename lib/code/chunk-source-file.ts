import type { CodeChunk, IngestedGitHubFile } from "@/types/github";

type ChunkSourceFileOptions = {
  repository: string;
  maxLines?: number;
  overlapLines?: number;
};

export function chunkSourceFile(
  file: IngestedGitHubFile,
  options: ChunkSourceFileOptions,
): CodeChunk[] {
  const { repository, maxLines = 80, overlapLines = 10 } = options;

  const lines = file.content.split("\n");

  if (lines.length === 0) {
    return [];
  }

  const chunks: CodeChunk[] = [];

  let startIndex = 0;
  let chunkIndex = 0;

  while (startIndex < lines.length) {
    const endIndex = Math.min(startIndex + maxLines, lines.length);

    const content = lines.slice(startIndex, endIndex).join("\n").trim();

    if (content) {
      chunks.push({
        id: `${file.sha}-${chunkIndex}`,
        repository,
        filePath: file.path,
        language: file.language,
        chunkIndex,
        startLine: startIndex + 1,
        endLine: endIndex,
        content,
      });
    }

    if (endIndex >= lines.length) {
      break;
    }

    startIndex = Math.max(endIndex - overlapLines, startIndex + 1);

    chunkIndex++;
  }

  return chunks;
}
