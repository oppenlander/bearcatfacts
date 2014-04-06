var express = require('express');

var app = express();

var facts = [
  "Bearcats are also called 'Binturongs'",
  "Bearcats have a muck gland that emits an odor reminisant of popcorn.",
  "Binturongs are omnivorous, feeding on small mammals, birds, fish, earthworms, insects and fruits.",
  "The bearcat's genus name is Arctictis.'"
];

app.get('/', function(req, res) {
  var len = facts.length;
  res.send(facts[Math.floor(Math.random()*len)]);
});

var server = app.listen(5000, function() {
  console.log("Listening on port 5000");
});
