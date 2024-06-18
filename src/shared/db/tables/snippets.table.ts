import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface SnippetsTable {
  id: Generated<string>;
  title: string;
  description: string;
  language: string;
  code: string;
  type: "public" | "private";
  userId: string;
  createdAt: ColumnType<Date, string | undefined, never>;
  updatedAt: ColumnType<Date, string | undefined, never>;
}

export type Snippet = Selectable<SnippetsTable>;
export type NewSnippet = Insertable<SnippetsTable>;
export type SnippetUpdate = Updateable<SnippetsTable>;
