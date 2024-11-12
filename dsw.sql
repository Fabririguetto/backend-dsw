-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: dsw_gestion
-- ------------------------------------------------------
-- Server version	8.0.37
CREATE DATABASE dsw_gestion;

USE dsw_gestion;
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
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `dni` varchar(10) DEFAULT NULL,
  `nombre_apellidoCli` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `contacto` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (72,'1034567890','Juan Pérez','Av. Siempre Viva 123','juan.perez@example.com'),(73,'1176548390','Ana Gómez','Calle Ficticia 456','ana.gomez@example.com'),(74,'1209876543','Carlos López','Calle Real 789','carlos.lopez@example.com'),(75,'1325789102','María Martínez','Plaza Central 101','maria.martinez@example.com'),(76,'1412348765','Pedro García','Calle Sol 202','pedro.garcia@example.com'),(77,'1549876310','Lucía Rodríguez','Calle Luna 303','lucia.rodriguez@example.com'),(78,'1623487564','José Fernández','Av. Libertador 404','jose.fernandez@example.com'),(79,'1736578942','Carla Díaz','Bulevar Norte 505','carla.diaz@example.com'),(80,'1892346751','Martín Pérez','Callejón del Sol 606','martin.perez@example.com'),(81,'1938764512','Sara López','Calle Río 707','sara.lopez@example.com'),(82,'1045689743','Francisco García','Av. Del Libertador 808','francisco.garcia@example.com'),(83,'1123456789','Laura Sánchez','Calle Pinar 909','laura.sanchez@example.com'),(84,'1264895730','Ricardo Rodríguez','Calle Mayor 1010','ricardo.rodriguez@example.com'),(85,'1334578911','Patricia Martínez','Av. 9 de Julio 1111','patricia.martinez@example.com'),(86,'1419328753','Luis Díaz','Av. del Sur 1212','luis.diaz@example.com'),(87,'1536872319','Raúl Pérez','Plaza de la Paz 1313','raul.perez@example.com'),(88,'1627384920','Sofía García','Calle Valle 1414','sofia.garcia@example.com'),(89,'1736548921','Esteban Fernández','Bulevar Sur 1515','esteban.fernandez@example.com'),(90,'1823654872','Beatriz López','Calle Real 1616','beatriz.lopez@example.com'),(91,'1948765132','Eduardo Sánchez','Calle Verde 1717','eduardo.sanchez@example.com'),(92,'1054328796','Fernando Rodríguez','Calle del Sol 1818','fernando.rodriguez@example.com'),(93,'1136759837','Mónica Pérez','Av. del Sol 1919','monica.perez@example.com'),(94,'1219876345','Javier García','Plaza de la Luna 2020','javier.garcia@example.com'),(95,'1357624938','Elena Díaz','Calle Ancha 2121','elena.diaz@example.com'),(96,'1425678319','Raúl Sánchez','Calle Seco 2222','raul.sanchez@example.com'),(97,'1563924781','Simona López','Calle Purísima 2323','simona.lopez@example.com'),(98,'1638752490','Valeria Fernández','Bulevar Este 2424','valeria.fernandez@example.com'),(99,'1745673920','Manuel Martínez','Callejón del Mar 2525','manuel.martinez@example.com'),(100,'1826342950','Margarita Rodríguez','Av. Norte 2626','margarita.rodriguez@example.com'),(101,'1937458612','Victor García','Calle Sol 2727','victor.garcia@example.com'),(102,'1063257843','Santiago Pérez','Calle de la Paz 2828','santiago.perez@example.com'),(103,'1132756830','Joaquín Díaz','Av. San Martín 2929','joaquin.diaz@example.com'),(104,'1245783690','Gabriela Rodríguez','Calle Mayor 3030','gabriela.rodriguez@example.com'),(105,'1349758624','Paula López','Plaza del Sol 3131','paula.lopez@example.com'),(106,'1425897630','Marcos Fernández','Calle Real 3232','marcos.fernandez@example.com'),(107,'1534869201','Angela Sánchez','Calle Sur 3333','angela.sanchez@example.com'),(108,'1657394820','Luis Pérez','Calle de la Luna 3434','luis.perez@example.com'),(109,'1736291485','Julieta García','Callejón de la Paz 3535','julieta.garcia@example.com'),(110,'1812956734','Carlos Rodríguez','Calle Mayor 3636','carlos.rodriguez@example.com'),(111,'1925638271','Iván Martínez','Av. del Sol 3737','ivan.martinez@example.com'),(112,'1035478920','Marta Pérez','Calle Pinar 3838','marta.perez@example.com'),(113,'1148936572','Bárbara García','Calle Real 3939','barbara.garcia@example.com'),(114,'1264398753','Guillermo Rodríguez','Av. del Norte 4040','guillermo.rodriguez@example.com'),(115,'1382756493','Vanessa López','Calle del Sol 4141','vanessa.lopez@example.com'),(116,'1463948576','Juan Carlos Díaz','Calle Real 4242','juancarlos.diaz@example.com'),(117,'1578736245','Raquel Fernández','Calle Central 4343','raquel.fernandez@example.com'),(118,'1685437290','Mario Pérez','Plaza del Norte 4444','mario.perez@example.com'),(119,'1786524901','José Sánchez','Calle Ancha 4545','jose.sanchez@example.com'),(120,'1839752641','Renata García','Calle Seco 4646','renata.garcia@example.com'),(121,'1932647589','Daniel Rodríguez','Calle Mayor 4747','daniel.rodriguez@example.com'),(122,'1073895210','Silvia López','Callejón del Sol 4848','silvia.lopez@example.com'),(123,'1164728389','Raúl Fernández','Calle Río 4949','raul.fernandez@example.com'),(124,'1283957621','Nora Martínez','Calle de la Luna 5050','nora.martinez@example.com'),(125,'1372569845','Simón Pérez','Calle Estrella 5151','simon.perez@example.com'),(126,'1487326591','Teresa Rodríguez','Calle Sol 5252','teresa.rodriguez@example.com'),(127,'1592478360','Eduardo García','Av. del Sur 5353','eduardo.garcia@example.com'),(128,'1634972180','Alicia López','Plaza Mayor 5454','alicia.lopez@example.com'),(129,'1739654380','Julio Sánchez','Callejón del Norte 5555','julio.sanchez@example.com'),(130,'1813246897','Oscar Pérez','Av. del Sol 5656','oscar.perez@example.com'),(131,'1928357410','Viviana García','Bulevar Real 5757','viviana.garcia@example.com'),(132,'1045638970','Felipe Martínez','Calle Pinar 5858','felipe.martinez@example.com'),(133,'1156824391','Sonia Rodríguez','Callejón de la Paz 5959','sonia.rodriguez@example.com'),(134,'1264958370','Alejandro López','Calle Real 6060','alejandro.lopez@example.com'),(135,'1382746952','Patricia Pérez','Calle del Sol 6161','patricia.perez@example.com'),(136,'1478392150','Rodolfo García','Calle Norte 6262','rodolfo.garcia@example.com'),(137,'1583926751','Elena Fernández','Av. del Sol 6363','elena.fernandez@example.com'),(138,'1695023684','Sergio Sánchez','Calle Estrella 6464','sergio.sanchez@example.com'),(139,'1796385079','Cristina Pérez','Calle Central 6565','cristina.perez@example.com'),(140,'1887362841','Javier Rodríguez','Calle Real 6666','javier.rodriguez@example.com');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`DNI_CUIL`),
  KEY `idSucursal` (`idSucursal`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES ('20323475','Carlos López','1234-5680',10),('20347385','Santiago Romero','1234-5705',11),('20348956','Juan Pérez','1234-5678',12),('20349285','David Ramírez','1234-5686',13),('20352836','Luis Pérez','1234-5713',14),('20356792','Ana González','1234-5679',15),('20356814','Laura Hernández','1234-5687',16),('20357921','Martín Díaz','1234-5710',10),('20358742','Marta Díaz','1234-5685',11),('20358940','Antonio Vázquez','1234-5693',12),('20359247','Gonzalo Vega','1234-5703',13),('20359620','Paula Fernández','1234-5719',14),('20362791','Ramón Cruz','1234-5699',15),('20374519','Elena Martín','1234-5689',16),('20374601','Lucía Fernández','1234-5683',10),('20374812','Silvia Mendoza','1234-5694',11),('20376239','Ricardo Torres','1234-5727',12),('20376538','Raúl Gómez','1234-5724',13),('20376829','Antonio García','1234-5717',14),('20378342','Martín Álvarez','1234-5726',15),('20378542','Juan Castro','1234-5720',16),('20382345','Verónica Díaz','1234-5711',10),('20384702','Mariana Gutiérrez','1234-5696',11),('20384791','Carlos Ruiz','1234-5715',12),('20387362','Ricardo Ramos','1234-5721',13),('20387415','Fernando Alonso','1234-5701',14),('20392083','Ricardo García','1234-5688',15),('20392854','María Pérez','1234-5722',16),('20393574','Raquel Pérez','1234-5698',10),('20394683','Federico Morales','1234-5709',11),('20395716','Julia Sánchez','1234-5716',12),('20395874','Andrea Rivera','1234-5707',13),('20398045','Pedro Gómez','1234-5682',14),('20398372','Juan Lozano','1234-5690',15),('20419832','Carmen Rodríguez','1234-5692',16),('20423491','Luis Álvarez','1234-5691',10),('20426891','Tomás Silva','1234-5712',11),('20434892','Marcos Torres','1234-5702',12),('20435612','María Martínez','1234-5681',13),('20435620','Rosa Márquez','1234-5700',14),('20436281','Natalia Ruiz','1234-5708',15),('20438492','Laura Ramírez','1234-5723',16),('20439762','Pablo Castro','1234-5706',10),('20463579','José Sánchez','1234-5684',11),('20469173','Mónica Gómez','1234-5714',12),('20473602','Isabel Hernández','1234-5704',13),('20474681','Carlos Jiménez','1234-5697',14),('20487365','Pablo Martín','1234-5718',15),('20489236','Ricardo Suárez','1234-5695',16),('20496857','Sandra López','1234-5725',10);
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `precios`
--

DROP TABLE IF EXISTS `precios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `precios` (
  `idProducto` int NOT NULL,
  `fechaHora` datetime NOT NULL,
  `monto` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`idProducto`,`fechaHora`),
  CONSTRAINT `precios_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `precios`
--

LOCK TABLES `precios` WRITE;
/*!40000 ALTER TABLE `precios` DISABLE KEYS */;
INSERT INTO `precios` VALUES (1,'2024-11-12 08:00:00',842250.00),(2,'2024-11-12 08:30:00',50535.00),(3,'2024-11-12 09:00:00',202140.00),(4,'2024-11-12 09:30:00',67380.00),(5,'2024-11-12 10:00:00',44920.00),(6,'2024-11-12 10:30:00',1010700.00),(7,'2024-11-12 11:00:00',314440.00),(8,'2024-11-12 11:30:00',168450.00),(9,'2024-11-12 12:00:00',449200.00),(10,'2024-11-12 12:30:00',258290.00),(11,'2024-11-12 13:00:00',56150.00),(12,'2024-11-12 13:30:00',84225.00),(13,'2024-11-12 14:00:00',898400.00),(14,'2024-11-12 14:30:00',78610.00),(15,'2024-11-12 15:00:00',393050.00),(16,'2024-11-12 15:30:00',61765.00),(17,'2024-11-12 16:00:00',28075.00),(18,'2024-11-12 16:30:00',449200.00),(19,'2024-11-12 17:00:00',336900.00),(20,'2024-11-12 17:30:00',157220.00),(21,'2024-11-12 18:00:00',393050.00),(22,'2024-11-12 18:30:00',954550.00),(23,'2024-11-12 19:00:00',67380.00),(24,'2024-11-12 19:30:00',123530.00),(25,'2024-11-12 20:00:00',280750.00),(26,'2024-11-12 20:30:00',89840.00),(27,'2024-11-12 21:00:00',202140.00),(28,'2024-11-12 21:30:00',112300.00),(29,'2024-11-12 22:00:00',44920.00),(30,'2024-11-12 22:30:00',303210.00),(31,'2024-11-12 23:00:00',786100.00),(32,'2024-11-13 00:00:00',505350.00),(33,'2024-11-13 00:30:00',202140.00),(34,'2024-11-13 01:00:00',61765.00),(35,'2024-11-13 01:30:00',106685.00),(36,'2024-11-13 02:00:00',336900.00),(37,'2024-11-13 02:30:00',39305.00),(38,'2024-11-13 03:00:00',50535.00),(39,'2024-11-13 03:30:00',213370.00),(40,'2024-11-13 04:00:00',123530.00),(41,'2024-11-13 04:30:00',168450.00),(42,'2024-11-13 05:00:00',1347600.00),(43,'2024-11-13 05:30:00',1010700.00),(44,'2024-11-13 06:00:00',898400.00),(45,'2024-11-13 06:30:00',190910.00),(46,'2024-11-13 07:00:00',224600.00),(47,'2024-11-13 07:30:00',247060.00),(48,'2024-11-13 08:00:00',95455.00),(49,'2024-11-13 08:30:00',786100.00),(50,'2024-11-13 09:00:00',33690.00);
/*!40000 ALTER TABLE `precios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `articulo` varchar(50) DEFAULT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Laptop Lenovo','Laptop Lenovo Ideapad 14\"',5,'Disponible'),(2,'Mouse Logitech','Mouse inalámbrico Logitech M720',15,'Disponible'),(3,'Monitor Samsung','Monitor Samsung 24\" Full HD',10,'Disponible'),(4,'Teclado Mecánico','Teclado mecánico Redragon K552',8,'Disponible'),(5,'Cargador Apple','Cargador Apple MagSafe para iPhone',12,'Disponible'),(6,'Smartphone Samsung','Samsung Galaxy S21',7,'Disponible'),(7,'Auriculares Sony','Auriculares Sony WH-1000XM4',6,'Disponible'),(8,'Impresora HP','Impresora HP LaserJet Pro',4,'Disponible'),(9,'Cámara Nikon','Cámara Nikon D3500',3,'Disponible'),(10,'Tablet Huawei','Huawei MediaPad T5',11,'Disponible'),(11,'Disco Duro Seagate','Disco duro externo Seagate 1TB',20,'Disponible'),(12,'SSD Kingston','SSD Kingston 480GB',14,'Disponible'),(13,'Laptop Dell','Laptop Dell Inspiron 15\"',9,'Disponible'),(14,'Mouse Gamer Razer','Mouse Gamer Razer DeathAdder',13,'Disponible'),(15,'Monitor LG','Monitor LG 27\" 4K UHD',6,'Disponible'),(16,'Teclado Microsoft','Teclado Microsoft Ergonomic',10,'Disponible'),(17,'Cargador Samsung','Cargador rápido Samsung 25W',18,'Disponible'),(18,'Smartwatch Apple','Apple Watch Series 6',4,'Disponible'),(19,'Auriculares Bose','Auriculares Bose QuietComfort 35',7,'Disponible'),(20,'Impresora Canon','Impresora Canon PIXMA G3110',5,'Disponible'),(21,'Cámara GoPro','GoPro Hero 9',6,'Disponible'),(22,'Laptop HP','Laptop HP Pavilion 14\"',8,'Disponible'),(23,'Disco Duro WD','Disco duro Western Digital 2TB',12,'Disponible'),(24,'SSD Samsung','SSD Samsung 1TB',9,'Disponible'),(25,'Smartphone Xiaomi','Xiaomi Redmi Note 10',13,'Disponible'),(26,'Teclado Gamer Corsair','Teclado mecánico Corsair K70',6,'Disponible'),(27,'Monitor Acer','Monitor Acer 27\" Full HD',5,'Disponible'),(28,'Router TP-Link','Router TP-Link Archer AX50',11,'Disponible'),(29,'Auriculares JBL','Auriculares JBL Tune 500BT',15,'Disponible'),(30,'Tablet Samsung','Samsung Galaxy Tab A7',7,'Disponible'),(31,'Laptop Asus','Laptop Asus VivoBook 15\"',4,'Disponible'),(32,'Cámara Canon','Cámara Canon EOS Rebel T7',3,'Disponible'),(33,'Impresora Epson','Impresora Epson EcoTank L3150',8,'Disponible'),(34,'Disco Duro Toshiba','Disco duro Toshiba 1TB',9,'Disponible'),(35,'SSD Crucial','SSD Crucial MX500 500GB',10,'Disponible'),(36,'Smartphone Motorola','Motorola Moto G9',14,'Disponible'),(37,'Mouse Inalámbrico Microsoft','Mouse inalámbrico Microsoft Sculpt',16,'Disponible'),(38,'Teclado Logitech','Teclado inalámbrico Logitech K780',12,'Disponible'),(39,'Monitor Dell','Monitor Dell 24\" Full HD',7,'Disponible'),(40,'Router Asus','Router Asus RT-AC66U',10,'Disponible'),(41,'Auriculares Sony','Auriculares Sony WF-1000XM3',9,'Disponible'),(42,'Laptop Apple','MacBook Pro 13\"',3,'Disponible'),(43,'Smartphone OnePlus','OnePlus 9 Pro',5,'Disponible'),(44,'Cámara Sony','Cámara Sony Alpha a6000',4,'Disponible'),(45,'Tablet Lenovo','Lenovo Tab M10',7,'Disponible'),(46,'Impresora Brother','Impresora Brother HL-L2370DW',6,'Disponible'),(47,'Monitor BenQ','Monitor BenQ 27\" QHD',5,'Disponible'),(48,'SSD WD','SSD Western Digital Blue 500GB',8,'Disponible'),(49,'Smartphone Google','Google Pixel 5',4,'Disponible'),(50,'Cargador Inalámbrico Belkin','Cargador inalámbrico Belkin Boost Up',12,'Disponible');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productoventa`
--

DROP TABLE IF EXISTS `productoventa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productoventa` (
  `idProducto` int NOT NULL,
  `idVenta` int NOT NULL,
  `cantidadVendida` int NOT NULL,
  `subtotal` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`idProducto`,`idVenta`),
  KEY `idVenta` (`idVenta`),
  CONSTRAINT `productoventa_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`),
  CONSTRAINT `productoventa_ibfk_2` FOREIGN KEY (`idVenta`) REFERENCES `ventas` (`idVenta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productoventa`
--

LOCK TABLES `productoventa` WRITE;
/*!40000 ALTER TABLE `productoventa` DISABLE KEYS */;
INSERT INTO `productoventa` VALUES (3,13,1,202140.00),(3,14,1,202140.00),(4,13,1,67380.00),(13,14,1,898400.00),(17,15,1,28075.00);
/*!40000 ALTER TABLE `productoventa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursales`
--

DROP TABLE IF EXISTS `sucursales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sucursales` (
  `idSucursal` int NOT NULL AUTO_INCREMENT,
  `nombreSucursal` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idSucursal`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursales`
--

LOCK TABLES `sucursales` WRITE;
/*!40000 ALTER TABLE `sucursales` DISABLE KEYS */;
INSERT INTO `sucursales` VALUES (10,'Sucursal Centro','Av. 9 de Julio 1000, CABA'),(11,'Sucursal Norte','Av. Libertador 2200, Buenos Aires'),(12,'Sucursal Sur','Calle Figueroa Alcorta 1800, Buenos Aires'),(13,'Sucursal Oeste','Ruta 5, Km 25, Merlo'),(14,'Sucursal Este','Calle San Martín 500, La Plata'),(15,'Sucursal CABA','Av. Corrientes 2300, CABA'),(16,'Sucursal Zona Norte','Calle Paraná 1450, Tigre');
/*!40000 ALTER TABLE `sucursales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `idVenta` int NOT NULL AUTO_INCREMENT,
  `montoTotal` decimal(18,2) DEFAULT NULL,
  `DNIEmpleado` varchar(15) DEFAULT NULL,
  `idCliente` int DEFAULT NULL,
  `fechaHoraVenta` datetime NOT NULL,
  PRIMARY KEY (`idVenta`),
  KEY `idCliente` (`idCliente`),
  KEY `ventas_ibfk_1_idx` (`DNIEmpleado`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`DNIEmpleado`) REFERENCES `empleados` (`DNI_CUIL`),
  CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (13,269520.00,'20323475',72,'2024-11-12 13:37:39'),(14,1100540.00,'20356792',77,'2024-11-12 14:09:18'),(15,28075.00,'20384791',99,'2024-11-12 14:11:24');
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-12 11:15:07
