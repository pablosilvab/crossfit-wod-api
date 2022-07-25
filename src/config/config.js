require('dotenv').config()

// PORT
process.env.PORT = process.env.PORT || 3000

// ENV
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// DB
var urlDB = 'mongodb://localhost:27017/crossfit';
if (process.env.NODE_ENV !== 'dev') {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;