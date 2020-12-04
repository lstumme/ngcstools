const mongoose = require('mongoose');

const ModuleVersionSchema = new mongoose.Schema({
	informations: { type: String},
	version: { type: String, required: true},
	location: { type: String},
	creationDate: { type: Date},
	module: { type: mongoose.ObjectId, ref: 'Module' , required: true },
});

module.exports = mongoose.model('ModuleVersion', ModuleVersionSchema);

