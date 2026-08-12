const GITHUB_API_VERSION = "2026-03-10";

export async function githubFetch(
  url: string,
  options: RequestInit = {}
) {
  const token = process.env.GITHUB_TOKEN;

  const headers = new Headers(options.headers);

  headers.set(
    "Accept",
    "application/vnd.github+json"
  );

  headers.set(
    "X-GitHub-Api-Version",
    GITHUB_API_VERSION
  );

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
}