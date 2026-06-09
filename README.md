# VelaBeam

AI-powered automated website builder for local businesses. Identify businesses without websites and auto-generate/deploys industry-specific sites for them.

## Quick Start

```bash
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Demo credentials: `demo@velabeam.app` / `demo1234`

## Tech Stack

- Next.js 15 + React 19
- NextAuth.js v5 (Credentials provider)
- Prisma + SQLite
- Tailwind CSS
- TypeScript
