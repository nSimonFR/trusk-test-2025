# 🧪 Trusk fullstack exercise · open a private document

## Context

A small back-office lists documents: delivery notes, invoices, delivery photos. The files are stored in a **private Amazon S3 bucket**. They must never be publicly reachable, even if someone gets hold of a raw S3 URL.

## The ticket

> As a user, when I click **Open doc** on a row, the document opens in a new tab, through a **temporary signed URL**.

That is all the ticket says, on purpose.

## What we expect from you

**You won't write the feature.** This is about how you would build it. It takes about 45 minutes, in three moments:

1. **Read (about 4 minutes, no tools).** This README and the code.
2. **Tell us your plan, out loud, without coding.**
   - What you need to clarify first: ask us, one of us plays the product owner.
   - Where you start, how you split the work, and in what order.
   - What you do yourself, and what you would hand to a coding agent, if anything. If you would, what you would tell it.
   - How you would know it is done and safe to merge.
3. **Try one piece for real.** Near the end, pick one piece of your plan and run your usual AI assistant on it, prompts visible. Then read what it produced and tell us whether you would merge it, and why.

Along the way, the requirements will change (on purpose, and the same for everyone), and we will ask where things would live in NestJS and Next.js.

There is no single right approach: straight into the code, a list of tasks, exploring first, with or without agents. What we look at is why you choose it, and how you check the result.

If time allows, we may also talk about:

- getting rid of the `useEffect` that loads the list;
- loading and error states;
- a test you would write first.

## Project layout

```
.
├── back/                          NestJS API · http://localhost:3005
│   └── src/
│       ├── main.ts
│       ├── database/              SQLite connection + seed (2 sample documents)
│       └── documents/             GET /documents
├── front/                         Next.js 15, App Router · http://localhost:3000
│   └── app/
│       ├── page.tsx               the document list page
│       └── components/
│           └── documents.tsx      client component that loads the list
└── document-sdk-bootstrap.ts      stand-in for the S3 SDK
```

- **Data**: the back reads documents from a SQLite file, `back/data/documents.sqlite`. It is created and seeded on first start. Run `npm run db:reset` in `back/` to start over.
- **S3**: no AWS account needed. `document-sdk-bootstrap.ts` exposes one call, `getDocumentUrl(key, { expiresInSeconds })`, that returns a URL to open a document. Here it always returns a public sample PDF: treat it as a real signed URL.

## Running it

Requires Node 20 or later.

```bash
# terminal 1
cd back && npm install && npm run dev    # http://localhost:3005/documents

# terminal 2
cd front && npm install && npm run dev   # http://localhost:3000
```

You should see the two sample documents in the list.
