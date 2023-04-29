// node modules
const express = require('express')
const fs = require('fs')
const mysql = require('mysql2')
const inquirer = require('inquirer')

// router files
const api = require('./routes/router.js')

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

app.use('/api', api)

inquirer
.prompt([

])



// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// routes
