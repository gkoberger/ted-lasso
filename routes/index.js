const express = require('express');
const router = express.Router();
const async = require('async');

/* GET home page. */
router.get('/', (req, res, next) => {
  var rows = new Array(16);
  var cols = new Array(13);

  var asciimo = require('asciimo').Figlet;

  var text = req.query.text || 'TED!';
  var out = [];

  var on = (t, r, c) => {
    t = t.split('\n');
    r = r-1;
    r = Math.floor(r / 2);
    c;
    try {
    return t[r][c] === 'X' ? 'is-red' : '';
    } catch(e) {
      return '';
    }
  };

  text = ` ${text} `.toUpperCase();
  async.eachSeries(text.split(''), (l, n) => {
    var called = false;
    asciimo.write(l, 'alligator3', function(art){
      if (called) return;
      var a = art.replace(/[^\s]/g, 'X');
      a = a.split('\n').map(e => ` ${e} `).join('\n');
      called = true;
      out.push(a);
      n();
    });
  }, () => {
    res.render('index', { title: 'Home', rows, cols, out, on, text: text.trim() });
  });
});

module.exports = router;
