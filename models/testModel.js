const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
        title: {type: 'string', required: true}
});

module.exports = test = mongoose.model("test", testSchema);

