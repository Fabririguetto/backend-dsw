-- MySQL dump 10.13  Distrib 8.0.41, for macos15 (arm64)
--
-- Host: 127.0.0.1    Database: dsw_gestion
-- ------------------------------------------------------
-- Server version	9.1.0

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
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (72,'1034567890','Juan Pérez','Av. Siempre Viva 123','juan.perez@example.com'),(73,'1176548390','Ana Gómez','Calle Ficticia 456','ana.gomez@example.com'),(74,'1209876543','Carlos López','Calle Real 789','carlos.lopez@example.com'),(75,'1325789102','María Martínez','Plaza Central 101','maria.martinez@example.com'),(76,'1412348765','Pedro García','Calle Sol 202','pedro.garcia@example.com'),(142,'28451234','Gómez, Alejandro','Av. San Martín 1240','ale.gomez@gmail.com'),(143,'31564892','Fernández, Laura','Córdoba 850','lau.fer@hotmail.com'),(144,'29876543','Rodríguez, Carlos','Mitre 345','carlos.rod@yahoo.com'),(145,'35678901','López, Mariana','San Luis 1234','marian.lopez@gmail.com'),(146,'27456123','Díaz, Roberto','Belgrano 567','robert.d@outlook.com'),(147,'33987123','Pérez, Sofía','Moreno 890','sofi.perez@live.com.ar'),(148,'30123456','García, Miguel','Sarmiento 112','miguel.garcia@gmail.com'),(149,'38456789','Sánchez, Valentina','Urquiza 2233','valen.san@gmail.com'),(150,'26789012','Romero, Juan Pablo','Rivadavia 445','jp.romero@hotmail.com'),(151,'32456789','Sosa, Camila','Pellegrini 1500','cami.sosa@gmail.com'),(152,'25678901','Torres, Fernando','Alvear 330','fer.torres@yahoo.com.ar'),(153,'34567890','Ruiz, Lucía','Balcarce 780','lucia.ruiz@gmail.com'),(154,'36789012','Flores, Martín','Dorrego 990','tincho.flores@outlook.com'),(155,'29012345','Benítez, Julieta','Italia 120','juli.benitez@hotmail.com'),(156,'31234567','Acosta, Nicolás','España 1650','nico.acosta@gmail.com'),(157,'37890123','Medina, Agostina','Paraguay 440','agos.medina@live.com'),(158,'24567890','Herrera, Gustavo','Presidente Roca 880','gus.herrera@gmail.com'),(159,'39012345','Suárez, Micaela','Corrientes 2100','mica.suarez@hotmail.com'),(160,'30567890','Aguirre, Facundo','Entre Ríos 550','facu.aguirre@gmail.com'),(161,'33456789','Pereyra, Daniela','Santa Fe 3200','dani.pereyra@yahoo.com'),(162,'28901234','Molina, Esteban','Mendoza 4500','esteban.m@gmail.com'),(163,'35123456','Castro, Florencia','San Juan 1100','flor.castro@hotmail.com'),(164,'27890123','Ortiz, Ricardo','Rioja 760','ricky.ortiz@outlook.com'),(165,'32567890','Silva, Romina','Laprida 980','romi.silva@gmail.com'),(166,'36123456','Núñez, Santiago','Buenos Aires 220','santi.nunez@live.com.ar'),(167,'30890123','Luna, Victoria','Maipú 1340','vicky.luna@gmail.com'),(168,'26567890','Juárez, Pablo','San Lorenzo 890','pablo.juarez@hotmail.com'),(169,'38123456','Cabrera, Antonella','Catamarca 1550','anto.cabrera@gmail.com'),(170,'29456789','Ríos, Matías','Salta 2300','mati.rios@yahoo.com.ar'),(171,'34890123','Morales, Gabriela','Jujuy 1800','gaby.morales@gmail.com'),(172,'31678901','Godoy, Lucas','Tucumán 2900','lucas.godoy@outlook.com'),(173,'37234567','Domínguez, Paula','Urquiza 900','pau.dominguez@hotmail.com'),(174,'25890123','Moreno, Diego','Oroño 450','diego.moreno@gmail.com'),(175,'39567890','Peralta, Rocío','Alvear 120','rochi.peralta@live.com'),(176,'30234567','Vega, Joaquín','Balcarce 1100','joaco.vega@gmail.com'),(177,'33678901','Carrizo, Melina','Dorrego 2200','meli.carrizo@hotmail.com'),(178,'27234567','Quiroga, Sebastián','Italia 330','seba.quiroga@gmail.com'),(179,'35890123','Castillo, Carolina','España 800','caro.castillo@yahoo.com'),(180,'28567890','Ledesma, Ignacio','Paraguay 1600','nacho.ledesma@gmail.com'),(181,'34234567','Ojeda, Belén','Presidente Roca 400','belen.ojeda@outlook.com'),(182,'36567890','Vázquez, Tomás','Corrientes 1200','tomi.vazquez@gmail.com'),(183,'31890123','Ramos, Sabrina','Entre Ríos 2800','sabri.ramos@hotmail.com'),(184,'29234567','Álvarez, Guillermo','Santa Fe 950','guille.alvarez@live.com.ar'),(185,'38567890','Fernández, Natalia','Mendoza 3100','nati.fernandez@gmail.com'),(186,'26890123','Méndez, Adrián','San Juan 500','adrian.mendez@yahoo.com'),(187,'33234567','Chavez, Luciana','Rioja 1400','luli.chavez@gmail.com'),(188,'30678901','Barrios, Mariano','Laprida 200','marian.barrios@hotmail.com'),(189,'37567890','Escobar, Valeria','Buenos Aires 1700','vale.escobar@gmail.com'),(190,'25234567','Villarreal, Jorge','Maipú 600','jorge.villarreal@outlook.com'),(191,'39890123','Bustamante, Clara','San Lorenzo 2500','clara.busta@gmail.com'),(192,'32890123','Salinas, Federico','Catamarca 800','fede.salinas@gmail.com'),(193,'35234567','Arias, Cecilia','Salta 1900','ceci.arias@hotmail.com'),(194,'27678901','Paz, Leonardo','Jujuy 450','leo.paz@live.com'),(195,'34678901','Figueroa, Mariana','Tucumán 1100','marian.figueroa@gmail.com'),(196,'28234567','Correa, Hugo','Urquiza 3200','hugo.correa@yahoo.com.ar'),(197,'36890123','Ibañez, Julián','Oroño 800','juli.ibanez@gmail.com'),(198,'31345678','Roldán, Analía','Alvear 2100','ana.roldan@hotmail.com'),(199,'38901234','Maldonado, Ezequiel','Balcarce 350','eze.maldo@gmail.com'),(200,'29678901','Rey, Silvana','Dorrego 1500','silvana.rey@outlook.com'),(201,'33012345','Cruz, Manuel','Italia 900','manu.cruz@gmail.com');
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
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` varchar(20) DEFAULT 'vendedor',
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
INSERT INTO `empleados` VALUES ('12312312','José Romero','123123123',15,'user12312312@test.com','$2b$10$P6Y/k3yqY9x.gL2.wQ.0.e5.0.0.0.0.0','vendedor'),('20323475','Carlos López','1234-5680',11,'admin@test.com','$2b$10$xvfl.1zsKEnoTI/hiOLNfOIYdicgdRLobT1eHtxBfGyDDof5F19G.','admin'),('20347385','Santiago Romero','1234-5705',11,'vendedor20347385@test.com','$2b$10$xvfl.1zsKEnoTI/hiOLNfOIYdicgdRLobT1eHtxBfGyDDof5F19G.','vendedor'),('20348956','Juan Pérez','1234-5678',12,'vendedor20348956@test.com','$2b$10$xvfl.1zsKEnoTI/hiOLNfOIYdicgdRLobT1eHtxBfGyDDof5F19G.','vendedor'),('20349285','David Ramírez','1234-5686',13,'vendedor20349285@test.com','$2b$10$xvfl.1zsKEnoTI/hiOLNfOIYdicgdRLobT1eHtxBfGyDDof5F19G.','vendedor'),('20352836','Luis Pérez','1234-5713',14,'vendedor20352836@test.com','$2b$10$xvfl.1zsKEnoTI/hiOLNfOIYdicgdRLobT1eHtxBfGyDDof5F19G.','vendedor'),('20356792','Ana González','1234-5679',15,'vendedor20356792@test.com','$2b$10$xvfl.1zsKEnoTI/hiOLNfOIYdicgdRLobT1eHtxBfGyDDof5F19G.','vendedor'),('20356814','Laura Hernández','1234-5687',16,'vendedor20356814@test.com','$2b$10$xvfl.1zsKEnoTI/hiOLNfOIYdicgdRLobT1eHtxBfGyDDof5F19G.','vendedor'),('44231125','Martín Redaelli','3465444204',15,'martin.redaelli@hotmail.com','$2b$10$xvfl.1zsKEnoTI/hiOLNfOIYdicgdRLobT1eHtxBfGyDDof5F19G.','admin');
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
INSERT INTO `precios` VALUES (1,'2024-11-12 08:00:00',842250.00),(1,'2025-11-25 07:43:23',842200.00),(1,'2025-11-25 09:01:55',842200.00),(2,'2024-11-12 08:30:00',50535.00),(51,'2025-11-25 06:55:39',135200.00),(52,'2025-11-25 07:02:03',1120000.00),(53,'2025-11-25 07:02:58',1120000.00),(54,'2025-11-25 08:20:00',842250.00),(55,'2025-11-25 08:20:00',50535.00),(56,'2025-11-25 08:20:00',202140.00),(57,'2025-11-25 08:20:00',67380.00),(58,'2025-11-25 08:20:00',44920.00),(59,'2025-11-25 08:20:00',1010700.00),(60,'2025-11-25 08:20:00',314440.00),(61,'2025-11-25 08:20:00',168450.00),(62,'2025-11-25 08:20:00',449200.00),(63,'2025-11-25 08:20:00',258290.00),(64,'2025-11-25 08:20:00',56150.00),(65,'2025-11-25 08:20:00',84225.00),(66,'2025-11-25 08:20:00',898400.00),(67,'2025-11-25 08:20:00',78610.00),(68,'2025-11-25 08:20:00',393050.00),(69,'2025-11-25 08:20:00',61765.00),(70,'2025-11-25 08:20:00',28075.00),(71,'2025-11-25 08:20:00',449200.00),(72,'2025-11-25 08:20:00',336900.00),(73,'2025-11-25 08:20:00',157220.00),(74,'2025-11-25 08:22:21',950000.00),(75,'2025-11-25 08:22:21',125000.00),(76,'2025-11-25 08:22:21',65000.00),(77,'2025-11-25 08:22:21',480000.00),(78,'2025-11-25 08:22:21',180000.00),(79,'2025-11-25 08:22:21',145000.00),(80,'2025-11-25 08:22:21',130000.00),(81,'2025-11-25 08:22:21',98000.00),(82,'2025-11-25 08:22:21',195000.00),(83,'2025-11-25 08:22:21',450000.00),(84,'2025-11-25 08:22:21',85000.00),(85,'2025-11-25 08:22:21',25000.00),(86,'2025-11-25 08:22:21',15000.00),(87,'2025-11-25 08:22:21',75000.00),(88,'2025-11-25 08:22:21',42000.00),(89,'2025-11-25 08:22:21',88000.00),(90,'2025-11-25 08:22:21',135000.00),(91,'2025-11-25 08:22:21',650000.00),(92,'2025-11-25 08:22:21',980000.00),(93,'2025-11-25 08:22:21',95000.00),(94,'2025-11-25 08:23:31',92000.00),(95,'2025-11-25 08:23:31',18500.00),(96,'2025-11-25 08:23:31',420000.00),(97,'2025-11-25 08:23:31',310000.00),(98,'2025-11-25 08:23:32',155000.00),(99,'2025-11-25 08:23:32',215000.00),(100,'2025-11-25 08:23:32',205000.00),(101,'2025-11-25 08:23:32',95000.00),(102,'2025-11-25 08:23:32',18000.00),(103,'2025-11-25 08:23:32',12500.00),(104,'2025-11-25 08:23:32',240000.00),(105,'2025-11-25 08:23:32',35000.00),(106,'2025-11-25 08:23:32',98000.00),(107,'2025-11-25 08:23:32',8500.00),(108,'2025-11-25 08:23:32',16000.00),(109,'2025-11-25 08:23:32',22000.00),(110,'2025-11-25 08:23:32',68000.00),(111,'2025-11-25 08:23:32',55000.00),(112,'2025-11-25 08:23:32',28000.00),(113,'2025-11-25 08:23:32',9500.00),(114,'2025-12-01 18:22:05',1450000.00),(114,'2025-12-01 19:17:36',1450000.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Laptop Lenovo','Laptop Lenovo Ideapad 14\"',58,'Disponible'),(2,'Mouse Logitech','Mouse inalámbrico Logitech M720',39,'Disponible'),(3,'Monitor Samsung','Monitor Samsung 24\" Full HD',80,'Disponible'),(51,'Teclado Gamer','Razer Inalámbrico ',25,'Disponible'),(52,'MacBook Air','M4 256gb',26,'Disponible'),(53,'MacBook Air','M4 256gb',37,'Disponible'),(54,'Laptop Lenovo','Laptop Lenovo Ideapad 14\"',86,'Disponible'),(55,'Mouse Logitech','Mouse inalámbrico Logitech M720',60,'Disponible'),(56,'Monitor Samsung','Monitor Samsung 24\" Full HD',24,'Disponible'),(57,'Teclado Mecánico','Teclado mecánico Redragon K552',79,'Disponible'),(58,'Cargador Apple','Cargador Apple MagSafe para iPhone',64,'Disponible'),(59,'Smartphone Samsung','Samsung Galaxy S21',61,'Disponible'),(60,'Auriculares Sony','Auriculares Sony WH-1000XM4',96,'Disponible'),(61,'Impresora HP','Impresora HP LaserJet Pro',35,'Disponible'),(62,'Cámara Nikon','Cámara Nikon D3500',44,'Disponible'),(63,'Tablet Huawei','Huawei MediaPad T5',86,'Disponible'),(64,'Disco Duro Seagate','Disco duro externo Seagate 1TB',38,'Disponible'),(65,'SSD Kingston','SSD Kingston 480GB',74,'Disponible'),(66,'Laptop Dell','Laptop Dell Inspiron 15\"',75,'Disponible'),(67,'Mouse Gamer Razer','Mouse Gamer Razer DeathAdder',55,'Disponible'),(68,'Monitor LG','Monitor LG 27\" 4K UHD',30,'Disponible'),(69,'Teclado Microsoft','Teclado Microsoft Ergonomic',46,'Disponible'),(70,'Cargador Samsung','Cargador rápido Samsung 25W',39,'Disponible'),(71,'Smartwatch Apple','Apple Watch Series 6',39,'Disponible'),(72,'Auriculares Bose','Auriculares Bose QuietComfort 35',58,'Disponible'),(73,'Impresora Canon','Impresora Canon PIXMA G3110',72,'Disponible'),(74,'Tablet Samsung','Samsung Galaxy Tab S9 128GB',86,'Disponible'),(75,'Disco SSD M.2','WD Black SN770 1TB NVMe',35,'Disponible'),(76,'Memoria RAM','Corsair Vengeance 16GB DDR4 3200MHz',58,'Disponible'),(77,'Placa de Video','NVIDIA GeForce RTX 4060 8GB',86,'Disponible'),(78,'Fuente PC','Corsair RM750e 750W 80 Plus Gold',75,'Disponible'),(79,'Gabinete Gamer','NZXT H5 Flow RGB Black',97,'Disponible'),(80,'Cooler CPU','Noctua NH-D15 Chromax Black',83,'Disponible'),(81,'Webcam Logitech','Logitech C920 HD Pro',25,'Disponible'),(82,'Micrófono USB','HyperX QuadCast S RGB',97,'Disponible'),(83,'Silla Gamer','Silla Ergonómica Corsair T3 Rush',69,'Disponible'),(84,'Router WiFi','TP-Link Archer AX53 WiFi 6',34,'Disponible'),(85,'Switch Ethernet','TP-Link 8 Puertos Gigabit',24,'Disponible'),(86,'Cable HDMI','Cable HDMI 2.1 8K 2 Metros',80,'Disponible'),(87,'Soporte Monitor','Brazo Hidráulico Doble Monitor',68,'Disponible'),(88,'Teclado Wireless','Logitech K380 Multi-Device',78,'Disponible'),(89,'Mouse Vertical','Logitech Lift Ergonómico',89,'Disponible'),(90,'Parlante Portátil','JBL Flip 6 Waterproof',32,'Disponible'),(91,'Smart TV 50\"','Samsung 50\" UHD 4K Crystal',34,'Disponible'),(92,'PlayStation 5','Sony PlayStation 5 Slim Digital',52,'Disponible'),(93,'Joystick Xbox','Microsoft Xbox Wireless Controller Carbon Black',61,'Disponible'),(94,'Disco Externo 2TB','Toshiba Canvio Basics 2TB USB 3.2',49,'Disponible'),(95,'Pendrive 128GB','SanDisk Ultra USB 3.0 128GB',42,'Disponible'),(96,'Monitor Curvo 27\"','Samsung Odyssey G5 27\" 144Hz 1ms',43,'Disponible'),(97,'Impresora WiFi','Epson EcoTank L3250 Multifunción',72,'Disponible'),(98,'Motherboard AM4','ASUS Prime B550M-A WiFi',49,'Disponible'),(99,'Procesador AMD','AMD Ryzen 5 5600X 6 Núcleos',91,'Disponible'),(100,'Procesador Intel','Intel Core i5-12400F 12va Gen',48,'Disponible'),(101,'Teclado TKL','HyperX Alloy Origins Core Red Switch',28,'Disponible'),(102,'Mouse Pad XXL','Redragon P003 Suzuki 80x30cm',56,'Disponible'),(103,'Auriculares In-Ear','JBL Tune 110 con Micrófono',96,'Disponible'),(104,'Proyector LED','Gadnic Proyector WiFi 4500 Lúmenes',53,'Disponible'),(105,'Estabilizador','TRV Concept 1000VA 6 Tomas',36,'Disponible'),(106,'UPS 800VA','Lyonn CTB-800 Estabilizador + UPS',84,'Disponible'),(107,'Cable UTP Cat6','Bobina Cable UTP Cat6 Interior x 10m',50,'Disponible'),(108,'Adaptador WiFi','TP-Link Archer T2U Nano Dual Band',59,'Disponible'),(109,'Repetidor WiFi','Xiaomi Mi WiFi Range Extender Pro',48,'Disponible'),(110,'Chromecast','Google Chromecast 4 con Google TV HD',41,'Disponible'),(111,'Fire TV Stick','Amazon Fire TV Stick Lite con Alexa',44,'Disponible'),(112,'Soporte Laptop','Soporte Aluminio Plegable Regulable',74,'Disponible'),(113,'Aire Comprimido','Aerosol Aire Comprimido Delta 440cc',62,'Disponible'),(114,'Iphone 17 Pro Max','256gb Silver',10,'Disponible');
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
INSERT INTO `productoventa` VALUES (1,17,1,842200.00),(1,20,3,2526600.00),(1,27,1,842200.00),(1,133,1,842200.00),(1,135,1,842200.00),(2,32,3,151605.00),(2,39,2,101070.00),(2,74,3,151605.00),(2,95,3,151605.00),(2,104,3,151605.00),(2,109,1,50535.00),(3,13,1,202140.00),(3,19,2,170000.00),(3,47,2,110000.00),(3,57,3,264000.00),(3,95,1,28075.00),(3,97,2,430000.00),(51,48,1,135200.00),(51,54,3,405600.00),(51,66,1,135200.00),(51,77,2,270400.00),(51,87,1,135200.00),(51,98,1,135200.00),(51,116,2,270400.00),(51,123,1,135200.00),(52,34,1,1120000.00),(52,40,3,3360000.00),(52,47,1,1120000.00),(52,61,1,1120000.00),(52,81,3,3360000.00),(52,93,3,3360000.00),(52,98,3,3360000.00),(52,104,1,1120000.00),(52,105,2,2240000.00),(52,114,1,1120000.00),(52,119,1,1120000.00),(53,18,2,2240000.00),(54,40,1,842250.00),(54,41,3,2526750.00),(54,85,1,842250.00),(55,16,2,101070.00),(55,68,1,50535.00),(55,72,1,50535.00),(55,77,1,50535.00),(55,93,1,50535.00),(55,117,2,101070.00),(55,122,1,50535.00),(55,127,2,101070.00),(56,57,1,202140.00),(56,69,1,202140.00),(56,83,1,202140.00),(56,85,1,202140.00),(56,90,1,202140.00),(56,92,2,404280.00),(56,117,1,202140.00),(57,42,2,134760.00),(57,58,2,134760.00),(57,85,3,202140.00),(57,90,1,67380.00),(58,67,1,44920.00),(58,73,1,44920.00),(58,74,3,134760.00),(58,100,2,89840.00),(58,109,2,89840.00),(58,111,2,89840.00),(58,117,1,44920.00),(59,41,2,2021400.00),(59,77,1,1010700.00),(59,99,3,3032100.00),(59,124,1,1010700.00),(60,54,3,943320.00),(60,75,2,628880.00),(60,103,1,314440.00),(61,23,3,505350.00),(61,25,1,168450.00),(61,133,4,673800.00),(62,42,1,449200.00),(62,80,2,898400.00),(63,23,2,516580.00),(63,25,3,774870.00),(63,47,3,774870.00),(63,55,2,516580.00),(63,111,1,258290.00),(64,28,1,56150.00),(64,60,1,56150.00),(64,67,2,112300.00),(64,73,2,112300.00),(64,81,2,112300.00),(64,82,1,56150.00),(64,99,2,112300.00),(65,31,1,84225.00),(65,68,3,252675.00),(65,75,2,168450.00),(65,97,3,252675.00),(65,107,2,168450.00),(66,16,2,1796800.00),(66,74,1,898400.00),(66,89,3,2695200.00),(66,96,2,1796800.00),(66,105,1,898400.00),(67,33,1,78610.00),(67,38,1,78610.00),(67,51,1,78610.00),(67,66,3,235830.00),(67,73,1,78610.00),(67,88,1,78610.00),(67,98,3,235830.00),(67,113,1,78610.00),(67,130,1,78610.00),(68,45,3,1179150.00),(68,78,3,1179150.00),(69,27,1,61765.00),(69,45,2,123530.00),(69,51,1,61765.00),(69,53,2,123530.00),(69,58,3,185295.00),(69,68,1,61765.00),(70,53,2,56150.00),(70,92,3,84225.00),(70,93,1,28075.00),(70,94,2,56150.00),(70,99,2,56150.00),(70,100,2,56150.00),(70,111,1,28075.00),(70,113,2,56150.00),(70,120,3,84225.00),(71,31,3,1347600.00),(71,55,1,449200.00),(72,34,1,336900.00),(72,35,2,673800.00),(72,43,1,336900.00),(72,62,2,673800.00),(72,70,1,336900.00),(73,18,2,314440.00),(73,37,3,471660.00),(74,16,3,2850000.00),(74,54,1,950000.00),(74,63,1,950000.00),(74,85,1,950000.00),(74,93,2,1900000.00),(75,44,1,125000.00),(75,49,1,125000.00),(75,83,1,125000.00),(75,91,2,250000.00),(75,93,3,375000.00),(75,101,2,250000.00),(76,60,1,65000.00),(76,70,2,130000.00),(76,84,3,195000.00),(76,90,1,65000.00),(76,107,2,130000.00),(76,109,1,65000.00),(76,115,1,65000.00),(76,118,2,130000.00),(76,122,1,65000.00),(76,128,1,65000.00),(77,28,1,480000.00),(77,47,2,960000.00),(78,17,2,360000.00),(78,31,3,540000.00),(78,52,1,180000.00),(79,41,2,290000.00),(79,63,2,290000.00),(80,26,1,130000.00),(80,69,3,390000.00),(80,132,1,130000.00),(81,42,2,196000.00),(81,62,2,196000.00),(81,79,2,196000.00),(81,100,1,98000.00),(81,125,1,98000.00),(81,127,3,294000.00),(81,130,1,98000.00),(82,42,3,585000.00),(82,48,1,195000.00),(82,55,2,390000.00),(82,57,1,195000.00),(83,22,2,900000.00),(84,16,1,85000.00),(84,18,2,170000.00),(84,32,3,255000.00),(84,36,1,85000.00),(84,43,1,85000.00),(84,52,1,85000.00),(85,19,2,50000.00),(85,26,2,50000.00),(85,83,3,75000.00),(85,89,3,75000.00),(86,17,3,45000.00),(86,48,2,30000.00),(86,50,2,30000.00),(86,51,3,45000.00),(86,60,2,30000.00),(86,63,1,15000.00),(86,70,3,45000.00),(86,84,3,45000.00),(86,114,3,45000.00),(86,118,1,15000.00),(86,121,2,30000.00),(86,125,2,30000.00),(86,128,2,30000.00),(86,130,2,30000.00),(86,132,2,30000.00),(87,23,2,150000.00),(87,34,3,225000.00),(87,40,1,75000.00),(87,53,2,150000.00),(88,48,2,84000.00),(88,83,2,84000.00),(88,111,2,84000.00),(88,125,2,84000.00),(88,130,3,126000.00),(88,132,2,84000.00),(89,56,3,264000.00),(89,57,1,88000.00),(89,61,1,88000.00),(89,78,1,88000.00),(90,74,1,135000.00),(90,78,1,135000.00),(90,85,3,405000.00),(90,114,3,405000.00),(90,125,1,135000.00),(91,26,3,1950000.00),(91,36,1,650000.00),(92,20,1,980000.00),(92,105,1,980000.00),(92,107,1,980000.00),(93,55,3,285000.00),(93,60,2,190000.00),(93,108,1,95000.00),(93,121,2,190000.00),(94,40,3,276000.00),(94,69,3,276000.00),(94,76,2,184000.00),(94,129,1,92000.00),(94,131,3,276000.00),(95,44,2,37000.00),(95,46,1,18500.00),(95,53,3,55500.00),(95,58,1,18500.00),(95,72,1,18500.00),(95,86,1,18500.00),(95,105,2,37000.00),(95,109,3,55500.00),(95,119,1,18500.00),(95,123,1,18500.00),(96,23,3,1260000.00),(96,50,1,420000.00),(96,52,2,840000.00),(97,58,2,620000.00),(97,63,1,310000.00),(97,82,1,310000.00),(97,91,3,930000.00),(98,20,2,310000.00),(98,44,2,310000.00),(98,52,2,310000.00),(98,106,3,465000.00),(99,29,3,645000.00),(99,34,1,215000.00),(99,97,3,645000.00),(99,120,3,645000.00),(100,26,1,205000.00),(100,36,3,615000.00),(100,45,1,205000.00),(100,65,2,410000.00),(100,74,1,205000.00),(101,26,3,285000.00),(101,31,2,190000.00),(101,41,3,285000.00),(101,43,1,95000.00),(101,104,2,190000.00),(101,112,1,95000.00),(102,18,2,36000.00),(102,64,1,18000.00),(102,71,3,54000.00),(102,104,2,36000.00),(102,121,3,54000.00),(102,123,2,36000.00),(102,127,3,54000.00),(102,128,1,18000.00),(103,41,3,37500.00),(103,59,2,25000.00),(103,96,3,37500.00),(103,113,2,25000.00),(104,49,2,480000.00),(104,63,1,240000.00),(104,70,1,240000.00),(105,20,3,105000.00),(105,62,1,35000.00),(105,108,1,35000.00),(105,109,3,105000.00),(105,110,1,35000.00),(106,16,1,98000.00),(106,27,1,98000.00),(106,84,2,196000.00),(106,90,1,98000.00),(107,30,3,25500.00),(107,31,1,8500.00),(107,67,1,8500.00),(107,68,1,8500.00),(107,87,1,8500.00),(107,100,2,17000.00),(107,122,3,25500.00),(107,124,2,17000.00),(107,126,1,8500.00),(108,19,3,48000.00),(108,27,2,32000.00),(108,36,3,48000.00),(108,57,3,48000.00),(108,87,1,16000.00),(108,100,3,48000.00),(108,105,3,48000.00),(108,107,1,16000.00),(108,122,2,32000.00),(108,125,1,16000.00),(109,21,3,66000.00),(109,78,2,44000.00),(109,128,2,44000.00),(110,34,3,204000.00),(110,62,2,136000.00),(110,68,2,136000.00),(110,76,3,204000.00),(111,28,1,55000.00),(111,47,1,55000.00),(111,48,1,55000.00),(111,50,3,165000.00),(111,60,1,55000.00),(111,92,1,55000.00),(112,20,2,56000.00),(112,24,1,28000.00),(112,58,1,28000.00),(112,65,3,84000.00),(112,81,3,84000.00),(112,110,2,56000.00),(112,123,1,28000.00),(112,131,2,56000.00),(113,44,2,19000.00),(113,53,3,28500.00),(113,69,1,9500.00),(113,71,2,19000.00),(113,102,1,9500.00),(113,111,1,9500.00),(113,114,2,19000.00),(113,115,2,19000.00),(113,118,3,28500.00),(113,128,1,9500.00),(113,130,2,19000.00),(114,134,3,4350000.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (13,269520.00,'20323475',72,'2024-11-12 13:37:39'),(16,4930870.00,'20347385',150,'2025-11-24 21:38:34'),(17,1247200.00,'20347385',201,'2025-09-22 03:43:47'),(18,2760440.00,'20352836',160,'2025-11-23 01:55:48'),(19,268000.00,'20348956',156,'2025-10-03 02:51:47'),(20,3977600.00,'20352836',156,'2025-10-28 01:54:58'),(21,66000.00,'20323475',142,'2025-11-04 19:11:20'),(22,900000.00,'44231125',151,'2025-11-13 18:36:49'),(23,2431930.00,'20323475',179,'2025-08-30 23:07:22'),(24,28000.00,'44231125',163,'2025-08-29 22:10:32'),(25,943320.00,'44231125',147,'2025-09-09 19:20:48'),(26,2620000.00,'44231125',170,'2025-09-25 21:50:04'),(27,1033965.00,'20349285',198,'2025-10-23 01:47:24'),(28,591150.00,'20349285',180,'2025-09-25 18:27:30'),(29,645000.00,'20356792',155,'2025-09-03 19:24:05'),(30,25500.00,'20323475',156,'2025-10-13 22:52:29'),(31,2170325.00,'44231125',155,'2025-10-30 01:55:25'),(32,0.00,'20323475',179,'2025-11-19 18:52:28'),(33,78610.00,'20356792',162,'2025-09-23 00:46:30'),(34,2100900.00,'20347385',153,'2025-09-11 22:38:46'),(35,673800.00,'20356814',179,'2025-08-30 00:21:33'),(36,1398000.00,'20356814',181,'2025-09-04 21:17:19'),(37,471660.00,'20347385',167,'2025-09-24 20:03:17'),(38,78610.00,'20348956',196,'2025-09-29 17:37:53'),(39,101070.00,'20352836',179,'2025-10-02 00:08:08'),(40,4553250.00,'20352836',188,'2025-09-28 23:25:58'),(41,5160650.00,'20349285',144,'2025-10-28 21:37:03'),(42,1364960.00,'20356792',155,'2025-09-29 20:51:04'),(43,516900.00,'20323475',178,'2025-10-17 21:28:24'),(44,491000.00,'44231125',183,'2025-09-08 18:06:07'),(45,1507680.00,'20348956',178,'2025-11-15 23:47:16'),(46,18500.00,'20348956',196,'2025-09-06 01:57:03'),(47,3019870.00,'44231125',190,'2025-11-16 17:51:38'),(48,499200.00,'20349285',185,'2025-10-12 01:05:33'),(49,605000.00,'20352836',187,'2025-11-11 01:44:00'),(50,615000.00,'44231125',151,'2025-11-08 20:28:34'),(51,185375.00,'44231125',173,'2025-10-30 22:32:15'),(52,1415000.00,'20347385',161,'2025-10-13 17:40:32'),(53,413680.00,'44231125',143,'2025-11-14 20:30:17'),(54,2298920.00,'20352836',174,'2025-10-10 19:39:33'),(55,1640780.00,'20352836',74,'2025-09-09 18:12:36'),(56,264000.00,'44231125',191,'2025-11-01 19:20:35'),(57,797140.00,'20348956',200,'2025-11-05 01:33:51'),(58,986555.00,'20349285',74,'2025-09-15 00:35:41'),(59,25000.00,'20349285',183,'2025-09-29 19:40:52'),(60,396150.00,'20352836',201,'2025-09-25 23:47:45'),(61,1208000.00,'20348956',160,'2025-10-01 22:10:49'),(62,1040800.00,'20352836',144,'2025-09-29 18:42:05'),(63,1805000.00,'44231125',176,'2025-09-10 23:03:17'),(64,18000.00,'20348956',161,'2025-09-14 20:39:39'),(65,494000.00,'20349285',201,'2025-10-11 02:00:12'),(66,371030.00,'20347385',187,'2025-10-29 20:19:06'),(67,165720.00,'20356814',166,'2025-10-08 00:59:48'),(68,509475.00,'20348956',182,'2025-10-16 18:04:42'),(69,877640.00,'20356814',180,'2025-09-16 00:14:47'),(70,751900.00,'20356814',165,'2025-11-18 21:36:14'),(71,73000.00,'20348956',180,'2025-10-30 17:44:53'),(72,69035.00,'20356814',191,'2025-10-13 21:11:06'),(73,235830.00,'20356792',155,'2025-11-13 21:52:40'),(74,1524765.00,'20348956',146,'2025-09-20 19:43:10'),(75,797330.00,'44231125',153,'2025-10-30 02:41:49'),(76,388000.00,'20347385',72,'2025-10-18 23:35:42'),(77,1331635.00,'20352836',187,'2025-10-29 01:10:43'),(78,1446150.00,'20352836',147,'2025-10-19 21:56:29'),(79,196000.00,'20348956',181,'2025-10-15 01:12:47'),(80,898400.00,'44231125',188,'2025-11-20 00:56:35'),(81,3556300.00,'20356792',145,'2025-09-04 20:13:24'),(82,366150.00,'20347385',199,'2025-09-10 19:25:46'),(83,486140.00,'20356814',155,'2025-09-25 19:08:18'),(84,436000.00,'20356814',146,'2025-09-26 18:33:52'),(85,2601530.00,'20356792',158,'2025-09-05 23:13:10'),(86,18500.00,'20356792',165,'2025-11-20 01:10:58'),(87,159700.00,'20323475',174,'2025-09-24 18:35:50'),(88,78610.00,'20348956',183,'2025-09-16 22:55:31'),(89,2770200.00,'20356814',161,'2025-11-01 02:29:15'),(90,432520.00,'44231125',197,'2025-11-20 02:16:09'),(91,1180000.00,'20347385',164,'2025-10-12 01:38:44'),(92,543505.00,'20356792',164,'2025-10-17 01:57:17'),(93,5713610.00,'20349285',147,'2025-10-04 01:33:00'),(94,56150.00,'20352836',176,'2025-11-23 20:01:34'),(95,179680.00,'20356792',155,'2025-10-19 01:16:49'),(96,1834300.00,'44231125',169,'2025-08-31 02:50:25'),(97,1327675.00,'20349285',165,'2025-11-22 23:22:17'),(98,3731030.00,'20347385',187,'2025-09-09 22:02:10'),(99,3200550.00,'20323475',167,'2025-08-31 18:14:48'),(100,308990.00,'20349285',147,'2025-08-29 01:58:47'),(101,250000.00,'20347385',154,'2025-09-26 17:46:48'),(102,9500.00,'20323475',184,'2025-10-31 23:58:52'),(103,314440.00,'20356792',185,'2025-09-14 23:08:55'),(104,1497605.00,'44231125',172,'2025-11-19 22:13:26'),(105,4203400.00,'20356814',170,'2025-11-09 03:30:22'),(106,465000.00,'44231125',147,'2025-10-18 22:43:05'),(107,1294450.00,'44231125',73,'2025-10-19 19:21:49'),(108,130000.00,'20349285',145,'2025-11-16 18:40:46'),(109,365875.00,'20349285',172,'2025-09-03 21:22:54'),(110,91000.00,'20349285',172,'2025-11-05 17:35:16'),(111,469705.00,'20323475',72,'2025-09-29 01:43:02'),(112,95000.00,'20356814',165,'2025-09-02 21:33:32'),(113,159760.00,'20349285',153,'2025-10-16 21:29:02'),(114,1589000.00,'20352836',157,'2025-09-03 18:31:35'),(115,84000.00,'20356814',144,'2025-09-25 03:14:02'),(116,270400.00,'20356814',181,'2025-10-01 02:12:15'),(117,348130.00,'44231125',74,'2025-09-12 00:14:11'),(118,173500.00,'20349285',199,'2025-11-20 01:55:54'),(119,1138500.00,'20356814',157,'2025-11-21 03:20:38'),(120,729225.00,'20352836',185,'2025-11-14 21:06:53'),(121,274000.00,'20323475',72,'2025-10-22 19:06:15'),(122,173035.00,'44231125',197,'2025-10-29 01:33:15'),(123,217700.00,'20349285',157,'2025-09-10 00:44:41'),(124,1027700.00,'20323475',191,'2025-09-26 22:23:27'),(125,363000.00,'20347385',159,'2025-09-24 00:09:34'),(126,8500.00,'20348956',149,'2025-11-12 20:51:42'),(127,449070.00,'44231125',187,'2025-10-28 00:54:22'),(128,166500.00,'20352836',182,'2025-09-22 00:05:58'),(129,92000.00,'20356814',76,'2025-09-27 19:40:51'),(130,351610.00,'20348956',73,'2025-08-31 01:43:19'),(131,332000.00,'20349285',163,'2025-10-13 04:05:11'),(132,244000.00,'20356792',197,'2025-11-24 21:01:36'),(133,1516000.00,'44231125',72,'2025-12-01 19:16:44'),(134,4350000.00,'44231125',75,'2025-12-01 19:17:19'),(135,842200.00,'44231125',72,'2025-12-02 06:25:28');
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

-- Dump completed on 2025-12-02 16:31:07
