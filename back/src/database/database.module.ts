import { Global, Module, OnModuleDestroy, Inject } from "@nestjs/common";
import Database = require("better-sqlite3");
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { seed } from "./seed";

export const DATABASE = Symbol("DATABASE");

// SQLite file, created on first start. Delete it (npm run db:reset) to start over.
const DATABASE_PATH =
  process.env.DATABASE_PATH ?? join(process.cwd(), "data", "documents.sqlite");

@Global()
@Module({
  providers: [
    {
      provide: DATABASE,
      useFactory: () => {
        mkdirSync(dirname(DATABASE_PATH), { recursive: true });
        const db = new Database(DATABASE_PATH);
        seed(db);
        return db;
      },
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule implements OnModuleDestroy {
  constructor(@Inject(DATABASE) private readonly db: Database.Database) {}

  onModuleDestroy() {
    this.db.close();
  }
}
