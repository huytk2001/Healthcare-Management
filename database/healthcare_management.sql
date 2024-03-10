-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 23, 2023 lúc 09:06 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `healthcare_management`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `appointments`
--

CREATE TABLE `appointments` (
  `Appointment_id` int(11) NOT NULL,
  `Doctor_id` int(11) DEFAULT NULL,
  `Customer_id` int(11) DEFAULT NULL,
  `Room_id` int(11) DEFAULT NULL,
  `Date` varchar(255) DEFAULT NULL,
  `Time` varchar(255) DEFAULT NULL,
  `Status` enum('Đang xử lý','Đã duyệt','Đã từ chối') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `appointments`
--

INSERT INTO `appointments` (`Appointment_id`, `Doctor_id`, `Customer_id`, `Room_id`, `Date`, `Time`, `Status`) VALUES
(54, 16, 57, 7, '24/12/2023', '7:00-8:00', 'Đang xử lý');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `Customer_id` int(11) NOT NULL,
  `User_Id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`Customer_id`, `User_Id`) VALUES
(57, 3);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `doctors`
--

CREATE TABLE `doctors` (
  `Doctor_id` int(11) NOT NULL,
  `User_Id` int(11) DEFAULT NULL,
  `Specialty1` varchar(255) NOT NULL,
  `Specialty2` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `Room_Number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `doctors`
--

INSERT INTO `doctors` (`Doctor_id`, `User_Id`, `Specialty1`, `Specialty2`, `Address`, `Phone`, `Room_Number`) VALUES
(16, 46, 'Cơ xương khớp', 'Có', 'Cần Thơ', '0123456789', 1),
(17, 47, 'Thần kinh', 'Có', 'Cần Thơ', '0123456789', 17),
(18, 48, 'Tiêu hóa', 'Không', 'Cần Thơ', '0123456789', 18),
(19, 49, 'Tim mạch', 'Có', 'Cần Thơ', '0123456789', 19),
(20, 50, 'Tai mũi họng', 'Có', 'Cần Thơ', '0123456789', 20);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rooms`
--

CREATE TABLE `rooms` (
  `Room_id` int(11) NOT NULL,
  `Room_number` int(11) NOT NULL,
  `Available` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `rooms`
--

INSERT INTO `rooms` (`Room_id`, `Room_number`, `Available`) VALUES
(7, 1, 1),
(8, 17, 1),
(9, 18, 1),
(10, 19, 1),
(11, 20, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `User_Id` int(11) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Date_of_birth` date DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Role` enum('admin','doctor','customer') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`User_Id`, `Email`, `Password`, `Name`, `Gender`, `Date_of_birth`, `Phone`, `Address`, `Role`) VALUES
(1, 'admin@gmail.com', '123', 'Admin', NULL, NULL, NULL, NULL, 'admin'),
(2, 'doctor@gmail.com', '123', 'Doctor', NULL, NULL, NULL, NULL, 'doctor'),
(3, 'customer@gmail.com', '123', 'Nguyễn Văn Dũng', 'Nam', '2000-10-23', '0123456789', 'Cần Thơ', 'customer'),
(46, 'bs1@gmail.com', '123', 'Bác sĩ 1', NULL, NULL, NULL, NULL, 'doctor'),
(47, 'bs2@gmail.com', '123', 'Bác sĩ 2', NULL, NULL, NULL, NULL, 'doctor'),
(48, 'bs3@gmail.com', '123', 'Bác sĩ 3', NULL, NULL, NULL, NULL, 'doctor'),
(49, 'bs4@gmail.com', '123', 'Bác sĩ 4', NULL, NULL, NULL, NULL, 'doctor'),
(50, 'bs5@gmail.com', '123', 'Bác sĩ 5', NULL, NULL, NULL, NULL, 'doctor');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`Appointment_id`),
  ADD KEY `Doctor_id` (`Doctor_id`),
  ADD KEY `Customer_id` (`Customer_id`),
  ADD KEY `Room_id` (`Room_id`);

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`Customer_id`),
  ADD KEY `User_Id` (`User_Id`);

--
-- Chỉ mục cho bảng `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`Doctor_id`),
  ADD KEY `User_Id` (`User_Id`);

--
-- Chỉ mục cho bảng `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`Room_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User_Id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `appointments`
--
ALTER TABLE `appointments`
  MODIFY `Appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `Customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT cho bảng `doctors`
--
ALTER TABLE `doctors`
  MODIFY `Doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `rooms`
--
ALTER TABLE `rooms`
  MODIFY `Room_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `User_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`Doctor_id`) REFERENCES `doctors` (`Doctor_id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`Customer_id`) REFERENCES `customers` (`Customer_id`),
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`Room_id`) REFERENCES `rooms` (`Room_id`);

--
-- Các ràng buộc cho bảng `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`User_Id`) REFERENCES `users` (`User_Id`);

--
-- Các ràng buộc cho bảng `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`User_Id`) REFERENCES `users` (`User_Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
