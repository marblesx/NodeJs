'use strict';

var ctrl = angular.module('myApp.controllers', []);
    ctrl.controller('HomeCtrl', function($scope, $location, GameService) {
        console.info('HomeCtrl loaded');

        var handleError = function(err) {
            console.error(err);
        };

        $scope.gameSvc = GameService;
        $scope.inLobby = true;

        $scope.createGame = function() {
            console.info('createGame called');
            GameService.initName();
            GameService.createGame()
                .then(function(success) {
                    //navigate to the new game
                    console.info(success);
                    $scope.joinGame(success.data.id);
                }, handleError);
        };

        $scope.joinGame = function(gameId) {
            console.info('joinGame called for gameId ' + gameId);
            GameService.initName();
            $location.url("/game/"+ gameId + "/pId/" + GameService.playerId + "/name/" + GameService.playerName);
        };

        $scope.$on('enterLobby', function() {
            $scope.inLobby = true;
        });

        $scope.$on('enterGame', function() {
            $scope.inLobby = false;
        })

    })
    