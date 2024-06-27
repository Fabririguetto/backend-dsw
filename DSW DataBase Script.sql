CREATE DATABASE DSW_gestion;

CREATE TABLE productos (
idProducto int not null primary key AUTO_INCREMENT,
articulo varchar(50),
descripcion varchar(50), 
cantidad int);

CREATE TABLE clientes (
idCliente int not null primary key AUTO_INCREMENT,
dni varchar(10),
nombre_apellidoCli varchar(50), 
direccion varchar(50),
contacto varchar(100)
);

CREATE TABLE sucursales (
idSucursal int not null primary key AUTO_INCREMENT,
nombreSucursal varchar (50),
direccion varchar (50)
);

CREATE TABLE empleados (
DNI_CUIL varchar (15) not null primary key AUTO_INCREMENT,
nombre_apellidoEmp varchar(50),
contacto varchar (100),
idSucursal int,
foreign key (idSucursal) references sucursales (idSucursal)
);

CREATE TABLE ventas (
idVenta int not null primary key AUTO_INCREMENT,
montoTotal decimal (18,2),
idSucursal int,
idCliente int,
foreign key (idSucursal) references sucursales (idSucursal),
foreign key (idCliente) references clientes (idCliente)
);

CREATE TABLE precio (
idProducto int not null,
fechaHora int not null,
PRIMARY KEY (idProducto, fechaHora),
monto decimal (18,2),
foreign key (idProducto) references productos (idProducto)
);

CREATE TABLE productoVenta (
idProducto int not null,
idVenta int not null,
fechaHoraVenta int not null,
cantidadVendida int not null,
subtotal decimal (18,2),
PRIMARY KEY (idProducto, fechaHoraVenta, idVenta),
foreign key (idProducto) references productos (idProducto),
foreign key (idventa) references ventas (idVenta)
);


