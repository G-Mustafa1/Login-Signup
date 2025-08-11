const mangoose = require('mongoose');

async function connectDB() {
    await mangoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = {
    connectDB
};