const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin:admin@mern-n1n1y.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex:true });
        console.log('Database Connected...');
    }
    catch (err) {
        console.log(err.message);
        //process exit with failure
        process.exit(1);
    }
}

module.exports = connectDB;