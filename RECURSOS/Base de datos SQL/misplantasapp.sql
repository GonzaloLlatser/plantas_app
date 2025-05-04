-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-05-2025 a las 16:31:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `misplantasapp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planta_model`
--

CREATE TABLE `planta_model` (
  `id` bigint(20) NOT NULL,
  `fecha_adquisicion` date DEFAULT NULL,
  `fecha_poda` date DEFAULT NULL,
  `fecha_proximo_riego` date DEFAULT NULL,
  `fecha_ultimo_riego` date DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `notas` varchar(255) DEFAULT NULL,
  `tipo_planta` varchar(255) DEFAULT NULL,
  `ubicacion` varchar(255) DEFAULT NULL,
  `usuario_id` bigint(20) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `ruta_imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `planta_model`
--

INSERT INTO `planta_model` (`id`, `fecha_adquisicion`, `fecha_poda`, `fecha_proximo_riego`, `fecha_ultimo_riego`, `nombre`, `notas`, `tipo_planta`, `ubicacion`, `usuario_id`, `imagen`, `ruta_imagen`) VALUES
(18, '2024-03-10', '2024-04-18', '2025-04-25', '2024-03-18', 'Margarita', 'Regar cada 15 días', 'Asteraceae ', 'Dormitorio principal', 1, NULL, '/imagenes/plantas/ed8e0fc3-28c5-4094-8ac0-e1b5b62c829c.jpg'),
(22, '2024-03-12', '2024-04-02', '2025-05-01', '2024-03-20', 'Anthurium', 'Regar cada 10 días', 'Herbácea', 'Interior', 1, NULL, '/imagenes/plantas/83ca67a7-a004-41bb-a7f1-12626d824486.jpg'),
(23, '2024-03-14', '2024-04-05', '2025-06-10', '2024-03-22', 'Lirio de paz', 'Regar semanalmente', 'Planta de interior', 'Sala', 1, NULL, '/imagenes/plantas/e5216adb-6e2d-47b0-a70e-00e12c9bc677.jpg'),
(24, '2024-03-16', '2024-04-07', '2025-07-15', '2024-03-24', 'Ficus', 'Regar cada 15 días', 'Árbol de interior', 'Comedor de casa', 1, NULL, '/imagenes/plantas/3b1802c7-3ad9-4dbe-910f-42442addb9f0.jpg'),
(25, '2024-03-18', '2024-04-09', '2025-08-01', '2024-03-26', 'Laurel egipcio', 'No necesita mucha agua', 'Laurel', 'Balcón', 1, NULL, '/imagenes/plantas/123120d7-425a-4786-b67e-6a11dea75f76.jpg'),
(26, '2024-03-20', '2024-04-11', '2025-09-12', '2024-03-28', 'Helecho', 'Crece rápido', 'Planta colgante', 'Cocina', 1, NULL, '/imagenes/plantas/a383ab1a-4041-447b-b67b-461a9d977ee0.jpg'),
(27, '2024-03-22', '2024-04-13', '2025-10-25', '2024-03-30', 'Orquídea', 'No regar mucho', 'Planta ornamental', 'Dormitorio', 9, NULL, '/imagenes/plantas/a7648a5e-938b-4af5-854a-be47ebad41d8.jpg'),
(28, '2024-03-24', '2024-04-15', '2025-11-02', '2024-04-01', 'Bambú', 'Regar regularmente', 'Bambú', 'Jardín', 9, NULL, '/imagenes/plantas/10a904ec-4cc0-4977-9fc2-e9026c146e8e.jpg'),
(29, '2024-03-26', '2024-04-17', '2025-12-05', '2024-04-03', 'Geranios', 'Poner al sol', 'Planta exterior', 'Terraza', 9, NULL, '/imagenes/plantas/650fb276-ed63-4a37-8898-43a3c6fb3c0b.jpg'),
(30, '2024-03-28', '2024-04-19', '2026-01-15', '2024-04-05', 'Lavanda', 'Proteger del frío', 'Planta aromática', 'Jardín', 9, NULL, '/imagenes/plantas/7664b22f-4d7e-4de4-b15b-825d85dd0d99.jpg'),
(47, '2025-05-09', '2025-05-09', '2025-05-23', '2025-05-16', 'Lavanda', 'Usar para hacer velas.', 'Aromática', 'Jardín', 1, NULL, '/imagenes/plantas/087ce291-5b4c-49e1-8f33-4550cc0ce58f.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_model`
--

CREATE TABLE `usuario_model` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario_model`
--

INSERT INTO `usuario_model` (`id`, `email`, `nombre`, `password`) VALUES
(1, 'gonzalo@correo.com', 'Gonzalo', 'gonzalo1234'),
(9, 'maria@correo.com', 'Maria', 'maria1234');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `planta_model`
--
ALTER TABLE `planta_model`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKr342dno686k5vckf2ixfoffn1` (`usuario_id`);

--
-- Indices de la tabla `usuario_model`
--
ALTER TABLE `usuario_model`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `planta_model`
--
ALTER TABLE `planta_model`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `usuario_model`
--
ALTER TABLE `usuario_model`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `planta_model`
--
ALTER TABLE `planta_model`
  ADD CONSTRAINT `FKr342dno686k5vckf2ixfoffn1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario_model` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
