$(document).ready(function () {
  $('img').click(function (e) {
    $('body').append('<div class="img-popover"><img src="'+ $(this).attr('src') +'"></div>');
    $('#container').fadeTo(0.5, 1);
    e.stopPropagation();
  });
});
