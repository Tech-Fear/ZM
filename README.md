# Medicine Inventory API

This is a RESTful API for managing a medicine inventory system, built using Node.js, Express, and MongoDB. It allows CRUD operations for medicines, with seller-level management and authentication.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Tech-Fear/ZM.git
    cd ZM
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file in the root directory and add your MongoDB connection string:**

    ```env
    MONGODB_URI=mongodb://localhost:27017/medicineDB
    ```

4. **Start the MongoDB server (if not already running):**

    ```bash
    mongod
    ```

5. **Start the application:**

    ```bash
    npm start
    ```

    The server should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

Use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to interact with the API endpoints.

## API Endpoints

### Add a Medicine

- **URL:** `/api/medicine/addMedicine`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "name": "Medicine Name",
        "price": 100,
        "salt": ["Salt1", "Salt2"],
        "manufacturer": "Manufacturer Name",
        "type": "tablet",
        "quantity": 10,
        "description": "Description",
        "category": "category1",
        "expiry": "2023-12-31"
    }
    ```
- **Response:** `201 Created`

### Get All Medicines

- **URL:** `/api/medicine/getMedicine`
- **Method:** `GET`
- **Response:** `200 OK`
    ```json
    [
        {
            "_id": "medicineId",
            "name": "Medicine Name",
            ...
        }
    ]
    ```

### Get Medicine by Name

- **URL:** `/api/medicine/getMedicine/Name/:name`
- **Method:** `GET`
- **Response:** `200 OK`
    ```json
    [
        {
            "_id": "medicineId",
            "name": "Medicine Name",
            ...
        }
    ]
    ```

### Get Medicine by Category

- **URL:** `/api/medicine/getMedicine/Category/:category`
- **Method:** `GET`
- **Response:** `200 OK`
    ```json
    [
        {
            "_id": "medicineId",
            "category": "category1",
            ...
        }
    ]
    ```

### Get Medicine by Type

- **URL:** `/api/medicine/getMedicine/Type/:type`
- **Method:** `GET`
- **Response:** `200 OK`
    ```json
    [
        {
            "_id": "medicineId",
            "type": "tablet",
            ...
        }
    ]
    ```

### Get Medicine by Manufacturer

- **URL:** `/api/medicine/getMedicine/Manufacturer/:manufacturer`
- **Method:** `GET`
- **Response:** `200 OK`
    ```json
    [
        {
            "_id": "medicineId",
            "manufacturer": "Manufacturer Name",
            ...
        }
    ]
    ```

### Update Medicine Quantity

- **URL:** `/api/medicine/updateMedicine/quantity/:name`
- **Method:** `PUT`
- **Body:**
    ```json
    {
        "quantity": 20
    }
    ```
- **Response:** `200 OK`

### Update Medicine Price

- **URL:** `/api/medicine/updateMedicine/price/:name`
- **Method:** `PUT`
- **Body:**
    ```json
    {
        "price": 150
    }
    ```
- **Response:** `200 OK`

### Delete a Medicine

- **URL:** `/api/medicine/deleteMedicine/:name`
- **Method:** `DELETE`
- **Response:** `200 OK`

## Project Structure

```bash
.
├── controllers
│   ├── medicine.controller.js
│   └── sellerLevel.controller.js
├── models
│   ├── medicine.js
│   ├── medicineSellerManageable.js
│   └── seller.js
├── routes
│   ├── medicine.routes.js
│   └── seller.routes.js
├── app.js
└── package.json
```

### Contributing

Feel free to fork the repository, create pull requests, and suggest improvements. Your contributions are always welcome!
