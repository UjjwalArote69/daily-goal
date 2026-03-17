import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const PHASES = [
  {
    id: "kata",
    num: "00",
    title: "Kata Foundation",
    subtitle: "Build muscle memory. No AI allowed.",
    duration: "Weeks 1–4 (then 20 min/day forever)",
    color: "#E8C547",
    dark: "#b8960f",
    bg: "rgba(232,197,71,0.06)",
    border: "rgba(232,197,71,0.2)",
    icon: "⚡",
    purpose: "Your biggest gap is execution speed — you understand how things work but your hands don't move fast enough. Kata sessions are 20-minute daily sprints where you build small UI pieces from scratch with zero AI. No Copilot. No Claude. No googling mid-session. This trains your fingers to catch up to your brain.",
    rules: [
      "Set a 20-minute timer before starting",
      "Write a comment at the top: what you're building",
      "No AI tools, no Copilot, no googling during the session",
      "If you forget a class/syntax, make your best guess and move on",
      "After the timer ends: review, look up what you got wrong, write it in your Kata log",
      "Delete the file. The output doesn't matter. The rep does.",
      "Keep a running 'blank list' — the specific things you always forget",
    ],
    weeks: [
      {
        week: "Week 1",
        tier: "Tier 1",
        tierLabel: "Pure Structure",
        focus: "Flexbox layouts — the single most used CSS pattern",
        why: "90% of layouts reduce to flexbox. If your hands can write flex patterns without thinking, everything else becomes faster.",
        daily: [
          { day: "Mon", task: "Centered card: avatar, name, bio, two buttons side by side", concepts: ["flex", "justify-content", "align-items", "gap"] },
          { day: "Tue", task: "Navbar: logo left, nav links right, mobile stacks vertically", concepts: ["justify-content: space-between", "flex-wrap", "responsive breakpoints"] },
          { day: "Wed", task: "3-column feature grid (becomes 1-col on mobile)", concepts: ["grid-cols", "sm: breakpoints", "gap"] },
          { day: "Thu", task: "Sidebar + main content layout (sidebar collapses on mobile)", concepts: ["flex-row", "flex-col", "w-64", "hidden sm:flex"] },
          { day: "Fri", task: "Footer: 4 columns of links, copyright bar below", concepts: ["grid", "border-t", "text-sm"] },
          { day: "Sat", task: "Re-build Monday's card from pure memory, no looking at it", concepts: ["retrieval practice"] },
          { day: "Sun", task: "Review your blank list. Which Tailwind classes did you guess wrong?", concepts: ["reflection"] },
        ],
        checkpoint: "Can you build a full-page layout with nav, hero, and footer in under 20 min?",
      },
      {
        week: "Week 2",
        tier: "Tier 1",
        tierLabel: "Forms + Spacing",
        focus: "Forms and spacing systems",
        why: "Forms are everywhere in every app. If you can't write a form by hand fast, every feature that requires user input slows you down.",
        daily: [
          { day: "Mon", task: "Login form: email, password, submit button, 'forgot password' link", concepts: ["input", "label", "rounded", "focus:ring", "w-full"] },
          { day: "Tue", task: "Signup form: name, email, password, confirm password, terms checkbox", concepts: ["checkbox", "flex items-start", "space-y"] },
          { day: "Wed", task: "Search bar with icon inside input on the left", concepts: ["relative", "absolute", "pl-10", "SVG icon positioning"] },
          { day: "Thu", task: "Settings form: section headings, input groups, save/cancel buttons", concepts: ["fieldset pattern", "border-b", "sm:grid-cols-2"] },
          { day: "Fri", task: "Pricing card: header, price, feature list with checkmarks, CTA button", concepts: ["ul with custom bullets", "text-2xl font-bold", "border ring"] },
          { day: "Sat", task: "Rebuild the login form from pure memory", concepts: ["retrieval practice"] },
          { day: "Sun", task: "Update blank list. Focus: do you mix up padding vs margin patterns?", concepts: ["reflection"] },
        ],
        checkpoint: "Build a complete auth page (login + signup tabs) in one session without help.",
      },
      {
        week: "Week 3",
        tier: "Tier 2",
        tierLabel: "Add React State",
        focus: "Connect structure to state — make things interactive",
        why: "You understand hooks conceptually. Now wire them to the layouts you've been building so your hands know the full pattern end to end.",
        daily: [
          { day: "Mon", task: "Toggle dark/light mode button — useState(false), apply conditional class", concepts: ["useState", "conditional className", "ternary"] },
          { day: "Tue", task: "Counter with +/-, min 0, max 10, shows 'max reached' text", concepts: ["useState", "disabled prop", "conditional render"] },
          { day: "Wed", task: "Tabs component: 3 tabs, active tab shows content below", concepts: ["useState for activeTab", "array.map", "conditional border-b"] },
          { day: "Thu", task: "Form with validation: shows red border + error msg if field empty on submit", concepts: ["useState for errors object", "onSubmit handler", "conditional styles"] },
          { day: "Fri", task: "Live character counter in textarea: shows X/280, turns red when over limit", concepts: ["onChange", "string.length", "dynamic color"] },
          { day: "Sat", task: "Build the tabs component from pure memory", concepts: ["retrieval practice"] },
          { day: "Sun", task: "Which state patterns are you most hesitant on? Write them down.", concepts: ["reflection"] },
        ],
        checkpoint: "Can you wire up an interactive form with real-time validation from scratch?",
      },
      {
        week: "Week 4",
        tier: "Tier 2",
        tierLabel: "Component Patterns",
        focus: "Modal, dropdown, accordion — the building blocks of every UI",
        why: "These three patterns appear in almost every app you'll ever build. Knowing them by heart removes decision fatigue from all future work.",
        daily: [
          { day: "Mon", task: "Modal: open button, overlay background, close on X or outside click", concepts: ["useState isOpen", "fixed inset-0", "onClick stopPropagation"] },
          { day: "Tue", task: "Dropdown menu: click to open, shows 4 items, closes on item select or outside click", concepts: ["useRef", "useEffect click outside", "absolute z-50"] },
          { day: "Wed", task: "Accordion: 3 items, only one open at a time, smooth animation hint", concepts: ["useState activeIndex", "max-h transition", "overflow-hidden"] },
          { day: "Thu", task: "Toast notification: appears, stays 3 seconds, fades out", concepts: ["useState", "useEffect setTimeout", "fixed bottom-4 right-4"] },
          { day: "Fri", task: "Sidebar with overlay on mobile: hamburger toggles it, close on overlay click", concepts: ["useState", "translate-x transform", "overlay z-index"] },
          { day: "Sat", task: "Build the modal from pure memory", concepts: ["retrieval practice"] },
          { day: "Sun", task: "From this week on: 20 min Kata daily forever, one component per day.", concepts: ["reflection + commitment"] },
        ],
        checkpoint: "Build modal + dropdown + toast in a single 45-min session without help.",
      },
    ],
    ongoing: "From Week 5 onwards, 20 min every single day. Pick one component from Tier 3 (real UI pieces: search dropdown with results, profile page, notification panel, data table with sort, comment thread, etc.). The goal is speed. Track your time — you should feel yourself getting faster month by month.",
  },
  {
    id: "nextjs",
    num: "01",
    title: "Next.js Mastery",
    subtitle: "Rebuild Polypath. Learn by building, not by watching.",
    duration: "Months 1–3 (12 weeks)",
    color: "#60A5FA",
    dark: "#2563eb",
    bg: "rgba(96,165,250,0.06)",
    border: "rgba(96,165,250,0.2)",
    icon: "▲",
    purpose: "You're migrating Polypath (your existing MERN skills tracker) to Next.js. This is the right strategy because you already know what the app should do — so every Next.js concept you learn gets applied immediately to something real. No tutorial hell. Every concept = a feature in Polypath.",
    rules: [
      "Every concept you study must produce a commit in Polypath the same day",
      "Don't move to the next concept until the current one is working in the project",
      "When you use AI for a complex piece, immediately close it and rewrite the same thing manually",
      "If something works but you don't know why, stop and figure out why before moving on",
      "Use the official Next.js docs as your primary resource — they're excellent",
    ],
    weeks: [
      {
        week: "Week 1",
        focus: "Project Setup + App Router Mental Model",
        what: "Understand the fundamental shift from React Router to App Router. Everything is a file. Folders are routes.",
        study: ["create-next-app with App Router, TypeScript, Tailwind, src/", "File-based routing: page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx", "Route groups (parentheses folders) — don't create URL segments", "How layouts nest and persist across navigations", "The difference between the app/ directory and pages/ directory (know why you're using app/)"],
        build: "Set up Polypath in Next.js. Create the folder structure: (auth)/login, (auth)/register, (dashboard)/skills, (dashboard)/progress. Each page.tsx just returns a placeholder h1 for now.",
        kata: "20 min: build a sidebar nav component with active state highlighting current route",
        resources: ["nextjs.org/docs — Routing section", "Next.js App Router Playground (official)"],
        checkpoint: "Can you explain why layouts.tsx exists and what problem it solves compared to traditional React?",
        trap: "Don't start with a YouTube tutorial. Open the docs directly. You're not a beginner — you can read docs.",
      },
      {
        week: "Week 2",
        focus: "Server Components vs Client Components",
        what: "This is the most important mental model shift in Next.js. Get this wrong and you'll fight the framework forever.",
        study: ["Server Components: run only on server, no useState/useEffect, can be async, can fetch data directly", "Client Components: 'use client' directive, runs in browser, can use hooks", "The boundary: a Server Component can import a Client Component, NOT the other way up the tree", "When to use each: interactivity/browser APIs = Client, data fetching/heavy computation = Server", "Passing Server data down to Client components as props"],
        build: "In Polypath: make the skills list page a Server Component that logs 'running on server' in terminal. Add a 'Add Skill' button as a separate Client Component nested inside. Verify in terminal vs browser console which logs where.",
        kata: "20 min: profile card with a 'follow' button — card itself is server, button is client",
        resources: ["nextjs.org/docs — Rendering section", "Theo t3.gg video on Server Components (YouTube)"],
        checkpoint: "Without looking anything up: what happens if you add useState to a Server Component? Why?",
        trap: "The most common mistake: adding 'use client' to everything because it's familiar. Resist this. Default to Server.",
      },
      {
        week: "Week 3",
        focus: "Data Fetching Patterns",
        what: "Next.js has extended fetch with caching built-in. Understanding this means your app is fast by default.",
        study: ["async/await directly in Server Components — fetch() works natively", "fetch cache options: force-cache (default), no-store (always fresh), revalidate: N (ISR)", "Loading UI with loading.tsx — automatic Suspense boundaries", "Error handling with error.tsx — must be a Client Component", "Parallel data fetching with Promise.all vs sequential fetching"],
        build: "In Polypath: create a dashboard page that fetches mock skill data (hardcoded array for now) in an async Server Component. Add a loading.tsx that shows a skeleton UI. Add an error.tsx that shows a friendly error message.",
        kata: "20 min: skeleton loading state for a card grid (3 cards, pulse animation)",
        resources: ["nextjs.org/docs — Data Fetching section", "Vercel blog: Data Fetching patterns"],
        checkpoint: "What is the difference between revalidate: 60 and no-store? When would you use each in Polypath?",
        trap: "Don't use useEffect + fetch for data in Next.js. That's the React SPA pattern. Server Components are better.",
      },
      {
        week: "Week 4",
        focus: "Prisma Setup + Database Schema",
        what: "Prisma is your ORM — it sits between your Next.js code and the database. Get the schema right first.",
        study: ["Install Prisma, init with PostgreSQL provider", "prisma/schema.prisma: model syntax, field types, @id, @default, @unique, @relation", "Designing the Polypath schema: User, Skill, SkillEntry (log), Category", "npx prisma generate — creates the TypeScript client", "npx prisma migrate dev — applies schema to database", "Prisma Studio: visual database browser"],
        build: "Write the full Polypath schema: User (id, email, name, image, createdAt), Skill (id, name, category, userId, createdAt), SkillLog (id, skillId, date, minutesPracticed, notes). Run migration. Open Prisma Studio and verify tables exist.",
        kata: "20 min: a data table component showing mock skill rows with name, category, hours columns",
        resources: ["prisma.io/docs — Getting Started", "Neon.tech (free PostgreSQL in cloud)", "Railway.app (alternative)"],
        checkpoint: "Draw the Polypath database schema on paper — tables, columns, relationships. Can you do it from memory?",
        trap: "Don't use SQLite for development if you're deploying to Vercel. Use Neon (free serverless PostgreSQL) from day one.",
      },
      {
        week: "Week 5",
        focus: "Prisma CRUD — Reading and Writing Data",
        what: "Now you have a schema. Time to actually use it — query, create, update, delete.",
        study: ["prisma.skill.findMany(), findUnique(), findFirst() — with where, orderBy, include", "prisma.skill.create(), createMany()", "prisma.skill.update(), updateMany()", "prisma.skill.delete()", "Prisma Client singleton pattern in Next.js (prevent connection exhaustion)", "Include related records: include: { logs: true }"],
        build: "In Polypath: seed the database with 5 sample skills using prisma.skill.createMany. Build the skills list page that reads from the DB using findMany. Build a skill detail page (dynamic route [skillId]/page.tsx) that uses findUnique.",
        kata: "20 min: list component with items that have edit/delete icon buttons (no logic, just UI)",
        resources: ["prisma.io/docs — CRUD section", "prisma.io/docs — Client singleton pattern (important!)"],
        checkpoint: "Without looking: write prisma.skill.findMany() with a where clause filtering by userId and ordered by createdAt desc.",
        trap: "The Prisma Client singleton. In development, Next.js hot-reload creates multiple instances and exhausts DB connections. Copy the singleton pattern from the docs exactly.",
      },
      {
        week: "Week 6",
        focus: "Server Actions — Forms Without APIs",
        what: "Server Actions are a Next.js superpower: run server-side code directly from form submits. No API route needed.",
        study: ["'use server' directive — marks a function to run on the server", "Server Actions in forms: action={myServerAction}", "useFormState and useFormStatus hooks (for loading/error states)", "Revalidating data after mutation: revalidatePath(), revalidateTag()", "Redirecting after action: redirect() from next/navigation", "Validation with Zod inside server actions"],
        build: "In Polypath: build the 'Add Skill' form as a Server Action. Form submits → server action validates input with Zod → prisma.skill.create() → revalidatePath('/dashboard/skills') → page shows new skill. No API route. No useEffect.",
        kata: "20 min: form with Zod-like manual validation (required, minLength) showing inline errors",
        resources: ["nextjs.org/docs — Server Actions", "Zod docs (zod.dev)", "Theo: Server Actions are good actually"],
        checkpoint: "What does revalidatePath do and why do you need it after a Server Action that mutates data?",
        trap: "Many tutorials still use API routes for mutations in Next.js. Server Actions are the modern pattern. Use them.",
      },
      {
        week: "Week 7",
        focus: "NextAuth.js — Authentication",
        what: "Auth is complex. NextAuth handles the hard parts. Your job is to configure it correctly for Polypath.",
        study: ["next-auth setup: install, create app/api/auth/[...nextauth]/route.ts", "GoogleProvider: clientId, clientSecret from Google Cloud Console", "PrismaAdapter: connects NextAuth sessions to your Prisma User model", "Environment variables: NEXTAUTH_SECRET, NEXTAUTH_URL, GOOGLE_ID, GOOGLE_SECRET", "session strategy: database vs JWT (use database with Prisma)", "getServerSession() in Server Components — how to access current user"],
        build: "Full auth in Polypath: Google OAuth sign-in, sessions stored in DB via PrismaAdapter. Create User, Account, Session, VerificationToken models in Prisma (NextAuth requires these). Build a sign-in page. Verify session persists across page refreshes.",
        kata: "20 min: user avatar dropdown with name, email, 'sign out' option",
        resources: ["authjs.dev — Next.js guide", "Google Cloud Console (create OAuth app)", "NextAuth + Prisma Adapter docs"],
        checkpoint: "After signing in with Google, open Prisma Studio. Can you see your User and Session records in the database?",
        trap: "The PrismaAdapter requires exact schema shape. Copy the required models from the NextAuth docs exactly — one missing field will break auth silently.",
      },
      {
        week: "Week 8",
        focus: "Route Protection + Middleware",
        what: "Now that auth exists, protect routes so only logged-in users can access the dashboard.",
        study: ["Next.js middleware.ts — runs on every request before rendering", "Using getToken() from next-auth/jwt in middleware", "Redirecting unauthenticated users to /login", "Matcher config: which routes to protect", "getServerSession() in individual pages for user-specific data", "Associating Polypath data to the logged-in userId"],
        build: "In Polypath: middleware.ts protects all /dashboard/* routes. Any unauthenticated visit redirects to /login. All Prisma queries now filter by session.user.id — skills belong to the logged-in user, not globally shared.",
        kata: "20 min: auth guard wrapper component (shows loading spinner, then redirects or shows content)",
        resources: ["nextjs.org/docs — Middleware", "nextjs.org/docs — Auth with Middleware example"],
        checkpoint: "Open an incognito window and try to visit /dashboard/skills directly. Does it redirect to /login?",
        trap: "Don't put sensitive logic in Client Components. Always verify auth on the server. Middleware is client-side visible — it just redirects. The actual data protection happens in Server Components.",
      },
      {
        week: "Week 9",
        focus: "Dynamic Routes + Search Params",
        what: "Real apps need dynamic pages and URL-based state. Master these patterns.",
        study: ["Dynamic routes: [id]/page.tsx, [...slug]/page.tsx, [[...slug]] optional catch-all", "generateStaticParams() for static generation of dynamic routes", "searchParams prop in page.tsx: ?tab=skills&sort=recent", "useSearchParams() hook in Client Components", "useRouter().push() for programmatic navigation with params", "notFound() helper — returns the not-found.tsx UI"],
        build: "In Polypath: skill detail page /dashboard/skills/[skillId] showing full skill info + all logs. Add URL-based tab state: /dashboard?tab=skills shows skills tab, ?tab=progress shows progress tab. The tab state persists on page refresh.",
        kata: "20 min: tabs component that syncs with URL hash (#overview, #logs, #settings)",
        resources: ["nextjs.org/docs — Dynamic Routes", "nextjs.org/docs — Search Params"],
        checkpoint: "What is the difference between params and searchParams in a Next.js page component? Give a real example from Polypath.",
        trap: "searchParams are not available in layouts.tsx, only in page.tsx. This is a common gotcha that produces confusing undefined errors.",
      },
      {
        week: "Week 10",
        focus: "Performance + Image + Metadata",
        what: "Polypath should be fast and SEO-ready. These are production-grade finishing touches.",
        study: ["next/image: width, height, priority, fill, sizes attribute for responsive images", "Metadata API: export const metadata in page.tsx, dynamic generateMetadata()", "Font optimization: next/font/google — zero layout shift", "Bundle analysis: @next/bundle-analyzer", "Lazy loading components: dynamic() with ssr: false for heavy client components", "Lighthouse audit: what 90+ scores require"],
        build: "In Polypath: add proper metadata to all pages. Replace any <img> tags with next/image. Add Google Font via next/font. Run Lighthouse — target 90+ performance score. Use dynamic() to lazy-load any heavy component.",
        kata: "20 min: image card grid with proper aspect ratios, loading placeholders",
        resources: ["nextjs.org/docs — Image Component", "nextjs.org/docs — Metadata", "web.dev/measure (Lighthouse)"],
        checkpoint: "Run Lighthouse on your Polypath dashboard. Screenshot the scores. What is your LCP (Largest Contentful Paint)?",
        trap: "next/image requires width and height OR fill prop. Missing these causes hydration errors. If you don't know image dimensions, use fill with a relative parent container.",
      },
      {
        week: "Week 11",
        focus: "Deployment: Vercel + Environment Variables + CI/CD",
        what: "A project that doesn't deploy doesn't count. Get Polypath live.",
        study: ["Vercel deployment: connect GitHub repo, auto-deploys on push to main", "Environment variables in Vercel dashboard vs .env.local", "Preview deployments on every PR — show this in interviews", "GitHub Actions: basic CI workflow (lint + typecheck on every push)", "Custom domain on Vercel (optional but impressive)", "Vercel Analytics + Speed Insights (free tier)"],
        build: "Deploy Polypath to Vercel. Set all env vars (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL with production URL, Google OAuth credentials). Verify sign-in works on production. Add a GitHub Actions workflow that runs npx tsc --noEmit and npm run lint on every push.",
        kata: "20 min: deployment status badge UI (building, live, failed states)",
        resources: ["vercel.com/docs", "GitHub Actions docs — Node.js workflow", "Neon.tech for production PostgreSQL"],
        checkpoint: "Share the live Polypath URL. Can you sign in with Google on production?",
        trap: "NEXTAUTH_URL must be your production URL in Vercel env vars — not localhost. Also update the Google OAuth authorized redirect URIs in Google Cloud Console to include your production URL.",
      },
      {
        week: "Week 12",
        focus: "Polish + Code Review + Portfolio Documentation",
        what: "The project is live. Now make it presentable as a portfolio piece.",
        study: ["Writing a strong README: what it does, tech stack, setup instructions, screenshots", "Recording a demo video: 90-second Loom showing the key features", "Code cleanup: remove console.logs, unused imports, dead code", "TypeScript strictness: fix any 'any' types you left in", "Error boundaries: make sure every page degrades gracefully"],
        build: "Write Polypath README with screenshots, live URL, tech stack badges. Record a 90-second demo video. Fix every TypeScript error. Add loading states to any action that was missing one. This week is about closing the quality gap.",
        kata: "20 min: README-style tech stack badge row component",
        resources: ["shields.io (readme badges)", "Loom (free screen recorder)", "github.com/othneildrew/Best-README-Template"],
        checkpoint: "Would you be comfortable sharing this project link in a job application today? If not, what's missing?",
        trap: "Don't skip this week. A half-documented project looks worse than no project. Hiring managers see hundreds of repos where the README says 'TODO'. Don't be that developer.",
      },
    ],
  },
  {
    id: "ai",
    num: "02",
    title: "AI Engineering",
    subtitle: "Build WITH models. You've already started.",
    duration: "Months 4–6 (12 weeks)",
    color: "#F97316",
    dark: "#c2410c",
    bg: "rgba(249,115,22,0.06)",
    border: "rgba(249,115,22,0.2)",
    icon: "🧠",
    purpose: "You've used Gemini API in RizzKaro and PicWish API for image enhancement. Those projects prove the instinct is right — but right now you're using AI APIs like a black box: put text in, get text out. AI Engineering means understanding the box well enough to build reliable, production-quality AI features. RAG, streaming, embeddings, tool calling, agents — all in TypeScript, all on top of your Next.js stack.",
    rules: [
      "Every concept must land in a real project — either Polypath or MindMates",
      "No Python. You're an AI Engineer using JS/TS, not an ML researcher",
      "Understand token limits and costs — build cost-aware from day one",
      "When prompts fail, debug them like code — systematically, not randomly",
      "Keep a 'prompt log': save prompts that work and prompts that don't, with notes",
    ],
    weeks: [
      {
        week: "Week 1",
        focus: "LLM Fundamentals + First API Call",
        what: "Understand how LLMs actually work at a high level, then make your first production-ready API call.",
        study: ["What is a token? Tokenization affects cost and context limits", "Context window: how much an LLM can 'remember' in one call", "Temperature: 0 = deterministic, 1+ = creative — when to use each", "System prompt vs user message vs assistant message — the roles", "Anthropic Claude API and OpenAI API — structure is nearly identical", "API keys, rate limits, error handling (429, 500 — always retry with backoff)"],
        build: "In Polypath: add a /api/ai/route.ts that accepts a skill name and returns a structured learning plan using Claude claude-sonnet-4-20250514. Log the token usage to console. Handle errors gracefully — show a user-friendly message if API fails.",
        kata: "20 min: chat message bubble components (user vs AI, different alignment/colors)",
        resources: ["docs.anthropic.com — API Reference", "platform.openai.com/docs (same concepts)", "Tiktokenizer.vercel.app — visualize tokens"],
        checkpoint: "Make an API call that fails intentionally (wrong API key). How does your app behave? Does it crash or show a friendly error?",
        trap: "Never put API keys in client components. They will be visible in browser source. Always call AI APIs from server-side routes or Server Actions.",
      },
      {
        week: "Week 2",
        focus: "Prompt Engineering",
        what: "Prompts are your primary interface to the model. Bad prompts = bad outputs. This is a real skill.",
        study: ["System prompts: set the model's role, format, constraints, persona", "Chain of thought: ask the model to think step by step before answering", "Few-shot examples: show the model 2–3 examples of good input/output pairs", "Output formatting: tell the model exactly what format you want (JSON, markdown, numbered list)", "Constraining outputs: 'respond only with X, no preamble, no explanation'", "Prompt chaining: output of prompt A becomes input of prompt B"],
        build: "For Polypath: write a system prompt that takes a skill name + user's experience level and returns a structured learning plan in JSON: { weeks: number, phases: [{title, focus, resources}] }. Test with 5 different skills. Iterate the prompt until the output is consistently well-structured.",
        kata: "20 min: JSON display component (renders structured data nicely with collapsible sections)",
        resources: ["docs.anthropic.com — Prompt Engineering Guide", "promptingguide.ai (free)", "learnprompting.org (free)"],
        checkpoint: "Write a prompt for Polypath that always returns valid JSON. Test it 10 times. Does it ever break? How do you make it more reliable?",
        trap: "Don't ask for JSON without also adding: 'respond ONLY with valid JSON, no markdown code blocks, no explanation.' Models are verbose by default.",
      },
      {
        week: "Week 3",
        focus: "Vercel AI SDK — Streaming Responses",
        what: "Nobody wants to stare at a loading spinner for 5 seconds. Streaming makes AI feel instant.",
        study: ["Why streaming: users see output token-by-token rather than waiting for the full response", "Vercel AI SDK: npm install ai — the best library for AI in Next.js", "streamText() on the server — returns a streaming response", "useChat() hook on the client — handles streaming, history, loading state automatically", "useCompletion() — for single completions (not chat)", "toDataStreamResponse() — converts streamText result to a proper HTTP response"],
        build: "Add an AI chat feature to Polypath: a floating chat widget where users can ask questions about their skills. Server: app/api/chat/route.ts using streamText with Claude. Client: useChat() hook renders messages as they stream in. Show a pulsing cursor while streaming.",
        kata: "20 min: typing indicator component (three dots animation, like iMessage)",
        resources: ["sdk.vercel.ai/docs — Getting Started", "sdk.vercel.ai/docs — useChat reference", "Vercel AI SDK examples on GitHub"],
        checkpoint: "Open Network tab in DevTools while using your chat. Can you see the streaming response chunks arriving one by one?",
        trap: "useChat manages message history automatically. Don't try to manage it yourself with useState — you'll fight the library and create duplicate message bugs.",
      },
      {
        week: "Week 4",
        focus: "Structured Outputs + Zod Validation",
        what: "Getting reliable JSON from AI requires forcing the output format at the API level, not just asking nicely.",
        study: ["generateObject() from Vercel AI SDK — forces schema-compliant output", "Zod schemas: define exactly what shape you want", "AI SDK + Zod: the model is constrained to return only what the schema allows", "Streaming structured data: streamObject() — streams a partial object as it's generated", "When to use text vs object output: text for display, object for data processing", "Parsing and error handling: what if the model outputs invalid data anyway?"],
        build: "Upgrade Polypath's learning plan feature: replace the manual JSON prompt with generateObject() + a Zod schema. The schema enforces: title (string), weeks (number min 1 max 52), phases (array of {week: number, topic: string, resources: string[]}). The app now has guaranteed type-safe AI output.",
        kata: "20 min: form that shows a structured multi-step preview before submitting",
        resources: ["sdk.vercel.ai/docs — generateObject", "zod.dev — schema basics", "Total TypeScript — Zod tutorial"],
        checkpoint: "Intentionally write a Zod schema with a required field the model might miss. Does generateObject throw an error or silently ignore it?",
        trap: "Don't make your Zod schemas too strict on the first pass. Start loose, then tighten. Over-constrained schemas cause the model to fail repeatedly.",
      },
      {
        week: "Week 5",
        focus: "Embeddings + Vector Databases",
        what: "Embeddings are how you give an AI model long-term memory beyond its context window.",
        study: ["What is an embedding: text → array of numbers representing semantic meaning", "Cosine similarity: how you measure if two embeddings are 'close' in meaning", "Why this matters: search by meaning, not by keywords", "OpenAI text-embedding-3-small or Cohere embed — both cheap and good", "Pinecone: cloud vector database (free tier for dev)", "Supabase pgvector: PostgreSQL extension (you already have Prisma/Postgres)", "Upsert embeddings → query by similarity → return top-K results"],
        build: "Add semantic search to Polypath: when a user types in the skill search bar, instead of SQL LIKE query, embed the search query and find the most semantically similar skills in the DB. Store skill embeddings in Supabase pgvector. A search for 'guitar' should also surface 'music theory' and 'ukulele'.",
        kata: "20 min: search input with animated results dropdown appearing below",
        resources: ["Supabase pgvector guide", "openai.com/docs — Embeddings", "Pinecone quickstart (free tier)"],
        checkpoint: "Search for 'coding' in your Polypath. Does it surface skills like 'TypeScript' and 'algorithms' even without those exact words in the search?",
        trap: "Re-embedding everything on every query is expensive. Embed your stored data once (at creation time) and store it. Only embed the search query at query time.",
      },
      {
        week: "Week 6",
        focus: "RAG — Retrieval-Augmented Generation (Part 1)",
        what: "RAG is the most important pattern in production AI. It's how you give a model access to your specific data.",
        study: ["The RAG problem: LLMs don't know your app's data, but context windows are limited", "RAG pipeline: User query → embed query → search vector DB → retrieve top-K chunks → inject into prompt → generate answer", "Chunking strategies: how to split large documents for embedding (fixed size, sentence, semantic)", "Context window management: how much retrieved content fits without degrading quality", "Prompt template for RAG: 'Answer based only on the following context: {context}. Question: {question}'"],
        build: "In MindMates: build an AI journaling feature. When a user writes a journal entry, embed and store it. When they ask 'how have I been feeling this week?', RAG retrieves relevant past entries and the model synthesizes an answer. No hardcoded context — pure retrieval.",
        kata: "20 min: message thread component with date separators between days",
        resources: ["Vercel AI SDK — RAG guide", "LangChain JS — text splitters docs", "Greg Kamradt — RAG notebook (YouTube)"],
        checkpoint: "Write a journal entry in MindMates. Then ask the AI a question about it. Does the AI know what you wrote? Does it cite specific things from your entry?",
        trap: "RAG fails when your chunks are too big (model loses focus) or too small (not enough context). Start with 512-token chunks with 50-token overlap.",
      },
      {
        week: "Week 7",
        focus: "RAG — Part 2: Quality + Reranking",
        what: "Basic RAG works. Production RAG requires tuning. Learn why RAG fails and how to fix it.",
        study: ["Why RAG fails: wrong chunks retrieved, chunks lack context, query too vague", "Hybrid search: combine vector search (semantic) + keyword search (BM25) for better retrieval", "Reranking: use a cross-encoder model to re-score retrieved chunks by relevance", "HyDE (Hypothetical Document Embedding): generate a hypothetical answer first, embed that, then search", "Metadata filtering: filter by date, user, category before vector search", "Evaluation: how do you know if your RAG is good? (answer relevance, context relevance, faithfulness)"],
        build: "Improve the MindMates RAG: add metadata filters (only search entries from the last 30 days by default). Add a 'source' display below each AI response showing which journal entries it used. This is the 'show your work' feature — users trust AI more when they can see its sources.",
        kata: "20 min: citation/source card component (shows referenced text snippets below an AI answer)",
        resources: ["Ragas library (RAG evaluation)", "LlamaIndex docs — advanced RAG", "Vercel AI SDK — context docs"],
        checkpoint: "Ask the AI a question about something you did NOT journal about. Does it admit it doesn't know, or does it hallucinate? Good RAG should say 'I don't have enough information about that.'",
        trap: "RAG doesn't eliminate hallucination. It reduces it. Always instruct the model: 'If the answer is not in the provided context, say you don't have enough information.'",
      },
      {
        week: "Week 8",
        focus: "Tool Calling / Function Calling",
        what: "Tool calling lets the AI decide to take actions, not just generate text. This is the bridge to agents.",
        study: ["What is tool calling: you define functions, the model decides when to call them and with what arguments", "Vercel AI SDK: tools parameter in generateText/streamText — define tool name, description, parameters (Zod)", "The model's decision: based on user message, it picks which tool(s) to call", "Tool results: you execute the tool and feed results back to the model, it continues generating", "maxSteps: allow the model to call multiple tools in sequence", "Good tool design: one clear responsibility per tool, descriptive names, precise parameter schemas"],
        build: "Add tools to Polypath's AI chat: createSkillTool (creates a skill in DB), getProgressTool (fetches user's skill progress), searchSkillsTool (semantic search). Now users can chat naturally: 'Add piano to my skills' → AI calls createSkillTool → skill created → AI confirms. Real action from conversation.",
        kata: "20 min: action confirmation dialog (modal that shows what action will be taken before executing)",
        resources: ["sdk.vercel.ai/docs — Tools", "Anthropic docs — Tool Use", "Simon Willison — Tool use patterns"],
        checkpoint: "In the Polypath chat, say 'How many skills do I have?' — does the AI call the correct tool and return an accurate count from your database?",
        trap: "Write tool descriptions as if you're explaining the tool to a smart person who has never seen your code. Vague tool descriptions = model calls the wrong tool.",
      },
      {
        week: "Week 9",
        focus: "LangChain.js Fundamentals",
        what: "LangChain is the most-used AI framework. Understanding it opens up the wider AI engineering ecosystem.",
        study: ["LangChain.js vs Vercel AI SDK: LangChain is more powerful but verbose, AI SDK is simpler and Next.js-native", "Core concepts: Chains (sequences of operations), Prompts (templates), Output parsers", "LCEL (LangChain Expression Language): pipe syntax for chaining operations", "Memory: ConversationBufferMemory, ConversationSummaryMemory for long chats", "LangChain document loaders: load PDFs, websites, text files for RAG", "When to use LangChain vs AI SDK: complex multi-step pipelines = LangChain, simple streaming UI = AI SDK"],
        build: "Add a 'learning resource summarizer' to Polypath: paste any URL (blog post, tutorial), LangChain fetches and chunks it, the AI summarizes the key points and suggests which of your skills it relates to. CheerioWebBaseLoader → RecursiveCharacterTextSplitter → summary chain.",
        kata: "20 min: URL input with loading state that shows a summary card on completion",
        resources: ["js.langchain.com/docs — Introduction", "LangChain JS cookbook (GitHub)", "LangSmith for debugging chains (free tier)"],
        checkpoint: "Paste a Next.js blog post URL into your summarizer. Does the summary accurately capture the article's main points?",
        trap: "LangChain has many versions and the JS docs can be outdated. Always check the npm package version you installed and match the docs to that version. @langchain/core and @langchain/openai are separate packages now.",
      },
      {
        week: "Week 10",
        focus: "AI Agents + Multi-Step Pipelines",
        what: "An agent uses tools in a loop, deciding step-by-step what to do next. This is the current frontier of practical AI engineering.",
        study: ["ReAct pattern: Reason → Act → Observe → Reason again (loop)", "createReactAgent in LangChain.js: give it tools, it figures out the sequence", "Vercel AI SDK maxSteps: simpler agent behavior for straightforward use cases", "Agent memory: how to give agents context across multiple turns", "Stopping conditions: when does the agent know it's done?", "Human-in-the-loop: pause agent execution and ask for user confirmation before risky actions"],
        build: "Build a 'Polypath Learning Coach' agent: give it tools (search web for resources, create skill in DB, search user's existing skills, add log entry). A user says 'I want to learn machine learning' → agent searches for a curriculum, checks what relevant skills the user already has, creates a structured plan, adds the new skills to their profile, all in one conversation.",
        kata: "20 min: multi-step progress indicator (step 1 → step 2 → step 3 with animated transitions)",
        resources: ["LangChain JS — Agents docs", "Vercel AI SDK — Multi-step tools", "AI Engineer Foundation course (free)"],
        checkpoint: "Run your Learning Coach agent with a verbose goal. Open the terminal logs. Can you follow the agent's reasoning step-by-step?",
        trap: "Agents can loop forever or make expensive API calls in loops. Always set a maxSteps limit. For production: log every agent step and set spending limits in your API dashboard.",
      },
      {
        week: "Week 11",
        focus: "Production AI Feature: MindMates Full Integration",
        what: "Bring everything together in MindMates — a production-worthy AI feature that demonstrates all these concepts.",
        study: ["Cost optimization: cache frequently-used prompts, use smaller models for simple tasks", "Rate limiting AI endpoints: protect against abuse with upstash/ratelimit", "AI response quality monitoring: log inputs/outputs, detect when responses are off", "User feedback loops: thumbs up/down on AI responses, use to improve prompts", "Graceful degradation: if AI API is down, show a useful fallback"],
        build: "MindMates AI suite: (1) Streaming mood journal AI companion with RAG on past entries, (2) Weekly mental health insight report generated every Sunday using all week's entries, (3) Crisis detection: if journal entry contains concerning language, offer resources. Add rate limiting, cost logging, and a feedback button on every AI response.",
        kata: "20 min: feedback thumbs up/down component with animated confirmation",
        resources: ["Upstash rate limiting docs", "LangSmith for prompt monitoring", "OpenAI usage dashboard patterns"],
        checkpoint: "What is your approximate cost per user per month if they journal daily with your feature? Can you calculate this from your API usage logs?",
        trap: "AI features that work in development often fail under real usage patterns. Test with rapid successive requests, very long inputs, and unusual characters before calling this production-ready.",
      },
      {
        week: "Week 12",
        focus: "AI Project Polish + Documentation",
        what: "Your AI engineering projects need to be explainable, not just functional.",
        study: ["Writing AI feature documentation: what it does, what it doesn't do, known limitations", "Architecture diagrams: draw your RAG pipeline, your agent flow — tools like Excalidraw", "Prompt version control: store your prompts in code as constants, not hardcoded strings", "A/B testing AI outputs: how companies evaluate prompt changes in production", "Your AI Engineering narrative: how do you explain this work in an interview?"],
        build: "Write an architecture doc for your Polypath AI chat and MindMates RAG feature. Draw the data flow diagram. Record a 2-minute demo video. Push a /prompts folder to your repo with all system prompts versioned as TypeScript constants with comments explaining each decision.",
        kata: "20 min: architecture diagram-style component (boxes and arrows, shows system flow)",
        resources: ["Excalidraw.com (free diagrams)", "Carbon.now.sh (beautiful code screenshots)", "Loom for demo videos"],
        checkpoint: "Can you explain your RAG pipeline to someone in 60 seconds without using jargon?",
        trap: "Don't skip the architecture diagram. In AI engineering interviews, being able to whiteboard your system design is as important as writing the code.",
      },
    ],
  },
  {
    id: "jobhunt",
    num: "03",
    title: "Job Hunt Prep",
    subtitle: "Interviews are a skill. Practice them like one.",
    duration: "Months 7–9 (12 weeks)",
    color: "#34D399",
    dark: "#059669",
    bg: "rgba(52,211,153,0.06)",
    border: "rgba(52,211,153,0.2)",
    icon: "🚀",
    purpose: "You now have 2 strong projects (Polypath + MindMates with AI), deployed on Vercel, with real features. Months 7–9 is about converting that work into job offers. Interviews test three things: can you code (DSA), do you understand systems (system design), and are you someone people want to work with (communication). All three are trainable.",
    rules: [
      "Apply from Week 8, not Week 12. You learn more from real interviews than from more preparation",
      "Customize your resume for every application — one generic resume underperforms",
      "Track every application in a spreadsheet: company, role, date, status, feedback",
      "Do 2 LeetCode problems per day minimum during this phase",
      "LinkedIn and GitHub must be active — post something weekly",
    ],
    weeks: [
      { week: "Week 1", focus: "Resume + LinkedIn Optimization", what: "Your resume is a marketing document. It gets 6 seconds of attention. Optimize for that.", study: ["ATS systems: robots read your resume first — use standard section headings", "Quantify everything: not 'built auth' but 'implemented Google OAuth reducing login friction by removing password management for 200+ users'", "Project bullets: Problem → Tech → Outcome format", "LinkedIn: complete profile, banner image, About section, featured projects section", "GitHub: pin your 3 best repos, each with a README, live link, and tech stack"], build: "Rewrite your resume using the STAR format for each bullet. Get it reviewed on r/cscareerquestions. Update LinkedIn to match. Pin Polypath + MindMates + RizzKaro on GitHub with full READMEs.", kata: "20 min: resume card component (shows work experience in timeline format)", resources: ["resumeworded.com (free AI review)", "enhancv.com", "LinkedIn profile checklist (Google it)"], checkpoint: "Share your resume with 3 people in tech. What feedback comes up more than once?", trap: "Don't use a fancy multi-column resume template. ATS (Applicant Tracking Systems) often can't parse them. Single column, standard fonts, PDF format." },
      { week: "Week 2", focus: "DSA: Arrays + Strings", what: "80% of coding interview questions use arrays and strings. Master these before anything else.", study: ["Two pointer technique: problems where you need two indices moving through an array", "Sliding window: maximum/minimum sum of subarray of size K", "Hash maps for O(1) lookup: frequency counting, seen elements", "String manipulation: reverse, palindrome, anagram detection", "Time/space complexity analysis — Big O notation you can explain out loud"], build: "Solve 14 problems this week: 7 arrays, 7 strings. Mix of Easy and Medium on LeetCode. Write your thought process as comments before writing code.", kata: "20 min: algorithm visualizer UI (array shown as boxes, pointer highlighted)", resources: ["neetcode.io — Arrays & Hashing section", "neetcode.io — Two Pointers", "neetcode.io — Sliding Window"], checkpoint: "Can you solve Two Sum, Valid Palindrome, and Best Time to Buy Stock without hints?", trap: "Don't memorize solutions. Understand the pattern. If you see a new problem, ask: does this have two things to compare? → two pointer. Does it ask for a subarray property? → sliding window." },
      { week: "Week 3", focus: "DSA: Recursion + Trees", what: "Many interview questions involve tree traversal. Recursion is the tool. Get comfortable with it.", study: ["Recursion: base case, recursive case, call stack visualization", "Binary trees: in-order, pre-order, post-order traversal", "BFS (level-order): use a queue, good for shortest path and level-by-level problems", "DFS: use recursion or explicit stack", "Common tree problems: max depth, same tree, invert binary tree, path sum"], build: "Solve 14 problems: 7 recursion, 7 trees. Focus on Medium difficulty. After each problem: draw the call stack or tree traversal by hand.", kata: "20 min: tree/folder structure UI component (collapsible nested list)", resources: ["neetcode.io — Trees section", "Visualgo.net — tree visualizer", "Recursion explained: fireship.io YouTube"], checkpoint: "Implement in-order traversal both recursively AND iteratively. If you can only do it recursively, you don't fully understand it.", trap: "When a tree problem seems hard, write the recursive solution first even if it's not optimal. Then optimize. Never start with the iterative version." },
      { week: "Week 4", focus: "DSA: Dynamic Programming (Intro)", what: "DP scares everyone. It's just recursion with memoization. Start with the simple patterns.", study: ["Memoization: cache recursive results to avoid recomputation", "Tabulation: bottom-up DP, fill a table from base cases", "1D DP problems: fibonacci, climbing stairs, house robber", "The DP decision: does this problem have overlapping subproblems and optimal substructure?", "How to identify DP: 'how many ways', 'max/min of something', 'is it possible'"], build: "Solve 10 DP problems (Easy/Medium only): Fibonacci, Climbing Stairs, House Robber, Coin Change, Longest Common Subsequence.", kata: "20 min: step/progress bar component (shows filled steps leading to a goal)", resources: ["neetcode.io — 1D DP", "neetcode.io — 2D DP (light intro)", "AlgoExpert DP walkthrough"], checkpoint: "Solve Coin Change on a whiteboard explaining your thought process step by step. Can someone follow your reasoning?", trap: "Skip 2D DP for now. 1D DP covers 60% of DP interview questions. Go deep before going wide." },
      { week: "Week 5", focus: "System Design Fundamentals", what: "Junior roles rarely ask full system design but senior interviewers at startups often do. Know the basics.", study: ["Horizontal vs vertical scaling", "Load balancers: distribute traffic, prevent single points of failure", "Databases: when SQL vs NoSQL (you use both already)", "Caching strategies: Redis for session data, computed results, rate limiting", "CDN: serve static assets from edge locations (Vercel does this automatically)", "API design: REST conventions, pagination, versioning"], build: "Draw 3 system designs: (1) Polypath — how does it scale to 100,000 users? (2) MindMates — how do you handle 10,000 concurrent AI requests? (3) A URL shortener — classic interview question. Draw each on Excalidraw.", kata: "20 min: system architecture diagram component (boxes, arrows, labels)", resources: ["ByteByteGo YouTube (system design)", "system-design-primer GitHub repo", "Grokking System Design (Educative)"], checkpoint: "Without notes: explain to a friend how Polypath handles a user signing in, making a request, and getting data — from browser to database and back.", trap: "Don't try to memorize system designs. Understand principles. Every system design question is: what breaks first when traffic increases? Answer that." },
      { week: "Week 6", focus: "Behavioral Interviews + STAR Stories", what: "Technical skills get you the interview. Communication skills get you the offer.", study: ["STAR format: Situation, Task, Action, Result — structure every behavioral answer", "The 6 stories you need: a challenge you overcame, a conflict with a teammate, a mistake you made, something you're proud of, a time you led something, why you want this company", "How to talk about AI-assisted projects honestly: 'I used AI as a tool but I own the architecture and decisions'", "Researching companies: their tech blog, recent engineering posts, their stack on StackShare"], build: "Write out 6 STAR stories based on your actual projects. Record yourself saying them on your phone. Listen back. Do you sound natural? Do you ramble? Practice until each story is under 2 minutes.", kata: "20 min: Q&A accordion component (interview prep question list with expandable answers)", resources: ["levels.fyi — company research", "glassdoor.com — interview questions", "interviewing.io — mock interviews"], checkpoint: "Record yourself answering 'Tell me about a project you're proud of.' Watch it back. Would you hire this person?", trap: "Don't say 'I' too much — say 'we' where credit is shared. Don't say 'I don't know' — say 'I haven't worked with X directly but here's how I'd approach learning it.'" },
      { week: "Week 7", focus: "Portfolio Final Polish", what: "Your portfolio is your permanent job application. Make every pixel count.", study: ["Project demo videos: 90 seconds max, show the most impressive features first", "Case studies: for each project, answer — what problem does it solve, what was technically hard, what would you change", "Open source contributions: even small ones signal that you can work with other people's code", "GitHub activity: daily commits look good, but meaningful commits matter more"], build: "Final polish on all 3 portfolio projects: live URLs work, all env vars set in production, READMEs have screenshots, demo videos recorded and linked. Create a simple portfolio website if you don't have one — just your name, 3 projects with descriptions and links.", kata: "20 min: project card component with tech stack tags and live/github links", resources: ["Brittany Chiang portfolio (inspiration)", "Josh W. Comeau portfolio (inspiration)", "Framer Motion for portfolio animations"], checkpoint: "Send your portfolio link to a developer friend. Ask them: what role do you think this person is applying for? If the answer isn't 'Full Stack AI Engineer', something needs to change.", trap: "Portfolio websites with too much animation and not enough substance hurt you. Recruiters want to find your projects in 10 seconds. Prioritize clarity." },
      { week: "Week 8", focus: "Start Applying — Mumbai Market", what: "Apply now. Not in week 12. The interview process takes weeks — start the pipeline today.", study: ["Mumbai startup ecosystem: BKC, Lower Parel, Powai are the hubs", "Target company types: Series A/B startups, product companies over service/outsourcing", "Job platforms: LinkedIn, Wellfound (AngelList), Instahyre, Naukri (less relevant but good coverage)", "Cold outreach: DM the engineering manager on LinkedIn, not just apply through the portal", "Referrals: the most effective channel — does anyone in your network work at target companies?"], build: "Create a job tracking spreadsheet: Company, Role, Link, Applied Date, Status, Contact, Notes. Apply to 10 companies this week. For each: customize your resume's opening line to match their JD. Send 3 cold LinkedIn DMs to engineers at target companies.", kata: "20 min: kanban-style application tracker component (columns: applied, interviewing, offer, rejected)", resources: ["Wellfound.com", "Instahyre.com", "LinkedIn Jobs Mumbai"], checkpoint: "Open your tracker. How many applications have you sent? What's your response rate? If <10%, your resume needs work.", trap: "Don't apply to MNCs as your first applications. Startups move faster, care less about credentials, and judge more on portfolio. Get a startup offer first." },
      { week: "Week 9", focus: "More DSA: Graphs + Linked Lists", what: "These appear less frequently but some companies (especially product ones) test them.", study: ["Linked lists: reverse, detect cycle (Floyd's), merge two sorted", "Graphs: adjacency list representation, BFS for shortest path, DFS for cycle detection", "Union-Find: connected components, cycle detection in undirected graphs", "Classic graph problems: number of islands, course schedule"], build: "Solve 14 problems: 7 linked lists, 7 graphs. Focus on understanding the traversal pattern, not memorizing solutions.", kata: "20 min: timeline/linked-list-style component (connected nodes with arrows between them)", resources: ["neetcode.io — Linked List section", "neetcode.io — Graphs section"], checkpoint: "Can you code BFS from scratch — queue, visited set, neighbor iteration — in under 10 minutes?", trap: "For linked list problems, draw the list with boxes and arrows before writing a single line of code. Visualization prevents pointer confusion." },
      { week: "Week 10", focus: "Mock Interviews", what: "The only way to prepare for interviews is to do interviews. Everything else is theory.", study: ["interviewing.io: free anonymous mock technical interviews with engineers", "Pramp: peer-to-peer mock interviews (free)", "How to think out loud: narrate your thought process even when you don't know the answer", "When stuck: state what you do know, ask clarifying questions, start with brute force"], build: "Do 4 mock interviews this week: 2 on Pramp, 2 on interviewing.io. After each: write down what you stumbled on. Focus next week's practice on those weak spots.", kata: "20 min: interview timer component (counts up, shows elapsed time per question)", resources: ["interviewing.io", "pramp.com", "Big Interview (video mock)"], checkpoint: "After each mock interview, score yourself 1-10 on: coding speed, communication clarity, approach quality. Track it weekly.", trap: "Mock interviews feel more stressful than real ones until you've done 5+. The first 2-3 are painful. That's the point — get the pain out in practice." },
      { week: "Week 11", focus: "Active Interviewing + Pattern Review", what: "You should have interviews in your pipeline now. Prepare specifically for each company.", study: ["Research each company's interview process on Glassdoor/interviewing.io", "Practice problems in the same language as your interview (JavaScript)", "The 'phone screen' stage: usually 1 coding question in 30-45 min — practice timed", "Asking good questions at the end: about the tech stack, the team, recent engineering challenges"], build: "Research every company you're interviewing with: their engineering blog, their tech stack, recent hires. Prepare 3 smart questions for each interview. Keep solving 2 LeetCode problems daily.", kata: "20 min: company research card (logo, stack tags, recent news, open roles)", resources: ["Glassdoor interview reviews", "levels.fyi salaries", "LinkedIn company pages"], checkpoint: "For your next interview: can you name 2 technical decisions the company has made recently and ask an intelligent question about them?", trap: "Don't research only the company's product. Research their engineering decisions. Companies love candidates who understand their technical challenges." },
      { week: "Week 12", focus: "Offers + Negotiation", what: "Getting an offer is not the end. Negotiation is a skill with real ROI.", study: ["Never accept on the spot: 'Thank you, I'm very excited. Can I have a few days to review?'", "Competing offers create leverage: even a competing interview (not offer) helps", "What to negotiate: base salary, joining bonus, WFH flexibility, equipment budget", "Research market rates: levels.fyi, glassdoor, asking senior devs in your network", "Mumbai junior market: ₹6-12 LPA for full stack, ₹8-15 LPA if you can demonstrate AI skills"], build: "If you have an offer: research the market rate, prepare your counter, and negotiate. If you don't yet: continue applying, increase your weekly application count to 15. Write a post-mortem on why responses have been lower than expected.", kata: "20 min: offer comparison dashboard component (side-by-side salary, perks, location)", resources: ["levels.fyi India", "glassdoor.co.in", "Patrick McKenzie — salary negotiation guide (free blog)"], checkpoint: "What is the market rate for a Full Stack AI Engineer with 0 years experience in Mumbai? Is the offer you have at, above, or below that?", trap: "The most common negotiation mistake: asking 'is there any flexibility?' Say instead: 'Based on my research, I was expecting X. Is that possible?' Be specific." },
    ],
  },
  {
    id: "aws",
    num: "04",
    title: "AWS Certification",
    subtitle: "SAA-C03. The credential that separates you from the pack.",
    duration: "Months 10–12 (12 weeks)",
    color: "#C084FC",
    dark: "#9333ea",
    bg: "rgba(192,132,252,0.06)",
    border: "rgba(192,132,252,0.2)",
    icon: "☁️",
    purpose: "You should start this phase while employed. AWS Solutions Architect Associate (SAA-C03) is the most recognized cloud certification in India. It transforms you from 'a developer who deploys on Vercel' to 'a developer who understands the infrastructure their code runs on.' This adds ₹2-5 LPA to your market value immediately, and opens backend/full-stack roles that require cloud understanding.",
    rules: [
      "Do this alongside your job, not instead of job-hunting",
      "Hands-on labs every week — reading alone fails the exam",
      "Use AWS Free Tier for all practice (set billing alerts to avoid charges)",
      "Attempt the exam only after consistently scoring 75%+ on practice exams",
      "Aim to take the exam in Month 12 — external deadline creates accountability",
    ],
    weeks: [
      { week: "Week 1", focus: "IAM + Cloud Fundamentals", what: "IAM (Identity and Access Management) is the security backbone of everything in AWS.", study: ["IAM Users, Groups, Roles, Policies — the four concepts", "Policy structure: Effect, Action, Resource", "The principle of least privilege", "MFA setup for root account", "IAM Roles vs IAM Users: when to use each", "AWS CLI setup: configure with access keys"], build: "Create an AWS Free Tier account. Set up MFA on root. Create an IAM user with AdministratorAccess. Create an IAM role for EC2 to access S3. Write a custom policy that allows read-only S3 access.", kata: "20 min: permissions matrix UI (users × resources × access levels)", resources: ["Stephane Maarek SAA (Udemy) — IAM section", "AWS IAM docs", "AWS Skill Builder (free)"], checkpoint: "Without notes: explain the difference between an IAM User, Group, Role, and Policy in one sentence each.", trap: "Never use root account credentials for daily tasks. Create an IAM user with admin access and use that instead. Root compromise = catastrophic account loss." },
      { week: "Week 2", focus: "EC2 — Compute", what: "EC2 is virtual servers in the cloud. Understanding it unlocks all other compute services.", study: ["Instance types: t3.micro (free tier), c5 (compute), m5 (general), r5 (memory)", "AMIs: Amazon Machine Images — pre-configured server templates", "Security Groups: virtual firewalls — inbound/outbound rules, stateful", "Key pairs: SSH access to EC2 instances", "User data scripts: run commands on instance launch", "Elastic IPs: static public IP addresses", "Pricing models: On-Demand, Reserved (1/3 year), Spot (up to 90% cheaper, interruptible)"], build: "Launch a t2.micro EC2 instance (free tier). Install Node.js via user data script. SSH into it. Deploy your Polypath Express API manually. Access it via public IP. Then terminate it (don't leave running — costs money).", kata: "20 min: server status indicator component (online/offline/maintenance with color coding)", resources: ["Stephane Maarek SAA — EC2 section", "AWS EC2 docs"], checkpoint: "Can you explain in an interview why Spot Instances are cheap and when it would be dangerous to use them?", trap: "Always set billing alerts ($1, $5, $10 thresholds) when doing hands-on labs. It's easy to forget a running instance and get an unexpected bill." },
      { week: "Week 3", focus: "S3 — Storage", what: "S3 is AWS's most-used service. You probably already use it indirectly (Vercel stores your static files on S3).", study: ["Buckets and objects: bucket = container, object = file", "Storage classes: Standard, Standard-IA (infrequent access), Glacier (archival)", "S3 Versioning: keep all versions of every file", "S3 Lifecycle policies: auto-move to cheaper storage after N days", "Pre-signed URLs: grant temporary access to private objects", "Static website hosting from S3", "Cross-Origin Resource Sharing (CORS) configuration", "S3 encryption: SSE-S3, SSE-KMS, SSE-C"], build: "Create an S3 bucket. Enable versioning. Upload Polypath's public assets. Configure CORS to allow access from your Vercel domain. Generate a pre-signed URL for a private file. Configure a lifecycle policy to move objects to Glacier after 90 days.", kata: "20 min: file upload dropzone component with progress bar", resources: ["Stephane Maarek SAA — S3 section", "AWS S3 docs", "s3browser.com (GUI for S3)"], checkpoint: "What is the difference between a public S3 bucket URL and a pre-signed URL? When would you use each?", trap: "Never make an S3 bucket fully public unless serving a static website. Use pre-signed URLs for private file access. Public buckets have been the source of countless data breaches." },
      { week: "Week 4", focus: "VPC + Networking", what: "VPC is your private network in AWS. This is where most candidates struggle — visualize everything.", study: ["VPC: Virtual Private Cloud — your isolated network in AWS", "Subnets: public (internet-accessible) vs private (internal only)", "Internet Gateway: connects VPC to internet", "NAT Gateway: lets private subnet instances reach internet (for updates etc.) without being publicly reachable", "Route Tables: control where traffic goes", "Security Groups (stateful) vs Network ACLs (stateless) — know the difference", "VPC Peering: connect two VPCs"], build: "Create a custom VPC: 2 public subnets (different AZs), 2 private subnets. Attach an Internet Gateway. Create a NAT Gateway. Launch an EC2 in public subnet, another in private subnet. Verify the private EC2 can reach internet via NAT but isn't directly accessible from internet.", kata: "20 min: network topology diagram component (nodes, connections, public/private zones)", resources: ["Stephane Maarek SAA — VPC section", "Visualize VPC: network-diagram.io"], checkpoint: "Draw a VPC architecture from memory: 2 AZs, public/private subnets, IGW, NAT GW, route tables. Your drawing should be coherent enough to explain to an interviewer.", trap: "The most common networking gotcha: forgetting to add the Internet Gateway route to the public subnet's route table. Everything will be set up but traffic won't flow." },
      { week: "Week 5", focus: "RDS + ElastiCache + DynamoDB", what: "Databases in AWS. You already use MongoDB and PostgreSQL — now learn the managed AWS versions.", study: ["RDS: managed relational DB service (PostgreSQL, MySQL, MariaDB, Oracle, SQL Server)", "RDS Multi-AZ: synchronous standby replica for high availability, automatic failover", "RDS Read Replicas: async copies for read scaling (different AZs or regions)", "Aurora: AWS's proprietary DB — up to 5x faster than MySQL, auto-scales storage", "ElastiCache: managed Redis or Memcached — caching layer, session storage", "DynamoDB: AWS's NoSQL — serverless, auto-scaling, millisecond latency at any scale", "When to use each: relational → RDS, ultra-fast NoSQL → DynamoDB, caching → ElastiCache"], build: "Create an RDS PostgreSQL instance (free tier, db.t3.micro). Connect to it from your local machine using pgAdmin or DBeaver. Create the Polypath schema. Enable Multi-AZ (note the cost — disable after).", kata: "20 min: database connection status component with latency indicator", resources: ["Stephane Maarek SAA — RDS section", "AWS DynamoDB docs", "Neon.tech (production alternative)"], checkpoint: "What is the difference between RDS Multi-AZ and RDS Read Replica? One is for availability, one is for performance — which is which?", trap: "RDS Multi-AZ is NOT for read scaling. It's for availability (failover). If you want to spread read traffic, you need Read Replicas." },
      { week: "Week 6", focus: "Lambda + API Gateway + Serverless", what: "Serverless is how modern apps scale to zero and to infinity. Lambda is the building block.", study: ["Lambda: run code without servers — pay per 100ms of execution", "Triggers: API Gateway, S3 events, DynamoDB streams, CloudWatch Events", "Lambda cold starts: first invocation is slow — provisioned concurrency solves this", "API Gateway: create REST or HTTP APIs backed by Lambda functions", "Lambda layers: shared code/dependencies across functions", "Event-driven architecture: Lambda reacts to events rather than polling", "SAM (Serverless Application Model) or Serverless Framework for IaC"], build: "Create a Lambda function that processes uploaded images from S3 (when a file is uploaded, Lambda is triggered, generates a thumbnail, saves back to S3). Expose a simple REST endpoint via API Gateway that returns current server time.", kata: "20 min: serverless function status dashboard (name, runtime, last invoked, cold start indicator)", resources: ["Stephane Maarek SAA — Lambda section", "AWS Lambda docs", "serverless.com framework"], checkpoint: "What is a Lambda cold start? Why does it happen? What are two ways to reduce its impact?", trap: "Lambda has a 15-minute maximum execution timeout. Long-running processes (video encoding, ML inference) are not good Lambda candidates. Use ECS/Fargate or Step Functions instead." },
      { week: "Week 7", focus: "CloudFront + Route 53 + Load Balancers", what: "This is how your app stays fast and available globally.", study: ["CloudFront: CDN — caches content at 400+ edge locations worldwide", "CloudFront Origins: S3 buckets, EC2, Load Balancers, custom HTTP", "Cache behaviors: path patterns → different cache rules", "Route 53: AWS DNS — register domains, route traffic, health checks", "Routing policies: Simple, Weighted, Latency-based, Failover, Geolocation", "Application Load Balancer: distributes HTTP/HTTPS traffic to EC2/containers", "Target Groups: group of instances/containers that receive traffic"], build: "Set up CloudFront in front of your S3 static website. Create a Route 53 hosted zone (you can use a test domain or subdomain). Configure an ALB with 2 EC2 instances in different AZs as targets.", kata: "20 min: global CDN status map component (world map with edge location dots)", resources: ["Stephane Maarek SAA — High Availability section", "AWS CloudFront docs"], checkpoint: "Explain the difference between Route 53 Weighted routing and Latency-based routing. When would you use each?", trap: "CloudFront caches everything by default. When you update your S3 content, create an invalidation to clear the cache. Forgetting this = users see stale content for days." },
      { week: "Week 8", focus: "SQS + SNS + Event-Driven Architecture", what: "These messaging services decouple your architecture. They're tested heavily in the SAA exam.", study: ["SQS (Simple Queue Service): message queue, producers send, consumers poll", "SQS Standard vs FIFO: FIFO guarantees order and exactly-once delivery", "Visibility timeout: message is hidden from other consumers while being processed", "SNS (Simple Notification Service): pub/sub — one message to many subscribers", "SNS Fan-out pattern: SNS → multiple SQS queues for parallel processing", "EventBridge: more advanced event bus, with filtering rules", "Dead Letter Queues: messages that fail processing N times go here for debugging"], build: "Build a notification system: when a skill entry is added in Polypath, publish to an SNS topic. Two SQS subscribers receive the event: one sends an email (mock), one updates a stats counter. Implement a DLQ for the stats queue.", kata: "20 min: message queue visualizer component (messages flowing between boxes with animation)", resources: ["Stephane Maarek SAA — SQS/SNS section", "AWS SQS docs"], checkpoint: "A message sits in your SQS queue but isn't being consumed. After N failures, it moves to the DLQ. What is N controlled by? What is the SQS parameter called?", trap: "SQS messages can be delivered more than once (Standard Queue). Your consumers must be idempotent — processing the same message twice should produce the same result as processing it once." },
      { week: "Week 9", focus: "CloudFormation + IaC + Well-Architected Framework", what: "Infrastructure as Code and AWS's best practices framework — both appear on the exam and in real jobs.", study: ["CloudFormation: define AWS infrastructure in YAML/JSON templates", "Key sections: Resources (required), Parameters, Outputs, Mappings, Conditions", "Stack updates: change sets let you preview changes before applying", "AWS CDK: write CloudFormation in TypeScript (better for developers)", "AWS Well-Architected Framework: 6 pillars — Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability", "Shared Responsibility Model: AWS manages the cloud, you manage what's in the cloud"], build: "Write a CloudFormation template that creates: VPC, 2 public subnets, EC2, Security Group, S3 bucket. Deploy it. Then update the template to change the instance type. Use a change set to preview the update before applying.", kata: "20 min: infrastructure status dashboard (services list with health indicators)", resources: ["Stephane Maarek SAA — CloudFormation section", "AWS CDK docs", "AWS Well-Architected Tool (free in console)"], checkpoint: "What does the Shared Responsibility Model say AWS is responsible for vs what you are responsible for? Give 3 examples of each.", trap: "CloudFormation stack deletion deletes everything it created. Never manually modify resources created by CloudFormation — the template and actual state will diverge and cause future update failures." },
      { week: "Week 10", focus: "Practice Exams — First Full Run", what: "Time to see where you actually stand. Do a full 65-question practice exam under exam conditions.", study: ["Sit a full Tutorials Dojo practice exam: 65 questions, 130 minutes", "Review every wrong answer — don't just note what you got wrong, understand WHY", "Category breakdown: which domains are you weakest in?", "Re-study weak categories from Stephane Maarek's course", "The 3 categories most people fail: VPC/networking, HA/fault tolerance patterns, cost optimization"], build: "Complete 2 full practice exams (Tutorials Dojo). For each wrong answer: write one sentence explaining the correct answer in your own words. Build a weakness log.", kata: "20 min: exam results breakdown component (score per category with bar charts)", resources: ["tutorialsdojo.com — SAA-C03 practice exams (paid, worth it)", "Whizlabs SAA-C03 (alternative)", "AWS official sample questions (free)"], checkpoint: "What is your score on the first practice exam? The passing score is 72%. How far are you?", trap: "Tutorials Dojo exams are harder than the real exam. If you're consistently scoring 75%+ on Tutorials Dojo, you will likely pass the real exam. Don't delay booking if you're there." },
      { week: "Week 11", focus: "Weak Area Deep Dive + More Practice Exams", what: "The week before the exam: targeted revision only. No new material.", study: ["Focus entirely on your weakness log from Week 10", "Do 2 more practice exams — track your score progression", "Review the SAA-C03 exam guide from AWS: which domains have what % weight", "Flashcard review: services, their use cases, when to use each", "The 5 most common exam trap patterns: least privilege, multi-AZ vs multi-region, synchronous vs async replication, managed vs unmanaged services, cost optimization"], build: "Complete 2 more practice exams. Score each. Make flashcards for every service you're still uncertain about. Book the exam for Week 12.", kata: "20 min: flashcard flip component (front: service name, back: use case description)", resources: ["Tutorials Dojo cheat sheets (free PDFs)", "AWS SAA-C03 Official Guide", "Quizlet for flashcards"], checkpoint: "Is your practice exam average above 75%? If yes, book the real exam. If not, identify the specific domain(s) dragging your score.", trap: "Don't cram the night before. Sleep is more valuable than last-minute reading. Your brain consolidates memory during sleep." },
      { week: "Week 12", focus: "Exam Day + What Comes After", what: "Take the exam. Add certification to your resume and LinkedIn within 24 hours of passing.", study: ["Exam logistics: Pearson VUE online proctored or test center, ID required, 130 minutes, 65 questions", "During exam: flag uncertain questions, answer all (no negative marking), revisit flagged", "After exam: score report shows domain breakdown — useful for future certs", "Next certifications to consider: AWS Developer Associate, AWS Solutions Architect Professional, CKA (Kubernetes)"], build: "Pass the SAA-C03. Add 'AWS Certified Solutions Architect – Associate' to LinkedIn (Certifications section), your resume, and your GitHub profile README. Write a short LinkedIn post about what you learned — this gets engagement and visibility.", kata: "20 min: certification badge component (official badge style with expiry date)", resources: ["aws.amazon.com/certification — schedule exam", "certmetrics.com — view your badge", "credly.com — share your badge"], checkpoint: "Log into certmetrics.com after passing. Download your certificate. Screenshot the score report. Save them — companies sometimes verify certifications.", trap: "The SAA certification expires after 3 years. Calendar reminder to recertify. An expired cert looks worse than no cert on a resume." },
    ],
  },
];

// ─── SECTION CONFIG ──────────────────────────────────────────────────────────

const SECTION_CONFIG = [
  { id: "study", label: "Study", icon: "◈", colorKey: "phase" },
  { id: "build", label: "Build", icon: "▣", colorKey: "#60A5FA" },
  { id: "kata", label: "Kata", icon: "↯", colorKey: "#E8C547" },
  { id: "resources", label: "Resources", icon: "◎", colorKey: "#34D399" },
  { id: "checkpoint", label: "Checkpoint", icon: "◆", colorKey: "#F97316" },
  { id: "trap", label: "Trap", icon: "△", colorKey: "#F87171" },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function DetailedRoadmap() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeWeek, setActiveWeek] = useState(0);
  const [expandedSections, setExpandedSections] = useState(new Set(["study"]));
  const [showPhaseInfo, setShowPhaseInfo] = useState(false);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => setMounted(true), []);

  const phase = PHASES[activePhase];
  const week = phase.weeks[activeWeek];
  const totalWeeks = PHASES.reduce((acc, p) => acc + p.weeks.length, 0);
  const completedWeeks = PHASES.slice(0, activePhase).reduce((acc, p) => acc + p.weeks.length, 0) + activeWeek;
  const progress = ((completedWeeks) / (totalWeeks - 1)) * 100;

  const toggleSection = useCallback((id) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const goToWeek = useCallback((phaseIdx, weekIdx) => {
    setActivePhase(phaseIdx);
    setActiveWeek(weekIdx);
    setShowPhaseInfo(false);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, []);

  const goPrev = useCallback(() => {
    if (activeWeek > 0) { setActiveWeek(w => w - 1); }
    else if (activePhase > 0) {
      setActivePhase(p => p - 1);
      setActiveWeek(PHASES[activePhase - 1].weeks.length - 1);
    }
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activePhase, activeWeek]);

  const goNext = useCallback(() => {
    if (activeWeek < phase.weeks.length - 1) { setActiveWeek(w => w + 1); }
    else if (activePhase < PHASES.length - 1) {
      setActivePhase(p => p + 1);
      setActiveWeek(0);
    }
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activePhase, activeWeek, phase.weeks.length]);

  const isFirst = activePhase === 0 && activeWeek === 0;
  const isLast = activePhase === PHASES.length - 1 && activeWeek === phase.weeks.length - 1;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#08080c",
      color: "#c8c4b8",
      fontFamily: "'Newsreader', 'Georgia', serif",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Newsreader:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1a1a28; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #2a2a3e; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        .phase-btn { transition: all 0.2s ease; cursor: pointer; border: none; outline: none; }
        .phase-btn:hover { transform: translateY(-1px); }
        .section-toggle { transition: all 0.15s ease; cursor: pointer; border: none; outline: none; }
        .section-toggle:hover { background: rgba(255,255,255,0.04) !important; }
        .nav-btn { transition: all 0.15s ease; cursor: pointer; border: none; outline: none; }
        .nav-btn:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.2); }
        .nav-btn:disabled { opacity: 0.25; cursor: default; }
        .week-dot { transition: all 0.2s ease; cursor: pointer; }
        .week-dot:hover { transform: scale(1.5); }
        .info-toggle { transition: all 0.2s ease; cursor: pointer; border: none; outline: none; }
        .info-toggle:hover { background: rgba(255,255,255,0.06) !important; }
      `}</style>

      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}>

        {/* ─── HEADER ─────────────────────────────────────────────────── */}
        <header style={{
          padding: "24px 20px 0",
          flexShrink: 0,
          animation: mounted ? "fadeUp 0.5s ease" : "none",
        }}>
          <div style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "6px",
            flexWrap: "wrap",
            gap: "8px",
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              <span style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px",
                letterSpacing: "3px",
                color: "#E8C547",
                textTransform: "uppercase",
              }}>Ujjwal's Career Roadmap</span>
            </div>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              color: "#333",
              letterSpacing: "1px",
            }}>12 months · 3 hrs/day</span>
          </div>

          <h1 style={{
            fontFamily: "'Newsreader', serif",
            fontSize: "clamp(20px, 3.5vw, 32px)",
            fontWeight: 700,
            letterSpacing: "-0.5px",
            color: "#eee",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}>
            Kata → Next.js → AI → AWS
          </h1>

          {/* Phase pills */}
          <div style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}>
            {PHASES.map((p, i) => {
              const isActive = i === activePhase;
              return (
                <button key={p.id} className="phase-btn" onClick={() => goToWeek(i, 0)} style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  background: isActive ? `${p.color}15` : "transparent",
                  color: isActive ? p.color : "#444",
                  border: `1px solid ${isActive ? p.color + "40" : "#1a1a28"}`,
                  letterSpacing: "0.5px",
                  fontWeight: isActive ? 500 : 400,
                }}>
                  <span style={{ marginRight: "5px", fontSize: "11px" }}>{p.icon}</span>
                  {p.title}
                </button>
              );
            })}
          </div>

          {/* Progress bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}>
            <div style={{
              flex: 1,
              height: "2px",
              background: "#141420",
              borderRadius: "1px",
              overflow: "hidden",
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                left: 0, top: 0, bottom: 0,
                width: `${progress}%`,
                background: `linear-gradient(90deg, #E8C547, ${phase.color})`,
                borderRadius: "1px",
                transition: "width 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }} />
            </div>
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              color: "#444",
              flexShrink: 0,
              letterSpacing: "0.5px",
            }}>
              {completedWeeks + 1}/{totalWeeks}
            </span>
          </div>

          {/* Week dots */}
          <div style={{
            display: "flex",
            gap: "3px",
            flexWrap: "wrap",
            paddingBottom: "16px",
            borderBottom: "1px solid #141420",
          }}>
            {PHASES.map((p, pi) => (
              p.weeks.map((w, wi) => {
                const isCurrent = pi === activePhase && wi === activeWeek;
                const isPast = pi < activePhase || (pi === activePhase && wi < activeWeek);
                return (
                  <div
                    key={`${pi}-${wi}`}
                    className="week-dot"
                    onClick={() => goToWeek(pi, wi)}
                    title={`${p.title} · ${w.week}: ${w.focus}`}
                    style={{
                      width: isCurrent ? "18px" : "6px",
                      height: "6px",
                      borderRadius: isCurrent ? "3px" : "50%",
                      background: isCurrent ? p.color : isPast ? `${p.color}60` : "#1a1a28",
                      transition: "all 0.3s ease",
                      boxShadow: isCurrent ? `0 0 8px ${p.color}40` : "none",
                    }}
                  />
                );
              })
            ))}
          </div>
        </header>

        {/* ─── CONTENT ────────────────────────────────────────────────── */}
        <div ref={contentRef} style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 20px 100px",
        }}>
          {/* Week header */}
          <div style={{
            animation: mounted ? "fadeUp 0.4s ease 0.1s both" : "none",
            marginBottom: "20px",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              marginBottom: "8px",
              flexWrap: "wrap",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: "2px",
                  color: phase.color,
                  textTransform: "uppercase",
                }}>{phase.num} · {week.week}</span>
                {week.tier && (
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    color: "#E8C547",
                    background: "rgba(232,197,71,0.06)",
                    border: "1px solid rgba(232,197,71,0.15)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}>{week.tier} — {week.tierLabel}</span>
                )}
              </div>
              <button className="info-toggle" onClick={() => setShowPhaseInfo(!showPhaseInfo)} style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px",
                color: "#444",
                background: showPhaseInfo ? "rgba(255,255,255,0.04)" : "transparent",
                border: "1px solid #1a1a28",
                padding: "4px 10px",
                borderRadius: "4px",
              }}>
                {showPhaseInfo ? "hide info" : "phase info"}
              </button>
            </div>

            <h2 style={{
              fontFamily: "'Newsreader', serif",
              fontSize: "clamp(20px, 3vw, 28px)",
              fontWeight: 700,
              color: "#eee",
              lineHeight: 1.25,
              marginBottom: "6px",
            }}>{week.focus}</h2>

            {(week.what || week.why) && (
              <p style={{
                fontSize: "14px",
                color: "#666",
                lineHeight: 1.8,
                fontStyle: "italic",
                maxWidth: "680px",
              }}>{week.what || week.why}</p>
            )}
          </div>

          {/* Phase info panel */}
          {showPhaseInfo && (
            <div style={{
              animation: "fadeUp 0.3s ease",
              background: `${phase.color}05`,
              border: `1px solid ${phase.color}18`,
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
            }}>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px",
                letterSpacing: "2px",
                color: phase.color,
                marginBottom: "8px",
                textTransform: "uppercase",
              }}>{phase.icon} {phase.title} — {phase.duration}</div>
              <p style={{
                fontSize: "13.5px",
                color: "#999",
                lineHeight: 1.9,
                marginBottom: "16px",
              }}>{phase.purpose}</p>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                color: "#555",
                marginBottom: "8px",
                letterSpacing: "1px",
              }}>RULES</div>
              {phase.rules.map((rule, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                  marginBottom: "6px",
                }}>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    color: phase.color,
                    opacity: 0.6,
                    marginTop: "4px",
                    flexShrink: 0,
                  }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: "13px", color: "#888", lineHeight: 1.7 }}>{rule}</span>
                </div>
              ))}
              {phase.ongoing && (
                <div style={{
                  marginTop: "14px",
                  padding: "12px 14px",
                  background: "rgba(232,197,71,0.04)",
                  border: "1px solid rgba(232,197,71,0.1)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#888",
                  lineHeight: 1.8,
                }}>
                  <span style={{ color: "#E8C547", fontFamily: "'DM Mono', monospace", fontSize: "9px" }}>ONGOING: </span>
                  {phase.ongoing}
                </div>
              )}
            </div>
          )}

          {/* Daily schedule (Kata phase) */}
          {week.daily && (
            <div style={{
              animation: "fadeUp 0.4s ease 0.15s both",
              background: "rgba(255,255,255,0.015)",
              border: "1px solid #141420",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "12px",
            }}>
              <div style={{
                padding: "14px 18px 10px",
                borderBottom: "1px solid #141420",
              }}>
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: "2px",
                  color: phase.color,
                  textTransform: "uppercase",
                }}>Daily Schedule</span>
              </div>
              <div style={{ padding: "4px 0" }}>
                {week.daily.map((d, i) => (
                  <div key={i} style={{
                    display: "grid",
                    gridTemplateColumns: "44px 1fr",
                    gap: "14px",
                    padding: "12px 18px",
                    borderBottom: i < week.daily.length - 1 ? "1px solid #0e0e18" : "none",
                    animation: `slideIn 0.3s ease ${i * 0.04}s both`,
                  }}>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      color: phase.color,
                      fontWeight: 500,
                      paddingTop: "2px",
                    }}>{d.day}</span>
                    <div>
                      <div style={{ fontSize: "13px", color: "#bbb", lineHeight: 1.65, marginBottom: "6px" }}>{d.task}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {d.concepts.map((c, ci) => (
                          <span key={ci} style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "9px",
                            color: `${phase.color}cc`,
                            background: `${phase.color}08`,
                            border: `1px solid ${phase.color}18`,
                            padding: "2px 7px",
                            borderRadius: "3px",
                          }}>{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expandable sections */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            animation: "fadeUp 0.4s ease 0.2s both",
          }}>
            {SECTION_CONFIG.map(({ id, label, icon, colorKey }) => {
              const content = week[id];
              if (!content) return null;

              const isOpen = expandedSections.has(id);
              const color = colorKey === "phase" ? phase.color : colorKey;

              return (
                <div key={id} style={{
                  background: isOpen ? "rgba(255,255,255,0.015)" : "transparent",
                  border: `1px solid ${isOpen ? color + "20" : "#141420"}`,
                  borderRadius: "10px",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                }}>
                  <button className="section-toggle" onClick={() => toggleSection(id)} style={{
                    width: "100%",
                    padding: "13px 18px",
                    background: "transparent",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "12px",
                        color: isOpen ? color : "#333",
                        transition: "color 0.15s",
                      }}>{icon}</span>
                      <span style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "11px",
                        color: isOpen ? color : "#555",
                        fontWeight: isOpen ? 500 : 400,
                        letterSpacing: "0.5px",
                        transition: "color 0.15s",
                      }}>{label}</span>
                    </div>
                    <span style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      color: isOpen ? color : "#333",
                      transition: "transform 0.2s ease",
                      transform: isOpen ? "rotate(90deg)" : "none",
                    }}>→</span>
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: "2px 18px 16px",
                      animation: "fadeUp 0.2s ease",
                    }}>
                      {/* study: array of strings */}
                      {id === "study" && Array.isArray(content) && content.map((item, i) => (
                        <div key={i} style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "flex-start",
                          marginBottom: "6px",
                          animation: `slideIn 0.25s ease ${i * 0.03}s both`,
                        }}>
                          <span style={{
                            fontFamily: "'DM Mono', monospace",
                            fontSize: "8px",
                            color: `${color}80`,
                            marginTop: "7px",
                            flexShrink: 0,
                          }}>●</span>
                          <span style={{ fontSize: "13px", color: "#aaa", lineHeight: 1.75 }}>{item}</span>
                        </div>
                      ))}

                      {/* build, kata, checkpoint, trap: strings */}
                      {(id === "build" || id === "kata" || id === "checkpoint" || id === "trap") && typeof content === "string" && (
                        <div style={{
                          borderLeft: `2px solid ${color}40`,
                          paddingLeft: "14px",
                        }}>
                          <p style={{
                            fontSize: "13px",
                            color: "#aaa",
                            lineHeight: 1.85,
                          }}>{content}</p>
                        </div>
                      )}

                      {/* resources: array */}
                      {id === "resources" && Array.isArray(content) && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {content.map((r, i) => (
                            <span key={i} style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: "10px",
                              color: color,
                              background: `${color}08`,
                              border: `1px solid ${color}18`,
                              padding: "5px 11px",
                              borderRadius: "6px",
                              animation: `slideIn 0.2s ease ${i * 0.05}s both`,
                            }}>{r}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Checkpoint callout (always visible) */}
          {week.checkpoint && (
            <div style={{
              marginTop: "16px",
              padding: "14px 18px",
              background: "rgba(249,115,22,0.03)",
              border: "1px solid rgba(249,115,22,0.1)",
              borderRadius: "10px",
              animation: "fadeUp 0.4s ease 0.3s both",
            }}>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "9px",
                color: "#F97316",
                letterSpacing: "2px",
                marginBottom: "6px",
              }}>CHECKPOINT</div>
              <p style={{
                fontSize: "13px",
                color: "#888",
                lineHeight: 1.8,
                fontStyle: "italic",
              }}>{week.checkpoint}</p>
            </div>
          )}
        </div>

        {/* ─── BOTTOM NAV ─────────────────────────────────────────────── */}
        <div style={{
          position: "sticky",
          bottom: 0,
          padding: "12px 20px 16px",
          background: "linear-gradient(to top, #08080c 70%, transparent)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}>
          <button className="nav-btn" disabled={isFirst} onClick={goPrev} style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            color: isFirst ? "#222" : "#666",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid #1a1a28",
            borderRadius: "8px",
            padding: "10px 16px",
            letterSpacing: "0.5px",
          }}>
            ← prev
          </button>

          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "9px",
            color: "#333",
            textAlign: "center",
            lineHeight: 1.6,
          }}>
            <div style={{ color: phase.color, fontSize: "10px" }}>{phase.title}</div>
            <div>{week.week} of {phase.weeks.length}</div>
          </div>

          <button className="nav-btn" disabled={isLast} onClick={goNext} style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            color: isLast ? "#222" : phase.color,
            background: isLast ? "rgba(255,255,255,0.01)" : phase.bg,
            border: `1px solid ${isLast ? "#1a1a28" : phase.border}`,
            borderRadius: "8px",
            padding: "10px 16px",
            letterSpacing: "0.5px",
          }}>
            next →
          </button>
        </div>
      </div>

      {/* Bottom rule */}
      <div style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        height: "2px",
        background: `linear-gradient(90deg, transparent, ${phase.color}30, transparent)`,
        pointerEvents: "none",
      }} />
    </div>
  );
}
