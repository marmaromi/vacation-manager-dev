-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2022 at 12:19 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation-tag`
--
CREATE DATABASE IF NOT EXISTS `vacation-tag` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacation-tag`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `privileges` varchar(10) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `privileges`) VALUES
(1, 'Yoni', 'Cohen', 'admin', 'Aa123456!', 'admin'),
(2, 'Liza', 'Koren', 'liza', 'Bb123456@', 'user'),
(3, 'Moris', 'Katz', 'moris', 'Aa12345@', 'user'),
(4, 'Adi', 'Sasson', 'adisasson', 'Qwerty123#', 'user'),
(5, 'Matan', 'Chen', 'matan', 'Aa123456!', 'user'),
(6, 'Liat', 'Saban', 'liat', 'Dd123456!', 'user'),
(7, 'Liza', 'Lavi', 'Lizala', 'Zz123456$', 'user'),
(8, 'Moran', 'Tal', 'moran', '123456Aa!', 'user'),
(9, 'Adam', 'Ben-Eden', 'adam', 'Aa123456!', 'user'),
(10, 'Eve', 'Bat-Eden', 'eve', 'Aa123456!', 'user'),
(11, 'Idan', 'Levin', 'idan', 'Aa123456!', 'user'),
(15, 'Moti', 'Mualem', 'moti', 'Aa123456!', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `user_tagged_vacations`
--

CREATE TABLE `user_tagged_vacations` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_tagged_vacations`
--

INSERT INTO `user_tagged_vacations` (`userId`, `vacationId`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(3, 1),
(4, 1),
(4, 2),
(5, 1),
(6, 1),
(8, 3);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `description` varchar(300) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int(11) NOT NULL,
  `imageName` varchar(50) NOT NULL,
  `followers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `description`, `destination`, `startDate`, `endDate`, `price`, `imageName`, `followers`) VALUES
(1, 'Culinary trip to Paris', 'Paris', '2022-06-26', '2022-06-30', 2500, '', 5),
(2, 'Psychdelic trip to Amsterdam', 'Amsterdam', '2022-06-12', '2022-06-18', 4000, '', 3),
(3, 'Enjoy Thailand\'s best islands and beaches', 'Thailand', '2022-07-03', '2022-07-24', 10000, '', 2),
(8, 'A Romantic trip to Rome', 'Rome', '2022-06-20', '2022-06-30', 3500, 'bbb.jpg', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `user_tagged_vacations`
--
ALTER TABLE `user_tagged_vacations`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_tagged_vacations`
--
ALTER TABLE `user_tagged_vacations`
  ADD CONSTRAINT `user_tagged_vacations_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_tagged_vacations_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
