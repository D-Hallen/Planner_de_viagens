-- CreateTable
CREATE TABLE "trips" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "destination" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
