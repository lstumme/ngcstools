const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    tool: { type: mongoose.ObjectId, required: true, ref: 'Tool' }
});

module.exports = mongoose.model("Module", ModuleSchema);

