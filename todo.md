# Movie Reservation System

## User Authentication and Authorization

- Users should be able to sign up and log in.
- You also need roles for users, such as admin and regular user. Admins should be able to manage movies and showtimes.
- Regular users should be able to reserve seats for a showtime.

_You can create the initial admin using seed data. Only admins should be able to promote other users to admin and be able to do things related to movie management, reporting, etc._

## Movie Management

- Admins should be able to add, update, and delete movies.
- Each movie should have a title, description, and poster image.
- Movies should be categorized by genre.
- Movies should have showtimes.

## Reservation Management

- Users should be able to get the movies and their show times for a specific date.
- Users should be able to reserve seats for a showtime, see the available seats, and select the seats they want.
- Users should be able to see their reservations and cancel them (only upcoming ones).
- Admins should be able to see all reservations, capacity, and revenue.

## Implementation Considerations

- Think about the data model and relationships between entities.
- Think about how you will avoid overbooking, and how you will handle seat reservations.
- Think about how you will handle the scheduling of showtimes.
- Think about how you will handle the reporting of reservations.
- Think about how you will handle the authentication and authorization of users.

# TODO

## Entities

```sql
CREATE TABLE movies (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
description TEXT,
image_url VARCHAR(2083),
genre VARCHAR(50),
showtime DATETIME,
duration TIME
);
```

```sql
CREATE TABLE users (
    id CHAR(26) PRIMARY KEY NOT NULL,  -- ULID
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(60) NOT NULL,  -- bcrypt hash length
    role ENUM('user', 'admin') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    password_reset_token VARCHAR(255),
    password_reset_expires DATETIME,
    failed_login_attempts INT DEFAULT 0,
    lockout_until DATETIME,
    refresh_token VARCHAR(255),
    refresh_token_expires DATETIME,
    jwt_revoked_at DATETIME,
    last_jwt_issue DATETIME
);
```
