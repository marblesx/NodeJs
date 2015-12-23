
angular.module('myApp')
    .controller('LobbyCtrl', function($scope, $location, GameService) {
        console.info('LobbyCtrl loaded');
        var socket;

        $scope.availableGames = [];
        $scope.creatingGame = false;
        $scope.gameSvc = GameService;

        $scope.getGames = function() {
            GameService.getGames()
                .then(function(success) {
                    var games = success.data;
                    console.info('getGames returned ' + games.length + ' items');
                    $scope.availableGames = games;
            });
        };

        function initSocket() {
            socket = io.connect('/lobby');
            if(socket.socket.connected){
                $scope.getGames();
            }
            socket.on('connect', function() {
                console.info('lobby socket connect');
            });

            socket.on('lobbyJoin', function(gameList) {
                console.info('lobbySocket: lobbyJoin');
                $scope.availableGames = gameList;
                $scope.$apply();
            });

            socket.on('gameAdded', function(gameList) {
                console.info('gameAdded');
                console.info(gameList);
                $scope.availableGames = gameList;
                $scope.$apply();
            });
        }
        initSocket();
        $scope.$emit('enterLobby');
    });