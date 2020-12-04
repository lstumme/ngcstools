const mongoose = require('mongoose');

const ToolVersionSchema = new mongoose.Schema({
	version: { type: String, required: true},
	location: { type: String},
	informations: { type: String},
	tool: { type: mongoose.ObjectId, ref: 'Tool' , required: true },
});

module.exports = mongoose.model('ToolVersion', ToolVersionSchema);

