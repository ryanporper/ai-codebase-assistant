"use client";

import { FormEvent, useState } from "react";
import type { GitHubRepository } from "@/types/github";

export default function RepositoryForm() {
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [repository, setRepository] = useState<GitHubRepository | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setError("");
    setRepository(null);
    setLoading(true);

    try {
      const response = await fetch("/api/github/repository", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repositoryUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to retrieve repository.");
      }

      setRepository(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold">Connect Repository</h2>

        <p className="mt-2 text-sm text-slate-500">
          Enter a public GitHub repository URL.
        </p>

        <div className="mt-5 flex gap-3">
          <input
            type="url"
            placeholder="https://github.com/owner/repository"
            value={repositoryUrl}
            onChange={(event) => setRepositoryUrl(event.target.value)}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white disabled:opacity-50"
          >
            {loading ? "Connecting..." : "Connect"}
          </button>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      </form>

      {repository && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
              className="h-12 w-12 rounded-full"
            />

            <div>
              <h3 className="text-lg font-semibold">{repository.full_name}</h3>

              <p className="text-sm text-slate-500">
                {repository.description ?? "No description"}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-slate-500">Language</p>
              <p className="font-medium">{repository.language ?? "Unknown"}</p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Default branch</p>
              <p className="font-medium">{repository.default_branch}</p>
            </div>

            <div>
              <p className="text-xs text-slate-500">Stars</p>
              <p className="font-medium">{repository.stargazers_count}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
