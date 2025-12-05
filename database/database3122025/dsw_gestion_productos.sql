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
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Laptop Lenovo','Laptop Lenovo Ideapad 14\"',50,'No Disponible'),(2,'Mouse Logitech','Mouse inalámbrico Logitech M720',39,'Disponible'),(3,'Monitor Samsung','Monitor Samsung 24\" Full HD',80,'Disponible'),(51,'Teclado Gamer','Razer Inalámbrico ',25,'Disponible'),(52,'MacBook Air','M4 256gb',26,'Disponible'),(53,'MacBook Air','M4 256gb',37,'Disponible'),(54,'Laptop Lenovo','Laptop Lenovo Ideapad 14\"',86,'Disponible'),(55,'Mouse Logitech','Mouse inalámbrico Logitech M720',60,'Disponible'),(56,'Monitor Samsung','Monitor Samsung 24\" Full HD',24,'Disponible'),(57,'Teclado Mecánico','Teclado mecánico Redragon K552',79,'Disponible'),(58,'Cargador Apple','Cargador Apple MagSafe para iPhone',64,'Disponible'),(59,'Smartphone Samsung','Samsung Galaxy S21',61,'Disponible'),(60,'Auriculares Sony','Auriculares Sony WH-1000XM4',96,'Disponible'),(61,'Impresora HP','Impresora HP LaserJet Pro',35,'Disponible'),(62,'Cámara Nikon','Cámara Nikon D3500',44,'Disponible'),(63,'Tablet Huawei','Huawei MediaPad T5',86,'Disponible'),(64,'Disco Duro Seagate','Disco duro externo Seagate 1TB',38,'Disponible'),(65,'SSD Kingston','SSD Kingston 480GB',74,'Disponible'),(66,'Laptop Dell','Laptop Dell Inspiron 15\"',75,'Disponible'),(67,'Mouse Gamer Razer','Mouse Gamer Razer DeathAdder',55,'Disponible'),(68,'Monitor LG','Monitor LG 27\" 4K UHD',30,'Disponible'),(69,'Teclado Microsoft','Teclado Microsoft Ergonomic',46,'Disponible'),(70,'Cargador Samsung','Cargador rápido Samsung 25W',39,'Disponible'),(71,'Smartwatch Apple','Apple Watch Series 6',39,'Disponible'),(72,'Auriculares Bose','Auriculares Bose QuietComfort 35',58,'Disponible'),(73,'Impresora Canon','Impresora Canon PIXMA G3110',72,'Disponible'),(74,'Tablet Samsung','Samsung Galaxy Tab S9 128GB',86,'Disponible'),(75,'Disco SSD M.2','WD Black SN770 1TB NVMe',35,'Disponible'),(76,'Memoria RAM','Corsair Vengeance 16GB DDR4 3200MHz',58,'Disponible'),(77,'Placa de Video','NVIDIA GeForce RTX 4060 8GB',86,'Disponible'),(78,'Fuente PC','Corsair RM750e 750W 80 Plus Gold',75,'Disponible'),(79,'Gabinete Gamer','NZXT H5 Flow RGB Black',97,'Disponible'),(80,'Cooler CPU','Noctua NH-D15 Chromax Black',83,'Disponible'),(81,'Webcam Logitech','Logitech C920 HD Pro',25,'Disponible'),(82,'Micrófono USB','HyperX QuadCast S RGB',97,'Disponible'),(83,'Silla Gamer','Silla Ergonómica Corsair T3 Rush',69,'Disponible'),(84,'Router WiFi','TP-Link Archer AX53 WiFi 6',34,'Disponible'),(85,'Switch Ethernet','TP-Link 8 Puertos Gigabit',24,'Disponible'),(86,'Cable HDMI','Cable HDMI 2.1 8K 2 Metros',80,'Disponible'),(87,'Soporte Monitor','Brazo Hidráulico Doble Monitor',68,'Disponible'),(88,'Teclado Wireless','Logitech K380 Multi-Device',78,'Disponible'),(89,'Mouse Vertical','Logitech Lift Ergonómico',89,'Disponible'),(90,'Parlante Portátil','JBL Flip 6 Waterproof',32,'Disponible'),(91,'Smart TV 50\"','Samsung 50\" UHD 4K Crystal',34,'Disponible'),(92,'PlayStation 5','Sony PlayStation 5 Slim Digital',52,'Disponible'),(93,'Joystick Xbox','Microsoft Xbox Wireless Controller Carbon Black',61,'Disponible'),(94,'Disco Externo 2TB','Toshiba Canvio Basics 2TB USB 3.2',49,'Disponible'),(95,'Pendrive 128GB','SanDisk Ultra USB 3.0 128GB',42,'Disponible'),(96,'Monitor Curvo 27\"','Samsung Odyssey G5 27\" 144Hz 1ms',43,'Disponible'),(97,'Impresora WiFi','Epson EcoTank L3250 Multifunción',72,'Disponible'),(98,'Motherboard AM4','ASUS Prime B550M-A WiFi',49,'Disponible'),(99,'Procesador AMD','AMD Ryzen 5 5600X 6 Núcleos',91,'Disponible'),(100,'Procesador Intel','Intel Core i5-12400F 12va Gen',48,'Disponible'),(101,'Teclado TKL','HyperX Alloy Origins Core Red Switch',28,'Disponible'),(102,'Mouse Pad XXL','Redragon P003 Suzuki 80x30cm',56,'Disponible'),(103,'Auriculares In-Ear','JBL Tune 110 con Micrófono',96,'Disponible'),(104,'Proyector LED','Gadnic Proyector WiFi 4500 Lúmenes',53,'Disponible'),(105,'Estabilizador','TRV Concept 1000VA 6 Tomas',36,'Disponible'),(106,'UPS 800VA','Lyonn CTB-800 Estabilizador + UPS',84,'Disponible'),(107,'Cable UTP Cat6','Bobina Cable UTP Cat6 Interior x 10m',50,'Disponible'),(108,'Adaptador WiFi','TP-Link Archer T2U Nano Dual Band',59,'Disponible'),(109,'Repetidor WiFi','Xiaomi Mi WiFi Range Extender Pro',48,'Disponible'),(110,'Chromecast','Google Chromecast 4 con Google TV HD',41,'Disponible'),(111,'Fire TV Stick','Amazon Fire TV Stick Lite con Alexa',44,'Disponible'),(112,'Soporte Laptop','Soporte Aluminio Plegable Regulable',74,'Disponible'),(113,'Aire Comprimido','Aerosol Aire Comprimido Delta 440cc',62,'Disponible'),(114,'Iphone 17 Pro Max','256gb Silver',10,'Disponible'),(115,'Laptop Lenovo','Laptop Lenovo Ideapad 14\"',50,'No Disponible');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
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
