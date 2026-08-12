import type { GitHubRateLimit } from "@/types/github-rate-limit";

export function getGitHubRateLimit(
  response: Response
): GitHubRateLimit {
  const limit =
    response.headers.get("x-ratelimit-limit");

  const remaining =
    response.headers.get(
      "x-ratelimit-remaining"
    );

  const reset =
    response.headers.get("x-ratelimit-reset");

  return {
    limit: limit ? Number(limit) : null,
    remaining: remaining
      ? Number(remaining)
      : null,
    reset: reset ? Number(reset) : null,
  };
}