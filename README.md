# AI Codebase Assistant

AI Codebase Assistant is a full-stack developer tool designed to analyze GitHub repositories and eventually provide AI-powered codebase understanding using semantic search, RAG, embeddings, and agentic workflows.

The goal of this project is to demonstrate practical AI engineering skills alongside modern full-stack development.

## Current Features

- Next.js + TypeScript application
- Tailwind CSS styling
- Developer-focused dashboard
- GitHub repository URL parsing
- GitHub repository metadata retrieval
- API route for repository lookup
- Repository connection form
- Basic repository details display
- Project structure prepared for AI and data features

## Current Architecture

```text
GitHub Repository URL
        ↓
Next.js Frontend
        ↓
POST /api/github/repository
        ↓
Parse Repository Owner / Name
        ↓
GitHub REST API
        ↓
Repository Metadata
        ↓
Display Repository Information
```

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
│   │       └── repository/
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

Move into the project:

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

Repository page:

```text
http://localhost:3000/repositories
```

## Repository Lookup

The current version supports public GitHub repository lookup.

Example:

```text
https://github.com/ryanporper/socialsite
```

The application:

1. Accepts a GitHub repository URL
2. Parses the repository owner and name
3. Sends the request to the backend
4. Retrieves repository metadata from the GitHub API
5. Displays repository information in the UI

## Roadmap

### Phase 1 — Foundation

- [x] Create Next.js + TypeScript application
- [x] Add Tailwind CSS
- [x] Build initial dashboard
- [x] Create repository connection UI
- [x] Parse GitHub repository URLs
- [x] Retrieve repository metadata

### Phase 2 — Repository Ingestion

- [ ] Retrieve repository file tree
- [ ] Filter unsupported and unnecessary files
- [ ] Retrieve source file contents
- [ ] Detect programming languages
- [ ] Store repository data

### Phase 3 — AI Search

- [ ] Split source files into chunks
- [ ] Generate embeddings
- [ ] Add PostgreSQL
- [ ] Add pgvector
- [ ] Store code embeddings
- [ ] Implement semantic code search

### Phase 4 — RAG

- [ ] Embed user questions
- [ ] Retrieve relevant source code
- [ ] Send retrieved context to an LLM
- [ ] Generate grounded answers
- [ ] Add file and line references
- [ ] Stream AI responses

### Phase 5 — AI Agents

- [ ] Add tool calling
- [ ] Implement `search_code`
- [ ] Implement `read_file`
- [ ] Implement `list_files`
- [ ] Implement `find_references`
- [ ] Implement dependency search
- [ ] Build agent execution loop

### Phase 6 — AI Code Review

- [ ] GitHub pull request integration
- [ ] Retrieve code diffs
- [ ] Analyze changed files
- [ ] Identify potential bugs
- [ ] Identify maintainability concerns
- [ ] Identify possible security concerns
- [ ] Link findings to source code

### Phase 7 — Production

- [ ] Authentication
- [ ] Private repository support
- [ ] Rate limiting
- [ ] AI evaluation suite
- [ ] Prompt injection protections
- [ ] Automated testing
- [ ] Production deployment
- [ ] Demo video

## Project Goal

This project is intended to demonstrate how modern AI techniques can be integrated into a production-style full-stack application.

The finished application will demonstrate:

```text
Full-Stack Development
        +
GitHub API Integration
        +
LLMs
        +
Embeddings
        +
Vector Search
        +
RAG
        +
AI Agents
        +
Tool Calling
        +
AI Evaluation
```

Rather than building a generic chatbot, AI Codebase Assistant is focused on solving a real developer problem: understanding unfamiliar codebases quickly and accurately.
