-- ACMEBUDDYDB database creation
DROP DATABASE IF EXISTS acmebuddydb;
CREATE DATABASE acmebuddydb;
USE acmebuddydb;

-- --------------------------------User creation--------------------------------

DROP USER IF EXISTS 'user'@'localhost';

CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON acmebuddydb.* TO 'user'@'localhost';

FLUSH PRIVILEGES;
    
-- --------------------------------Table creation--------------------------------


-- create THEATRE table
CREATE TABLE THEATRE (
	Id_num INT PRIMARY KEY,
	Location Varchar(100)
);

-- create MOVIE table
CREATE TABLE MOVIE (
	Id_num INT PRIMARY KEY,
    Title Varchar(100),
    Image Varchar(255),
    Runtime Varchar(100),
    Premiere_date DATE,
    Details TEXT
);

-- Create THEATRE_MOVIE table (associates movies with theatres)
CREATE TABLE THEATRE_MOVIE (
    Id_num INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for the association
    Theatre_Id INT NOT NULL,
    Movie_Id INT NOT NULL,
    FOREIGN KEY (Theatre_Id) REFERENCES THEATRE(Id_num),
    FOREIGN KEY (Movie_Id) REFERENCES MOVIE(Id_num),
    UNIQUE (Theatre_Id, Movie_Id) -- Prevents duplicate theatre-movie pairings
);


-- create SEATMAP table
CREATE TABLE SEATMAP (
	Id_num INT PRIMARY KEY,
	Num_of_columns INT NOT NULL,
    Num_of_rows INT NOT NULL,
    UNIQUE (Num_of_columns, Num_of_rows)
);

CREATE TABLE SHOWTIME (
    Id_num INT AUTO_INCREMENT PRIMARY KEY,
    Theatre_Movie_Id INT NOT NULL, -- References THEATRE_MOVIE
    Date_time DATETIME NOT NULL,
    Seatmap_Id INT NOT NULL,
    FOREIGN KEY (Theatre_Movie_Id) REFERENCES THEATRE_MOVIE(Id_num),
    FOREIGN KEY (Seatmap_Id) REFERENCES SEATMAP(Id_num)
);

-- create SEAT table
CREATE TABLE SEAT (
	Id_num INT AUTO_INCREMENT PRIMARY KEY,
    Seatmap_Id INT NOT NULL,
    Row_num INT NOT NULL,
    Column_num INT NOT NULL,
    FOREIGN KEY (Seatmap_Id) REFERENCES SEATMAP(Id_num),
    UNIQUE (Seatmap_Id, Row_num, Column_num) -- Ensures no duplicate seats for a seatmap
);

-- create SEAT_AVAILABILITY table
CREATE TABLE SEAT_AVAILABILITY (
    Id_num INT AUTO_INCREMENT PRIMARY KEY,
    Showtime_Id INT NOT NULL,
    Seat_Id INT NOT NULL,
    State INT DEFAULT 0, -- 0: Available, 1: Unavailable
    FOREIGN KEY (Showtime_Id) REFERENCES SHOWTIME(Id_num),
    FOREIGN KEY (Seat_Id) REFERENCES SEAT(Id_num),
    UNIQUE (Showtime_Id, Seat_Id) -- Ensures no duplicate seat states per showtime
);

-- create USERS table
CREATE TABLE USERS (
    Id_num INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255) UNIQUE
);

-- create CREDITS table
CREATE TABLE CREDITS (
    Id_num INT AUTO_INCREMENT PRIMARY KEY,
    User_Id INT,
    Credit_Amount DECIMAL(10, 2),
    Created_On DATETIME,
    FOREIGN KEY (User_Id) REFERENCES USERS(Id_num)
);

-- create PAYMENTS table
CREATE TABLE PAYMENTS (
    Id_num INT AUTO_INCREMENT PRIMARY KEY,
    Cardnumber VARCHAR(20),
    Expiry VARCHAR(5),
    CVV VARCHAR(3) -- back 3 numbers, should be encrypted but doesn't matter right now
);

-- create ADDRESSES table
CREATE TABLE ADDRESSES (
    Id_num INT AUTO_INCREMENT PRIMARY KEY,
    Street VARCHAR(255),  -- Street address
    City VARCHAR(100),  -- City
    State VARCHAR(100),  -- State/province
    Zip_Code VARCHAR(20)  -- Zip/Postal code
);

-- create REGISTEREDUSERS table (extends USERS)
CREATE TABLE REGISTEREDUSERS (
    User_Id INT PRIMARY KEY,  -- Foreign key referencing USERS
    Payment_Id INT,  -- Foreign key referencing PAYMENTS
    Address_Id INT,  -- Foreign key referencing ADDRESSES
    Pass VARCHAR(255),   -- Password
    FOREIGN KEY (User_Id) REFERENCES USERS(Id_num),
    FOREIGN KEY (Payment_Id) REFERENCES PAYMENTS(Id_num),
    FOREIGN KEY (Address_Id) REFERENCES ADDRESSES(Id_num)
);

-- create TICKET table
CREATE TABLE TICKET (
	Id_num INT AUTO_INCREMENT PRIMARY KEY,
    User_Id INT,
    Showtime_Id INT,
    Seat_Id INT,
    State INT DEFAULT 0, -- 0:Valid, 1:Invalid
    Age INT, -- 0:Adult, 1:Child
    FOREIGN KEY (User_Id) REFERENCES USERS(Id_num),
    FOREIGN KEY (Showtime_Id) REFERENCES SHOWTIME(Id_num),
    FOREIGN KEY (Seat_Id) REFERENCES SEAT(Id_num)
);

-- create RECEIPT table
CREATE TABLE RECEIPT (
	Id_num INT AUTO_INCREMENT PRIMARY KEY,
    Date_placed DATETIME,
    Cost DECIMAL(10,2),
    User_Id INT,
    Ticket_Id INT,
    FOREIGN KEY (User_Id) REFERENCES USERS(Id_num),
    FOREIGN KEY (Ticket_Id) REFERENCES TICKET(Id_num)
);







-- --------------------------------Data insertion--------------------------------


-- Insert data into THEATRE
INSERT INTO THEATRE (Id_num, Location) VALUES
(1, 'Scotiabank Theatre Toronto, ON'),
(2, 'Top Secret Avenue, Toronto, ON'),
(3, 'Scary Road, Edmonton, AB'),
(4, 'West City Mall, New Westminster, BC'),
(5, 'Long Road, Langley, BC'),
(6, 'SilverCity Sudbury, Sudbury, ON'),
(7, 'Avalon Mall, St. Johns, NL'),
(8, 'Westgarden, Halifax, NS'),
(9, 'Wizard Street, Montreal, QC'),
(10, 'Cool Park Lane, Halifax, NS');

-- Insert data into MOVIE
INSERT INTO MOVIE (Id_num, Title, Image, Runtime, Premiere_date, Details) VALUES
(1, 'Inception', 'https://m.media-amazon.com/images/I/71uKM+LdgFL.jpg', '2 hours 28 minutes', '2010-07-16', 'A skilled thief is given a chance at redemption if he can successfully perform inception: planting an idea into a target\'s subconscious.'),
(2, 'Fight Club', 'https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg', '2 hours 19 minutes', '1999-10-15', 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.'),
(3, 'The Lord of the Rings: The Fellowship of the Ring', 'https://m.media-amazon.com/images/I/51Qvs9i5a%2BL._AC_.jpg', '2 hours 58 minutes', '2001-12-19', 'A young hobbit, Frodo, is entrusted with an ancient ring and must embark on a dangerous journey to destroy it.'),
(4, 'Aladdin', 'https://m.media-amazon.com/images/I/71liEu4AGtL._AC_UF894,1000_QL80_.jpg', '1 hour 30 minutes', '1992-11-25', 'A kindhearted street urchin and a power-hungry Grand Vizier vie for a magical lamp that has the power to make their deepest wishes come true.'),
(5, 'Harry Potter and the Chamber of Secrets', 'https://i.ebayimg.com/00/s/MTIyNVg4MzA=/z/PDQAAOSw~gRV3MYT/$_57.JPG?set_id=880000500F', '2 hours 41 minutes', '2002-11-15', 'Harry returns to Hogwarts, encountering a new series of mysteries and adventures in his second year at the magical school.'),
(6, 'Jujutsu Kaisen 0', 'https://preview.redd.it/jujustu-kaisen-0-movie-new-poster-v0-hnv1ld077l981.jpg?auto=webp&s=844177225776898b52a73fb27eb9a33511d4cb5f', '1 hour 45 minutes', '2021-12-24', 'Yuta Okkotsu gains control of an extremely powerful Cursed Spirit and gets enrolled in the Tokyo Prefectural Jujutsu High School by Jujutsu Sorcerers.'),
(7, 'The Dark Knight', 'https://m.media-amazon.com/images/I/91KkWf50SoL._AC_SY679_.jpg', '2 hours 32 minutes', '2008-07-18', 'When the Joker emerges as a new criminal mastermind, Batman must navigate a dangerous game of morality and justice to save Gotham.'),
(8, 'Naruto The Movie: Blood Prison', 'https://musicart.xboxlive.com/7/3d281100-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080', '1 hour 48 minutes', '2011-07-30', 'Naruto is falsely accused of attempted assassination and imprisoned in a criminal facility where he must clear his name and uncover the real culprit.'),
(9, 'Joker', 'https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1500x1500/products/89058/93685/Joker-2019-Final-Style-steps-Poster-buy-original-movie-posters-at-starstills__62518.1669120603.jpg?c=2', '2 hours 2 minutes', '2019-10-04', 'In Gotham\'s fractured society, Arthur Fleck, a man disregarded by society, embarks on a downward spiral that leads to the creation of an iconic villain.'),
(10, 'Godzilla', 'https://www.scified.com/media/Godzilla_2014_UK_DVD.jpg', '2 hours 3 minutes', '2014-05-16', 'The world is beset by the appearance of monstrous creatures, but one of them may be the only one who can save humanity.'),
(11, 'The Amazing Spider-Man 2', 'https://m.media-amazon.com/images/I/91uoRcLfmZL.jpg', '2 hours 22 minutes', '2014-05-02', 'Spider-Man faces new challenges as he encounters the powerful villain Electro and grapples with personal sacrifices.'),
(12, 'The Little Mermaid', 'https://preview.redd.it/a16m71j1fxr11.jpg?width=1400&format=pjpg&auto=webp&s=2859a91e020f3ab95e2c5cd43cc8241997d7f476', '1 hour 23 minutes', '1989-11-17', 'A young mermaid makes a dangerous deal with a sea witch to become human and win the heart of a prince.');

-- Insert data into THEATRE_MOVIE (associating movies with theaters)
INSERT INTO THEATRE_MOVIE (Theatre_Id, Movie_Id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8),
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10), (2, 11), (2, 12),
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6), (3, 7), (3, 8), (3, 9), (3, 10), (3, 11), (3, 12),
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8), (4, 9), (4, 10), (4, 11), (4, 12),
(5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6), (5, 7), (5, 8), (5, 9), (5, 10), (5, 11), (5, 12),
(6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 6), (6, 7), (6, 8), (6, 9), (6, 10), (6, 11), (6, 12),
(7, 1), (7, 2), (7, 3), (7, 4), (7, 5), (7, 6), (7, 7), (7, 8), (7, 9), (7, 10), (7, 11), (7, 12),
(8, 1), (8, 2), (8, 3), (8, 4), (8, 5), (8, 6), (8, 7), (8, 8), (8, 9), (8, 10), (8, 11), (8, 12),
(9, 1), (9, 2), (9, 3), (9, 4), (9, 5), (9, 6), (9, 7), (9, 8), (9, 9), (9, 10), (9, 11), (9, 12),
(10, 1), (10, 2), (10, 3), (10, 4), (10, 5), (10, 6), (10, 7), (10, 8), (10, 9), (10, 10), (10, 11), (10, 12);

-- Insert data into SEATMAP
INSERT INTO SEATMAP (Id_num, Num_of_columns, Num_of_rows) VALUES 
(1, 10, 5); -- A seatmap with 5 rows and 10 columns

-- Insert data into SEAT (5x10 grid for Seatmap_Id 1)
INSERT INTO SEAT (Seatmap_Id, Row_num, Column_num)
SELECT 1 AS Seatmap_Id, r.Row_num, c.Column_num
FROM (
    SELECT 1 AS Row_num UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5
) r
CROSS JOIN (
    SELECT 1 AS Column_num UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5
    UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10
) c;

-- Insert data into SHOWTIME
INSERT INTO SHOWTIME (Theatre_Movie_Id, Date_time, Seatmap_Id)
SELECT tm.Id_num, CONCAT('2024-12-07 ', t.show_time) AS Date_time, 1 AS Seatmap_Id
FROM THEATRE_MOVIE tm
CROSS JOIN (SELECT '10:00:00' AS show_time UNION ALL SELECT '14:00:00' UNION ALL SELECT '18:00:00') t;

-- Update specific showtimes to be 100 days in the future
SET @future_date = DATE_ADD(NOW(), INTERVAL 100 DAY);

-- Hardcode updates for specific showtimes
UPDATE SHOWTIME
SET Date_time = @future_date
WHERE Id_num IN (3, 7, 15, 20, 25); -- IDs chosen for a variety of showtimes

-- Update SEAT_AVAILABILITY to mark all seats as available for each showtime
INSERT INTO SEAT_AVAILABILITY (Showtime_Id, Seat_Id, State)
SELECT s.Id_num AS Showtime_Id, seat.Id_num AS Seat_Id, 0 AS State
FROM SHOWTIME s
CROSS JOIN SEAT seat;


-- Insert data into USERS
INSERT INTO USERS (Email) VALUES 
('john.doe@example.com'), 
('jane.smith@example.com');

-- Insert data into CREDITS
INSERT INTO CREDITS (User_Id, Credit_Amount, Created_On) VALUES 
(1, 50.00, NOW()), 
(2, 100.00,NOW());

-- Insert data into PAYMENTS
INSERT INTO PAYMENTS (Cardnumber, Expiry, CVV) VALUES 
('1234567890123456', '12/25', '123'),
('9876543210987654', '08/26', '456');

-- Insert data into ADDRESSES
INSERT INTO ADDRESSES (Street, City, State, Zip_Code) VALUES 
('123 Main St', 'Calgary', 'AB', 'T2P 0J2'), 
('456 Elm St', 'Vancouver', 'BC', 'V5K 0A1');

-- Insert data into REGISTEREDUSERS
INSERT INTO REGISTEREDUSERS (User_Id, Payment_Id, Address_Id, Pass) VALUES 
(1, 1, 1, 'password123'), 
(2, 2, 2, 'securepass456');

-- Insert data into TICKET (create tickets for SHOWTIME 1)
INSERT INTO TICKET (User_Id, Showtime_Id, Seat_Id, State, age) 
VALUES (1, 1, 1, 0, 1), (2, 1, 2, 0,1);

-- Insert data into RECEIPT
INSERT INTO RECEIPT (Date_placed, Cost, User_Id, Ticket_Id) VALUES 
(NOW(), 50, 1, 1), 
(NOW(), 50, 2, 2);


