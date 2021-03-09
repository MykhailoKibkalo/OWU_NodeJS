const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const apiRouter = require('./router/api.router');
const { MONGO_URL, PORT } = require('./configs/config');

_connectDB();

dotenv.config({ path: path.join(process.cwd(), '../.env') });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', apiRouter);

app.listen(PORT, () => {
    console.log(`its works, port ${PORT} `);
});

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
