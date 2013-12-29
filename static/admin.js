Array.prototype.move = function (old_index, new_index) {
  while (old_index < 0) {
    old_index += this.length;
  }
  while (new_index < 0) {
    new_index += this.length;
  }
  if (new_index >= this.length) {
    var k = new_index - this.length;
    while ((k--) + 1) {
      this.push(undefined);
    }
  }
  this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
  };

var app = angular.module("app", []);

var types = [
{"name": 'p', "fields": ["text"]},
{"name": 'img', "fields": ["source", "width", "float"]},
{"name": 'lead', "fields": ["text"]}, 
{"name": 'html', "fields": ["html"]},
{"name": 'source', "fields": ["source", "text"]}
]

$.get('/admin/authorized', function (data){
  if (!(data.authorized == true)) {
    window.location = '/';
  }
});

app.controller('selectCtrl', function ($scope) {
  $('.container').hide();
  $scope.new = function () {
    $('.container').hide();
    $('#new').show();
  };
  $scope.edit = function () {
    $('.container').hide();
    $('#edit').show();
  };
  $scope.remove = function () {
    $('.container').hide();
    $('#remove').show();
  };
})

app.controller('newCtrl', function ($scope, $http) {
  $scope.blog = {'content': [], "title": ""};

  $scope.types = types;
  $scope.type = $scope.types[0];

  $scope.new_element = function () {
    $scope.blog.content.push({'type': $scope.type.name});
  };

  $scope.remove_el = function (index) {
    $scope.blog.content.splice(index, 1);
  }

  $scope.move_up = function (index) {
    $scope.blog.content.move(index, index + 1);
  }

  $scope.move_down = function (index) {
    $scope.blog.content.move(index, index - 1);
  }

  $scope.submit = function () {
    var data = {};
    $.extend(data, $scope.blog);
    for (var i = data.content.length - 1; i >= 0; i--) {
      delete data.content[i]["$$hashKey"];
    };
     
    $.ajax({
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      url: '/admin/new',
      data: JSON.stringify({'blog': data})
    }).done(function(msg) {
      alert("Succesfully created blog!")
    });
  };
  
});

app.controller("editCtrl", function ($scope, $http) {
  $http.get('/blogs').success(function (data){
    $scope.blogs = data.blogs;
    $scope.blog = $scope.blogs[0];
  }); 

  $scope.types = types;
  $scope.type = $scope.types[0];

  $scope.new_element = function () {
    $scope.blog.content.push({'type': $scope.type.name});
  };

  $scope.remove_el = function (index) {
    $scope.blog.content.splice(index, 1);
  }

  $scope.move_up = function (index) {
    $scope.blog.content.move(index, index + 1);
  }

  $scope.move_down = function (index) {
    $scope.blog.content.move(index, index - 1);
  }
  

  $scope.submit = function () {
    var data = {};
    $.extend(data, $scope.blog);
    for (var i = data.content.length - 1; i >= 0; i--) {
      delete data.content[i]["$$hashKey"];
    };
     
    $.ajax({
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      url: '/admin/edit/' + $scope.blog.id,
      data: JSON.stringify(data)
    }).done(function(msg) {
      alert("Succesfully edited blog!")
    }).fail(function(msg){
      alert("Something went wrong. Please contact the system administrator.")
    });
  };
});

app.controller('removeCtrl', function ($scope, $http) {
  $http.get('/blogs').success(function (data){
    $scope.blogs = data.blogs;
    $scope.blog = $scope.blogs[0];
  });

  $scope.remove = function () {
    $.ajax({
      type: 'DELETE',
      url: '/admin/blog/' + $scope.blog.id,
    }).done(function (msg){
      alert("Succesfully removed blog!");
    }).fail(function (msg) {
      alert("Something went wrong. Please contact this system administrator.");
    });
  }
});

app.directive('blog', function () {
  return {
    'restrict': "E",
    'templateUrl': '/blog.html'
  }
});

app.directive('blogeditor', function (){ 
  return  {
    'restrict': "E",
    'templateUrl': "/BlogEditor.html"
  }
});