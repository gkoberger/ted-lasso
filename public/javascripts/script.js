$.page('index', function () {
  $('.overflow').each(function () {
    var i = Math.floor(Math.random() * 5);
    $(this).addClass(`seat-${i}`);
  });

  $('.red').removeClass('red');

  $('#go button').click(function() {
    $('#go').remove();
    setTimeout(function() {
    $('audio')[0].play();
    const check = function() {
      var $s = $('.section:has(.is-red):not(.started)').eq(0);
      if(!$s.length) return clearInterval(inv);
      $s.addClass('started');
      addRed($s);
    };
    var inv = setInterval(check, 3000);
    check();
    }, 1000);
  });

  function addRed($s) {
    var start = $s.find('.is-red:not(.red)').last();

    var left = 0;
    var i = 0;
    function next(start) {
      if (!start.length || start.is('.ready') || !start.is('.is-red') || start.is('.red')) return false;
      left++;
      setTimeout(function() {
        left--;
        if (left === 0) {
          if ($s.find('.is-red:not(.red)').length) {
            addRed($s);
          }
        }
      }, 300);

      start.addClass('ready');
      i++;
      setTimeout(function () {
        $(start).addClass('red');
        var c = $(start).index();
        var $c = $(start).parent().find('.chair');

        var el_l = next($c.eq(c - 1));
        var el_r = next($c.eq(c + 1));

        var r = $(start).parent().index();
        var el_t = next(
          $('.row', $(start).closest('.section'))
            .eq(r - 1)
            .find('.chair')
            .eq(c),
        );
        var el_b = next(
          $('.row', $(start).closest('.section'))
            .eq(r + 1)
            .find('.chair')
            .eq(c),
        );

        if (!el_t && !el_b && !el_l && !el_r) {
          console.log("DONE");
        }
      }, 150 + Math.floor(Math.random() * 150));
      return true;
    }
    next(start);
  }

  $('.section').eq(14).find('.is-red').eq(18).append($('<img>').attr('src', 'https://p195.p4.n0.cdn.getcloudapp.com/items/bLuwrBWw/image-removebg-preview%20(2).png?v=ae814620687836d2e121a9197e5a5f8c'));
});

