import { NextRequest, NextResponse } from "next/server";
import { parseGitHubRepositoryUrl } from "@/lib/github/parse-repository-url";

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

    const response = await fetch(
      `https://api.github.com/repos/${repository.owner}/${repository.repo}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );

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

    return NextResponse.json(data);
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