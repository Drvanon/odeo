// Generated by CoffeeScript 1.6.1
(function() {
  var loc, tabs, toggleModal;

  loc = window.location.pathname;

  loc = loc.substring(1);

  tabs = ['', 'spontaan', 'leven', 'eenvoudig', 'fossielen', 'cambrium'];

  toggleModal = function() {
    var body, modal_container;
    body = $('body');
    modal_container = $('.modal_container');
    body.toggleClass('body-locked');
    modal_container.toggleClass('dp-block');
    return console.log('Toggled');
  };

  $(function() {
    var tab, _i, _len;
    for (_i = 0, _len = tabs.length; _i < _len; _i++) {
      tab = tabs[_i];
      if (!loc) {
        $('#home').addClass('active');
        break;
      }
      if (loc === tab) {
        $('#' + loc).addClass('active');
      }
    }
    $('.img_link').click(function() {
      return toggleModal();
    });
    return $('.close_modal').click(function() {
      return toggleModal();
    });
  });

}).call(this);
