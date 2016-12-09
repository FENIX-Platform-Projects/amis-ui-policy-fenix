/*global define*/
define([
    'jquery',
    'backbone',
    'underscore',
    'controllers/base/controller',
    'views/policiesAtAglance-view'
], function ($, Backbone, _, Controller, View) {

    'use strict';

    var PoliciesAtAglanceController = Controller.extend({

        show: function (params) {

            this.view = new View({
                region: 'main'
            });
        }
    });

    return PoliciesAtAglanceController;
});
