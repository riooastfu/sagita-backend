-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 27, 2022 at 05:14 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.2.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_pasien`
--

-- --------------------------------------------------------

--
-- Table structure for table `kmt`
--

DROP TABLE IF EXISTS `kmt`;
CREATE TABLE IF NOT EXISTS `kmt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `umur` int(2) DEFAULT NULL,
  `k1sd` decimal(3,1) DEFAULT NULL,
  `median` decimal(3,1) DEFAULT NULL,
  `l1sd` decimal(3,1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kmt`
--

INSERT INTO `kmt` (`id`, `umur`, `k1sd`, `median`, `l1sd`) VALUES
(1, 0, '12.2', '13.4', '14.8'),
(2, 1, '13.6', '14.9', '16.3'),
(3, 2, '15.0', '16.3', '17.8'),
(4, 3, '15.5', '16.9', '18.4'),
(5, 4, '15.8', '17.2', '18.7'),
(6, 5, '15.9', '17.3', '18.8'),
(7, 6, '16.0', '17.3', '18.8'),
(8, 7, '16.0', '17.3', '18.8'),
(9, 8, '15.9', '17.3', '18.7'),
(10, 9, '15.8', '17.2', '18.6'),
(11, 10, '15.7', '17.0', '18.5'),
(12, 11, '15.6', '16.9', '18.4'),
(13, 12, '15.5', '16.8', '18.2'),
(14, 13, '15.4', '16.7', '18.1'),
(15, 14, '15.3', '16.6', '18.0'),
(16, 15, '15.2', '16.4', '17.8'),
(17, 16, '15.1', '16.3', '17.7'),
(18, 17, '15.0', '16.2', '17.6'),
(19, 18, '14.9', '16.1', '17.5'),
(20, 19, '14.9', '16.1', '17.4'),
(21, 20, '14.8', '16.0', '17.3'),
(22, 21, '14.7', '15.9', '17.2'),
(23, 22, '14.7', '15.8', '17.2'),
(24, 23, '14.6', '15.8', '17.1'),
(25, 24, '14.8', '16.0', '17.3'),
(26, 25, '14.8', '16.0', '17.3'),
(27, 26, '14.8', '15.9', '17.3'),
(28, 27, '14.7', '15.9', '17.2'),
(29, 28, '14.7', '15.9', '17.2'),
(30, 29, '14.7', '15.8', '17.1'),
(31, 30, '14.6', '15.8', '17.1'),
(32, 31, '14.6', '15.8', '17.1'),
(33, 32, '14.6', '15.7', '17.0'),
(34, 33, '14.5', '15.7', '17.0'),
(35, 34, '14.5', '15.7', '17.0'),
(36, 35, '14.5', '15.6', '16.9'),
(37, 36, '14.4', '15.6', '16.9'),
(38, 37, '14.4', '15.6', '16.9'),
(39, 38, '14.4', '15.5', '16.8'),
(40, 39, '14.3', '15.5', '16.8'),
(41, 40, '14.3', '15.5', '16.8'),
(42, 41, '14.3', '15.5', '16.8'),
(43, 42, '14.3', '15.4', '16.8'),
(44, 43, '14.2', '15.4', '16.7'),
(45, 44, '14.2', '15.4', '16.7'),
(46, 45, '14.2', '15.4', '16.7'),
(47, 46, '14.2', '15.4', '16.7'),
(48, 47, '14.2', '15.3', '16.7'),
(49, 48, '14.1', '15.3', '16.7'),
(50, 49, '14.1', '15.3', '16.7'),
(51, 50, '14.1', '15.3', '16.7'),
(52, 51, '14.1', '15.3', '16.6'),
(53, 52, '14.1', '15.3', '16.6'),
(54, 53, '14.1', '15.3', '16.6'),
(55, 54, '14.0', '15.3', '16.6'),
(56, 55, '14.0', '15.2', '16.6'),
(57, 56, '14.0', '15.2', '16.6'),
(58, 57, '14.0', '15.2', '16.6'),
(59, 58, '14.0', '15.2', '16.6'),
(60, 59, '14.0', '15.2', '16.6'),
(61, 60, '14.0', '15.2', '16.6');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
