/*global define*/
define([
    'jquery',
    'backbone',
    'underscore',
    'controllers/base/controller',
    'views/domain-view'
], function ($, Backbone, _, Controller, View) {

    'use strict';

    var DomainController = Controller.extend({

        show: function (params) {

            this.view = new View({
                region: 'main'
            });
        }
    });

    return DomainController;
});

