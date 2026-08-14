import { NextRequest, NextResponse } from "next/server";

import { chunkSourceFile } from "@/lib/code/chunk-source-file";

import type { CodeChunk, IngestedGitHubFile } from "@/types/github";

type ChunkRequest = {
  repository: string;
  files: IngestedGitHubFile[];
};

export async function POST(request: NextRequest) {
  try {
    const body: ChunkRequest = await request.json();

    const { repository, files } = body;

    if (!repository) {
      return NextResponse.json(
        {
          error: "Repository is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        {
          error: "Ingested files are required.",
        },
        {
          status: 400,
        },
      );
    }

    const chunks: CodeChunk[] = files.flatMap((file) =>
      chunkSourceFile(file, {
        repository,
        maxLines: 80,
        overlapLines: 10,
      }),
    );

    return NextResponse.json({
      repository,
      fileCount: files.length,
      chunkCount: chunks.length,
      chunks,
    });
  } catch (error) {
    console.error("Code chunking failed:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while chunking source code.",
      },
      {
        status: 500,
      },
    );
  }
}
