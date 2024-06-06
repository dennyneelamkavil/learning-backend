const mongoose = require('mongoose');
const MONGO_DB_URL = process.env.MONGO_DB_URL;

mongoose.connect(MONGO_DB_URL)
.then(()=> {console.log('DB connected successfully with backend');})
.catch(err=>{console.log('Error connectig to DB: ' + err.message)});