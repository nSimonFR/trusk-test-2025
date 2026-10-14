import type Database from "better-sqlite3";

// Same data as the former in-memory mock.
const DOCUMENTS = [{ title: "Sample Document 1" }, { title: "Sample Document 2" }];

export function seed(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  const { count } = db
    .prepare("SELECT COUNT(*) AS count FROM documents")
    .get() as { count: number };
  if (count > 0) {
    return;
  }

  const insert = db.prepare(
    "INSERT INTO documents (title, created_at) VALUES (?, ?)",
  );
  const now = new Date().toISOString();
  db.transaction(() => {
    for (const document of DOCUMENTS) {
      insert.run(document.title, now);
    }
  })();
}
