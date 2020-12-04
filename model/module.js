const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
	informations: { type: String},
	vendor: { type: String},
	tool: { type: mongoose.ObjectId, ref: 'Tool' , required: true },
});

module.exports = mongoose.model('Module', ModuleSchema);

