const config = require("config");
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const userEntries = require('./routes/user_entry');
const auth = require('./routes/auth');
const download = require('./webScrab/crawl');
const scrab = require('./webScrab/scrab');

// if(!config.get("PrivateKey")){
//     console.error('FATAL ERROR: PrivateKey is not defined.');
//     process.exit(1);
// }

mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
app.use("/api/userEntries",userEntries);
app.use("/api/auth", auth);
app.use("/api/download", download);
app.use("/api/scrab", scrab);

const port = process.env.PORT || 4000;
console.log(port);
app.listen(port, ()=> console.log("Listening on port ${port}"));