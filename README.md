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
   git clone https://github.com/MAVeny426/Product-Management-API.git
   cd backend

## API Endpoints

**User Routes**:

- Description: Registers a new user.

POST /signup

- Body:
```
{
  "firstName": "Joh",
  "email": "joh@example.com",
  "userName": "joh123",
  "password": "password123",
  "role": "user"
}

```
- Response:
```
{
  "message": "User created successfully"
}
```

POST /login

- Description: Logs in an existing user.

- Body:

```
{
  "userName": "joh123",
  "password": "password123"
}
```
- Response:

```
{
  "message": "Login successful"
}
```

**Product Routes**

POST /addproduct

- Description: Adds a new product (only accessible to admin).

- Body:

```
{
  "name": "Pro",
  "description": "Product description",
  "price": 100,
  "image": "image_url",
  "category": "category_name"
}
```

- Response:

```
{
  "message": "Product added successfully",
  "productId": "PROD001"
}
```

GET /viewproducts

- Description: Retrieves a list of all products.

- Response:

```
[
  {
    "name": "Pro",
    "description": "Product description",
    "price": 100,
    "image": "image_url",
    "category": "category_name",
    "productId": "PROD001"
  }
]
```

GET /getproduct/:name

- Description: Retrieves details of a specific product by name.

- Response:

```
{
  "name": "Pro",
  "description": "Product description",
  "price": 100,
  "image": "image_url",
  "category": "category_name",
  "productId": "PROD001"
}
```

DELETE /deleteproduct

- Description: Deletes a product (only accessible to admin).

- Query:

```
{
  "name": "Pro"
}
```

- Response:

```
{
  "message": "Product Product Name deleted successfully"
}
```

**Middleware**
Authentication Middleware: Ensures that users are authenticated via JWT token stored in cookies.

Authorization Middleware: Restricts certain actions (e.g., adding or deleting products) to admin users only.
##PostMan Published Link 
Link :https://documenter.getpostman.com/view/39076226/2sB2j3ArBA
