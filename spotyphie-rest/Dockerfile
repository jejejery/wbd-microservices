# Use an official Node.js runtime as a parent image
FROM node:alpine


WORKDIR /app

COPY package*.json ./
# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

COPY . .

RUN npm i

RUN npx prisma generate


