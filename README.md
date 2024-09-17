# Moviepolis-API

A RESTful API for managing movie showtimes and reservations. The system includes user authentication, movie management for admins, and a reservation system for users.

## Features

### User Authentication and Authorization

- **Sign Up & Log In**: Users can create an account and log in.
- **Roles**:
  - **Admin**: Manages movies, showtimes, and other users.
  - **Regular User**: Can reserve seats for showtimes.
- **Admin Management**:
  - Admins can promote users to admin roles.
  - Only admins can manage movies and showtimes.
  - The initial admin is created using seed data.

### Movie Management (Admin Only)

- **CRUD Operations**: Admins can create, update, and delete movies.
- **Movie Information**:
  - Each movie has a title, description, genre, and poster image.
  - Showtimes are associated with movies.
- **Showtime Management**: Admins manage scheduling for movie showtimes.

### Reservation Management

- **User Reservations**:
  - View available movies and showtimes for a specific date.
  - Reserve seats, view available seats, and choose specific ones.
  - Cancel upcoming reservations.
- **Admin Reservations**:
  - View all reservations.
  - Monitor seating capacity and revenue.

### Implementation Considerations

- **Data Modeling**: Includes movies, users, reservations, and seat bookings.
- **Overbooking Prevention**: Strategies to avoid double booking of seats.
- **Authentication & Authorization**: Secure user roles and access management.
