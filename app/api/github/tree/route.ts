import { NextRequest, NextResponse } from "next/server";

import { parseGitHubRepositoryUrl } from "@/lib/github/parse-repository-url";
import { filterSourceFiles } from "@/lib/github/filter-source-files";
import { githubFetch } from "@/lib/github/github-fetch";
import { getGitHubRateLimit } from "@/lib/github/get-rate-limit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { repositoryUrl, branch } = body;

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

    const branchName = branch || "main";

    const response = await githubFetch(
      `https://api.github.com/repos/${repository.owner}/${repository.repo}/git/trees/${branchName}?recursive=1`,
    );

    const rateLimit = getGitHubRateLimit(response);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Unable to retrieve repository file tree.",
        },
        {
          status: response.status,
        },
      );
    }

    const data = await response.json();

    const sourceFiles = filterSourceFiles(data.tree);

    return NextResponse.json({
      repository: `${repository.owner}/${repository.repo}`,
      branch: branchName,
      totalFiles: data.tree.length,
      sourceFileCount: sourceFiles.length,
      truncated: data.truncated ?? false,
      rateLimit,
      files: sourceFiles,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong while retrieving the repository.",
      },
      {
        status: 500,
      },
    );
  }
}
