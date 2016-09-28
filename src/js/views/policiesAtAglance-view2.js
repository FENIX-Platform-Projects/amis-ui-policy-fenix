/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'loglevel',
    'views/base/view',
    'config/events',
    'config/policiesAtAglance/config',
    'fx-dashboard/start',
    'fx-filter/start',
    'fx-common/utils',
    'lib/utils',
    'i18n!nls/labels',
    'text!templates/policyAtGlance/policyAtGlance.hbs',
    //'text!templates/domain/domain.hbs',
    'text!templates/domain/dashboard.hbs',
    'text!templates/domain/bases.hbs',
    'config/policiesAtAglance/lateral_menu',
    'handlebars',
    'amplify',
    'jstree'
], function ($, _, log, View, EVT, PC, Dashboard, Filter, FxUtils, Utils, i18nLabels, template, dashboardTemplate, basesTemplate, LateralMenuConfig, Handlebars) {

    'use strict';

    var s = {
        CONTENT: "#domain-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        DASHBOARD_CONTENT: "#dashboard-content",
        LATERAL_MENU: '#lateral-menu',
        MAP_CONTAINER: "#country-map-container",
        FILTER_CONTAINER: '#filter-container',
        FILTER_SUBMIT: '#filter-submit',
        FILTER_BLOCK: "[data-role='filter-block']"
    };

    var DomainView = View.extend({

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
            amplify.publish(EVT.STATE_CHANGE, {menu: 'policiesAtAglance'});

            this._initVariables();

            this._printDomainDashboard();

        },

        _printDomainDashboard: function () {

            var self = this,
                template = Handlebars.compile(dashboardTemplate),
                html = template();

            this.$content.html(html);

            this._initDashboardVariables();

            this._bindDashboardEventListeners();

            //print lateral menu
            this.$lateralMenu.jstree(Utils.setI18nToJsTreeConfig(LateralMenuConfig, i18nLabels))

                //Limit selection e select only leafs for indicators
                .on("select_node.jstree", _.bind(function (e, data) {
                    console.log("select!!!!")

                    if (!data.instance.is_leaf(data.node)) {

                        self.$lateralMenu.jstree(true).deselect_node(data.node, true);

                        self.$lateralMenu.jstree(true).open_node(data.node, true);

                    } else {
                        log.info(data)
                        log.info(data.selected)
                        log.info(data.selected[0])
                        self._onChangeDashboard(data.selected[0]);
                    }

                }, this));

            //this._printDashboard('population');
            this._printDashboard('biofuelsPoliciesFreqGraph');

        },

        _initVariables: function () {

            this.$content = this.$el.find(s.CONTENT);

            this.filterValues = {};

            this.dashboards = [];

        },

        //country dashboard

        _bindDashboardEventListeners: function () {

            this.$filterSubmit.on('click', _.bind(this._onFilterClick, this));
        },

        _initDashboardVariables: function () {

            this.$filterSubmit = this.$el.find(s.FILTER_SUBMIT);

            this.$lateralMenu = this.$el.find(s.LATERAL_MENU);

        },

        _printDashboard: function (item) {
            console.log("In print Dashboard ")
            console.log(item)

            this._printDashboardBase(item);

            var conf = this._getDashboardConfig(item),
                filterConfig = this._getFilterConfig(item);
            console.log(conf)

            if (conf && !_.isEmpty(conf)) {
                this._renderDashboard(conf);
            }

            console.log(filterConfig)

            if (!_.isEmpty(filterConfig)) {
                this.$el.find(s.FILTER_BLOCK).show();
                this._renderFilter(filterConfig);
            } else {
                this.$el.find(s.FILTER_BLOCK).hide();
            }

        },

        _printDashboardBase: function (id) {
            console.log(id)

            //Inject HTML
            var source = $(basesTemplate).find("[data-dashboard='" + id + "']");
            //console.log(source.prop('outerHTML'))
            var template = Handlebars.compile(source.prop('outerHTML')),
                html = template(i18nLabels);
            console.log(html)
            this.$el.find(s.DASHBOARD_CONTENT).html(html);
        },

        _onChangeDashboard: function (item) {

            log.info(item)
            log.info(currentDashboard)
            if (this.currentDashboard !== item) {
                this.currentDashboard = item;
                this._printDashboard(item);
            }

        },

        _onFilterClick: function () {

            var values = this.filter.getValues();

            this.filterValues[this.currentDashboard] = values;

            _.each(this.dashboards, _.bind(function (dashboard) {
                if (dashboard && $.isFunction(dashboard.refresh)) {
                    dashboard.refresh(values);
                }
            }, this));

        },

        _createCountryFilter: function () {

            //create country filter

            return {"CountryCode": [this.id]};
        },

        _getDashboardConfig: function (id) {

            var conf = PC[id].dashboard,
                filterValues = this.filterValues[this.currentDashboard] || {};

            if (!Array.isArray(conf)) {
                conf = FxUtils.cleanArray([conf]);
            }

            return conf;

        },

        _getFilterConfig: function (id) {

            var conf = $.extend(true, {}, PC[id].filter),
                values = this.filterValues[id] || {},
                result = FxUtils.mergeConfigurations(conf, values);

            _.each(result, _.bind(function (obj, key) {

                if (!obj.template) {
                    obj.template = {};
                }
                //Add i18n label
                obj.template.title = Utils.getI18nLabel(key, i18nLabels, "filter_");

            }, this));

            return result;
        },

        _renderDashboard: function (config) {

            this._disposeDashboards();

            _.each(config, _.bind(function (c) {
console.log(c)
                this.dashboards.push(new Dashboard(c));

            }, this));

        },

        _disposeDashboards: function () {

            _.each(this.dashboards, _.bind(function (dashboard) {
                if (dashboard && $.isFunction(dashboard.dispose)) {
                    dashboard.dispose();
                }
            }, this));

            this.dashboards = [];
        },

        _renderFilter: function (config) {

            if (this.filter && $.isFunction(this.filter.dispose)) {
                this.filter.dispose();
            }

            this.filter = new Filter({
                el: s.FILTER_CONTAINER,
                items: config,
                common: {
                    template: {
                        hideSwitch: true,
                        hideRemoveButton: true
                    }
                }
            });

        },

        //Disposition process

        dispose: function () {

            if (this.$lateralMenu && this.$lateralMenu.length > 0) {
                this.$lateralMenu.jstree(true).destroy();
            }

            this._disposeDashboards();

            this._unbindDashboardEventListeners();

            this.currentDashboard = {};
            this.filterValues = {};

            View.prototype.dispose.call(this, arguments);

        },

        _unbindDashboardEventListeners: function () {

            if (this.$filterSubmit && this.$filterSubmit.length > 0) {
                this.$filterSubmit.off();
            }

        }

    });

    return DomainView;
});
