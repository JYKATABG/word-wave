-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Uncategorized',
    "imageUrl" TEXT,
    "description" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "themeId" TEXT,
    CONSTRAINT "Post_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("authorId", "createdAt", "description", "id", "imageUrl", "themeId", "title", "updatedAt") SELECT "authorId", "createdAt", "description", "id", "imageUrl", "themeId", "title", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE TABLE "new_Theme" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Uncategorized',
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL
);
INSERT INTO "new_Theme" ("authorId", "createdAt", "description", "id", "title") SELECT "authorId", "createdAt", "description", "id", "title" FROM "Theme";
DROP TABLE "Theme";
ALTER TABLE "new_Theme" RENAME TO "Theme";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
