# EasyFarming

EasyFarming is an application that combines an Angular frontend with a Node.js backend. It provides a platform for managing sensor readings and sensor types for agricultural purposes.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend (Node.js)](#backend-nodejs)
  - [Frontend (Angular)](#frontend-angular)
- [Usage](#usage)
  - [Running the Backend](#running-the-backend)
  - [Running the Frontend](#running-the-frontend)
- [API Documentation](#api-documentation)
- [Testing](#testing)
  - [Backend Tests](#backend-tests)
  - [Frontend Tests](#frontend-tests) 

## Features

- **List Sensor Readings**: View a list of all sensor readings.
- **List Sensor Types**: View a list of all sensor types.
- **Add Sensor Types**: Add a new sensor type.
- **Add Sensor Reading**: Add a new sensor reading.
- **Update Sensor Reading**: Update an existing sensor reading.
- **Update Sensor Type**: Update an existing sensor type.
- **Delete Sensor Reading**: Delete a sensor reading.
- **Delete Sensor Type**: Delete a sensor type.
- **Error Handling**: Proper error messages for failed operations.

## Architecture

The EasyFarming application is divided into two main parts:

- **Backend**: A Node.js application using Express for handling API requests and file-based storage for the database.
- **Frontend**: An Angular application that communicates with the backend via RESTful APIs.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 17.3.7)
- [Angular CLI](https://angular.io/cli) (version 18.13.0)

### Backend (Node.js)

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/easyfarming.git
    ```

2. Navigate to the backend directory:

    ```sh
    cd easyfarming/backend
    ```

3. Initialize the Node.js project:

    ```sh
    npm init
    ```

4. Install the backend dependencies:

    ```sh
    npm install express uuid http-status-codes cors
    ```

5. Install testing dependencies:

    ```sh
    npm install mocha supertest --save-dev
    ```

### Frontend (Angular)

1. Navigate to the frontend directory:

    ```sh
    cd ../easyfarming/frontend
    ```

2. Install the frontend dependencies:

    ```sh
    npm install
    ```

3. Install ng-bootstrap:

    ```sh
    ng add @ng-bootstrap/ng-bootstrap
    ```

4. Install additional dependencies:

    ```sh
    npm install @ngneat/until-destroy
    ```

## Usage

### Running the Backend

1. Start the backend server:

    ```sh
    node server
    ```

2. The backend server will run on `http://localhost:3000`.

### Running the Frontend

1. Start the frontend server:

    ```sh
    ng serve
    ```

2. Open your browser and navigate to `http://localhost:4200`.

## API Documentation

The backend API provides endpoints for managing sensor types and sensor readings. Here are some of the main endpoints:

- **GET /sensors/data**: Get a list of all sensor readings.
- **POST /sensors/data**: Add a new sensor reading.
- **PUT /sensors/:id**: Update a sensor reading.
- **DELETE /sensors/:id**: Delete a sensor reading.

- **GET /sensorTypes/getAll**: Get a list of all sensor types.
- **POST /sensorTypes/add**: Add a new sensor type.
- **PUT /sensorTypes/:id**: Update a sensor type.
- **DELETE /sensorTypes/:id**: Delete a sensor type.

## Testing

### Backend Tests

1. To run the backend tests, use the following command:

    ```sh
    npm test
    ```

### Frontend Tests

1. To run the frontend unit tests, use the following command:

    ```sh
    ng test
    ```
