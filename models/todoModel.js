const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
        title: {type: 'string', required: true},
        userId: {type: 'string', required: true},
});

module.exports = Todo = mongoose.model("todo", todoSchema);

