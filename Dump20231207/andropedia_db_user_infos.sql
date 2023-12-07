-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: localhost    Database: andropedia_db
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user_infos`
--

DROP TABLE IF EXISTS `user_infos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_infos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` text NOT NULL,
  `name` text,
  `image` blob,
  `userlanguage` text,
  `andropointCount` int DEFAULT '0',
  `lastOnlineDate` text,
  `strikeModeDay` int DEFAULT NULL,
  `lastCourseNumber` int DEFAULT '1',
  `lastThemeNumber` int DEFAULT '2',
  `promoCode` text,
  `promoCodeSubDay` text,
  `themeTermHourse` int DEFAULT NULL,
  `termDate` text,
  `isInfinity` tinyint DEFAULT '0',
  `termAdsDate` text,
  `lastCourseThemePasses` tinyint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_infos`
--

LOCK TABLES `user_infos` WRITE;
/*!40000 ALTER TABLE `user_infos` DISABLE KEYS */;
INSERT INTO `user_infos` VALUES (41,'eyJhbGciOiJSUzI1NiIsImtpZCI6ImU0YWRmYjQzNmI5ZTE5N2UyZTExMDZhZjJjODQyMjg0ZTQ5ODZhZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzOTU2Nzg5OTYyOTgtNWM3N244NGVyOWQ1OTYxam4xYWx1YXAwcGEzbWUzM2kuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzOTU2Nzg5OTYyOTgtMHA3MDhpbjB0NThncG84MWQ1Z2VldmJza2w2NzczM24uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDAyMTUxODk2NjQ5NTk0MDIyNjYiLCJlbWFpbCI6IndhbmlsYXdoaXRlMjAzMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6ItCQ0YDRgtGD0YAg0KjQtdGB0YLQsNC60L7QsiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKUU13Wi0yMFJiWk9wVlRJN21fQkdtd2Y5U2d1SE5sX2paVTMyZUxxUjE9czk2LWMiLCJnaXZlbl9uYW1lIjoi0JDRgNGC0YPRgCIsImZhbWlseV9uYW1lIjoi0KjQtdGB0YLQsNC60L7QsiIsImxvY2FsZSI6InJ1IiwiaWF0IjoxNzAxMzIwODgxLCJleHAiOjE3MDEzMjQ0ODF9.lGw2-4cr9dQp__kgiB3nzA2_09ifcACFtELuaI0aeF_uA567vgww1HLAQvgaZpv9ZApwqk1GvJGO5xAqN1-0JgshPqgAHYSVM8ZEkvmO-5ZIzNfuwhKn3fCng7LTTpEmC6deFIQUBmPQHkMQ4xaH5KOGmurPwJL6o4nrkotEnAdEJn7RoeHt2OKkGZbvA7bcQ2qYzcGigZXaMrFfY2fC10Ec5TIinswcqFR70WN7wtzFBg91e_OR8LlPzlWeD9V3p769cnF2v2eMBS9mmKv3J__N8t8ukIByBKOdFWkoi-JS2m2jlS4Yy5SqR1_5DHbha3kphw_wU5d0bSXxqBWnXg','Артур Шестаков',NULL,NULL,26,'2023-11-30T20:01:07.458000+09:00',1,1,3,NULL,NULL,0,NULL,0,NULL,0),(42,'8e50fb8f-1d6e-4690-90c4-c5bfd627b3ef','wanila2006Dev',NULL,'rus',25,'2023-12-02T21:21:32.665000+09:00',1,1,3,'TESTARTUR','2023-12-02T21:20:42.893000+09:00',0,NULL,0,NULL,0),(43,'27b8f588-8aae-46a9-8501-e70161232080','walter2006Dev',NULL,NULL,27,'2023-12-02T21:25:51.641000+09:00',1,1,3,'TESTARTUR','2023-12-02T21:24:52.553000+09:00',0,NULL,0,NULL,0),(44,'100215189664959402266','Артур Шестаков',NULL,NULL,27,'2023-12-02T21:44:15.826000+09:00',1,1,3,'TESTARTUR','2023-12-02T21:43:20.205000+09:00',0,NULL,0,NULL,0);
/*!40000 ALTER TABLE `user_infos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-07 21:03:47