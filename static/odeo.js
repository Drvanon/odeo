var loc, tabs;

loc = window.location.pathname;

loc = loc.substring(1);

tabs = ['', 'spontaan', 'leven', 'eenvoudig', 'fossielen', 'cambrium'];

$(function() {
  var tab, _i, _len, _results;

  _results = [];
  for (_i = 0, _len = tabs.length; _i < _len; _i++) {
    tab = tabs[_i];
    if (!loc) {
      $('#home').addClass('active');
      break;
    }
    if (loc === tab) {
      $('#' + loc).addClass('active');
    }
    if (loc.indexOf('eenvoudig') !== -1) {
      $('#eenvoudig').addClass('active');
    }
    $('.modal').on('hide', function() {
      $('body').css("overflow", "hidden");
      return $(this).css("overflow", "scroll");
    });
    _results.push($('.modal').on('show', function() {
      $(this).css("overflow", "hidden");
      return $('body').css("overflow", "scroll");
    }));
  }
  return _results;
});