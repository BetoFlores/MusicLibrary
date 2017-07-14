(function(){
    "use strict";
    angular
        .module('MusicLibrary')
        .factory('DiscoverService', DiscoverService);

    DiscoverService.inject = ['API', '$http'];

    function DiscoverService(API, $http){
        var service = {
                getRecommendations: getRecommendations
        };

        return service;

        function getRecommendations(){
            return $http.get(API.url + 'recommendations')
                .then(function(response){
                    return response.data;
                })
                .catch(function(error){
                    console.log('Error XHR on DiscoverService.getRecommendations');
                });
        }
    }
})();
