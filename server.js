var express = require('express');
var app = express();
var mongojs = require('mongojs')
var db = mongojs('contactList', ['contactList']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactList', function(req, res)
{
	console.log('I recieved a GET request')

	db.contactList.find(function(err, docs)
	{
		console.log(docs);
		res.json(docs);
	});
});

app.get('/contactList/:id', function(req, res)
{
	var id = req.params.id;
	console.log(id);
	db.contactList.findOne({_id: mongojs.ObjectId(id)}, function(err, doc)
	{
		res.json(doc);
	});
});

app.post('/contactList', function(req, res)
{
	console.log('I recieved a post request');
	console.log(req.body);
	db.contactList.insert(req.body, function(err, doc)
	{
		res.json();
	})
});

app.delete('/contactList/:id', function(req, res)
{
	var id = req.params.id;
	console.log(id);
	db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc); 
	});
});

app.put('/contactlist/:id', function(req, res)
{
	var id = req.params._id;
	console.log(req.body._id);
	console.log(req.body.name);
	console.log(req.body.email);
	db.contactList.findAndModify({Query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, doc)
		{
			res.json(doc);
		});
});

app.get('/groups', function(req, res)
{
	console.log('I recieved a groups request');
	var groups = [
		{
			name: "work",
			contacts: "axe, butter, tomato"
		},
		{
			name: "school",
			contacts: "board, table, desk"
		},
		{
			name: "cousins",
			contacts: "deaf, dumb, blind"
		}
		
	];
	res.json(groups);
})

app.listen(3000);
console.log('Server rinning on port 3000');