$(document).ready(function () {
  $('#reaction-form').submit(function (e) {
    e.preventDefault();

    $('#reaction-form input').each(function (e, v) {
      if(!$(v).val()) {
        alert('Your form is invalid. Some fields are empty');
        return;
      }
    });
    if(!$('#reaction-form textarea').val()) {
        alert('Your form is invalid. Some fields are empty');
        return;
    }

    $.post($(this).attr('action'), $(this).serialize());
    $('input').val('');
    $('textarea').val('');
  });
});
