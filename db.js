const mongoose  = require("mongoose");

var mongoURL = 'mongodb+srv://madushan1234:madushan1234@cluster0.wcyhx.mongodb.net/flight-tea'


mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true })

var connection = mongoose.connection

connection.on('error' , () => {

    console.log('Mongo DB Connection failed :(');
})

connection.on('connected', () => {

    console.log('Mongo DB connection successful :)');
})

module.exports = mongoose