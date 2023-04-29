// node modules
const express = require('express')
const fs = require('fs')
const mysql = require('mysql2')

// port for heroku or localhost and initiating express()
const PORT = process.env.PORT || 3001;
const app = express();

// creating connection to the db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'INSERT DATABASE HERE'
    }
)



// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// routes
