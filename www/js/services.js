//////////////////////////////////////////////////////////////////////////////////////
// feedService gathering the information from sources from the net
//////////////////////////////////////////////////////////////////////////////////////
'use strinct';

angular.module('makeyournewsApp.feedService',[]).service('feedService',['$http', function($http){
    return {
        parseFeed: function(url) {
            // return the parsed feed in json format
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
		},
        query : function(feedSrc) { 
			this.parseFeed(feedSrc).then( response => {
				console.log(response);
				playlists =  response.data.responseData.feed.entries;
   			}); 
		},
		getEdtion : function() {
			return playlists; 
		}
    }	
}]).factory('editionService', [function(){
	
}]);