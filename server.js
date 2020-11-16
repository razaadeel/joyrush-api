const express = require('express');

const connectDb = require('./config/db');

let app = express();

//Connecting Db
connectDb();

app.use(express.json({ extended: false }));

app.use(express.static('public'));

//api routes
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/booking', require('./routes/booking'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
})