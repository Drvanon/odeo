var app = angular.module("app", ['ngSanitize']);

app.controller('appCtrl', function ($scope, $http) {
  $http.get('/blogs')
    .success(function (data) {
      $scope.blogs = data.blogs;
    })
    .error(function () {
      $scope.error = 'Something went wrong';
    });

  function blogindex (index) {
    return jQuery('#blogs blog:nth-child('+ index + ')');
  }

  $scope.active = function (blog) {
    if ($('#' + blog.id).hasClass('active')) {
      return true;
    } else {
      return false;
    }
  }

  $scope.expand = function (blog) {
    $('#' + blog.id).addClass('active');
  }
});

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

app.directive('blog', function () {
  return {
    'restrict': "E",
    'templateUrl': 'blog.html'
  };
});

app.directive('lead', function () {
  return {
    'restrict': "E",
    'templateUrl': 'lead.html',
    'link': function (scope, element, attrs) {
      scope.img_src = attrs.imgsrc;
      console.log(attrs.imgsrc);
    } 
  };
});
