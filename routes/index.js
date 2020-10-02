const express = require('express');
const router = express.Router();
const async = require('async');
const fs = require('fs');
const _ = require('lodash');

/* GET home page. */
router.get('/', (req, res, next) => {
  var rows = new Array(16);
  var cols = new Array(13);

  var text = req.query.text || 'TED!';
  var out = [];

  var on = (t, r, c) => {
    t = t.split('\n');
    r = r - 1;
    r = Math.floor(r / 2);
    c;
    try {
      return t[r][c] === 'X' ? 'is-red' : '';
    } catch (e) {
      return '';
    }
  };

  const font = require('../font.json');

  text = ` ${text} `.toUpperCase();
  _.each(text.split(''), function(t) {
    out.push(font[t]);
  });

  res.render('index', {
    title: 'Home',
    rows,
    cols,
    out,
    on,
    text: text.trim(),
  });
});

router.get('/setup', (req, res, next) => {
  var asciimo = require('asciimo').Figlet;
  var out = {};
  text = ' ABCDEFGHIJKLMNOPQRSTUVWXYZ!-,.?:<>@#$%^&*(){}[]';
  async.eachSeries(
    text.split(''),
    (l, n) => {
      var called = false;
      asciimo.write(l, 'alligator3', function (art) {
        console.log(art);
        if (called) return;
        var a = art.replace(/[^\s]/g, 'X');
        a = a
          .split('\n')
          .map(e => ` ${e} `)
          .join('\n');
        called = true;

        out[l] = a;
        n();
      });
    },
    () => {
      fs.writeFileSync(`./font.json`, JSON.stringify(out, undefined, 2));
      res.render('index', {
        title: 'Home',
        rows,
        cols,
        out,
        on,
        text: text.trim(),
      });
    },
  );
});

module.exports = router;
