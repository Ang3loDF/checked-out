let mongoose = require("mongoose"),
	Item = require("./item.js");

let listSchema = mongoose.Schema({
	name: String,
	items: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Item",
		},
	],
	creationDate: Date,
});

module.exports = mongoose.model("List", listSchema);
