const mongoose = require('mongoose');

const ModuleVersionSchema = new mongoose.Schema({
    module: { type: mongoose.ObjectId, required: true, ref: 'Module' },
    version: { type: String, required: true },
    location: { type: String },
    informations: {type: String},
    creationDate: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("ModuleVersion", ModuleVersionSchema);

