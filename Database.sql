-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2022 at 03:21 PM
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
-- Database: `vacation-manager`
--
CREATE DATABASE IF NOT EXISTS `vacation-manager` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacation-manager`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(128) NOT NULL,
  `privileges` varchar(5) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `privileges`) VALUES
(1, 'Ido', 'Marom', 'admin', '970fd80ea8466e45106c9fa9ba6a0c0a02dfaac5d2af769111a9c611c7d0bf058ba8a3a6f8cf5f33a3ccaee600654f2d2f2ec29bd1a86b0af5f9df47ed03ed5b', 'admin'),
(2, 'Liza', 'Koren', 'liza', '970fd80ea8466e45106c9fa9ba6a0c0a02dfaac5d2af769111a9c611c7d0bf058ba8a3a6f8cf5f33a3ccaee600654f2d2f2ec29bd1a86b0af5f9df47ed03ed5b', 'user'),
(3, 'Moris', 'Katz', 'moris', '970fd80ea8466e45106c9fa9ba6a0c0a02dfaac5d2af769111a9c611c7d0bf058ba8a3a6f8cf5f33a3ccaee600654f2d2f2ec29bd1a86b0af5f9df47ed03ed5b', 'user'),
(4, 'Adi', 'Sasson', 'adisasson', '970fd80ea8466e45106c9fa9ba6a0c0a02dfaac5d2af769111a9c611c7d0bf058ba8a3a6f8cf5f33a3ccaee600654f2d2f2ec29bd1a86b0af5f9df47ed03ed5b', 'user'),
(5, 'Matan', 'Chen', 'matan', '970fd80ea8466e45106c9fa9ba6a0c0a02dfaac5d2af769111a9c611c7d0bf058ba8a3a6f8cf5f33a3ccaee600654f2d2f2ec29bd1a86b0af5f9df47ed03ed5b', 'user'),
(6, 'Liat', 'Saban', 'liat', '970fd80ea8466e45106c9fa9ba6a0c0a02dfaac5d2af769111a9c611c7d0bf058ba8a3a6f8cf5f33a3ccaee600654f2d2f2ec29bd1a86b0af5f9df47ed03ed5b', 'user'),
(7, 'Liza', 'Lavi', 'Lizala', '970fd80ea8466e45106c9fa9ba6a0c0a02dfaac5d2af769111a9c611c7d0bf058ba8a3a6f8cf5f33a3ccaee600654f2d2f2ec29bd1a86b0af5f9df47ed03ed5b', 'user'),
(8, 'Moran', 'Tal', 'moran', '970fd80ea8466e45106c9fa9ba6a0c0a02dfaac5d2af769111a9c611c7d0bf058ba8a3a6f8cf5f33a3ccaee600654f2d2f2ec29bd1a86b0af5f9df47ed03ed5b', 'user'),
(9, 'Adam', 'Ben-Eden', 'adam', '970fd80ea8466e45106c9fa9ba6a0c0a02dfaac5d2af769111a9c611c7d0bf058ba8a3a6f8cf5f33a3ccaee600654f2d2f2ec29bd1a86b0af5f9df47ed03ed5b', 'user'),
(10, 'Eve', 'Bat-Eden', 'eve', '970fd80ea8466e45106c9fa9ba6a0c0a02dfaac5d2af769111a9c611c7d0bf058ba8a3a6f8cf5f33a3ccaee600654f2d2f2ec29bd1a86b0af5f9df47ed03ed5b', 'user'),
(11, 'Idan', 'Levin', 'idan', '970fd80ea8466e45106c9fa9ba6a0c0a02dfaac5d2af769111a9c611c7d0bf058ba8a3a6f8cf5f33a3ccaee600654f2d2f2ec29bd1a86b0af5f9df47ed03ed5b', 'user'),
(15, 'Moti', 'Mualem', 'moti', '970fd80ea8466e45106c9fa9ba6a0c0a02dfaac5d2af769111a9c611c7d0bf058ba8a3a6f8cf5f33a3ccaee600654f2d2f2ec29bd1a86b0af5f9df47ed03ed5b', 'user'),
(18, 'Yoni', 'Cohen', 'yoni', '970fd80ea8466e45106c9fa9ba6a0c0a02dfaac5d2af769111a9c611c7d0bf058ba8a3a6f8cf5f33a3ccaee600654f2d2f2ec29bd1a86b0af5f9df47ed03ed5b', 'user');

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
(2, 15),
(2, 18),
(2, 20),
(4, 16),
(9, 13),
(9, 15),
(11, 15),
(18, 13),
(18, 15),
(18, 17),
(18, 20);

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
(13, 'California\'s best vineyards', 'California', '2022-08-17', '2022-09-18', 35000, '3a1ebb4b-e100-445b-a89f-3ac5821ba03e.jpg', 2),
(15, 'Enjoy the city of Tel Aviv', 'Tel Aviv', '2022-07-15', '2022-07-25', 130000, '3a8cbea6-7ffa-457d-acd6-493e94eb4769.jpg', 4),
(16, 'Culinary trip to Paris', 'Paris', '2022-07-04', '2022-07-08', 3500, 'e555aa5c-2816-4320-8f13-5ee154e8cb30.jpg', 1),
(17, 'Psychdelic trip to Amsterdam', 'Amsterdam', '2022-07-26', '2022-07-30', 8000, 'fd34378c-e6eb-4b9f-8f2d-506e0a6cb2a9.jpg', 1),
(18, 'Enjoy Beautiful islands and beaches', 'Thailand', '2022-07-04', '2022-08-03', 25000, 'c0c3f311-91f4-41df-bab0-634dc3c71242.jpg', 1),
(20, 'Safari trip in South Africa', 'South Africa', '2022-07-20', '2022-07-28', 35000, '3fa288b5-addb-4362-9fc2-f1384bf6a1f5.jpg', 2),
(21, 'New york City and Manhattan', 'New York', '2022-07-18', '2022-08-30', 3000, 'eb772156-9739-4261-a92b-f2ac4c221a12.jpg', 0),
(33, 'Romance in Rome', 'Rome', '2022-07-26', '2022-07-30', 4500, '138922fc-aa63-46a4-bb60-11f1d5b678b9.jpg', 0),
(41, 'Trip to Petra', 'Petra', '2022-07-25', '2022-07-28', 1500, 'd5e29e7d-3b8b-417c-9e14-b992d608266e.jpg', 0);

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
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

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
