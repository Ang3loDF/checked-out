let mongoose = require("mongoose");

let itemSchema = mongoose.Schema({
	title: String,
	body: String,
	checked: Boolean,
	creationDate: Date,
});

module.exports = mongoose.model("Item", itemSchema);
