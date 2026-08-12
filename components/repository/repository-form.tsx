"use client";

import { FormEvent, useState } from "react";
import type {
  GitHubFile,
  GitHubRepository,
  IngestedGitHubFile,
} from "@/types/github";

export default function RepositoryForm() {
  type IngestionResult = {
    requestedFileCount: number;
    ingestedFileCount: number;
    skippedFileCount: number;
  };

  const [ingestionResult, setIngestionResult] =
    useState<IngestionResult | null>(null);
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [repository, setRepository] = useState<GitHubRepository | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [files, setFiles] = useState<GitHubFile[]>([]);
  const [ingestedFiles, setIngestedFiles] = useState<IngestedGitHubFile[]>([]);

  const [ingesting, setIngesting] = useState(false);

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

      setRepository(data.repository);
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

  async function scanRepository() {
    if (!repository) {
      return;
    }

    setScanning(true);
    setError("");

    try {
      const response = await fetch("/api/github/tree", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          repositoryUrl,
          branch: repository.default_branch,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to scan repository.");
      }

      setFiles(data.files);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setScanning(false);
    }
  }

  async function ingestRepository() {
    if (!repository || files.length === 0) {
      return;
    }

    setIngesting(true);
    setError("");

    try {
      const response = await fetch("/api/github/ingest", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          repositoryUrl,
          files,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to ingest repository.");
      }

      setIngestedFiles(data.files);
      setIngestionResult({
        requestedFileCount: data.requestedFileCount,

        ingestedFileCount: data.ingestedFileCount,

        skippedFileCount: data.skippedFileCount,
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIngesting(false);
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
            <button
              onClick={scanRepository}
              disabled={scanning}
              className="mt-6 rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
            >
              {scanning ? "Scanning..." : "Scan Repository"}
            </button>
            <button
              onClick={ingestRepository}
              disabled={ingesting}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
            >
              {ingesting ? "Ingesting..." : "Ingest Source Code"}
            </button>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Source Files</h3>

              <p className="mt-1 text-sm text-slate-500">
                Files selected for future AI indexing.
              </p>
            </div>

            <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              {files.length} files
            </span>
          </div>

          <div className="mt-6 max-h-[500px] overflow-y-auto rounded-lg border border-slate-200">
            {files.map((file) => (
              <div
                key={file.sha + file.path}
                className="border-b border-slate-100 px-4 py-3 last:border-b-0"
              >
                <code className="text-sm text-slate-700">{file.path}</code>
              </div>
            ))}
          </div>
        </div>
      )}

      {ingestionResult && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Requested</p>

            <p className="mt-1 text-xl font-semibold">
              {ingestionResult.requestedFileCount}
            </p>
          </div>

          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-xs text-green-700">Ingested</p>

            <p className="mt-1 text-xl font-semibold text-green-800">
              {ingestionResult.ingestedFileCount}
            </p>
          </div>

          <div className="rounded-lg bg-amber-50 p-4">
            <p className="text-xs text-amber-700">Skipped</p>

            <p className="mt-1 text-xl font-semibold text-amber-800">
              {ingestionResult.skippedFileCount}
            </p>
          </div>
        </div>
      )}

      {ingestedFiles.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Repository Ingested</h3>

              <p className="mt-1 text-sm text-slate-500">
                Source code is ready for chunking and AI indexing.
              </p>
            </div>

            <span className="rounded-md bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
              {ingestedFiles.length} files
            </span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {ingestedFiles.map((file) => (
              <div
                key={file.sha}
                className="rounded-lg border border-slate-200 p-4"
              >
                <code className="text-sm font-medium text-slate-800">
                  {file.path}
                </code>

                <div className="mt-3 flex gap-4 text-xs text-slate-500">
                  <span>{file.language}</span>

                  <span>{file.size.toLocaleString()} bytes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
