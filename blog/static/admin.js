$(document).ready(function () {
  var alineas = 0;
  var images = 0;

  $('#new_blog').submit(function (e) {
    e.preventDefault();
    $.post('/blog/admin/new_blog', $(this).serialize(), function (data){
      alert(data.message);
    });
  });

  $("#new_element").submit(function (e) {
    e.preventDefault();
    if($("#select_type").val()=="alinea"){
      alineas++;
      var lab = document.createElement("label");
      var input = document.createElement("input");

      input.type = "textarea";
      input.name = "alinea" + alineas;
      lab.innerHTML = "Alinea:";
      lab.appendChild(input);
      $('#inputField').append(lab);
    }
  });
});
