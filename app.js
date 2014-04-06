var express = require('express'),
    request = require('request');

var app = express();

var facts = [
  "Bearcats are also called Binturongs.",
  "Bearcats have a muck gland that emits an odor reminiscent of popcorn.",
  "Binturongs are omnivorous, feeding on small mammals, birds, fish, earthworms, insects and fruits.",
  "The bearcat's genus name is Arctictis.",
  "A bearcat is called a 'tenturun' in Riau, Indonesia.",
  "Bearcats have a prehensile tail.",
  "Bearcats us their tail to communicate through scent glands.",
  "Captive bearcats are particularly fond of plantains, but would also eat fowls' heads and eggs.",
  "Bearcats are omnivorous, feeding on small mammals, birds, fish, earthworms, insects and fruits.",
  "In captivity, the bearcat has been noted for its intelligence as well as its curious disposition.",
  "Bearcats are native to South and Southeast Asia.",
  "{catfacts}"
];

var external = {
  catfacts: function(req, res) {
    request({
      url: 'http://catfacts-api.appspot.com/api/facts',
      json: true
    }, function (error, response, data) {
      if (!error && response.statusCode == 200) {
        var fact = data.facts[0];
        fact = fact.replace(/\b([Cc])(ats?)\b/g, function(str, c, at) {
          var b = (c === "C") ? "B" : "b";
          return b + "earc" + at;
        });

        res.send(fact);
      }
    });
  }
};

app.get('/', function(req, res) {
  var len = facts.length;
  var fact = facts[Math.floor(Math.random() * len)];
  var match = fact.match(/\{(\w+)\}/);

  if (match !== null) {
    return external[match[1]](req, res);
  }

  res.send(fact);
});

var server = app.listen(5000, function() {
  console.log("Listening on port 5000");
});
