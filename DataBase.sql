


CREATE DATABASE IF NOT EXISTS `datawarehouse`
USE `datawarehouse`;


CREATE TABLE IF NOT EXISTS `ciudad` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pais_id` int(11) NOT NULL DEFAULT 0,
  `nombre_ciudad` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_ciudad_pais` (`pais_id`),
  CONSTRAINT `FK_ciudad_pais` FOREIGN KEY (`pais_id`) REFERENCES `pais` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;



CREATE TABLE IF NOT EXISTS `compania` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_compania` varchar(111) NOT NULL DEFAULT '0',
  `direccion` varchar(50) NOT NULL DEFAULT '',
  `email` varchar(50) NOT NULL DEFAULT '',
  `telefono` int(50) NOT NULL,
  `ciudad_id` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_compania_ciudad` (`ciudad_id`),
  CONSTRAINT `FK_compania_ciudad` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;



CREATE TABLE IF NOT EXISTS `contactos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_contacto` varchar(110) NOT NULL,
  `apellido_contacto` varchar(110) NOT NULL,
  `interes_contacto` int(110) NOT NULL DEFAULT 0,
  `email_contacto` varchar(110) NOT NULL,
  `direccion_contactos` varchar(110) NOT NULL DEFAULT '',
  `canales_contacto` varchar(110) NOT NULL,
  `cargo_contacto` varchar(110) NOT NULL,
  `cuenta_usuario` varchar(110) NOT NULL DEFAULT '',
  `ciudad_contacto` int(11) NOT NULL,
  `pais_contacto` int(11) NOT NULL,
  `compania_contacto` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_contactos_ciudad` (`ciudad_contacto`),
  KEY `FK_contactos_pais` (`pais_contacto`),
  KEY `FK_contactos_compania` (`compania_contacto`),
  CONSTRAINT `FK_contactos_ciudad` FOREIGN KEY (`ciudad_contacto`) REFERENCES `ciudad` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `FK_contactos_compania` FOREIGN KEY (`compania_contacto`) REFERENCES `compania` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_contactos_pais` FOREIGN KEY (`pais_contacto`) REFERENCES `pais` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS `pais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `region_id` int(11) NOT NULL DEFAULT 0,
  `nombre_pais` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_pais_region` (`region_id`),
  CONSTRAINT `FK_pais_region` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS `region` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_region` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;


CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(50) NOT NULL DEFAULT '0',
  `apellido_usuario` varchar(50) NOT NULL DEFAULT '0',
  `email` varchar(100) NOT NULL DEFAULT '0',
  `perfil` tinyint(4) NOT NULL DEFAULT 0,
  `contrasena` varchar(500) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;


INSERT INTO `usuarios` (`id`, `nombre_usuario`, `apellido_usuario`, `email`, `perfil`, `contrasena`) VALUES
	(1, 'Admin', 'Admin', 'Admin', 1, '$2a$08$s3tJfXF8KjS5am6C.YWIZeFmv63Fx7z82KmFA67oIOV1CZWYQyAsC'),
	(54, 'NoAdmin', 'NoAdmin', 'NoAdmin', 2, '$2a$08$sv.r5nJXP42/TO6ANjgOR.BcuVLaYAy.mSKIROgLHvHANVF4khBS6');
