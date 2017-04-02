angular.module('stackets.home', [])
.controller('HomeController', function($scope, $http, $window, $location, Snippets) {
  $scope.loggedIn = false;
  if( $window.localStorage.stacketsToken ) {    
    Snippets.authenticate().then(function(response) {        
      $scope.loggedIn = true;
      $scope.username = response.data.name;
      $scope.imageUrl = response.data.photo;
    },function(error) {
      console.log('initial query error', error)
    }); 
  }

  var query = $location.search()

  if (query["token"]) {
    $window.localStorage.stacketsToken = query["token"];
    $window.localStorage.userId = query["id"];
    $scope.username = query["name"];
    $scope.imageUrl = query["photo"] + '&oe=' + query["oe"];
    $scope.username = query["name"];
    $scope.show = true;
  }

  var userId = query["id"];

  if (userId) {
    Snippets.logIn(userId);
  }

  

  $scope.toggleShow = function() {
    $scope.show = $scope.show ? false : true;
  }

  $scope.loginUser = function(email, password) {
    $http({
      method: 'POST',
      url: '/login',
      data: {
        email: email,
        password: password
      }
    })
    .then(function(response) {
      $scope.loggedUserEmail = response.data.userEmail;
    }
  )};  
}
