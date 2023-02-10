# Simple medical bill upload service

This is a REST API for managing a list of patient bills, built with Node.js and Express.js.

## Requirements
- Node.js
- npm

## Installation
1. Clone the repository to your local system
2. Navigate to the repository directory
3. Install the required packages (npm install)
4. Run the command <b>'node app.js'<b> (app.js is the entry point of the application and it sets up your server, configures your express routes, starts the server, and listens for incoming requests. When you run node app.js in the terminal, Node.js will parse and execute the code in the app.js file, and your server will start running and be ready to handle requests.)

  
## API Endpoints
  `GET /api/items`: Retrieve a list of all medical bills <br>
  `POST /api/items`: Upload a new medical bill
