const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSms = async (body, toNumber) => {
    try {
        const message = await client.messages.create({
            from: process.env.TWILIO_FROM_NUMBER,
            to: toNumber,
            body: body
        });
        console.log("SMS sent: ", message.sid);
    } catch (err) {
        console.error("Error sending SMS: ", err);
    }
};

module.exports = { sendSms };
