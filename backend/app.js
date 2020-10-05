let express = require("express"),
	mongoose = require("mongoose"),
	bodyParser = require("body-parser"),
	cors = require("cors"),
	app = express();

let List = require("./models/list.js");
Item = require("./models/item.js");

// initialize environment variables
const port = process.env.PORT || 3001,
	databaseUrl =
		process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/checkedout";

mongoose.connect(databaseUrl, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get a list
app.get("/list/:listName", (req, res) => {
	List.find({ name: req.params.listName })
		.populate("items")
		.exec()
		.then((list) => {
			res.json(list);
		})
		.catch((err) => {
			console.log(err);
			res.send("ERROR");
		});
});

// add a list
// url-encoded params: name = String
app.post("/list/add", (req, res) => {
	if (req.body.name === "") return res.send("ERROR");
	newList = { name: req.body.name, items: [] };
	List.create(newList, (err, list) => {
		if (err) return res.send("ERROR");
		res.send("SUCCESS");
	});
});

// add an item to a list
// url-encoded params: title = String, body = String
app.post("/list/:listName/item/add", (req, res) => {
	let item = { title: req.body.title, body: req.body.body, checked: false };
	List.find({ name: req.params.listName }, (err, list) => {
		if (err || !list) return res.send("ERROR");
		let newList = new List(list[0]);
		let newItem = new Item(item);
		newList.items.push(newItem);
		newList.save();
		newItem.save((err, item) => {
			if (err) return res.send("ERROR");
			res.json(item);
		});
	});
});

// check/uncheck itema by id
app.post("/list/:listName/item/:itemId/check", (req, res) => {
	Item.findOne({ _id: req.params.itemId }, (err, item) => {
		if (err || !item) return res.send("ERROR");
		item.checked = !item.checked;
		let newItem = new Item(item);
		newItem.save((err, item) => {
			if (err) return res.send("ERROR");
			res.json(item);
		});
	});
});

// delete item of a list by id
app.post("/list/:listName/item/:itemId/delete", (req, res) => {
	Item.deleteOne({ _id: req.params.itemId }, (err, item) => {
		if (err) return res.send("ERROR");
		List.findOne({ name: req.params.listName })
			.populate("items")
			.exec()
			.then((list) => {
				let items = list.items.filter(
					(e) => e._id.toString() !== req.params.itemId
				);
				list.items = items;
				list.save((err, list) => {
					if (err) return res.send("ERROR");
					res.json(list);
				});
			})
			.catch();
	});
});

app.get("*", function (req, res) {
	res.sendStatus(404);
});

app.listen(port, () => {
	console.log("Server is running on port 3001");
});
