import { sqliteTable, text, integer} from 'drizzle-orm/sqlite-core';

// Categories Table
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({autoIncrement: true } ),
  name: text('name').notNull(),
});

// Notes Table
export const notes = sqliteTable('notes', {
  id: integer('id').primaryKey({autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  categoryId: integer('category_id')
    .notNull()
    .references(() => categories.id), // Foreign key to categories table
});

// File Upload Table (Optional)
export const uploads = sqliteTable('uploads', {
  id: integer('id').primaryKey({autoIncrement: true }),
  noteId: integer('note_id')
    .notNull()
    .references(() => notes.id), // Foreign key to notes table
  filePath: text('file_path').notNull(),
});
