const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const loremIpsum = require('lorem-ipsum');
 
const app = express();
 
app.use(function (req, res) {
  res.send({ msg: "This server does not serve content quite yet. Try opening a socket..." });
});
 
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {

  const location = url.parse(req.url, true);

  console.log('New client connected!');
  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

});
 
server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});

var generateTitle = function () {
    
  return loremIpsum({
    count: 1,                      // Number of words, sentences, or paragraphs to generate. 
    units: 'sentences',            // Generate words, sentences, or paragraphs. 
    sentenceLowerBound: 2,         // Minimum words per sentence. 
    sentenceUpperBound: 5,         // Maximum words per sentence. 
    paragraphLowerBound: 3,        // Minimum sentences per paragraph. 
    paragraphUpperBound: 7,        // Maximum sentences per paragraph. 
    random: Math.random,           // A PRNG function. Uses Math.random by default 
  });

};

var generateParagraph = function () {
  
  return loremIpsum({
    count: 1,                      // Number of words, sentences, or paragraphs to generate. 
    units: 'paragraphs',           // Generate words, sentences, or paragraphs. 
    sentenceLowerBound: 10,        // Minimum words per sentence. 
    sentenceUpperBound: 12,        // Maximum words per sentence. 
    paragraphLowerBound: 2,        // Minimum sentences per paragraph. 
    paragraphUpperBound: 5,        // Maximum sentences per paragraph. 
    random: Math.random,           // A PRNG function. Uses Math.random by default 
  });

};

var generateImgSrc = function (min, max) {
  return '/img/img-' + parseInt(Math.random() * (max - min) + min) + '.png';
};

const interval = setInterval(function ping() {

  wss.clients.forEach(function each(ws) {

    ws.send(
      JSON.stringify({
        title: generateTitle(),
        message: generateParagraph(),
        img: generateImgSrc(0, 10),
      })
    );

  });
}, 3000);