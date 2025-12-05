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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-05 16:07:07
