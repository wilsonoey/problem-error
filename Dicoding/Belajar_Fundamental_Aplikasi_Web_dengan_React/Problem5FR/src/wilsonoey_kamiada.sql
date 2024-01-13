-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2023 at 07:50 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wilsonoey_kamiada`
--

-- --------------------------------------------------------

--
-- Table structure for table `authuserskad`
--

CREATE TABLE `authuserskad` (
  `tokenuser` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `serviceskad`
--

CREATE TABLE `serviceskad` (
  `idservice` varchar(55) NOT NULL,
  `iduser` bigint(20) NOT NULL,
  `nameservice` varchar(150) NOT NULL,
  `avatarservice` varchar(200) NOT NULL,
  `descriptionservice` text NOT NULL,
  `categoryservice` varchar(50) NOT NULL,
  `areaservice` varchar(150) NOT NULL,
  `contactservice` varchar(150) NOT NULL,
  `statusservice` varchar(150) NOT NULL,
  `createdatservice` datetime NOT NULL,
  `updatedatservice` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `userskad`
--

CREATE TABLE `userskad` (
  `iduser` bigint(20) NOT NULL,
  `avataruser` varchar(200) NOT NULL,
  `username` varchar(20) NOT NULL,
  `completename` varchar(100) NOT NULL,
  `phoneuser` bigint(20) NOT NULL,
  `emailuser` varchar(100) NOT NULL,
  `roleuser` varchar(20) NOT NULL,
  `statususer` varchar(50) NOT NULL,
  `passworduser` text NOT NULL,
  `createdatuser` datetime NOT NULL,
  `updatedatuser` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `serviceskad`
--
ALTER TABLE `serviceskad`
  ADD PRIMARY KEY (`idservice`),
  ADD UNIQUE KEY `iduser` (`iduser`);

--
-- Indexes for table `userskad`
--
ALTER TABLE `userskad`
  ADD PRIMARY KEY (`iduser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `userskad`
--
ALTER TABLE `userskad`
  MODIFY `iduser` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=710199562407486;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `serviceskad`
--
ALTER TABLE `serviceskad`
  ADD CONSTRAINT `serviceskad_ibfk_1` FOREIGN KEY (`iduser`) REFERENCES `userskad` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
