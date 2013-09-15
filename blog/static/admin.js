$(document).ready(function () {
  $('#new_blog').submit(function (e) {
    e.preventDefault();
    $.post('/blog/admin/new_blog', $(this).serialize(), function (data){
      alert(data.message);
    });
  });
});
