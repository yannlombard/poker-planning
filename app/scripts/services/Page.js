'use strict';

angular.module('pokerPlanningApp').factory('Page', function () {

    var defaultTitle = 'Poker planning';
    var title = defaultTitle;

    // Public API here
    return {
        title: function() {
            return title;
        },
        setTitle: function(newTitle) {
            title = newTitle;
        },
        setDefault: function() {
            title = defaultTitle;
        }
    };
});
