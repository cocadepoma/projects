-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 28-01-2021 a las 07:43:07
-- Versión del servidor: 10.2.10-MariaDB
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `blog`
--
CREATE DATABASE IF NOT EXISTS `blog` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `blog`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `id` int(100) NOT NULL,
  `urltitulo` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `autor` varchar(150) NOT NULL,
  `fecha` date NOT NULL,
  `preview` text NOT NULL,
  `contenido` text NOT NULL,
  `portada` varchar(255) NOT NULL,
  `portada_footer` varchar(255) NOT NULL,
  `publicado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id`, `urltitulo`, `titulo`, `autor`, `fecha`, `preview`, `contenido`, `portada`, `portada_footer`, `publicado`) VALUES
(1, 'que-es-un-acuario-marino', '¿Qué es un acuario marino?', 'Fco. Rodríguez', '2020-12-15', 'Aunque la gran mayoría de <strong>acuarios</strong> que podemos ver en nuestros hogares son los de <strong>agua dulce</strong>, existen también de <strong>agua salobre</strong> y <strong>acuarios marinos</strong>. Hoy vamos a hablar sobre los <strong>conceptos básicos</strong> más importantes de los acuarios marinos.', '<p>\r\n    Un acuario marino es una ventana submarina al mundo de los arrecifes de coral, es la manera en la que puedes tener\r\n    en tu casa u oficina una cercanía con el impresionante mundo submarino. De la misma manera que se acostumbra con\r\n    acuarios de agua dulce, existen muchas variedades de peces marinos que se comercializan legalmente con fines\r\n    ornamentales en el mundo, a Mexico se importan mas de 400 especies de peces ornamentales marinos provenientes de\r\n    lugares como Malasia, Indonesia, Hawaii, Sri Lanka, Australia, Estados Unidos, etc.\r\n</p>\r\n<h3>Acuario marino</h3>\r\n<p>\r\n    Si estás pensando en montar un acuario marino, seguro que esta guía te ayudará a realizarlo en las mejores\r\n    condiciones, cometer el menor número de errores posibles y que tu acuario marino funcione correctamente a largo\r\n    plazo. Existe la falsa impresión de que un acuario marino es más difícil de mantener que un acuario de agua dulce.\r\n    Esto es falso, cualquiera puede tener un acuario marino, aunque no tenga experiencia previa.\r\n</p>\r\n<p>\r\n    Tampoco nos costará mucho tiempo mantenerlo en buenas condiciones, al menos, no mucho más tiempo del que costaría\r\n    mantener un acuario de agua dulce.\r\n</p>\r\n<p>\r\n    Aquí lo importante es el tipo de hábitat que vamos a recrear. Hay algunos realmente sencillos y que no requieren\r\n    demasiadas complicaciones, así como hay peces más fáciles o más difíciles de criar en el acuario marino.\r\n</p>\r\n<p>\r\n    En cuanto a la elección de los peces, es cierto que hay peces marinos más fáciles de mantener, y otros que resultan\r\n    más delicados, pero igualmente ese problema lo tenemos en un acuario de agua dulce. Determinadas especies de peces\r\n    no son fáciles de mantener en cautividad, mientras que otras se adaptan con facilidad a la vida en un acuario.\r\n</p>\r\n<p>\r\n    Para comenzar con acuario marino, debemos tener en cuenta el tamaño. Un acuario marino para principiantes debería\r\n    tener como mínimo unos 200 litros, es un tamaño de acuario que nos permite minimizar cualquier posible error de\r\n    principiante…se que es posible que te gustaría empezar por un nano acuario marino, pero no creo que sea la mejor\r\n    opción.\r\n</p>\r\n<p>\r\n    A partir de ese tamaño mínimo, podemos comprar el acuario que nos guste, siempre teniendo en cuenta el tipo de peces\r\n    que vamos a criar y su cantidad.\r\n</p>\r\n<div class=\"article-img\">\r\n    <img src=\"img/blog/marino-1-1.jpg\" alt=\"image-sidebar\" /><span class=\"foot\"\r\n        >Acuario marino con gran variedad de peces, corales e invertebrados.</span\r\n    >\r\n</div>\r\n<h3>Cuidados de un acuario marino</h3>\r\n<p>\r\n    Principalmente tenemos que estar conscientes de que nuestro acuario marino es el lugar donde habitan peces que\r\n    requieren de un buen entorno para sobrevivir, para ello debemos de estar al pendiente de los parámetros químicos del\r\n    agua.\r\n</p>\r\n<p>\r\n    Al igual que en el acuario de agua dulce, al acuario marino se le deben revisar constantemente parámetros químicos\r\n    como el PH, Amoniaco, Nitritos y Nitratos, y a diferencia del agua dulce, en el acuario marino debemos revisar\r\n    también la densidad del agua, la cantidad de sal disuelta en el agua de nuestro acuario.\r\n</p>\r\n<p>\r\n    Adicionalmente podemos revisar otros parámetros como el calcio, yodo, fosfatos, etc. Un punto muy importante es\r\n    saber de los parámetros ideales para las especies de peces que tenemos en nuestro acuario o que deseamos tener,\r\n    existen peces de aguas frías, peces de aguas cálidas, de profundad, etc.\r\n</p>\r\n<p>\r\n    A diferencia de gran parte de los peces de agua dulce, la mayoría de los peces marinos son muy susceptibles a la\r\n    química del agua y a los cambios bruscos de temperatura, por que debemos prestar especial atención en eso.\r\n</p>\r\n<h3>Colocación</h3>\r\n<p>\r\n    Si nuestro acuario va a tener más de 300 litros, debemos revisar que el lugar elegido lo puede soportar sin\r\n    problemas, así como la mesa donde lo vamos a colocar.\r\n</p>\r\n<p>\r\n    Como precaución y para absorber cualquier tipo de irregularidad de la superficie donde lo colocamos, o desnivel del\r\n    suelo, es recomendable colocar bajo el acuario una plancha de poliestireno expandido o algunos de los materiales que\r\n    para este efecto se venden en el mercado.\r\n</p>\r\n<h3>Limpieza</h3>\r\n<p>\r\n    Una vez colocado en su ubicación definitiva, debemos limpiar bien el acuario. No hay que olvidar que en su\r\n    fabricación se han utilizado todo tipo de productos químicos, y que en la manipulación lo habremos llenado de\r\n    huellas.\r\n</p>\r\n<p>\r\n    Para su limpieza evitaremos productos químicos, sólo una esponja, agua clara y productos adecuados para acuarios. En\r\n    su defecto, podemos utilizar lejía diluida en agua al 5%.\r\n</p>\r\n<div class=\"article-img\">\r\n    <img src=\"img/blog/marino-1-2.jpg\" alt=\"image-sidebar\" />\r\n    <div class=\"foot\">\r\n        <span>Acuario marino con gran variedad de peces, corales e invertebrados.</span>\r\n    </div>\r\n</div>\r\n<h3>El agua del acuario</h3>\r\n<p>\r\n    Una vez que el acuario ya está limpio y seco, podremos comenzar a llenarlo de agua. Idealmente el agua que\r\n    utilizaremos será filtrada por un sistema de ósmosis inversa, pero si no es posible, el agua del grifo también puede\r\n    ir bien, siempre que no contenga nitratos, fosfatos, cloros, ni ácido silícico. Lo más probable es que el agua del\r\n    grifo tenga cloro. El cloro se evapora, así que podríamos utilizar agua del grifo dejándola reposar 24 horas.\r\n</p>\r\n<h3>Temperatura del agua</h3>\r\n<p>\r\n    La temperatura del agua se debe mover sobre los 25ºC, evitando que baje de los 20ºC y que no suba de los 29ºC.\r\n    Aunque durante unos días no vamos a introducir peces en el acuario, conviene que el agua vaya tomando la temperatura\r\n    adecuada.\r\n</p>\r\n<p>\r\n    Para regular y mantener la temperatura del acuario debemos utilizar un termocalentador. En el mercado hay varios\r\n    tipos de termocalentadores, aunque los más populares son los sumergibles.\r\n</p>\r\n<h3>Densidad del agua</h3>\r\n<p>\r\n    A esta agua, hay que añadirle sal marina para acuarios, o sea, primero ponemos el agua y luego la sal, nunca a la\r\n    inversa. El agua tiene llegar a una densidad aproximada de 1.025 gr/cm3, que modificaremos en función de las\r\n    necesidades de los peces marinos que vayamos a introducir. La densidad hay que medirla con el agua ya caliente, ya\r\n    que el agua se vuelve menos densa cuando está más caliente, y al revés.\r\n</p>\r\n', 'marino-1.jpg', 'Acuario marino con gran variedad de peces, corales e invertebrados.', 1),
(2, 'quenecesitoparaempezarunacuariomarino', '¿Qué necesito para empezar un acuario marino?', 'Fco.Rodríguez', '2020-10-06', 'Esta es una de las primeras preguntas que nos surgen cuando pensamos en iniciarnos en el mundo de los <strong>acuarios</strong>. Lo cierto es que la respuesta más acertada es siempre: <strong>depende</strong>.', '<p>\r\n    Un acuario marino es una ventana submarina al mundo de los arrecifes de coral, es la manera en la que puedes tener\r\n    en tu casa u oficina una cercanía con el impresionante mundo submarino. De la misma manera que se acostumbra con\r\n    acuarios de agua dulce, existen muchas variedades de peces marinos que se comercializan legalmente con fines\r\n    ornamentales en el mundo, a Mexico se importan mas de 400 especies de peces ornamentales marinos provenientes de\r\n    lugares como Malasia, Indonesia, Hawaii, Sri Lanka, Australia, Estados Unidos, etc.\r\n</p>\r\n<h3>Acuario marino</h3>\r\n<p>\r\n    Si estás pensando en montar un acuario marino, seguro que esta guía te ayudará a realizarlo en las mejores\r\n    condiciones, cometer el menor número de errores posibles y que tu acuario marino funcione correctamente a largo\r\n    plazo. Existe la falsa impresión de que un acuario marino es más difícil de mantener que un acuario de agua dulce.\r\n    Esto es falso, cualquiera puede tener un acuario marino, aunque no tenga experiencia previa.\r\n</p>\r\n<p>\r\n    Tampoco nos costará mucho tiempo mantenerlo en buenas condiciones, al menos, no mucho más tiempo del que costaría\r\n    mantener un acuario de agua dulce.\r\n</p>\r\n<p>\r\n    Aquí lo importante es el tipo de hábitat que vamos a recrear. Hay algunos realmente sencillos y que no requieren\r\n    demasiadas complicaciones, así como hay peces más fáciles o más difíciles de criar en el acuario marino.\r\n</p>\r\n<p>\r\n    En cuanto a la elección de los peces, es cierto que hay peces marinos más fáciles de mantener, y otros que resultan\r\n    más delicados, pero igualmente ese problema lo tenemos en un acuario de agua dulce. Determinadas especies de peces\r\n    no son fáciles de mantener en cautividad, mientras que otras se adaptan con facilidad a la vida en un acuario.\r\n</p>\r\n<p>\r\n    Para comenzar con acuario marino, debemos tener en cuenta el tamaño. Un acuario marino para principiantes debería\r\n    tener como mínimo unos 200 litros, es un tamaño de acuario que nos permite minimizar cualquier posible error de\r\n    principiante…se que es posible que te gustaría empezar por un nano acuario marino, pero no creo que sea la mejor\r\n    opción.\r\n</p>\r\n<p>\r\n    A partir de ese tamaño mínimo, podemos comprar el acuario que nos guste, siempre teniendo en cuenta el tipo de peces\r\n    que vamos a criar y su cantidad.\r\n</p>', 'marino-2.jpg', 'Cosas para empezar tu acuario marino.', 1),
(3, 'que-es-un-skimmer-y-para-que-sirve', '¿Qué es un skimmer y para que sirve?', 'Fco.Rodríguez', '2020-08-28', 'El skimmer es una herramienta que nos sirve para <strong>separar la urea o proteína</strong> del agua salada. Existen una gran infinidad de marcas, modelos, tamaños, caudales, formas y de su ubicación: <strong>externos o internos</strong>.', '<p>\r\n    Un acuario marino es una ventana submarina al mundo de los arrecifes de coral, es la manera en la que puedes tener\r\n    en tu casa u oficina una cercanía con el impresionante mundo submarino. De la misma manera que se acostumbra con\r\n    acuarios de agua dulce, existen muchas variedades de peces marinos que se comercializan legalmente con fines\r\n    ornamentales en el mundo, a Mexico se importan mas de 400 especies de peces ornamentales marinos provenientes de\r\n    lugares como Malasia, Indonesia, Hawaii, Sri Lanka, Australia, Estados Unidos, etc.\r\n</p>\r\n<h3>Acuario marino</h3>\r\n<p>\r\n    Si estás pensando en montar un acuario marino, seguro que esta guía te ayudará a realizarlo en las mejores\r\n    condiciones, cometer el menor número de errores posibles y que tu acuario marino funcione correctamente a largo\r\n    plazo. Existe la falsa impresión de que un acuario marino es más difícil de mantener que un acuario de agua dulce.\r\n    Esto es falso, cualquiera puede tener un acuario marino, aunque no tenga experiencia previa.\r\n</p>\r\n<p>\r\n    Tampoco nos costará mucho tiempo mantenerlo en buenas condiciones, al menos, no mucho más tiempo del que costaría\r\n    mantener un acuario de agua dulce.\r\n</p>\r\n<p>\r\n    Aquí lo importante es el tipo de hábitat que vamos a recrear. Hay algunos realmente sencillos y que no requieren\r\n    demasiadas complicaciones, así como hay peces más fáciles o más difíciles de criar en el acuario marino.\r\n</p>\r\n<p>\r\n    En cuanto a la elección de los peces, es cierto que hay peces marinos más fáciles de mantener, y otros que resultan\r\n    más delicados, pero igualmente ese problema lo tenemos en un acuario de agua dulce. Determinadas especies de peces\r\n    no son fáciles de mantener en cautividad, mientras que otras se adaptan con facilidad a la vida en un acuario.\r\n</p>\r\n<p>\r\n    Para comenzar con acuario marino, debemos tener en cuenta el tamaño. Un acuario marino para principiantes debería\r\n    tener como mínimo unos 200 litros, es un tamaño de acuario que nos permite minimizar cualquier posible error de\r\n    principiante…se que es posible que te gustaría empezar por un nano acuario marino, pero no creo que sea la mejor\r\n    opción.\r\n</p>\r\n<p>\r\n    A partir de ese tamaño mínimo, podemos comprar el acuario que nos guste, siempre teniendo en cuenta el tipo de peces\r\n    que vamos a criar y su cantidad.\r\n</p>', 'skimmer.png', 'Skimmers de todo tipo de tamaños.', 1),
(4, 'sump-o-no-sump', '¿Sump o no Sump?', 'Fco.Rodríguez', '2020-05-30', 'El <strong>sumidero o sump</strong>, es altamente recomendable en acuarios marinos porque nos permite mantener toda la \"maquinaria\" de nuestro acuario, de forma ordenada (agua de reposición, skimmer, algas beneficiosas, roca, etc...) y con grandes beneficios.', '<p>\r\n    Un acuario marino es una ventana submarina al mundo de los arrecifes de coral, es la manera en la que puedes tener\r\n    en tu casa u oficina una cercanía con el impresionante mundo submarino. De la misma manera que se acostumbra con\r\n    acuarios de agua dulce, existen muchas variedades de peces marinos que se comercializan legalmente con fines\r\n    ornamentales en el mundo, a Mexico se importan mas de 400 especies de peces ornamentales marinos provenientes de\r\n    lugares como Malasia, Indonesia, Hawaii, Sri Lanka, Australia, Estados Unidos, etc.\r\n</p>\r\n<h3>Acuario marino</h3>\r\n<p>\r\n    Si estás pensando en montar un acuario marino, seguro que esta guía te ayudará a realizarlo en las mejores\r\n    condiciones, cometer el menor número de errores posibles y que tu acuario marino funcione correctamente a largo\r\n    plazo. Existe la falsa impresión de que un acuario marino es más difícil de mantener que un acuario de agua dulce.\r\n    Esto es falso, cualquiera puede tener un acuario marino, aunque no tenga experiencia previa.\r\n</p>\r\n<p>\r\n    Tampoco nos costará mucho tiempo mantenerlo en buenas condiciones, al menos, no mucho más tiempo del que costaría\r\n    mantener un acuario de agua dulce.\r\n</p>\r\n<p>\r\n    Aquí lo importante es el tipo de hábitat que vamos a recrear. Hay algunos realmente sencillos y que no requieren\r\n    demasiadas complicaciones, así como hay peces más fáciles o más difíciles de criar en el acuario marino.\r\n</p>\r\n<p>\r\n    En cuanto a la elección de los peces, es cierto que hay peces marinos más fáciles de mantener, y otros que resultan\r\n    más delicados, pero igualmente ese problema lo tenemos en un acuario de agua dulce. Determinadas especies de peces\r\n    no son fáciles de mantener en cautividad, mientras que otras se adaptan con facilidad a la vida en un acuario.\r\n</p>\r\n<p>\r\n    Para comenzar con acuario marino, debemos tener en cuenta el tamaño. Un acuario marino para principiantes debería\r\n    tener como mínimo unos 200 litros, es un tamaño de acuario que nos permite minimizar cualquier posible error de\r\n    principiante…se que es posible que te gustaría empezar por un nano acuario marino, pero no creo que sea la mejor\r\n    opción.\r\n</p>\r\n<p>\r\n    A partir de ese tamaño mínimo, podemos comprar el acuario que nos guste, siempre teniendo en cuenta el tipo de peces\r\n    que vamos a criar y su cantidad.\r\n</p>', 'sump.jpg', 'Sumps a medida y de cualquier tamaño.', 1),
(5, 'guia-definitiva-de-peces-para-principiantes', 'Guía definitiva de peces para principiantes', 'Fco.Rodríguez', '2020-07-01', 'En esta guía aprenderás que peces son los más <strong>recomendados para comenzar</strong>, y cuales no debes elegir. También tendremos en cuenta el <strong>tamaño de nuestra urna</strong> porque los peces de <strong>agua salada requieren de muchísimo más espacio</strong> que sus parientes de agua dulce.', '<p>\r\n    Un acuario marino es una ventana submarina al mundo de los arrecifes de coral, es la manera en la que puedes tener\r\n    en tu casa u oficina una cercanía con el impresionante mundo submarino. De la misma manera que se acostumbra con\r\n    acuarios de agua dulce, existen muchas variedades de peces marinos que se comercializan legalmente con fines\r\n    ornamentales en el mundo, a Mexico se importan mas de 400 especies de peces ornamentales marinos provenientes de\r\n    lugares como Malasia, Indonesia, Hawaii, Sri Lanka, Australia, Estados Unidos, etc.\r\n</p>\r\n<h3>Acuario marino</h3>\r\n<p>\r\n    Si estás pensando en montar un acuario marino, seguro que esta guía te ayudará a realizarlo en las mejores\r\n    condiciones, cometer el menor número de errores posibles y que tu acuario marino funcione correctamente a largo\r\n    plazo. Existe la falsa impresión de que un acuario marino es más difícil de mantener que un acuario de agua dulce.\r\n    Esto es falso, cualquiera puede tener un acuario marino, aunque no tenga experiencia previa.\r\n</p>\r\n<p>\r\n    Tampoco nos costará mucho tiempo mantenerlo en buenas condiciones, al menos, no mucho más tiempo del que costaría\r\n    mantener un acuario de agua dulce.\r\n</p>\r\n<p>\r\n    Aquí lo importante es el tipo de hábitat que vamos a recrear. Hay algunos realmente sencillos y que no requieren\r\n    demasiadas complicaciones, así como hay peces más fáciles o más difíciles de criar en el acuario marino.\r\n</p>\r\n<p>\r\n    En cuanto a la elección de los peces, es cierto que hay peces marinos más fáciles de mantener, y otros que resultan\r\n    más delicados, pero igualmente ese problema lo tenemos en un acuario de agua dulce. Determinadas especies de peces\r\n    no son fáciles de mantener en cautividad, mientras que otras se adaptan con facilidad a la vida en un acuario.\r\n</p>\r\n<p>\r\n    Para comenzar con acuario marino, debemos tener en cuenta el tamaño. Un acuario marino para principiantes debería\r\n    tener como mínimo unos 200 litros, es un tamaño de acuario que nos permite minimizar cualquier posible error de\r\n    principiante…se que es posible que te gustaría empezar por un nano acuario marino, pero no creo que sea la mejor\r\n    opción.\r\n</p>\r\n<p>\r\n    A partir de ese tamaño mínimo, podemos comprar el acuario que nos guste, siempre teniendo en cuenta el tipo de peces\r\n    que vamos a criar y su cantidad.\r\n</p>', 'payasos.jpg', 'Peces coloridos y llamativos como el pez payaso.', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos_categorias`
--

CREATE TABLE `articulos_categorias` (
  `id_articulo` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `articulos_categorias`
--

INSERT INTO `articulos_categorias` (`id_articulo`, `id_categoria`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre_categoria`) VALUES
(1, 'acuarios'),
(2, 'tecnología'),
(3, 'política'),
(4, 'actualidad'),
(5, 'juegos'),
(6, 'música'),
(7, 'aire libre'),
(8, 'deportes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id` int(100) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `portada` varchar(120) NOT NULL,
  `url` varchar(255) DEFAULT '''Sin url''',
  `descripcion` text DEFAULT 'Sin info',
  `activo` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id`, `nombre`, `portada`, `url`, `descripcion`, `activo`) VALUES
(1, 'Portfolio & Blog', 'port-blog.png', 'http://3.88.13.48', 'Proyecto realizado con HTML5, CSS, JS, JQuery, AJAX y PHP', 1),
(2, 'Masturshop', 'masturshop.png', 'http://3.88.13.48:81', 'Proyecto realizado con HTML5, CSS, JS y Bootstrap', 1),
(3, 'MovieFinder', 'moviefinder.png', 'http://3.88.13.48:8080', 'Proyecto realizado con Angular', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `password_usuario` varchar(255) NOT NULL,
  `tipo_usuario` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `password_usuario`, `tipo_usuario`) VALUES
(1, 'admin', '$2y$10$lJi3iYk/3Uo2d6.fs/EkoOcG7oZOyo0Xo6SEzCCywKnwXb8sh/5XS', 1),
(2, 'root', '$2y$10$iEtnJpifQ3.fxOkVlShO8u2exZMxBOK4S3Clja63ci28cWvScKdGm', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `articulos_categorias`
--
ALTER TABLE `articulos_categorias`
  ADD PRIMARY KEY (`id_articulo`,`id_categoria`),
  ADD KEY `id_articulo` (`id_articulo`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articulos_categorias`
--
ALTER TABLE `articulos_categorias`
  ADD CONSTRAINT `articulos_categorias_ibfk_1` FOREIGN KEY (`id_articulo`) REFERENCES `articulos` (`id`),
  ADD CONSTRAINT `articulos_categorias_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
