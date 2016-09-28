/*global define*/
define([
    'jquery',
    'backbone',
    'underscore',
    'controllers/base/controller',
    'views/qAd-view'
], function ($, Backbone, _, Controller, View) {

    'use strict';

    var QEDController = Controller.extend({

        show: function (params) {

            this.view = new View({
                region: 'main'
            });
        }
    });

    return QEDController;
});
