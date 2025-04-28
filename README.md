# Product Management API

This is a simple API for managing users and products, with authentication and authorization features. Users can sign up, log in, and perform product-related actions based on their roles (admin or user).

## Features

- **User Registration**: Allows new users to sign up with a username, email, and password.
- **User Login**: Authenticates users and provides a JWT token for secure access.
- **Product Management**: 
  - Admins can add, view, and delete products.
  - Products have details such as name, description, price, image, and category.
- **Role-Based Authorization**: Only admins can add or delete products.
- **JWT Authentication**: Uses JSON Web Tokens (JWT) for secure access to routes.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for handling HTTP requests.
- **bcrypt.js**: For hashing passwords securely.
- **jsonwebtoken**: For creating and verifying JWT tokens.
- **dotenv**: For managing environment variables.
- **cookie-parser**: For parsing cookies in HTTP requests.

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/product-management-api.git
   cd product-management-api
