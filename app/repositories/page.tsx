import RepositoryForm from "@/components/repository/repository-form";

export default function RepositoriesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">
            AI CODEBASE ASSISTANT
          </p>

          <h1 className="mt-2 text-3xl font-bold">Repositories</h1>

          <p className="mt-2 text-slate-600">
            Connect a GitHub repository so we can eventually index and analyze
            its source code.
          </p>
        </div>

        <RepositoryForm />
      </div>
    </main>
  );
}
