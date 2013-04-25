var loc, tabs;

loc = window.location.pathname;

loc = loc.substring(1);

tabs = ['', 'spontaan', 'leven', 'eenvoudig', 'fossielen', 'cambrium'];

$(function() {
  var $body, tab, _i, _len, _results;

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
    _results.push($body = $("body").on("shown", ".modal", function() {
      return $body.addClass("modal-open");
    }).on("hidden", ".modal", function() {
      return $body.removeClass("modal-open");
    }));
  }
  return _results;
});