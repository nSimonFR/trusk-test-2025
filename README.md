# 🧪 Trusk fullstack exercise · open a private document

## Context

A small back-office lists documents: delivery notes, invoices, delivery photos. The files are stored in a **private Amazon S3 bucket**. They must never be publicly reachable, even if someone gets hold of a raw S3 URL.

## The ticket

> As a user, when I click **Open doc** on a row, the document opens in a new tab, through a **temporary signed URL**.

That is all the ticket says. If something is unclear, ask: one of us plays the product owner.

## What we expect

We won't ask you to write the whole feature. We want to see how you would approach it:

- where you start, and in what order;
- what you would do yourself, and what you would hand to a coding agent, if anything;
- how you would know it works before merging.

Use the code to back your reasoning. The requirements may change along the way: that is on purpose, and the same for everyone.

Bonuses, if there is time left:

- get rid of the `useEffect` that loads the list;
- loading and error states;
- a test.

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
- **S3**: no AWS account needed. `document-sdk-bootstrap.ts` always returns a public sample PDF; treat it as a real signed URL. The real signing code is kept next to it for reference.

## Running it

Requires Node 20 or later.

```bash
# terminal 1
cd back && npm install && npm run dev    # http://localhost:3005/documents

# terminal 2
cd front && npm install && npm run dev   # http://localhost:3000
```

You should see the two sample documents in the list.
