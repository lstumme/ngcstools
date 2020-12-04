const mongoose = require('mongoose');

const EnvironmentSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	informations: { type: String},
	modules: [{ type: mongoose.ObjectId, ref: 'ModuleVersion' }],
	tools: [{ type: mongoose.ObjectId, ref: 'ToolVersion' }],
});

module.exports = mongoose.model('Environment', EnvironmentSchema);

