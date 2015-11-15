// tell this angular module where app begins
angular.module('eBayNycSearchApp', [])
.controller('searchController', function($rootScope, $scope, $timeout, eBayRequestService) {
  $scope.loading = false; 
  // gets chomp search terms from user & log this
  $scope.searchTerms = '';
  $scope.submit = function() {
    if ($scope.text) {
      // loading
      $scope.loading = true;

      // promise:
      eBayRequestService.getItems($scope.text)
      .then(function(data) {
        $scope.searchResults = data.data['item'];
        $scope.loading = false;
      })
      .catch(function(error) {
        console.log("error:", error);
      })
    }
  }
  console.log($scope);
})
.service('eBayRequestService', function($http) {
  return {
    getItems: function(searchTerms){
      return $http({
        method: 'GET',
        url: 'http://localhost:8080/items',
        params: {
          'search': searchTerms
        }
      });
    }
  };
});
