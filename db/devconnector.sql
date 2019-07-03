-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2019 at 07:23 PM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.1.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `devconnector`
--

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

CREATE TABLE `education` (
  `id` int(11) NOT NULL,
  `school` varchar(255) DEFAULT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `fieldofstudy` varchar(255) DEFAULT NULL,
  `fromdate` varchar(255) DEFAULT NULL,
  `todate` varchar(255) DEFAULT NULL,
  `currentdate` tinyint(1) DEFAULT NULL,
  `description` text,
  `profileid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `experience`
--

CREATE TABLE `experience` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `fromdate` varchar(255) DEFAULT NULL,
  `todate` varchar(255) DEFAULT NULL,
  `currentdate` tinyint(1) DEFAULT NULL,
  `description` text,
  `profileid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `handle` varchar(40) NOT NULL,
  `company` varchar(255) NOT NULL,
  `website` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `skills` text NOT NULL,
  `bio` text NOT NULL,
  `githubusername` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `handle`, `company`, `website`, `location`, `status`, `skills`, `bio`, `githubusername`, `date`, `userid`) VALUES
(1, '', 'company', 'website', 'location', 'status', '', 'bio', 'githubusername3', '0000-00-00', 3),
(2, '', 'company', 'website', 'location', 'status', '', 'bio', 'githubusername3', '0000-00-00', 2);

-- --------------------------------------------------------

--
-- Table structure for table `social`
--

CREATE TABLE `social` (
  `id` int(11) NOT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `avatar` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `date`, `avatar`) VALUES
(2, 'Taimoor Farooq', 'taimoorfarooq@outlook.com', '$2a$10$tiCr3eIsluWgBb9RbmF32eYq9udZ2CHyIORsPSOqQ7RHGg.XkXaHe', '2019-06-25', '//www.gravatar.com/avatar/fda3f84df69e02cdf0010a3c6c51246a?s=200&r=pg&d=mm'),
(3, 'Mehroz Farooq', 'mehroz@gmail.com', '$2a$10$1YCSSlN8e3LHSBJ86RAVSuonibpe9C0gJ0vUC6PnGQUoQVsW63w2O', '2019-06-27', '//www.gravatar.com/avatar/5037d552045c685eaf6b29f9b03544d1?s=200&r=pg&d=mm'),
(4, 'Hammad Farooq', 'hammad@gmail.com', '$2a$10$NOewMhLz8JR2mm54tSfKzumauviQzL2i1YV6wCp3QwTB2xsY51PP.', '2019-07-02', '//www.gravatar.com/avatar/54491cbb90afcb9e8ad62b3257c2b183?s=200&r=pg&d=mm'),
(5, 'Jawwad Farooq', 'jawwad@gmail.com', '$2a$10$z5K2QdLYI/C0.Z2xR0E46OIbwmKH2REwsIfV9Z/vXKktGFQjHJ8BK', '2019-07-02', '//www.gravatar.com/avatar/1700e526ccb6645061c690aafb8630eb?s=200&r=pg&d=mm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_education` (`profileid`);

--
-- Indexes for table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_experience` (`profileid`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_profile` (`userid`);

--
-- Indexes for table `social`
--
ALTER TABLE `social`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_social` (`userid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `education`
--
ALTER TABLE `education`
  ADD CONSTRAINT `user_education` FOREIGN KEY (`profileid`) REFERENCES `profile` (`id`);

--
-- Constraints for table `experience`
--
ALTER TABLE `experience`
  ADD CONSTRAINT `user_experience` FOREIGN KEY (`profileid`) REFERENCES `profile` (`id`);

--
-- Constraints for table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `user_profile` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);

--
-- Constraints for table `social`
--
ALTER TABLE `social`
  ADD CONSTRAINT `user_social` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
