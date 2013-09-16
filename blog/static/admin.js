$(document).ready(function () {
  var count = 0;

  $('#new_blog').submit(function (e) {
    e.preventDefault();
    $.post('/blog/admin/new_blog', $(this).serialize(), function (data){
      alert(data.message);
    });
  });

  $("#new_element").submit(function (e) {
    e.preventDefault();
    if($("#select_type").val()=="alinea"){
      count++;
      var lab = document.createElement("label");
      var input = document.createElement("input");

      var div = document.createElement("div");

      var remove = document.createElement("p");
      $(remove).addClass("remove_el");
      $(remove).text("remove this element");

      input.type = "textarea";
      input.name = "alinea" + count;
      lab.innerHTML = "Alinea:";
      lab.appendChild(input);

      div.appendChild(lab);
      div.appendChild(remove);

      $('#inputField').append(div);

      $('.remove_el').click(function () {
        $(this).parent().remove();
        count--;
      });

    }
    if ($("#select_type").val()=="image"){
      count++;
      var div = document.createElement("div");

      var lablink = document.createElement("label");
      var inputlink = document.createElement("input");

      var labfloat = document.createElement("label");
      var inputfloat = document.createElement("input");

      var labwidth = document.createElement("label");
      var inputwidth = document.createElement("input");

      var labid = document.createElement("label");
      var inputid = document.createElement("input");

      var remove = document.createElement("p");
      $(remove).addClass("remove_el");
      $(remove).text("remove this element");

      inputlink.type = "textarea";
      inputlink.name = "image" + count;
      lablink.innerHTML = "link:";
      lablink.appendChild(inputlink);


      inputfloat.type = "textarea";
      inputfloat.name = "float" + count;
      labfloat.innerHTML = "float:";
      labfloat.appendChild(inputfloat);

      inputwidth.type = "textarea";
      inputwidth.name = "width" + count;
      labwidth.innerHTML = "width:";
      labwidth.appendChild(inputwidth);

      div.appendChild(lablink);
      div.appendChild(labfloat);
      div.appendChild(labwidth);
      div.appendChild(remove);
      $('#inputField').append(div);

      $('.remove_el').click(function () {
        $(this).parent().remove();
        count--;
      });

    }
  });

  var id = -1;

  $('#select_blog').change(function (){
    $.get('/blog/admin/blog/' + $('#select_blog').val(), function (data) {
      $('#etitle').val(data.title);
      $('#econtent').val(data.content);

      id = data.id;
    });
  });

  $('#edit_blog').submit(function (e) {
    e.preventDefault();

    $.post('/blog/admin/edit/' + id, $(this).serialize());
  });
});
