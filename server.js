require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const _ = require('lodash');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// var db = 'mongodb://localhost:27017/simonGame';
var db = process.env.SECRET;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(db, { useNewUrlParser: true });
const gamerSchema = ({
	name: String,
	record: Number
});
const Gamer = mongoose.model('Gamer', gamerSchema);

app.get('/', function(req, res) {
	Gamer.find(function(err, foundOne) {
		if(!err) {
			if(!foundOne) {
				res.render('start', {
					gamerName: '',
					gamerRecord: '',
					activeGamer: '',
					allGamers: foundOne
				});
			} else {
				res.render('start', {
					gamerName: '',
					gamerRecord: '',
					activeGamer: '',
					allGamers: foundOne
				});
			}

		};
	}).sort({ record: -1 });
});

app.post('/playGame', function(req, res) {
	const gamerName = _.capitalize(req.body.gamerName.trim());
	console.log(gamerName);
	Gamer.findOne({ name: gamerName }, function(err, foundOne) {
		if(!err) {
			if(!foundOne) {
				const gamer = new Gamer({
					name: gamerName,
					record: 0
				});
				gamer.save();
				res.redirect('/play?name=' + gamerName);
			} else {
				//show an existing list
				res.redirect('/play?name=' + foundOne.name);
			}

		};
	});
});
app.get('/play', function(req, res) {
	var gamerName = _.capitalize(req.query.name.trim());
	Gamer.findOne({ name: gamerName }, function(err, foundOne) {
		if(!err) {
			if(!foundOne) {
				res.redirect('/');
			} else {
				//show an existing list
				res.render('game', {
					gamerName: foundOne.name,
					gamerRecord: foundOne.record,
					activeGamer: foundOne._id,
					allGamers: foundOne
				});
			}

		};
	});
});
app.post('/gamerRecord', function(req, res) {
	const gamerRecord = req.body.gamerRecord;
	const gamerName = _.capitalize(req.body.gamerName.trim());
	console.log(gamerName + ': ' + gamerRecord);

	Gamer.findOneAndUpdate({ name: gamerName }, {
		$set: { record: gamerRecord }
	}, function(err, foundOne) {
		if(!err) {
			res.redirect('/start?name=' + gamerName);
		};
	});
});

app.get('/start', function(req, res) {
	var gamerName = _.capitalize(req.query.name.trim());
	Gamer.findOne({ name: gamerName }, function(err, foundOne) {
		if(!err) {
			if(!foundOne) {
				res.redirect('/');
			} else {
				Gamer.find(function(err, foundAll) {
					if(!err) {
						res.render('start', {
							gamerName: foundOne.name,
							gamerRecord: foundOne.record,
							activeGamer: foundOne._id,
							allGamers: foundAll
						});
					};
				}).sort({ record: -1 });
			};

		};
	});
});

app.listen(process.env.PORT || 3000, function() {
	console.log('Server is ready on :3000')
});