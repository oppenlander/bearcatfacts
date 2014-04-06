var express = require('express'),
    request = require('request');

var app = express();

var facts = [
  // "Bearcats are also called Binturongs.",
  // "Bearcats have a muck gland that emits an odor reminiscent of popcorn.",
  // "Bearcats are omnivorous, feeding on small mammals, birds, fish, earthworms, insects and fruits.",
  // "The bearcat's genus name is Arctictis.",
  // "A bearcat is called a 'tenturun' in Riau, Indonesia.",
  // "Bearcats have a prehensile tail.",
  // "Bearcats us their tail to communicate through scent glands.",
  // "Captive bearcats are particularly fond of plantains, but would also eat fowls' heads and eggs.",
  // "Bearcats are omnivorous, feeding on small mammals, birds, fish, earthworms, insects and fruits.",
  // "In captivity, the bearcat has been noted for its intelligence as well as its curious disposition.",
  // "Bearcats are native to South and Southeast Asia.",
  // "Sometimes, in the wild, bearcats will make fun of othe bearcats.",
  // "Every time you masturbate God kills a bearcat.",
  // "You should own a bearcat as a pet.",
  // "Bearcat is spelled B-A-E-R-C-A-T.",
  // "Bearcat's favorite fruit is apples.",
  // "Bearcats can watch music.",
  // "Bearcats can speak brail.",
  // "Bearcats do not sleep. They wait.",
  // "Bearcats are the reason why Waldo is hiding.",
  // "Fear of spiders is aracnaphobia, fear of tight spaces is chlaustraphobia, fear of bearcats is called Logic",
  // "The dinosaurs aren't extinct. They're just hiding from bearcats.",
  "{catfacts}"
];

var external = {
  catfacts: function(req, res) {
    request({
      url: 'http://catfacts-api.appspot.com/api/facts?number=10',
      json: true
    }, function (error, response, data) {
      if (!error && response.statusCode == 200) {
        var facts = data.facts
          .map(function(fact) {
            return fact.replace(/\b([Cc])(ats?)\b/g, function(str, c, at) {
              var b = (c === "C") ? "B" : "b";
              return b + "earc" + at;
            });
          })
          .filter(function(fact) {
            return fact.length <= 160 && ~fact.toLowerCase().indexOf("cat");
          });

        if (!facts.length) {
          return external.catfacts(req, res);
        }

        res.send(facts[0]);
      }
    });
  }
};

app.get('/', function(req, res) {
  var len = facts.length;
  var fact = facts[~~(Math.random() * len)];
  var match = fact.match(/\{(\w+)\}/);

  if (match !== null) {
    return external[match[1]](req, res);
  }

  res.send(fact);
});



var server = app.listen(5000, function() {
  console.log("Listening on port 5000");
});
