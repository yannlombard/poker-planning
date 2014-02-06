'use strict';

angular.module('pokerPlanningApp').factory('User', function ($firebase) {
    // Service logic

    var name = 'Votre nom';

    var userRef = new Firebase("https://poker-planning.firebaseio.com/users");

    // Automatically syncs everywhere in realtime
    var user = $firebase(userRef);
    //user.$add({name: name});

    // Public API here
    return {
        name: function () {
            return name;
        },
        user: function() {
            return user;
        }
    };
});
