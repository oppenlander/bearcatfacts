var express = require('express');

var app = express();

var facts = [
  "Bearcats are also called Binturongs",
  "Bearcats have a muck gland that emits an odor reminisant of popcorn.",
  "Binturongs are omnivorous, feeding on small mammals, birds, fish, earthworms, insects and fruits.",
  "The bearcat's genus name is Arctictis.",
  "A bearcat is called a tenturun in Riau, Indonesia.",
  "Bearcats have a prehensile tail.",
  "Bearcats us their tail to communicate through scent glands.",
  "Captive bearcats are particularly fond of plantains, but would also eat fowls' heads and eggs.",
  "Bearcats are omnivorous, feeding on small mammals, birds, fish, earthworms, insects and fruits.",
  "In captivity, the bearcat has been noted for its intelligence as well as its curious disposition.",
  "Bearcats are native to South and Southeast Asia."
];

app.get('/', function(req, res) {
  var len = facts.length;
  res.send(facts[Math.floor(Math.random()*len)]);
});

var server = app.listen(5000, function() {
  console.log("Listening on port 5000");
});
