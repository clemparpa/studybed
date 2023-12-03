-- CreateTable
CREATE TABLE "file_tags" (
    "tag" TEXT NOT NULL,
    "file" TEXT NOT NULL,

    PRIMARY KEY ("tag", "file"),
    CONSTRAINT "file_tags_file_fkey" FOREIGN KEY ("file") REFERENCES "files" ("_id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "file_tags_tag_fkey" FOREIGN KEY ("tag") REFERENCES "tags" ("name") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "files" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "file_path" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "url_path" TEXT,
    "filetype" TEXT,
    "metadata" TEXT
);

-- CreateTable
CREATE TABLE "tags" (
    "name" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "links" (
    "link_type" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,

    PRIMARY KEY ("from", "to"),
    CONSTRAINT "links_to_fkey" FOREIGN KEY ("to") REFERENCES "files" ("_id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "links_from_fkey" FOREIGN KEY ("from") REFERENCES "files" ("_id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateIndex
CREATE UNIQUE INDEX "files_file_path_key" ON "files"("file_path");

-- CreateIndex
CREATE UNIQUE INDEX "files_url_path_key" ON "files"("url_path");

