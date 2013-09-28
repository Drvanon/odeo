$(document).ready(function () {
  $(document).click(function () {
    $('.img-popover').fadeOut();
  });

  $('img').click(function (e) {
    $('body').append('<div class="img-popover"><img src="'+ $(this).attr('src') +'"></div>');
    e.stopPropagation();
  });
});
