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
-- Table structure for table `course_global`
--

DROP TABLE IF EXISTS `course_global`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_global` (
  `id` int NOT NULL AUTO_INCREMENT,
  `courseNumber` int NOT NULL,
  `lastUpdateDate` date NOT NULL,
  `themesCount` int NOT NULL,
  `courseName` text NOT NULL,
  `isFullyPaid` tinyint(1) NOT NULL,
  `possibleToOpenCourseFree` tinyint(1) NOT NULL,
  `isClosing` tinyint(1) NOT NULL,
  `language` text NOT NULL,
  `description` text NOT NULL,
  `coursePriceRub` int DEFAULT NULL,
  `coursePriceAndropoint` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_global`
--

LOCK TABLES `course_global` WRITE;
/*!40000 ALTER TABLE `course_global` DISABLE KEYS */;
INSERT INTO `course_global` VALUES (1,1,'2023-10-31',9,'Базовый',0,1,1,'rus','В этом курсе ты узнаешь основы языка программирования kotlin!',0,0),(2,3,'2023-10-31',6,'Углубленный',1,1,0,'rus','Подними свои знания на профессианальный уровень',600,600),(3,1,'2023-10-31',9,'Basic',0,1,1,'eng','In this course, you will learn the basics of the Kotlin programming language!',0,0),(4,3,'2023-10-31',6,'Advanced',1,1,0,'eng','Elevate your knowledge to a professional level',600,600),(5,2,'2023-10-31',6,'Продвинутый',1,1,0,'rus','Узнай android разработку лучше!',150,300);
/*!40000 ALTER TABLE `course_global` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-29 17:15:49
