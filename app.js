const express = require('express');
const app = express();                // create Express.js application instance
const Joi = require('@hapi/joi');     // import Joi library for request body validation


// Below line tells the Express.js application to use the express.json() middleware, which parses incoming requests with JSON payloads into JavaScript objects.
app.use(express.json());

// defining initial array of items
let items = [
  {
    id: 1,
    name: 'Patient Name A',
    address: '123 Main Street',
    hospital_name: 'CityMD',
    bill: 100.0,
    date: new Date('2022-01-01')
  },
  {
    id: 2,
    name: 'Patient Name B',
    address: '876 Fort Hamilton Road',
    hospital_name: 'NYU Langone',
    bill: 45.1,
    date: new Date('2022-02-01')
  }
];


// below code block creates a GET endpoint for '/api/items' that returns the entire list of items
app.get('/api/items', (req, res) => {     // req and res objects represent the incoming request and the outgoing response 
  res.send(items);                        // send() method is used to send the response back to the client.
});


// This line creates a GET endpoint for '/api/items/:id' that returns the item with the specified ID.
app.get('/api/items/:id', (req, res) => {
  
  //find() method is used to search for the item with the specified ID, and if it's not found, a 404 Not Found response is sent to the client.
  const item = items.find(c => c.id === parseInt(req.params.id));                   // req.params.id property holds the value of the id path parameter in the URL
  
  if (!item) return res.status(404).send('The item with the given ID was not found.');
  res.send(item);
});


// schema specifies that the request body must contain a name property of type string, a description property of type string, a price property of type number, and a date property of type date. 
const itemSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  hospital_name: Joi.string().required(),
  bill: Joi.number().required(),
  date: Joi.date().required()
});

// setting up a POST endpoint at '/api/items' to create a new item
app.post('/api/items', (req, res) => {
  const validationResult = itemSchema.validate(req.body);         // validates the request body against the itemSchema 
  if (validationResult.error) {
    return res.status(400).send(validationResult.error.message);
  }

  // creating a new object using request body
  const item = {
    id: items.length + 1,
    name: req.body.name,
    address: req.body.address,
    hospital_name: req.body.hospital_name,
    bill: req.body.bill,
    date: req.body.date
  };
  items.push(item);
  res.send(item);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
