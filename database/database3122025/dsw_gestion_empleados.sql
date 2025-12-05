-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: dsw_gestion
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `DNI_CUIL` varchar(15) NOT NULL,
  `nombre_apellidoEmp` varchar(50) DEFAULT NULL,
  `contacto` varchar(100) DEFAULT NULL,
  `idSucursal` int DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `idrol` varchar(20) NOT NULL DEFAULT 'vendedor',
  PRIMARY KEY (`DNI_CUIL`),
  UNIQUE KEY `email` (`email`),
  KEY `idSucursal` (`idSucursal`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES ('12312312','José Romero','123123123',15,'user12312312@test.com','$2b$10$ucps/U1JVwszSWJzeuboJOVdKTzt1Mh8dGyV6luDO6Ei/3AHhO1tW','2'),('20323475','Carlos López','1234-5680',11,'admin@test.com','$2b$10$kgqABUpb7HTYLBCRC7RSfegs9KHUPd8OGWmYG9b9Prx2RTM283C2O','1'),('20347385','Santiago Romero','1234-5705',11,'vendedor20347385@test.com','$2b$10$xvfl.1zsKEnoTI/hiOLNfOIYdicgdRLobT1eHtxBfGyDDof5F19G.','2'),('20348956','Juan Pérez','1234-5678',12,'vendedor20348956@test.com','$2b$10$xvfl.1zsKEnoTI/hiOLNfOIYdicgdRLobT1eHtxBfGyDDof5F19G.','1'),('20349285','David Ramírez','1234-5686',13,'vendedor20349285@test.com','$2b$10$xvfl.1zsKEnoTI/hiOLNfOIYdicgdRLobT1eHtxBfGyDDof5F19G.','2'),('20352836','Luis Pérez','1234-5713',14,'vendedor20352836@test.com','$2b$10$xvfl.1zsKEnoTI/hiOLNfOIYdicgdRLobT1eHtxBfGyDDof5F19G.','2'),('20356792','Ana González','1234-5679',15,'vendedor20356792@test.com','$2b$10$xvfl.1zsKEnoTI/hiOLNfOIYdicgdRLobT1eHtxBfGyDDof5F19G.','2'),('20356814','Laura Hernández','1234-5687',16,'vendedor20356814@test.com','$2b$10$xvfl.1zsKEnoTI/hiOLNfOIYdicgdRLobT1eHtxBfGyDDof5F19G.','2'),('44231125','Martín Redaelli','3465444204',15,'martin.redaelli@hotmail.com','$2b$10$xvfl.1zsKEnoTI/hiOLNfOIYdicgdRLobT1eHtxBfGyDDof5F19G.','1'),('44810049','Fabricio Riguetto','3456655019',10,'user44810049@test.com','$2b$10$qouruxaOW3WOP/1evm9CVeNTUfpt9H5qB9H66CjE1MHT8a50lBPSG','2');
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-05 16:07:07
