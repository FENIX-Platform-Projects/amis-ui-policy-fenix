/*global define*/
define([
    'jquery',
    'backbone',
    'underscore',
    'controllers/base/controller',
    'views/resources-view'
], function ($, Backbone, _, Controller, View) {

    'use strict';

    var ResourcesController = Controller.extend({

        show: function (params) {

            this.view = new View({
                region: 'main'
            });
        }
    });

    return ResourcesController;
});
