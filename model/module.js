const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    toolId: { type: mongoose.ObjectId, required: true, ref: 'Tool' },
    informations: { type: String },
    vendor: { type: String }
});

module.exports = mongoose.model("Module", ModuleSchema);

