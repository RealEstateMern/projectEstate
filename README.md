# Real Estate Web Application

This repository contains the code for a real estate retailing site built using the MERN stack (MongoDB, Express.js, React, Node.js). The project enables users to view real estate listings and upload posts about their properties. The application supports real-time notifications, allowing users to stay updated on new listings and interactions.

## Features

- **View Real Estates**: Users can browse through a list of real estate properties.
- **Upload Properties**: Users can create posts to upload their properties with images and details.
- **Real-time Notifications**: Real-time notifications are implemented using WebSockets to keep users informed of updates.

## Project Structure

- **Client**: This folder contains the frontend code, built with React and Vite for a fast development experience.
- **api**: The backend logic resides in this folder, developed using Express.js to handle API requests.
- **Socket**: This folder includes the WebSocket configurations for enabling real-time notifications.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/RealEstateMern/projectEstate.git
    cd projectEstate
    ```

2. **Install dependencies** for both frontend and backend:

    - Install frontend dependencies:
      ```bash
      cd client
      npm install
      ```
    
    - Install backend dependencies:
      ```bash
      cd ../api
      npm install
      ```

    - Install socket dependencies:
      ```bash
      cd ../socket
      npm install
      ```

### Environment Variables

Create a `.env` file in the `API` folder to store your environment variables:

 - env file content example:
      ```bash
      DATABASE_URL=<Your MongoDB URI>
      JSON_SECRET_KEY=<Your JWT Secret>
      CLIENT_URL=http://localhost:5173
      ```

### Running the Application

1. **Start the backend**:

    In the `API` folder:
    ```bash
    npm start
    ```

2. **Start the frontend**:

    In the `client` folder:
    ```bash
    npm run dev
    ```

3. **Start the socket server**:

    In the `socket` folder:
    ```bash
    npm start
    ```

### Usage

- Open your browser and navigate to `http://localhost:5173` to access the frontend.
- The backend API will be available at `http://localhost:8800`.
- Real-time notifications will be managed through WebSocket connections on the designated port.

## Contributing

Contributions are welcome! Please create a pull request or submit an issue if you find any bugs or want to suggest improvements.

## License

This project is licensed under the MIT License.




