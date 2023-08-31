SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET CHARSET utf8mb4;

START TRANSACTION;

CREATE TABLE `glyph`(
    `_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `family_name` varchar(50) NOT NULL,
    `block` varchar(50) NOT NULL,
    `unicode` int(11) NOT NULL,
    `data` JSON NOT NULL,
    `user` varchar(50) NOT NULL ,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;