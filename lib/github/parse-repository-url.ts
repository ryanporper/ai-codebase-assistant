export function parseGitHubRepositoryUrl(url: string) {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname !== "github.com") {
      return null;
    }

    const parts = parsedUrl.pathname
      .split("/")
      .filter(Boolean);

    if (parts.length < 2) {
      return null;
    }

    const owner = parts[0];
    const repo = parts[1].replace(/\.git$/, "");

    return {
      owner,
      repo,
    };
  } catch {
    return null;
  }
}