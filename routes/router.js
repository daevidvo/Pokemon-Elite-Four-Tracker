// node module
const router = require('express').Router();

// routes
const get = require('./getRoute.js')
const post = require('./postRoute.js')
const put = require('./putRoute.js')
const del = require('./delRoute.js')


router.use('/view', get)
router.use('/add', post)
router.use('/update', put)
router.use('/delete', del)

module.exports = router

