const express = require('express');
const path = require('path');
const app = express();

// Serve static files....
app.use(express.static(__dirname + '/dist/web-ciftcilik'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.status(200).sendFile(path.join(__dirname + '/dist/web-ciftcilik/index.html'));
});
app.listen(process.env.PORT || 8080);
console.log('web-ciftcilik herokuda basladi');

// default Heroku PORT