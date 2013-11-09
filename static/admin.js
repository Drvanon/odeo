$(document).ready(function () {
  var count = 0;

  $.get('/admin/blog/' + $('#select_blog').val(), function (data) {
      $('#etitle').val(data.title);
      $('#econtent').val(data.content);

      id = data.id;
    });

  $.get('/admin/about', function (data) {
    $('#acontent').text(data.content);
  });

  $('#new_blog').submit(function (e) {
    e.preventDefault();
    var data = {
      'title': $(this).find('#title').val(),
      'content': []
    } 
    $(this).find('.el').each(function (i, e){
      if($(e).attr('data-type')=='alinea') {
        data.content.push({
          'type': 'alinea',
          'text': $(e).find('.alinea').val()
        })
      }
      if($(e).attr('data-type')=='image') {
        data.content.push({
          'type': 'image',
          'float': $(e).find('.float').val(),
          'link': $(e).find('.link').val(),
          'width': $(e).find('.width').val()
        })
      }
      if($(e).attr('data-type')=='source') {
        data.content.push({
          'type': 'source',
          'text': $(e).find('.source').val()
        })
      }
      if($(e).attr('data-type')=='video') {
        data.content.push({
          'type': 'video',
          'element': $(e).find('.video').val()
        })
      }
    });
    $.post('/admin/new_blog', {"json" :JSON.stringify(data)}, function (data){
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
      $(input).addClass('alinea');
      lab.innerHTML = "Alinea:";
      lab.appendChild(input);

      div.appendChild(lab);
      div.appendChild(remove);
      $(div).addClass('el');
      $(div).attr('data-type', 'alinea');

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
      $(inputlink).addClass('link');
      lablink.innerHTML = "link:";
      lablink.appendChild(inputlink);


      inputfloat.type = "textarea";
      $(inputfloat).addClass('float');
      labfloat.innerHTML = "float:";
      labfloat.appendChild(inputfloat);

      inputwidth.type = "textarea";
      $(inputwidth).addClass("width");
      labwidth.innerHTML = "width:";
      labwidth.appendChild(inputwidth);

      div.appendChild(lablink);
      div.appendChild(labfloat);
      div.appendChild(labwidth);
      div.appendChild(remove);
      $('#inputField').append(div);
      $(div).addClass('el');
      $(div).attr('data-type', 'image');

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

      $(input).addClass('lead')
      lab.innerHTML = "Lead:";
      lab.appendChild(input);

      div.appendChild(lab);
      div.appendChild(remove);
      $(div).addClass('el');
      $(div).addClass('lead');
      $('#inputField').append(div);

      $('.remove_el').click(function () {
        $(this).parent().remove();
        count--;
      });
    }
    if ($("#select_type").val()=="video") {
      var remove = document.createElement("button");
      $(remove).addClass("remove_el");
      $(remove).text("remove this element");

      var lab = document.createElement("label");
      var input = document.createElement("textarea");
      var div = document.createElement("div");

      $(input).addClass('video')
      lab.innerHTML = "Video:";
      lab.appendChild(input);

      div.appendChild(lab);
      div.appendChild(remove);
      $(div).addClass('el');
      $(div).attr('data-type', 'video');
      $('#inputField').append(div);

      $('.remove_el').click(function () {
        $(this).parent().remove();
        count--;
      });
    }
    if ($("#select_type").val()=="source") {
      var remove = document.createElement("button");
      $(remove).addClass("remove_el");
      $(remove).text("remove this element");

      var lab = document.createElement("label");
      var input = document.createElement("input");
      var div = document.createElement("div");

      $(input).addClass("source")
      lab.innerHTML = "source:";
      lab.appendChild(input);

      div.appendChild(lab);
      div.appendChild(remove);
      $(div).addClass('el');
      $(div).attr('data-type', 'source');
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

  $('#about').submit(function (e) {
    e.preventDefault();
    $.post('/admin/about/edit', {"content": $('#acontent').val()}, function (data) {
      alert(data.message);
    });
 });
});
