import e from "express";
import { PrismaClient } from '@prisma/client'

require('dotenv').config(); // Memuat konfigurasi dari file .env
export const time = (new Date()).toLocaleTimeString();
export const prisma = new PrismaClient();


export const SOAP_WSDL_PREMUSER_URL = process.env.SPOTYPHIE_SOAP_WSDL_USER_URL || 'http://spotyphie-soap-service:8081/premiumuser?wsdl'; // Menggunakan variabel dari .env atau default
export const SOAP_WSDL_PREMSONG_URL = process.env.SPOTYPHIE_SOAP_WSDL_SONG_URL || 'http://spotyphie-soap-service:8081/premiumsong?wsdl'; // Menggunakan variabel dari .env atau default
export const PORT = process.env.SPOTYPHIE_REST_PORT || 3000; // Menggunakan variabel dari .env atau default 3000
const monolithContainer = process.env.SPOTYPHIE_MONOLITH_CONTAINER  || 'localhost'; // Menggunakan variabel dari .env atau default localhost
const monolithPORT = process.env.SPOTYPHIE_MONOLITH_PORT || 8000; // Menggunakan variabel dari .env atau default 8000
export const monolithURL = `http://${monolithContainer}:${monolithPORT}`;
export const secretKey = process.env.SPOTYPHIE_TOKEN_AUTH || 'secretKey';