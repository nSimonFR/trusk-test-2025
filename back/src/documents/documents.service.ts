import { Inject, Injectable } from "@nestjs/common";
import type Database from "better-sqlite3";
import { DATABASE } from "../database/database.module";

export interface Document {
  id: number;
  title: string;
  createdAt: Date;
}

type DocumentRow = { id: number; title: string; created_at: string };

@Injectable()
export class DocumentsService {
  constructor(@Inject(DATABASE) private readonly db: Database.Database) {}

  findAll(): Document[] {
    const rows = this.db
      .prepare("SELECT id, title, created_at FROM documents ORDER BY id")
      .all() as DocumentRow[];
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      createdAt: new Date(row.created_at),
    }));
  }
}
