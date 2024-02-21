-- CreateTable
CREATE TABLE "userPremiumSong" (
    "user_id" INTEGER NOT NULL,
    "song_id" INTEGER NOT NULL,

    CONSTRAINT "userPremiumSong_pkey" PRIMARY KEY ("user_id","song_id")
);
