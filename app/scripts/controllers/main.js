'use strict';

angular.module('pokerPlanningApp').controller('MainCtrl', function ($scope, User, $firebase, $firebaseSimpleLogin) {


    // Auth
    var authRef = new Firebase("https://poker-planning.firebaseio.com/");

    var loginObj;
    $scope.loginObj = loginObj = $firebaseSimpleLogin(authRef);

    // set name
    var usersRef = new Firebase("https://poker-planning.firebaseio.com/users");
    var users = $firebase(usersRef);

    users.$bind($scope, 'name');

    // client info
    var infoRef = new Firebase("https://poker-planning.firebaseio.com/.info");
    var info = $firebase(infoRef);

    $scope.info = info;


    /*var auth = new FirebaseSimpleLogin(userRef, function(error, user) {

        console.log('user.displayName', user.displayName);

    });

    auth.login('anonymous', {
        rememberMe: true
    });*/

    //$scope.user = User.user().name;
    //console.log($scope.user);
    //$scope.user.$bind($scope, "remoteUser");
    //$scope.remoteUser.name

});
