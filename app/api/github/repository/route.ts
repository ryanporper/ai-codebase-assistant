import { NextRequest, NextResponse } from "next/server";
import { parseGitHubRepositoryUrl } from "@/lib/github/parse-repository-url";
import { githubFetch } from "@/lib/github/github-fetch";
import { getGitHubRateLimit } from "@/lib/github/get-rate-limit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const repositoryUrl = body.repositoryUrl;

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

    const repository = parseGitHubRepositoryUrl(repositoryUrl);

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

    const response = await githubFetch(
  `https://api.github.com/repos/${repository.owner}/${repository.repo}`
);

const rateLimit =
  getGitHubRateLimit(response);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Repository could not be found.",
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    return NextResponse.json({
  repository: data,
  rateLimit,
});
  } catch {
    return NextResponse.json(
      {
        error: "Something went wrong while retrieving the repository.",
      },
      {
        status: 500,
      }
    );
  }
}