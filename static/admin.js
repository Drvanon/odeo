$(document).ready(function () {
  var count = 0;

  $('#new_blog').submit(function (e) {
    e.preventDefault();
    $.post('/admin/new_blog', $(this).serialize(), function (data){
      alert(data.message);
    });
  });

  $("#new_element").submit(function (e) {
    e.preventDefault();
    if($("#select_type").val()=="alinea"){
      count++;
      var lab = document.createElement("label");
      var input = document.createElement("textarea");

      var div = document.createElement("div");

      var remove = document.createElement("button");
      $(remove).addClass("remove_el");
      $(remove).text("remove this element");

      input.type = "textarea";
      input.name = "alinea" + count;
      lab.innerHTML = "Alinea:";
      lab.appendChild(input);

      div.appendChild(lab);
      div.appendChild(remove);
      $(div).addClass('el');

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

      var remove = document.createElement("button");
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
      $(div).addClass('el');

      $('.remove_el').click(function () {
        $(this).parent().remove();
        count--;
      });

    }
    if ($("#select_type").val()=="lead"){
      var remove = document.createElement("button");
      $(remove).addClass("remove_el");
      $(remove).text("remove this element");

      var lab = document.createElement("label");
      var input = document.createElement("textarea");
      var div = document.createElement("div");

      input.type = "textarea";
      input.name = "lead" + count;
      lab.innerHTML = "Lead:";
      lab.appendChild(input);

      div.appendChild(lab);
      div.appendChild(remove);
      $(div).addClass('el');
      $('#inputField').append(div);

      $('.remove_el').click(function () {
        $(this).parent().remove();
        count--;
      });
    }
  });

  var id = -1;

  $('#select_blog').change(function (){
    $.get('/admin/blog/' + $('#select_blog').val(), function (data) {
      $('#etitle').val(data.title);
      $('#econtent').val(data.content);

      id = data.id;
    });
  });

  $('#edit_blog').submit(function (e) {
    e.preventDefault();

    $.post('/admin/edit/' + id, $(this).serialize(), function (data) {
      alert(data.message);
    });
  });

  $('#remove_blog').click(function (e) {
    e.preventDefault();
    $.ajax({
      url: '/admin/blog/delete/' + id,
      type: 'DELETE',
      success: function(data) {
        alert(data.message);
      }
    });
  });
});
