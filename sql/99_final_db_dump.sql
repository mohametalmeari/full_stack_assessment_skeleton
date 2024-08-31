CREATE TABLE user (
  `user_id` int AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(100) UNIQUE NOT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE home (
  `home_id` int AUTO_INCREMENT PRIMARY KEY,
  `street_address` varchar(255) UNIQUE NOT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `sqft` float DEFAULT NULL,
  `beds` int DEFAULT NULL,
  `baths` int DEFAULT NULL,
  `list_price` float DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO user (`username`, `email`)
SELECT DISTINCT `username`, `email`
FROM user_home;

INSERT INTO home (`street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`)
SELECT DISTINCT `street_address`, `state`, `zip`, `sqft`, `beds`, `baths`, `list_price`
FROM user_home;

ALTER TABLE user_home
ADD COLUMN `id` int AUTO_INCREMENT PRIMARY KEY,
ADD COLUMN `user_id` int NOT NULL,
ADD COLUMN `home_id` int NOT NULL;

UPDATE user_home r JOIN user 
ON r.username = user.username
SET r.user_id = user.user_id;

UPDATE user_home r JOIN home
ON r.street_address = home.street_address 
SET r.home_id = home.home_id;

ALTER TABLE user_home
DROP COLUMN `username`,
DROP COLUMN `email`,
DROP COLUMN `street_address`,
DROP COLUMN `state`,
DROP COLUMN `zip`,
DROP COLUMN `sqft`,
DROP COLUMN `beds`,
DROP COLUMN `baths`,
DROP COLUMN `list_price`;

ALTER TABLE user_home
ADD CONSTRAINT key_user FOREIGN KEY (user_id) REFERENCES user(user_id),
ADD CONSTRAINT key_home FOREIGN KEY (home_id) REFERENCES home(home_id);