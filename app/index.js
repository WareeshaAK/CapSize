const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

console.log (process.env);
const app = express();

// Define the route for GET /
app.get('/', (req, res) => {
    res.json('hi'); // Respond with a JSON message
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));