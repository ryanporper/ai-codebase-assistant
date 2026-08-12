# AI Codebase Assistant

AI Codebase Assistant is a full-stack developer tool for analyzing GitHub repositories and building toward AI-powered codebase understanding using embeddings, semantic search, RAG, and agentic workflows.

The project is designed to demonstrate practical AI engineering skills alongside modern full-stack development.

## Current Features

- Next.js + TypeScript application
- Tailwind CSS styling
- Developer dashboard
- Public GitHub repository connection
- Repository URL parsing
- GitHub repository metadata retrieval
- Repository file tree scanning
- Source file filtering
- Source code ingestion through the GitHub API
- Basic programming language detection
- UI for viewing scanned and ingested source files

## Current Architecture

```text
GitHub Repository URL
        ↓
Repository Metadata
        ↓
Default Branch
        ↓
GitHub File Tree
        ↓
Source File Filtering
        ↓
Git Blob Retrieval
        ↓
Base64 Decode
        ↓
Normalized Source Files
```

Each ingested source file is transformed into a structure similar to:

```ts
{
  path: "server/controllers/auth.js",
  language: "javascript",
  content: "...source code...",
  size: 4821,
  sha: "..."
}
```

This normalized data will be used in the next phase for code chunking and AI indexing.

## Planned AI Architecture

```text
GitHub Repository
        ↓
Repository Ingestion
        ↓
Source File Filtering
        ↓
Code Parsing
        ↓
Code Chunking
        ↓
Embeddings
        ↓
PostgreSQL + pgvector
        ↓
Semantic Search
        ↓
RAG
        ↓
LLM
        ↓
Source-Grounded Responses
        ↓
AI Agent Tools
        ↓
AI Code Review
```

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- Node.js
- GitHub REST API

### Planned Database

- PostgreSQL
- pgvector

### Planned AI

- Large Language Models
- Embeddings
- Retrieval-Augmented Generation
- Semantic Search
- Prompt Engineering
- Tool Calling
- AI Agents
- AI-Assisted Code Review

## Project Structure

```text
ai-codebase-assistant/
├── app/
│   ├── api/
│   │   └── github/
│   │       ├── repository/
│   │       │   └── route.ts
│   │       ├── tree/
│   │       │   └── route.ts
│   │       └── ingest/
│   │           └── route.ts
│   ├── repositories/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── repository/
│       └── repository-form.tsx
│
├── lib/
│   └── github/
│       ├── detect-language.ts
│       ├── filter-source-files.ts
│       └── parse-repository-url.ts
│
├── types/
│   └── github.ts
│
├── public/
├── .env.example
├── .gitignore
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/ryanporper/ai-codebase-assistant.git
```

Enter the project:

```bash
cd ai-codebase-assistant
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Repository workflow:

```text
http://localhost:3000/repositories
```

## Current Repository Workflow

The current version supports public GitHub repositories.

Example:

```text
https://github.com/ryanporper/socialsite
```

The application currently:

1. Accepts a GitHub repository URL
2. Parses the repository owner and name
3. Retrieves repository metadata
4. Detects the default branch
5. Retrieves the recursive repository file tree
6. Filters supported source files
7. Retrieves source file contents using Git blob SHAs
8. Decodes source files into readable UTF-8 content
9. Detects the programming language
10. Displays ingested files in the UI

## Supported Source Types

The current source-file filter supports:

```text
JavaScript
TypeScript
JSX
TSX
Python
Java
C#
HTML
CSS
SCSS
SQL
JSON
Markdown
```

Ignored content includes common generated or unnecessary paths such as:

```text
node_modules/
.next/
dist/
build/
coverage/
.git/
```

as well as lock files.

## Roadmap

### Phase 1 — Foundation

- [x] Create Next.js + TypeScript application
- [x] Add Tailwind CSS
- [x] Build initial dashboard
- [x] Create repository connection UI
- [x] Parse GitHub repository URLs
- [x] Retrieve repository metadata

### Phase 2 — Repository Ingestion

- [x] Retrieve repository file tree
- [x] Filter unsupported and unnecessary files
- [x] Retrieve source file contents
- [x] Detect programming languages
- [x] Normalize source file data
- [ ] Add authenticated GitHub API access
- [ ] Improve ingestion performance and rate-limit handling

### Phase 3 — Code Chunking

- [ ] Split source files into smaller chunks
- [ ] Preserve file and line metadata
- [ ] Improve chunk boundaries around functions and classes
- [ ] Add chunk IDs and repository references

### Phase 4 — AI Search

- [ ] Add PostgreSQL
- [ ] Add pgvector
- [ ] Generate embeddings
- [ ] Store code embeddings
- [ ] Implement semantic code search

### Phase 5 — RAG

- [ ] Embed user questions
- [ ] Retrieve relevant source chunks
- [ ] Send retrieved context to an LLM
- [ ] Generate grounded answers
- [ ] Add file and line citations
- [ ] Stream AI responses

### Phase 6 — AI Agents

- [ ] Add tool calling
- [ ] Implement `search_code`
- [ ] Implement `read_file`
- [ ] Implement `list_files`
- [ ] Implement `find_references`
- [ ] Add dependency search
- [ ] Build agent execution loop

### Phase 7 — AI Code Review

- [ ] GitHub pull request integration
- [ ] Retrieve code diffs
- [ ] Analyze changed files
- [ ] Identify potential bugs
- [ ] Identify maintainability concerns
- [ ] Identify possible security concerns
- [ ] Link findings to source code

### Phase 8 — Production

- [ ] Authentication
- [ ] Private repository support
- [ ] Rate limiting
- [ ] AI evaluation suite
- [ ] Prompt injection protections
- [ ] Automated testing
- [ ] Production deployment
- [ ] Demo video

## Project Goal

The goal is to build a production-style AI developer tool rather than a generic chatbot.

The finished application will demonstrate:

```text
Full-Stack Development
        +
GitHub API Integration
        +
Repository Ingestion
        +
Code Chunking
        +
Embeddings
        +
Vector Search
        +
RAG
        +
LLMs
        +
AI Agents
        +
Tool Calling
        +
AI Evaluation
```

The end result should allow developers to connect a repository, ask architecture and implementation questions, trace code behavior, and receive source-grounded AI responses.
