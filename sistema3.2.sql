-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-04-2023 a las 09:35:05
-- Versión del servidor: 5.6.21
-- Versión de PHP: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `sistema3`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo`
--

CREATE TABLE IF NOT EXISTS `articulo` (
`tipo_art` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `articulo`
--

INSERT INTO `articulo` (`tipo_art`, `descripcion`) VALUES
(1, 'venta directa'),
(2, 'preparado'),
(3, 'insumo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE IF NOT EXISTS `product` (
`id_producto` int(11) NOT NULL,
  `unidad` varchar(100) NOT NULL,
  `tipo_art` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `precio` float NOT NULL,
  `costo` float NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id_producto`, `unidad`, `tipo_art`, `name`, `precio`, `costo`) VALUES
(3, '2', 3, 'Pan', 12, 8),
(11, '3', 1, 'Harizon xd', 20, 12),
(12, '4', 3, 'Huevo', 0, 30),
(13, '1', 3, 'Pika Frasa', 2, 50),
(14, '5', 3, 'Santa Clara', 13, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `units`
--

CREATE TABLE IF NOT EXISTS `units` (
`unidad` int(11) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `units`
--

INSERT INTO `units` (`unidad`, `description`) VALUES
(1, 'Gramos'),
(2, 'Litros'),
(3, 'Rebanada'),
(4, 'Piezas'),
(5, 'No contable');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id_usuario` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `ap_paterno` varchar(200) NOT NULL,
  `ap_materno` varchar(200) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `fecha_n` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_usuario`, `name`, `ap_paterno`, `ap_materno`, `telefono`, `fecha_n`, `email`, `password`) VALUES
(1, 'Erick', 'Chavez', 'Ponce', '4495882440', '1688-12-28', 'erick123@gmail.com', '$2b$12$6Qc8a93tW8Yhg8Jmf.D9PeXMJL.vw.bfP1xsF/IEnaQtQgQ9uLESy'),
(3, 'Kevin Raziel', 'De Los Santos', 'Jaramillo', '4493938732', '2006-08-16', '21301061550104@cetis155.edu.mx', '$2b$12$wVpqHzv11CgBLGPfMiqoo.we8UG.XO/nNXNRQFiq2aUljvaMRoC3C');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulo`
--
ALTER TABLE `articulo`
 ADD PRIMARY KEY (`tipo_art`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
 ADD PRIMARY KEY (`id_producto`), ADD KEY `tipo_art` (`tipo_art`);

--
-- Indices de la tabla `units`
--
ALTER TABLE `units`
 ADD PRIMARY KEY (`unidad`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulo`
--
ALTER TABLE `articulo`
MODIFY `tipo_art` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `units`
--
ALTER TABLE `units`
MODIFY `unidad` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`tipo_art`) REFERENCES `articulo` (`tipo_art`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
