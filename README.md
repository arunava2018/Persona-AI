# Persona AI

Persona AI is a Next.js application that lets users chat with AI personas inspired by real people. The app combines a polished landing experience, persona-based chat interfaces, Supabase-backed conversation storage, and Groq-powered language generation.

## What this project does

- Presents a landing page with featured personas
- Lets users open persona-specific chat sessions
- Stores conversations and messages in Supabase
- Uses persona assets and few-shot examples to steer the assistant personality
- Supports conversation creation, listing, fetching, and deletion through Next.js API routes

## Tech stack

- Frontend: Next.js 16, React 19, TypeScript
- Styling: Tailwind CSS, shadcn/ui, Framer Motion
- Backend/API: Next.js App Router route handlers
- Database: Supabase
- AI model: Groq via the Groq SDK
- Additional libraries: AI SDK, React Markdown, Lucide Icons

## Project structure

```text
persona-ai/
  app/                  # Next.js app router pages and API routes
    api/                # Conversation, persona, and message endpoints
    chat/               # Persona chat pages
  components/           # Reusable UI components
  lib/                  # Shared app logic
    ai/                 # Persona loading, prompt building, and LLM calls
    supabase/           # Supabase client and query helpers
  public/               # Static assets
  transcript-generator/ # Optional pipeline for generating persona data from transcripts
```

## Core user flow

1. A user visits the landing page and chooses a persona.
2. The app creates a new conversation for that persona.
3. Each message is sent to a Next.js API route.
4. The server loads the selected persona assets and few-shot examples.
5. A system prompt and chat history are built for the LLM.
6. Groq generates the assistant reply.
7. Both user and assistant messages are persisted to Supabase.

## API routes

### Persona routes

- GET /api/personas
  - Returns the list of available personas from Supabase.

### Conversation routes

- POST /api/conversations
  - Creates a new conversation for a persona.
- GET /api/conversations?persona=slug
  - Fetches all conversations for a given persona.
- DELETE /api/conversations
  - Deletes a conversation and its related messages.

### Message routes

- POST /api/conversations/[conversationsId]/messages
  - Saves a user message, builds prompt context, calls the LLM, and stores the assistant reply.
- GET /api/conversations/[conversationsId]/messages
  - Retrieves the full message history for a conversation.

## AI behavior

The assistant personality is shaped by persona-specific assets stored in:

- lib/ai/personas/[persona]/[persona].persona.json
- lib/ai/personas/[persona]/[persona].fewshots.json

The prompt builder combines:

- a system prompt derived from the persona profile
- a small set of few-shot examples
- the active conversation history

## Environment variables

Create a local environment file before running the app.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
GROQ_API_KEY=your_groq_api_key
```

These values are required for:

- Supabase database access
- LLM inference through Groq

## Prerequisites

- Node.js 20+ recommended
- npm
- Access to a Supabase project
- A Groq API key

## Running locally

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Open the app in your browser

```text
http://localhost:3000
```

## Production build

To verify the app builds successfully:

```bash
npm run build
```

To start the production build locally:

```bash
npm run start
```
