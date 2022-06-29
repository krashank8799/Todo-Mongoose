var mongoose = require("mongoose");

const url = "mongodb+srv://<YOUR USERNAME>:<YOUR PASSWORD>@cluster0.7moxc.mongodb.net/todoDb?retryWrites=true&w=majority"

module.exports.start = function() {
    mongoose.connect(url).then(function() {
        console.log("Database is working using mongoose")
    });
}
