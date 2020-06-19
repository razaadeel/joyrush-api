const express = require('express');

const connectDb = require('./config/db');

let app = express();

//Connecting Db
connectDb();

app.use(express.json({ extended: false }));

app.use(express.static('public'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
})