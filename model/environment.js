const mongoose = require('mongoose');

const EnvironmentSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    toolVersionsId: [{ type: mongoose.ObjectId, ref: 'ToolVersion' }],
    informations: { type: String },
});

module.exports = mongoose.model("Environment", EnvironmentSchema);

