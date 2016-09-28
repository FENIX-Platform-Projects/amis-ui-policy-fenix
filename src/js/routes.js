/*global define*/
define(function () {
    'use strict';

    // The routes for the application. This module returns a function.
    // `match` is match method of the Router
    return function (match) {
        match('', 'policiesAtAglance#show');
        //match('home', 'home#show');
        //match('profile', 'countries#show');
        //match('profile/:id', 'profile#show');
        match('policiesAtAglance', 'policiesAtAglance#show');
        match('queryAnddownloads', 'qAd#show');
        match('resources', 'resources#show');
        //match('domains/:id', 'domain#show');
        //match('analysis', 'analysis#show');

        //TODO to check
        //match('methods', 'methods#show');
        //match('methods/:id', 'methods#show');
        //match('modules', 'modules#show');
        match('*anything', '404#show');
    };
});
