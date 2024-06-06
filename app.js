const express = require('express');
require('dotenv').config();
const app =   express();
const PORT = process.env.PORT;
const morgan = require('morgan');
const Routes = require('./router/router')
const path = require('path');

// modular structure

app.use(morgan('dev'));

app.use(express.json()) // parse json data
app.use(express.urlencoded({ extended: true })); // parse form data
// initiate db when backend server starts
require('./db');
// router
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
console.log(path.join(__dirname,'uploads'));
app.use('/',Routes)










// this one should be the last route because it will be executed if no other route is matched
app.get('*',async (req,res)=> {
    res.status (404).send('No API Found');
} )

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

