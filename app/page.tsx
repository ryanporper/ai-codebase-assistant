import Link from "next/link";

const stats = [
  { label: "Repositories", value: "0" },
  { label: "Indexed files", value: "0" },
  { label: "AI conversations", value: "0" },
];

const roadmap = [
  "Connect a GitHub repository",
  "Index source code with embeddings",
  "Search code with RAG",
  "Ask questions with source citations",
  "Add agent tools and AI code review",
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              AI DEVELOPER TOOLING
            </p>
            <h1 className="text-xl font-bold tracking-tight">
              AI Codebase Assistant
            </h1>
          </div>
          <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
            Connect GitHub
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            RAG · Embeddings · AI Agents
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Understand any codebase with AI.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Connect a GitHub repository, index its source code, and ask grounded
            questions about architecture, authentication, dependencies, and
            implementation details.
          </p>
          <div className="mt-7 flex gap-3">
            <Link
              href="/repositories"
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Connect a repository
            </Link>
            <button className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              View roadmap
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Repositories</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Your indexed GitHub projects will appear here.
                </p>
              </div>
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                Coming next
              </span>
            </div>
            <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
              <p className="font-medium text-slate-700">
                No repositories connected
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Connect GitHub to start indexing a codebase.
              </p>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Build roadmap</h3>
            <ol className="mt-5 space-y-4">
              {roadmap.map((item, index) => (
                <li key={item} className="flex gap-3 text-sm">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-700">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 text-slate-600">{item}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>
    </main>
  );
}
