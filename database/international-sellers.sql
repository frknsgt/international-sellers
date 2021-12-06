-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: database:3306
-- Üretim Zamanı: 06 Ara 2021, 11:41:42
-- Sunucu sürümü: 10.3.32-MariaDB-1:10.3.32+maria~focal
-- PHP Sürümü: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `international-sellers`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblCategory`
--

CREATE TABLE `tblCategory` (
  `Id` int(11) NOT NULL,
  `CategoryName` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `tblCategory`
--

INSERT INTO `tblCategory` (`Id`, `CategoryName`) VALUES
(1, 'Aksesuar'),
(3, 'Bilgisayar'),
(4, 'Fotoğraf makinesi'),
(5, 'Küçük ev aletleri'),
(7, 'Telefon'),
(8, 'Gıda'),
(9, 'Ayakkabı'),
(10, 'Ceket'),
(11, 'Gömlek'),
(12, 'Pantolon'),
(13, 'Kozmetik');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblCompany`
--

CREATE TABLE `tblCompany` (
  `Id` int(11) NOT NULL,
  `CompanyName` varchar(100) CHARACTER SET utf8 NOT NULL,
  `PhoneNumber` varchar(20) CHARACTER SET utf8 NOT NULL,
  `Description` varchar(256) CHARACTER SET utf8 NOT NULL,
  `EmailAddress` varchar(200) CHARACTER SET utf8 NOT NULL,
  `Password` varchar(99) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `tblCompany`
--

INSERT INTO `tblCompany` (`Id`, `CompanyName`, `PhoneNumber`, `Description`, `EmailAddress`, `Password`) VALUES
(2, 'Kadir', '0595987712', 'dasdasdasdasdasd', 'can@project.com', 'password'),
(3, 'Kadir', '+0595987712', 'dasdasdasdasdasd', 'can@project.com', 'password'),
(4, 'aaaaaaaaaaaaaaa', '34342', 'scdsad', 'sdasddsad', 'sddsdsa');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblOrder`
--

CREATE TABLE `tblOrder` (
  `Id` int(11) NOT NULL,
  `CompanyID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `ProductCOunt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `tblOrder`
--

INSERT INTO `tblOrder` (`Id`, `CompanyID`, `ProductID`, `ProductCOunt`) VALUES
(3, 2, 2, 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblProduct`
--

CREATE TABLE `tblProduct` (
  `Id` int(11) NOT NULL,
  `ProductName` varchar(100) CHARACTER SET utf8 NOT NULL,
  `Price` int(11) NOT NULL,
  `StockAmount` int(11) NOT NULL,
  `Description` varchar(256) CHARACTER SET utf8 NOT NULL,
  `CategoryID` int(11) NOT NULL,
  `ImagePath` varchar(256) DEFAULT NULL,
  `CompanyID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `tblProduct`
--

INSERT INTO `tblProduct` (`Id`, `ProductName`, `Price`, `StockAmount`, `Description`, `CategoryID`, `ImagePath`, `CompanyID`) VALUES
(2, 'Kolye', 12, 4, 'Bırbırınden farklı ve guzel kolyeler', 1, 'AKSESUAR/1.jpg', 2),
(3, 'Bılezık', 12, 4, 'bırbırınden farklı guzel bilezikler', 1, 'AKSESUAR/2.jpg', 2),
(4, 'küpe', 10, 4, 'birbirnden farklı güzel küpeeler', 1, 'AKSESUAR/3.jpg', 2),
(6, 'Ayakkabı', 23, 23, 'birbirinden güzel ayakkabı', 9, 'GİYİM/AYAKKABI/1.jpg', 2),
(7, 'Kundura Ayakkabı', 56, 34, 'Birbirinden güzel kundura ayakkabılar', 9, 'GİYİM/AYAKKABI/11.jpg', 2),
(8, 'Gömlek', 32, 32, 'Birbirinden güzel gömlekler', 11, 'GİYİM/GÖMLEK/1B/1_org_zoom.jpg', 2),
(9, 'Makyaj malzemesı', 23, 43, 'birbinden güzel makyaj ürünleri', 13, 'KOZMETİK/1.jpg', 2);

-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `vwOrderList`
-- (Asıl görünüm için aşağıya bakın)
--
CREATE TABLE `vwOrderList` (
`Id` int(11)
,`CompanyID` int(11)
,`ProductID` int(11)
,`ProductCOunt` int(11)
,`ReceiverCompany` varchar(100)
,`ProductName` varchar(100)
,`Price` int(11)
,`StockAmount` int(11)
,`Description` varchar(256)
,`CategoryID` int(11)
,`ImagePath` varchar(256)
,`CategoryName` varchar(100)
,`SellerCompany` varchar(100)
);

-- --------------------------------------------------------

--
-- Görünüm yapısı durumu `vwProductList`
-- (Asıl görünüm için aşağıya bakın)
--
CREATE TABLE `vwProductList` (
`Id` int(11)
,`ProductName` varchar(100)
,`Price` int(11)
,`StockAmount` int(11)
,`Description` varchar(256)
,`CategoryID` int(11)
,`ImagePath` varchar(256)
,`CompanyID` int(11)
,`CategoryName` varchar(100)
,`CompanyName` varchar(100)
);

-- --------------------------------------------------------

--
-- Görünüm yapısı `vwOrderList`
--
DROP TABLE IF EXISTS `vwOrderList`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vwOrderList`  AS SELECT `tblOrder`.`Id` AS `Id`, `tblOrder`.`CompanyID` AS `CompanyID`, `tblOrder`.`ProductID` AS `ProductID`, `tblOrder`.`ProductCOunt` AS `ProductCOunt`, `tblCompany`.`CompanyName` AS `ReceiverCompany`, `vwProductList`.`ProductName` AS `ProductName`, `vwProductList`.`Price` AS `Price`, `vwProductList`.`StockAmount` AS `StockAmount`, `vwProductList`.`Description` AS `Description`, `vwProductList`.`CategoryID` AS `CategoryID`, `vwProductList`.`ImagePath` AS `ImagePath`, `vwProductList`.`CategoryName` AS `CategoryName`, `vwProductList`.`CompanyName` AS `SellerCompany` FROM ((`tblOrder` join `tblCompany` on(`tblOrder`.`CompanyID` = `tblCompany`.`Id`)) join `vwProductList` on(`vwProductList`.`Id` = `tblOrder`.`ProductID`)) ;

-- --------------------------------------------------------

--
-- Görünüm yapısı `vwProductList`
--
DROP TABLE IF EXISTS `vwProductList`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vwProductList`  AS SELECT `tblProduct`.`Id` AS `Id`, `tblProduct`.`ProductName` AS `ProductName`, `tblProduct`.`Price` AS `Price`, `tblProduct`.`StockAmount` AS `StockAmount`, `tblProduct`.`Description` AS `Description`, `tblProduct`.`CategoryID` AS `CategoryID`, `tblProduct`.`ImagePath` AS `ImagePath`, `tblProduct`.`CompanyID` AS `CompanyID`, `tblCategory`.`CategoryName` AS `CategoryName`, `tblCompany`.`CompanyName` AS `CompanyName` FROM ((`tblProduct` join `tblCategory` on(`tblProduct`.`CategoryID` = `tblCategory`.`Id`)) join `tblCompany` on(`tblCompany`.`Id` = `tblProduct`.`CompanyID`)) ;

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `tblCategory`
--
ALTER TABLE `tblCategory`
  ADD PRIMARY KEY (`Id`);

--
-- Tablo için indeksler `tblCompany`
--
ALTER TABLE `tblCompany`
  ADD PRIMARY KEY (`Id`);

--
-- Tablo için indeksler `tblOrder`
--
ALTER TABLE `tblOrder`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CompanyID` (`CompanyID`),
  ADD KEY `ProductID` (`ProductID`);

--
-- Tablo için indeksler `tblProduct`
--
ALTER TABLE `tblProduct`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CategoryID` (`CategoryID`),
  ADD KEY `CompanyID` (`CompanyID`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `tblCategory`
--
ALTER TABLE `tblCategory`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Tablo için AUTO_INCREMENT değeri `tblCompany`
--
ALTER TABLE `tblCompany`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tablo için AUTO_INCREMENT değeri `tblOrder`
--
ALTER TABLE `tblOrder`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tablo için AUTO_INCREMENT değeri `tblProduct`
--
ALTER TABLE `tblProduct`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `tblOrder`
--
ALTER TABLE `tblOrder`
  ADD CONSTRAINT `tblOrder_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `tblProduct` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tblOrder_ibfk_2` FOREIGN KEY (`CompanyID`) REFERENCES `tblCompany` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Tablo kısıtlamaları `tblProduct`
--
ALTER TABLE `tblProduct`
  ADD CONSTRAINT `tblProduct_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `tblCategory` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
