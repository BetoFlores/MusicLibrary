(function(){
  "use strict";
  angular
      .module('MusicLibrary')
      .controller('DiscoverController', DiscoverController);

  DiscoverController.inject = ['$ionicPlatform', '$rootScope', 'ngAudio', 'DiscoverService'];

  function DiscoverController($ionicPlatform, $rootScope, ngAudio, DiscoverService){

    var controller = this;

    //Properties
    controller.recommendations = [];
    controller.playingSong = null;
    //Methods
    controller.discardRecommendation = discardRecommendation;
    controller.addFavorite = addFavorite;

    $ionicPlatform.ready(start);

    function start(){
      appendRecommendations(playFirstSong);
    }

    function appendRecommendations(callback){
      DiscoverService.getRecommendations()
        .then(function(data){
          controller.recommendations = controller.recommendations.concat(data);
          if(callback) callback();
      });
    }

    function shiftRecommendation(){
      controller.recommendations.splice(0, 1);
      playFirstSong();
      if(controller.recommendations.length < 3){
        appendRecommendations();
      }
    }

    function discardRecommendation(){
      shiftRecommendation()
    }

    function addFavorite(){
      $rootScope.favorites.push(controller.recommendations[0]);
      shiftRecommendation()
    }

    function playFirstSong(){
      var firstSong = controller.recommendations[0];
      if(firstSong){
        if(controller.playingSong !== null) controller.playingSong.stop();
        controller.playingSong = ngAudio.load(firstSong.preview_url);
        controller.playingSong.play();
      }
    }
  }
})();
