-- CreateTable
CREATE TABLE "chat" (
    "chat_id" VARCHAR(255) NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,
    "chat_time" TIMESTAMPTZ(3) NOT NULL,
    "content" VARCHAR(1000) NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("chat_id")
);

-- CreateTable
CREATE TABLE "referralCode" (
    "code" VARCHAR(255) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "referralCode_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "userApp" (
    "user_id" INTEGER NOT NULL,
    "credits" INTEGER NOT NULL DEFAULT 0,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "userApp_pkey" PRIMARY KEY ("user_id")
);