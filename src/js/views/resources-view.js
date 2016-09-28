/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'loglevel',
    'views/base/view',
    'config/events',
    'fx-common/utils',
    'lib/utils',
    'i18n!nls/labels',
    'text!templates/resources/resources.hbs',
    'handlebars',
    'amplify',
    'jstree'
], function ($, _, log, View, EVT, FxUtils, Utils, i18nLabels, template, Handlebars) {

    'use strict';

    var s = {
        ERROR: "ERROR",
        ERR_MSG: {
        }
    };

    var ResourcesView = View.extend({

        initialize: function (params) {

            this.lang = Utils.getLang().toUpperCase();

            View.prototype.initialize.call(this, arguments);
        },

        autoRender: true,

        className: 'domain',

        template: template,

        getTemplateData: function () {

            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);


            //update State
            amplify.publish(EVT.STATE_CHANGE, {menu: 'resources'});

        }

    });

    return ResourcesView;
});
