-- MySQL dump 10.13  Distrib 8.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: spotyphieSOAP
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `logging`
--

DROP TABLE IF EXISTS `logging`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logging` (
  `log_id` varchar(100) NOT NULL,
  `request_desc` varchar(300) DEFAULT NULL,
  `IP` varchar(255) DEFAULT NULL,
  `endpoint` varchar(80) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logging`
--

LOCK TABLES `logging` WRITE;
/*!40000 ALTER TABLE `logging` DISABLE KEYS */;
INSERT INTO `logging` VALUES ('plain-Sun Nov 12 10:25:57 UTC 2023-192.168.100.1','1','192.168.100.1','http://172.25.0.3/premiumservice','2023-11-12 10:25:58'),('plain-Sun Nov 12 10:26:23 UTC 2023-192.168.100.1','1','192.168.100.1','http://172.25.0.3/premiumservice','2023-11-12 10:26:23'),('plain-Sun Nov 12 10:29:25 UTC 2023-192.168.100.1','1','192.168.100.1','http://172.25.0.3/premiumservice','2023-11-12 10:29:26'),('plain-Sun Nov 12 10:29:55 UTC 2023-192.168.100.1','1','192.168.100.1','http://172.25.0.3/premiumservice','2023-11-12 10:29:56'),('plain-Sun Nov 12 10:31:48 UTC 2023-172.22.0.3','1','172.22.0.3','http://172.25.0.3/premiumservice','2023-11-12 10:31:48'),('plain-Sun Nov 12 10:35:01 UTC 2023-172.22.0.3','1','172.22.0.3','http://172.25.0.3/premiumservice','2023-11-12 10:35:02'),('plain-Sun Nov 12 10:35:15 UTC 2023-172.22.0.3','1','172.22.0.3','http://172.25.0.3/premiumservice','2023-11-12 10:35:15'),('plain-Sun Nov 12 10:36:17 UTC 2023-172.22.0.3','1','172.22.0.3','http://172.25.0.3/premiumservice','2023-11-12 10:36:18'),('plain-Sun Nov 12 10:37:12 UTC 2023-172.22.0.3','1','172.22.0.3','http://172.25.0.3/premiumservice','2023-11-12 10:37:12'),('plain-Sun Nov 12 10:37:30 UTC 2023-172.22.0.3','1','172.22.0.3','http://172.25.0.3/premiumservice','2023-11-12 10:37:31'),('plain-Sun Nov 12 10:37:52 UTC 2023-172.22.0.3','1','172.22.0.3','http://172.25.0.3/premiumservice','2023-11-12 10:37:53'),('plain-Sun Nov 12 10:38:16 UTC 2023-172.22.0.3','1','172.22.0.3','http://172.25.0.3/premiumservice','2023-11-12 10:38:16'),('plain-Sun Nov 12 10:38:52 UTC 2023-172.22.0.3','1','172.22.0.3','http://172.25.0.3/premiumservice','2023-11-12 10:38:52'),('rest-Mon Nov 13 02:11:07 UTC 2023-172.17.80.1','0','172.17.80.1','http://localhost:8080/premiumservice?wsdl','2023-11-13 02:11:08'),('rest-Mon Nov 13 02:11:50 UTC 2023-172.17.80.1','0','172.17.80.1','http://localhost:8080/premiumservice?wsdl','2023-11-13 02:11:50'),('rest-Mon Nov 13 04:55:44 UTC 2023-172.17.80.1','0','172.17.80.1','http://localhost:8080/premiumservice?wsdl','2023-11-13 04:55:44'),('rest-Mon Nov 13 04:57:23 UTC 2023-172.17.80.1','2test','172.17.80.1','http://localhost:8080/premiumservice?wsdl','2023-11-13 04:57:23'),('rest-Mon Nov 13 05:28:05 UTC 2023-172.17.80.1','2test','172.17.80.1','http://localhost:8080/premiumuser?wsdl','2023-11-13 05:28:05'),('rest-Mon Nov 13 05:30:18 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumsong?wsdl','2023-11-13 05:30:19'),('rest-Mon Nov 13 05:31:03 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumsong?wsdl','2023-11-13 05:31:04'),('rest-Mon Nov 13 05:38:26 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumsong?wsdl','2023-11-13 05:38:27'),('rest-Mon Nov 13 05:38:34 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumsong?wsdl','2023-11-13 05:38:34'),('rest-Mon Nov 13 05:38:40 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumsong?wsdl','2023-11-13 05:38:41'),('rest-Mon Nov 13 05:47:38 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumsong?wsdl','2023-11-13 05:47:38'),('rest-Mon Nov 13 05:48:23 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumuser?wsdl','2023-11-13 05:48:23'),('rest-Mon Nov 13 05:49:32 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumuser?wsdl','2023-11-13 05:49:33'),('rest-Mon Nov 13 05:52:33 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumuser?wsdl','2023-11-13 05:52:34'),('rest-Mon Nov 13 05:53:48 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumsong?wsdl','2023-11-13 05:53:49'),('rest-Mon Nov 13 05:55:34 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumsong?wsdl','2023-11-13 05:55:35'),('rest-Mon Nov 13 05:56:07 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumsong?wsdl','2023-11-13 05:56:08'),('rest-Mon Nov 13 05:56:21 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumuser?wsdl','2023-11-13 05:56:22'),('rest-Mon Nov 13 05:56:40 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumuser?wsdl','2023-11-13 05:56:40'),('rest-Mon Nov 13 05:57:27 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumuser?wsdl','2023-11-13 05:57:27'),('rest-Mon Nov 13 05:58:39 UTC 2023-172.17.80.1','0testtesttesttesttest1','172.17.80.1','http://localhost:8080/premiumuser?wsdl','2023-11-13 05:58:39'),('rest-Sat Nov 11 15:52:23 UTC 2023-192.168.0.104','2test','192.168.0.104','http://localhost:8080/premiumservice?wsdl','2023-11-11 15:52:24'),('rest-Sun Nov 12 07:47:04 UTC 2023-192.168.0.104','2test','192.168.0.104','http://localhost:8080/premiumservice?wsdl','2023-11-12 07:47:05');
/*!40000 ALTER TABLE `logging` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PremiumSong`
--

DROP TABLE IF EXISTS `PremiumSong`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PremiumSong` (
  `song_id` int NOT NULL,
  `title` varchar(80) DEFAULT NULL,
  `artist` varchar(80) DEFAULT NULL,
  `genre` varchar(20) DEFAULT NULL,
  `audio` varchar(200) DEFAULT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`song_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PremiumSong`
--

LOCK TABLES `PremiumSong` WRITE;
/*!40000 ALTER TABLE `PremiumSong` DISABLE KEYS */;
-- Insert seed data for PremiumSong
INSERT INTO `PremiumSong` (`song_id`, `title`, `artist`, `genre`, `audio`, `picture`, `price`)
VALUES
  (1, 'Song Title 1', 'Artist 1', 'Genre 1', 'https://drive.google.com/file/d/1hE_Vz2LOWFmbGXFwR2bKHWr3BmQBtjXP/view?usp=drive_link', 'https://th.bing.com/th/id/OIP.u0LfIm1Nb5kTmMI5k37ftgHaFj?rs=1&pid=ImgDetMain', 10),
  (2, 'Song Title 2', 'Artist 2', 'Genre 2', 'https://drive.google.com/file/d/1hE_Vz2LOWFmbGXFwR2bKHWr3BmQBtjXP/view?usp=drive_link', 'https://th.bing.com/th/id/OIP.Y6ApZ6CuUxDKepMsuBFxBgHaHa?rs=1&pid=ImgDetMain', 15),
  (3, 'Song Title 3', 'Artist 3', 'Genre 3', 'https://drive.google.com/file/d/1hE_Vz2LOWFmbGXFwR2bKHWr3BmQBtjXP/view?usp=drive_link', 'https://th.bing.com/th/id/OIP.u0LfIm1Nb5kTmMI5k37ftgHaFj?rs=1&pid=ImgDetMain', 12),
  (4, 'Song Title 4', 'Artist 4', 'Genre 4', 'https://drive.google.com/file/d/1hE_Vz2LOWFmbGXFwR2bKHWr3BmQBtjXP/view?usp=drive_link', 'https://th.bing.com/th/id/OIP.Y6ApZ6CuUxDKepMsuBFxBgHaHa?rs=1&pid=ImgDetMain', 18),
  (5, 'Song Title 5', 'Artist 5', 'Genre 5', 'https://drive.google.com/file/d/1hE_Vz2LOWFmbGXFwR2bKHWr3BmQBtjXP/view?usp=drive_link', 'https://th.bing.com/th/id/OIP.u0LfIm1Nb5kTmMI5k37ftgHaFj?rs=1&pid=ImgDetMain', 14),
  (6, 'Song Title 6', 'Artist 6', 'Genre 6', 'https://drive.google.com/file/d/1hE_Vz2LOWFmbGXFwR2bKHWr3BmQBtjXP/view?usp=drive_link', 'https://th.bing.com/th/id/OIP.Y6ApZ6CuUxDKepMsuBFxBgHaHa?rs=1&pid=ImgDetMain', 20);

/*!40000 ALTER TABLE `PremiumSong` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PremiumUser`
--

DROP TABLE IF EXISTS `PremiumUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PremiumUser` (
  `user_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PremiumUser`
--

LOCK TABLES `PremiumUser` WRITE;
/*!40000 ALTER TABLE `PremiumUser` DISABLE KEYS */;
INSERT INTO `PremiumUser` VALUES (0,'2023-05-11','2099-05-11'),(1,'2023-11-09','2050-11-09'),(2,'2023-11-10','2050-11-10');
/*!40000 ALTER TABLE `PremiumUser` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-13  6:17:54
