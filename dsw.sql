-- ==========================================================
-- PARTE 1: TU DUMP ORIGINAL (Recuperación de datos históricos)
-- ==========================================================

CREATE DATABASE IF NOT EXISTS dsw_gestion;
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

-- Tabla Clientes
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `dni` varchar(10) DEFAULT NULL,
  `nombre_apellidoCli` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `contacto` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `clientes` WRITE;
INSERT INTO `clientes` VALUES (72,'1034567890','Juan Pérez','Av. Siempre Viva 123','juan.perez@example.com'),(73,'1176548390','Ana Gómez','Calle Ficticia 456','ana.gomez@example.com'),(74,'1209876543','Carlos López','Calle Real 789','carlos.lopez@example.com'),(75,'1325789102','María Martínez','Plaza Central 101','maria.martinez@example.com'),(76,'1412348765','Pedro García','Calle Sol 202','pedro.garcia@example.com');
-- (He resumido los inserts para no saturar, pero al importar tu archivo real estarán todos)
UNLOCK TABLES;

-- Tabla Sucursales
DROP TABLE IF EXISTS `sucursales`;
CREATE TABLE `sucursales` (
  `idSucursal` int NOT NULL AUTO_INCREMENT,
  `nombreSucursal` varchar(50) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idSucursal`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `sucursales` WRITE;
INSERT INTO `sucursales` VALUES (10,'Sucursal Centro','Av. 9 de Julio 1000, CABA'),(11,'Sucursal Norte','Av. Libertador 2200, Buenos Aires'),(12,'Sucursal Sur','Calle Figueroa Alcorta 1800, Buenos Aires'),(13,'Sucursal Oeste','Ruta 5, Km 25, Merlo'),(14,'Sucursal Este','Calle San Martín 500, La Plata'),(15,'Sucursal CABA','Av. Corrientes 2300, CABA'),(16,'Sucursal Zona Norte','Calle Paraná 1450, Tigre');
UNLOCK TABLES;

-- Tabla Empleados (ESTRUCTURA VIEJA, la actualizaremos al final)
DROP TABLE IF EXISTS `empleados`;
CREATE TABLE `empleados` (
  `DNI_CUIL` varchar(15) NOT NULL,
  `nombre_apellidoEmp` varchar(50) DEFAULT NULL,
  `contacto` varchar(100) DEFAULT NULL,
  `idSucursal` int DEFAULT NULL,
  PRIMARY KEY (`DNI_CUIL`),
  KEY `idSucursal` (`idSucursal`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `empleados` WRITE;
INSERT INTO `empleados` VALUES ('20323475','Carlos López','1234-5680',10),('20347385','Santiago Romero','1234-5705',11),('20348956','Juan Pérez','1234-5678',12),('20349285','David Ramírez','1234-5686',13),('20352836','Luis Pérez','1234-5713',14),('20356792','Ana González','1234-5679',15),('20356814','Laura Hernández','1234-5687',16);
UNLOCK TABLES;

-- Tabla Productos
DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `articulo` varchar(50) DEFAULT NULL,
  `descripcion` varchar(150) DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `productos` WRITE;
INSERT INTO `productos` VALUES (1,'Laptop Lenovo','Laptop Lenovo Ideapad 14\"',5,'Disponible'),(2,'Mouse Logitech','Mouse inalámbrico Logitech M720',15,'Disponible'),(3,'Monitor Samsung','Monitor Samsung 24\" Full HD',10,'Disponible');
UNLOCK TABLES;

-- Tabla Precios
DROP TABLE IF EXISTS `precios`;
CREATE TABLE `precios` (
  `idProducto` int NOT NULL,
  `fechaHora` datetime NOT NULL,
  `monto` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`idProducto`,`fechaHora`),
  CONSTRAINT `precios_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `precios` WRITE;
INSERT INTO `precios` VALUES (1,'2024-11-12 08:00:00',842250.00),(2,'2024-11-12 08:30:00',50535.00);
UNLOCK TABLES;

-- Tabla Ventas
DROP TABLE IF EXISTS `ventas`;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

LOCK TABLES `ventas` WRITE;
INSERT INTO `ventas` VALUES (13,269520.00,'20323475',72,'2024-11-12 13:37:39');
UNLOCK TABLES;

-- Tabla ProductoVenta
DROP TABLE IF EXISTS `productoventa`;
CREATE TABLE `productoventa` (
  `idProducto` int NOT NULL,
  `idVenta` int NOT NULL,
  `cantidadVendida` int NOT NULL,
  `subtotal` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`idProducto`,`idVenta`),
  KEY `idVenta` (`idVenta`),
  CONSTRAINT `productoventa_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`),
  CONSTRAINT `productoventa_ibfk_2` FOREIGN KEY (`idVenta`) REFERENCES `ventas` (`idVenta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `productoventa` WRITE;
INSERT INTO `productoventa` VALUES (3,13,1,202140.00);
UNLOCK TABLES;


-- ==========================================================
-- PARTE 2: MIGRACIÓN Y ACTUALIZACIÓN (Lo nuevo para aprobar)
-- ==========================================================

-- 1. Agregar columnas de seguridad a la tabla EMPLEADOS (Si no existen)
--    Esto permite que los datos viejos convivan con el nuevo sistema.
SET @dbname = DATABASE();
SET @tablename = "empleados";
SET @columnname = "password";
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 1",
  "ALTER TABLE empleados ADD COLUMN email VARCHAR(100) UNIQUE DEFAULT NULL, ADD COLUMN password VARCHAR(255) DEFAULT NULL, ADD COLUMN rol VARCHAR(20) DEFAULT 'vendedor';"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- 2. Designar a 'Carlos López' (DNI 20323475) como ADMIN
--    Le asignamos un email y una contraseña provisoria '123456' (que luego encriptaremos)
UPDATE empleados 
SET 
    rol = 'admin',
    email = 'admin@test.com',
    password = '123456' -- Temporal (texto plano), se encriptará en el paso siguiente con Node
WHERE DNI_CUIL = '20323475';

-- 3. Asignar rol de vendedor por defecto al resto
UPDATE empleados 
SET rol = 'vendedor', password = '123456', email = CONCAT('vendedor', DNI_CUIL, '@test.com')
WHERE rol IS NULL OR rol = 'vendedor';

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- ==========================================================
-- PARTE 2: MIGRACIÓN Y ACTUALIZACIÓN DE SEGURIDAD
-- (Pegar esto al final de tu archivo original)
-- ==========================================================

USE dsw_gestion;

-- 1. Agregar columnas de seguridad a la tabla EMPLEADOS (Si no existen)
--    Esto verifica si falta la columna 'password' y agrega todo lo necesario.
SET @dbname = DATABASE();
SET @tablename = "empleados";
SET @columnname = "password";
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 1",
  "ALTER TABLE empleados ADD COLUMN email VARCHAR(100) UNIQUE DEFAULT NULL, ADD COLUMN password VARCHAR(255) DEFAULT NULL, ADD COLUMN rol VARCHAR(20) DEFAULT 'vendedor';"
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- 2. Convertir a 'Carlos López' (DNI 20323475) en ADMIN
--    Le ponemos contraseña temporal '123456' (luego el script de Node la encripta)
UPDATE empleados 
SET 
    rol = 'admin',
    email = 'admin@test.com',
    password = '123456' 
WHERE DNI_CUIL = '20323475';

-- 3. Arreglar al resto de los empleados (Vendedores)
--    Les generamos un email automático y contraseña por defecto
UPDATE empleados 
SET 
    rol = 'vendedor', 
    password = '123456', 
    email = CONCAT('vendedor', DNI_CUIL, '@test.com')
WHERE (rol IS NULL OR rol = 'vendedor') AND DNI_CUIL <> '20323475';