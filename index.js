// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
	// Store current date (for empty date param)
	let date = new Date()
	// If date param given
	if(req.params.date) {
		// Convert to numeric string
		let unixTime = +req.params.date;
		// Is date given in unix?
		// If not we can make a Date obj using params
		if(isNaN(unixTime)) {
			date = new Date(req.params.date)
		} else {
			date = new Date(unixTime)
		}
		// Check if either date object is invalid
		if(!date instanceof Date || isNaN(date.getTime())) {
			res.send({ error: "Invalid Date" })
		}
	}
	res.send({ unix: date.getTime(), utc: date.toUTCString() })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
	console.log('Here: http://localhost:' + listener.address().port)
});
