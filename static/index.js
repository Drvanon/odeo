var app = angular.module("app", ['ngSanitize']);

app.controller('appCtrl', function ($scope, $http) {
  $http.get('/blogs')
    .success(function (data) {
      $scope.blogs = data.blogs;
    })
    .error(function () {
      $scope.error = 'Something went wrong';
    });
});

app.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

app.directive('blog', function () {
  return {
    'restrict': "E",
    'templateUrl': '/blog.html'
  }
});
