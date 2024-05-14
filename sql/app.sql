-- Création de la table users
CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    zip_code VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);


-- Création de la table conversations
CREATE TABLE conversations (
    conversation_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    support_id INT,
    is_active BOOLEAN NOT NULL,
    user_seen BOOLEAN NOT NULL,
    support_seen BOOLEAN NOT NULL,
    created_at DATE NOT NULL,
    updated_at DATE NOT NULL,
    PRIMARY KEY (conversation_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (support_id) REFERENCES users(user_id)
);

-- Création de la table messages
CREATE TABLE messages (
    message_id INT NOT NULL AUTO_INCREMENT,
    conversation_id INT NOT NULL,
    sender_id INT NOT NULL,
    message_text TEXT NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY (message_id),
    FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id),
    FOREIGN KEY (sender_id) REFERENCES users(user_id)
);

-- Création de la table currencies
CREATE TABLE currencies (
    currency_id INT NOT NULL AUTO_INCREMENT,
    code VARCHAR(255) NOT NULL UNIQUE,
    symbol VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (currency_id)
);

-- Création de la table agencies
CREATE TABLE agencies (
    agency_id INT NOT NULL AUTO_INCREMENT,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    zip_code VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    PRIMARY KEY (agency_id)
);

-- Création de la table car_categories
CREATE TABLE car_categories (
    category_id INT NOT NULL AUTO_INCREMENT,
    acriss_code VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (category_id)
);

-- Création de la table cars
CREATE TABLE cars (
    car_id INT NOT NULL AUTO_INCREMENT,
    category_id INT NOT NULL,
    agency_id INT NOT NULL,
    make VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year YEAR NOT NULL,
    price_per_day DECIMAL(10, 2) NOT NULL,
    seats INT NOT NULL,
    transmission VARCHAR(255) NOT NULL,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (car_id),
    FOREIGN KEY (category_id) REFERENCES car_categories(category_id),
    FOREIGN KEY (agency_id) REFERENCES agencies(agency_id)
);

-- Création de la table user_settings
CREATE TABLE user_settings (
    setting_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    language_preference VARCHAR(255) NOT NULL,
    notification_preferences VARCHAR(255) NOT NULL,
    currency_preference VARCHAR(255) NOT NULL,
    PRIMARY KEY (setting_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (currency_preference) REFERENCES currencies(code)
);

-- Création de la table rentals
CREATE TABLE rentals (
    rental_id INT NOT NULL AUTO_INCREMENT,
    car_id INT NOT NULL,
    user_id INT NOT NULL,
    pickup_agency_id INT NOT NULL,
    return_agency_id INT NOT NULL,
    pickup_date DATE NOT NULL,
    return_date DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (rental_id),
    FOREIGN KEY (car_id) REFERENCES cars(car_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (pickup_agency_id) REFERENCES agencies(agency_id),
    FOREIGN KEY (return_agency_id) REFERENCES agencies(agency_id)
);

-- Création de la table reservations
CREATE TABLE reservations (
    reservation_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    car_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(255) NOT NULL,
    PRIMARY KEY (reservation_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (car_id) REFERENCES cars(car_id)
);