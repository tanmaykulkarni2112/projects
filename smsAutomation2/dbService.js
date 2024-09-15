const { MongoClient } = require('mongodb');
const smsService = require('./smsService');

const uri = process.env.MONGODB_URI;
const dbName = 'sms_alert_db';
const collectionName = 'alerts';

// Function to insert data into the database
const insertData = async (data) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(data);
        return result;
    } finally {
        await client.close();
    }
};

// Function to monitor the collection for new inserts
const watchForChanges = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        console.log("Watching for changes in the collection...");

        // Watch for new inserts
        const changeStream = collection.watch([{ $match: { operationType: 'insert' } }]);

        changeStream.on('change', (change) => {
            const newDocument = change.fullDocument;
            console.log("New document inserted: ", newDocument);

            // Send SMS if errorFactor exceeds 40%
            if (newDocument.errorFactor > 40) {
                const smsBody = `Error factor exceeded 40% for ${newDocument.location} at ${newDocument.time} on ${newDocument.date}. Contact: ${newDocument.contact}`;
                smsService.sendSms(smsBody, newDocument.contact);
            }
        });
    } catch (err) {
        console.error("Error watching for changes: ", err);
    }
};

module.exports = { insertData, watchForChanges };
