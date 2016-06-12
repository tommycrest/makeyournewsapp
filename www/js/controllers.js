angular.module('makeyournewsApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
}).controller('PlaylistsCtrl', ['$scope', 'feedService',  '$sce', 'playlists', function($scope, feedService, $sce, playlists) {
  $scope.playlists = playlists;	
 
  $scope.convertToDate = function (stringDate){
  	var dateOut = new Date(stringDate);
  	return dateOut;
};
}]).controller('BrowserCtrl', [ '$scope', 'editionService','editions', '$state', 'feedService', '$rootScope', function($scope, editionService, editions, $state, feedService, $rootScope){	
	console.log("edition");
	console.log($state);
	$scope.editions = editions;
	
	$scope.playlists = [];
	
	 $scope.getSourceEdition = function( hl, ned ) {
	  
	  var feedSrc = "";
	  
	  if( ned == "ru_ru" ) {
		//feedSrc = "http://news.google.com/news?cf=all&hl=ru&ned=ru_ru&output=atom&scoring=n";
	   } else if( ned == "el_gr" ) {
		//feedSrc = "http://news.google.com/news?cf=all&pz=1&as_qdr=h&&hl="+this.localStorageService.get("hl")+"&ned="+this.localStorageService.get("ned")+"&output=atom&scoring=n";  
	   } else if( ned == "ca" ) {
		//feedSrc = "http://news.google.com/news?cf=all&hl="+this.localStorageService.get("hl")+"&ned="+this.localStorageService.get("ned")+"&output=atom&scoring=n";  
	   } else if( ned == "fr" ) {
		//feedSrc = "http://news.google.com/news?cf=all&ned="+this.localStorageService.get("ned")+"&output=atom&scoring=n";  
	   } else if( ned == "uk" ) {
		//feedSrc = "http://news.google.com/news?cf=all&hl=en&ned="+this.localStorageService.get("ned")+"&output=atom&scoring=n";  
	   } else if( ned == "es_ve" ) {
		//feedSrc="http://news.google.com/news?cf=all&pz=1&as_qdr=h&ned=es_ve&output=atom&scoring=n&num=15";
	   } else if( ned == "no_no" ) {
		//feedSrc="http://news.google.com/news?cf=all&hl=no&as_qdr=h&ned=no_no&output=atom&scoring=n&num=15";
	   } else {
		feedSrc = "http://news.google.com/news?cf=all&pz=1&as_qdr=h&ned="+ned+"&output=atom&scoring=n&num=15";
	   }
	  
	  console.log("feedSrc "+feedSrc);
	  feedService.parseFeed(feedSrc).then( response => {
          console.log(response);
          $scope.playlists = response.data.responseData.feed.entries;
      });
		 
	  $rootScope.$broadcast('GATHER', $scope.playlists);
	  $scope.goToNews();
		 
      $scope.getPlaylist = function() { return $scope.playlists; }
  }
	
	$scope.goToNews = function() {
		$state.go('app.single');
	}
}]).controller('PlaylistCtrl', ['$scope', 'feedService', '$sce', 'playlists', function($scope, feedService, $sce, playslists) {
	
  $scope.playlists = playlists;
		
  $scope.convertToDate = function (stringDate){
  	var dateOut = new Date(stringDate);
  	return dateOut;
  };
}]);
