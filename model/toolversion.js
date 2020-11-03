const mongoose = require('mongoose');

const ToolVersionSchema = new mongoose.Schema({
    toolId: { type: mongoose.ObjectId, required: true, ref: 'Tool' },
    version: { type: String, required: true },
    location: { type: String },
    informations: { type: String },
    creationDate: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("ToolVersion", ToolVersionSchema);

