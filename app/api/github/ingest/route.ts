import { NextRequest, NextResponse } from "next/server";

import { parseGitHubRepositoryUrl } from "@/lib/github/parse-repository-url";
import { detectLanguage } from "@/lib/github/detect-language";
import { githubFetch } from "@/lib/github/github-fetch";
import { getGitHubRateLimit } from "@/lib/github/get-rate-limit";

import type { GitHubFile, IngestedGitHubFile } from "@/types/github";

type IngestRequest = {
  repositoryUrl: string;
  files: GitHubFile[];
};

const MAX_FILE_SIZE = 500_000;

export async function POST(request: NextRequest) {
  try {
    const body: IngestRequest = await request.json();

    const { repositoryUrl, files } = body;

    if (!repositoryUrl) {
      return NextResponse.json(
        {
          error: "Repository URL is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        {
          error: "Repository files are required.",
        },
        {
          status: 400,
        },
      );
    }

    const repository = parseGitHubRepositoryUrl(repositoryUrl);

    if (!repository) {
      return NextResponse.json(
        {
          error: "Invalid GitHub repository URL.",
        },
        {
          status: 400,
        },
      );
    }

    const ingestedFiles: IngestedGitHubFile[] = [];

    const skippedFiles: {
      path: string;
      reason: string;
    }[] = [];

    let rateLimit = null;

    for (const file of files) {
      if (file.size && file.size > MAX_FILE_SIZE) {
        skippedFiles.push({
          path: file.path,
          reason: "File too large",
        });

        continue;
      }

      const response = await githubFetch(
        `https://api.github.com/repos/${repository.owner}/${repository.repo}/git/blobs/${file.sha}`,
      );

      rateLimit = getGitHubRateLimit(response);

      if (!response.ok) {
        skippedFiles.push({
          path: file.path,
          reason: `GitHub API returned ${response.status}`,
        });

        continue;
      }

      const data = await response.json();

      if (data.encoding !== "base64") {
        skippedFiles.push({
          path: file.path,
          reason: "Unsupported encoding",
        });

        continue;
      }

      const content = Buffer.from(data.content, "base64").toString("utf-8");

      if (!content.trim()) {
        skippedFiles.push({
          path: file.path,
          reason: "Empty file",
        });

        continue;
      }

      ingestedFiles.push({
        path: file.path,
        language: detectLanguage(file.path),
        content,
        size: file.size ?? Buffer.byteLength(content, "utf8"),
        sha: file.sha,
      });
    }

    return NextResponse.json({
      repository: `${repository.owner}/${repository.repo}`,

      requestedFileCount: files.length,

      ingestedFileCount: ingestedFiles.length,

      skippedFileCount: skippedFiles.length,

      rateLimit,

      files: ingestedFiles,

      skippedFiles,
    });
  } catch (error) {
    console.error("Repository ingestion failed:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while ingesting the repository.",
      },
      {
        status: 500,
      },
    );
  }
}
