
CREATE TABLE TipoDocumento (
    id_tipo_documento INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(10) NOT NULL UNIQUE,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    id_tipo_documento INT NOT NULL,
    numero_documento VARCHAR(30) NOT NULL UNIQUE,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50),
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20) NOT NULL,
    direccion VARCHAR(200),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_tipo_documento) REFERENCES TipoDocumento(id_tipo_documento)
);

CREATE TABLE Marca (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    pais_origen VARCHAR(50)
);

CREATE TABLE Modelo (
    id_modelo INT AUTO_INCREMENT PRIMARY KEY,
    id_marca INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    tipo_carroceria VARCHAR(30),
    FOREIGN KEY (id_marca) REFERENCES Marca(id_marca)
);

CREATE TABLE Color (
    id_color INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE Automovil (
    id_automovil INT AUTO_INCREMENT PRIMARY KEY,
    vin_chasis VARCHAR(17) NOT NULL UNIQUE,
    numero_motor VARCHAR(50) NOT NULL UNIQUE,
    id_modelo INT NOT NULL,
    id_color INT NOT NULL,
    anio_fabricacion INT NOT NULL,
    kilometraje INT DEFAULT 0,
    precio_lista DECIMAL(12, 2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'DISPONIBLE',
    FOREIGN KEY (id_modelo) REFERENCES Modelo(id_modelo),
    FOREIGN KEY (id_color) REFERENCES Color(id_color)
);

CREATE TABLE MetodoPago (
    id_metodo_pago INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Vendedor (
    id_vendedor INT AUTO_INCREMENT PRIMARY KEY,
    codigo_empleado VARCHAR(20) NOT NULL UNIQUE,
    nombre_completo VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL
);

CREATE TABLE Venta (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    numero_factura VARCHAR(50) NOT NULL UNIQUE,
    id_cliente INT NOT NULL,
    id_vendedor INT NOT NULL,
    id_automovil INT NOT NULL UNIQUE,
    id_metodo_pago INT NOT NULL,
    fecha_venta DATETIME DEFAULT CURRENT_TIMESTAMP,
    precio_final DECIMAL(12, 2) NOT NULL,
    impuesto DECIMAL(12, 2) NOT NULL,
    total DECIMAL(12, 2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'COMPLETADA',
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_vendedor) REFERENCES Vendedor(id_vendedor),
    FOREIGN KEY (id_automovil) REFERENCES Automovil(id_automovil),
    FOREIGN KEY (id_metodo_pago) REFERENCES MetodoPago(id_metodo_pago)
);
