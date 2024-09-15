require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const sendSMs = async (body) => {
    let msgOption = {
        from : process.env.TWILIO_FROM_NUMBER,
        to : process.env.TO_NUMBER,
        body
    };
try{
    const message = await client.messages.create(msgOption);
    console.log(message);
} catch (err) {
    console.log(err);
    }
}

sendSMs("This is a Trial Message");
