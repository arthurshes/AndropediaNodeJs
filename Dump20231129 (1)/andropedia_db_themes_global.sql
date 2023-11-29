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
-- Table structure for table `themes_global`
--

DROP TABLE IF EXISTS `themes_global`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `themes_global` (
  `id` int NOT NULL AUTO_INCREMENT,
  `courseNumber` int NOT NULL,
  `lastUpdateDate` date NOT NULL,
  `termDateApi` text,
  `termHourse` int DEFAULT NULL,
  `themeNumber` int NOT NULL,
  `uniqueThemeId` int NOT NULL,
  `courseName` text NOT NULL,
  `lastThemeCourse` tinyint(1) NOT NULL,
  `themeName` text NOT NULL,
  `isFreeTheme` tinyint(1) NOT NULL,
  `levelsCount` int NOT NULL,
  `interactiveTestId` int NOT NULL,
  `interactiveQuestionCount` int NOT NULL,
  `victorineQuestionCount` int NOT NULL,
  `imageTheme` blob,
  `lessonsCount` int NOT NULL,
  `vicotineTestId` int NOT NULL,
  `isOpen` tinyint(1) NOT NULL,
  `isFullyPaid` tinyint(1) NOT NULL,
  `language` text NOT NULL,
  `themePrice` int DEFAULT NULL,
  `andropointsPrice` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `themes_global`
--

LOCK TABLES `themes_global` WRITE;
/*!40000 ALTER TABLE `themes_global` DISABLE KEYS */;
INSERT INTO `themes_global` VALUES (1,1,'2023-10-31',NULL,NULL,1,3,'Базовый',0,'Приветсвенная тема',1,4,0,0,0,NULL,4,0,1,0,'rus',0,0),(2,1,'2023-10-31',NULL,NULL,2,4,'Базовый',0,'Ресурсы Android Studio',1,5,0,0,10,NULL,5,2006,1,0,'rus',0,0),(3,1,'2023-10-31',NULL,NULL,3,5,'Базовый',0,'Переменные',1,9,0,0,15,NULL,9,2007,0,0,'rus',0,0),(4,1,'2023-10-31',NULL,NULL,4,6,'Базовый',0,'Условные операторы',1,7,0,0,12,NULL,7,2008,0,0,'rus',0,0),(5,1,'2023-10-31',NULL,NULL,5,7,'Базовый',0,'Циклы',1,8,0,0,14,NULL,8,2009,0,0,'rus',0,0),(6,1,'2023-10-31',NULL,NULL,6,8,'Базовый',0,'Массивы и списки',1,10,0,0,5,NULL,10,2010,0,0,'rus',0,0),(7,1,'2023-10-31',NULL,NULL,7,9,'Базовый',0,'Activity lifecycle',1,4,0,0,14,NULL,4,2011,0,0,'rus',0,0),(8,1,'2023-10-31',NULL,NULL,8,10,'Базовый',1,'ООП',1,6,0,0,15,NULL,6,2012,0,0,'rus',0,0),(9,3,'2023-10-31',NULL,NULL,15,19,'Углубленный',0,'Архитектура приложения',1,8,0,0,20,NULL,8,2013,0,0,'rus',0,0),(10,3,'2023-10-31',NULL,NULL,16,20,'Углубленный',0,'Многопоточность и асинхронность',1,8,0,0,20,NULL,8,2014,0,0,'rus',0,0),(11,3,'2023-10-31',NULL,NULL,17,21,'Углубленный',0,'Koin',1,7,0,0,15,NULL,7,2015,0,0,'rus',0,0),(12,3,'2023-10-31',NULL,NULL,18,22,'Углубленный',0,'Dagger hilt',1,6,0,0,20,NULL,6,2016,0,0,'rus',0,0),(13,3,'2023-10-31',NULL,NULL,19,23,'Углубленный',1,'Тестирование',1,7,0,0,24,NULL,7,2017,0,0,'rus',0,0),(14,1,'2023-10-31',NULL,NULL,1,3,'Basic',0,'Welcome Theme',1,4,0,0,0,NULL,4,0,1,0,'eng',0,0),(15,1,'2023-10-31',NULL,NULL,2,4,'Basic',0,'Resources in Android Studio',1,5,0,0,10,NULL,5,2006,1,0,'eng',0,0),(16,1,'2023-10-31',NULL,NULL,3,5,'Basic',0,'Variables',1,9,0,0,15,NULL,9,2007,0,0,'eng',0,0),(17,1,'2023-10-31',NULL,NULL,4,6,'Basic',0,'Conditional Statements',1,7,0,0,12,NULL,7,2008,0,0,'eng',0,0),(18,1,'2023-10-31',NULL,NULL,5,7,'Basic',0,'Loops',1,8,0,0,14,NULL,8,2009,0,0,'eng',0,0),(19,1,'2023-10-31',NULL,NULL,6,8,'Basic',0,'Arrays and Lists',1,10,0,0,5,NULL,10,2010,0,0,'eng',0,0),(20,1,'2023-10-31',NULL,NULL,7,9,'Basic',0,'Activity Lifecycle',1,4,0,0,14,NULL,4,2011,0,0,'eng',0,0),(21,1,'2023-10-31',NULL,NULL,8,10,'Basic',1,'Object-Oriented Programming',1,6,0,0,15,NULL,6,2012,0,0,'eng',0,0),(22,3,'2023-10-31',NULL,NULL,15,19,'Advanced',0,'Application Architecture',1,8,0,0,20,NULL,8,2013,0,0,'eng',0,0),(23,3,'2023-10-31',NULL,NULL,16,20,'Advanced',0,'Multithreading and Asynchrony',1,8,0,0,20,NULL,8,2014,0,0,'eng',0,0),(24,3,'2023-10-31',NULL,NULL,17,21,'Advanced',0,'Koin',1,7,0,0,15,NULL,7,2015,0,0,'eng',0,0),(25,3,'2023-10-31',NULL,NULL,18,22,'Advanced',0,'Dagger Hilt',1,6,0,0,20,NULL,6,2016,0,0,'eng',0,0),(26,3,'2023-10-31',NULL,NULL,19,23,'Advanced',1,'Testing',1,7,0,0,24,NULL,7,2017,0,0,'eng',0,0),(27,2,'2023-10-31',NULL,NULL,9,12,'Продвинутый',0,'Context',1,6,0,0,20,NULL,6,2018,0,0,'rus',0,0),(28,2,'2023-10-31',NULL,NULL,10,13,'Продвинутый',0,'Отображение списков',1,6,0,0,19,NULL,6,2019,0,0,'rus',0,0),(29,2,'2023-10-31',NULL,NULL,11,14,'Продвинутый',0,'Navigation component',1,7,0,0,20,NULL,7,2020,0,0,'rus',0,0),(30,2,'2023-10-31',NULL,NULL,12,15,'Продвинутый',0,'Retrofit',1,10,0,0,20,NULL,10,2021,0,0,'rus',0,0),(31,2,'2023-10-31',NULL,NULL,13,16,'Продвинутый',0,'Загрузка фотографий',1,8,0,0,16,NULL,8,2022,0,0,'rus',0,0),(32,2,'2023-10-31',NULL,NULL,14,17,'Продвинутый',1,'Утечка памяти',1,8,0,0,21,NULL,8,2023,0,0,'rus',0,NULL);
/*!40000 ALTER TABLE `themes_global` ENABLE KEYS */;
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
