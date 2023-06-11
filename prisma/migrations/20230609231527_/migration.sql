-- CreateTable
CREATE TABLE "JogoDoBicho" (
    "id" SERIAL NOT NULL,
    "numero" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "JogoDoBicho_pkey" PRIMARY KEY ("id")
);
