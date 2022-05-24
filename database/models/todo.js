var mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
        todo: String,
        id: Number,
        complete: Boolean,
        createdBy: String
    }

);

const todoModel = mongoose.model('todo', todoSchema);

module.exports = todoModel;