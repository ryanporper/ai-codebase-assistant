import { NextRequest, NextResponse } from "next/server";

import { parseGitHubRepositoryUrl } from "@/lib/github/parse-repository-url";
import { detectLanguage } from "@/lib/github/detect-language";

import type {
  GitHubFile,
  IngestedGitHubFile,
} from "@/types/github";

type IngestRequest = {
  repositoryUrl: string;
  files: GitHubFile[];
};

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
        }
      );
    }

    if (!files || !Array.isArray(files)) {
      return NextResponse.json(
        {
          error: "Repository files are required.",
        },
        {
          status: 400,
        }
      );
    }

    const repository =
      parseGitHubRepositoryUrl(repositoryUrl);

    if (!repository) {
      return NextResponse.json(
        {
          error: "Invalid GitHub repository URL.",
        },
        {
          status: 400,
        }
      );
    }

    const ingestedFiles: IngestedGitHubFile[] = [];

    for (const file of files) {
      const response = await fetch(
        `https://api.github.com/repos/${repository.owner}/${repository.repo}/git/blobs/${file.sha}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
        }
      );

      if (!response.ok) {
        console.error(
          `Unable to retrieve ${file.path}`
        );

        continue;
      }

      const data = await response.json();

      if (data.encoding !== "base64") {
        continue;
      }

      const content = Buffer.from(
        data.content,
        "base64"
      ).toString("utf-8");

      ingestedFiles.push({
        path: file.path,
        language: detectLanguage(file.path),
        content,
        size: file.size ?? content.length,
        sha: file.sha,
      });
    }

    return NextResponse.json({
      repository: `${repository.owner}/${repository.repo}`,
      ingestedFileCount: ingestedFiles.length,
      files: ingestedFiles,
    });
  } catch (error) {
    console.error("Repository ingestion failed:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while ingesting the repository.",
      },
      {
        status: 500,
      }
    );
  }
}