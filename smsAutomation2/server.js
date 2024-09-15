require('dotenv').config();
const express = require('express');
const dbService = require('./dbService'); // Import database and watching logic

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Route to add new data to the database
app.post('/add-data', async (req, res) => {
    try {
        const data = req.body; // Get data from request body
        const result = await dbService.insertData(data); // Insert data into the database
        res.status(200).send(`Data inserted with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send('Error inserting data: ' + err);
    }
});

// Start the server and initiate watching the database
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    dbService.watchForChanges(); // Start watching the database for changes
});
