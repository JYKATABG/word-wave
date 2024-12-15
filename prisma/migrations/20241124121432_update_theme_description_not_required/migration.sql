-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Theme" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Uncategorized',
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL
);
INSERT INTO "new_Theme" ("authorId", "category", "createdAt", "description", "id", "title") SELECT "authorId", "category", "createdAt", "description", "id", "title" FROM "Theme";
DROP TABLE "Theme";
ALTER TABLE "new_Theme" RENAME TO "Theme";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
