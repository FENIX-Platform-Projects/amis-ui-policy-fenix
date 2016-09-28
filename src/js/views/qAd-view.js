/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'loglevel',
    'views/base/view',
    'utils/preview-table',
    'config/events',
    'config/qAd/config',
    'fx-dashboard/start',
    'fx-filter/start',
    'fx-common/utils',
    'lib/utils',
    'i18n!nls/labels',
    'text!templates/qAd/qAd.hbs',
    'text!templates/qAd/qAd_filter.hbs',
    'models/filterModule',
    'handlebars',
    'amplify',
    'jstree'
], function ($, _, log, View, Preview, EVT, PC, Dashboard, Filter, FxUtils, Utils, i18nLabels, template, filterTemplate, FilterModule, Handlebars) {

    'use strict';

    var s = {
        ERROR: "ERROR",
        ERR_MSG: {
            pol_meas_config_params : "Policy Measure parameters configuration",
            pol_meas_config : "Policy Measure configuration",
            filter_values : "Filter Values"
        },
        CONTENT: "#qAd-content",
        FIRST_TAB_CONTENT: "#qd_component",
        SEARCH_FILTER_INPUT: "#searchinput",
        DASHBOARD_CONTENT: "#dashboard-content",
        //LATERAL_MENU: '#lateral-menu',
        //MAP_CONTAINER: "#country-map-container",
        FILTER_CONTAINER: '#filter-container',
        FILTER_SUBMIT: '#filter-submit',
        FILTER_BLOCK: "[data-role='filter-block']"
    };

    var QaDView = View.extend({

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
            amplify.publish(EVT.STATE_CHANGE, {menu: 'qAd'});

            this._initVariables();

            this._initFilter();

            this._renderFilter();

            log.info("after_renderFilter2");

            this._bindFilterEventListeners();

            this._initPageVariables();

            this._bindPageEventListeners();
        },

        _initVariables: function () {

            this.$content = this.$el.find(s.CONTENT);

            this.$filtercontent = this.$el.find(s.FILTER_CONTAINER);

            this.filterValues = {};

            this.dashboards = [];
        },

        _initFilter: function () {

            var self = this;
                template = Handlebars.compile(filterTemplate);
            var html = template(i18nLabels);

            this.$filtercontent.html(html);
        },

        _renderFilter: function () {

            if (this.filter && $.isFunction(this.filter.dispose)) {
                this.filter.dispose();
            }

            this.filter = new Filter({
                items: FilterModule,
                el: s.FILTER_CONTAINER,
                //summaryEl: s.ALL_SUMMARY
            });
        },

        _bindFilterEventListeners: function () {
            log.info("on _bindFilterEventListeners");
            log.info(this.$filtercontent);
            this.$filtercontent.on('change', _.bind(this._onFilterSelect, this));
        },

        //country dashboard
        _bindPageEventListeners: function () {
            this.$filterSubmit.on('click', _.bind(this._onFilterClick, this));
        },

        _onFilterSelect: function () {
            log.info("on filter select event");

            var values = this.filter.getValues();
            this.filterValues = values;
        },

        _initPageVariables: function () {

            this.$filterSubmit = this.$el.find(s.FILTER_SUBMIT);
        },

        _onFilterClick: function () {

            var filter_values = this.filter.getValues();
            log.info("Before preview init")
            log.info(values);
            //"preview" "searchCreatePolicy" "searchCreatePolicy"



            //policy_domain_code : "1,2",
            //    commodity_domain_code : "1,2",
            //    commodity_class_code : "3,9,13,18,11,10,14,8",
            //    policy_type_code : ["1","2"],
            //    policy_measure_code:["1, 2, 3, 4, 5","11, 31"],
            //    country_code : "12,17,37,46,53,40765,999000,85",
            //"start_date":"2007-01-01",
            // "end_date":"2019-02-28"


            //commodityClass["3", "9", "18", 2 altri elementi...]
            //commodityDomain["1", "2"]
            //country["12", "37", "46", "40765"]
            //policyDomain["1", "2"]
            //policyMeasure["27", "5", "4"]
            //policyType["1", "2"]
            //year [Object { value=2013,  parent="to"}, Object { value=2011,  parent="from"}] or year["2005", "2007"]

            var policy_domain_code = '';
            var commodity_domain_code = '';
            var commodity_class_code = '';
            var policy_type_code = '';
            var policy_measure_code = '';
            var policy_type_label = '';
            var policy_measure_label = '';
            var country_code = '';

            //Could be slider or classic
            var active_year_tab = 'slider';
            var selected_year_list = '';
            var selected_start_date = '';
            var selected_end_date = '';
            if((!filter_values)&&(!filter_values.values)&&(!filter_values.labels)){

                var values = filter_values.values;
                var labels = filter_values.labels;

                policy_domain_code = values.policyDomain;
                commodity_domain_code = values.commodityDomain;
                commodity_class_code = values.commodityClass;

                policy_type_code = values.policyType;
                policy_measure_code = values.policyMeasure;
                policy_type_label = labels.policyType;
                policy_measure_label = labels.policyMeasure;
                country_code = values.country;

                var policy_measure_configuration = this._policyMeasureConf(policy_type_code, policy_type_label, policy_measure_code, policy_measure_label);
                if(policy_measure_configuration == null){
                    log,error(s.ERROR + " -- "+ S.ERR_MSG.pol_meas_config);
                    this.dispose();
                    return;
                }

                //policy_domain_code : 1,
                //    commodity_domain_code : 1,
                //    commodity_class_code : "3,9,13,18,11,10,14,8",
                //    policy_type_code : ["1"],
                //    policy_measure_code:["1"],
                //    country_code : "12",

                var yearSelector = values.year;
                if((yearSelector!=null)&&(typeof yearSelector!= 'undefined')){
                    //[Object { value=2013,  parent="to"}, Object { value=2011,  parent="from"}]
                    if((yearSelector.length==2)&&(!(yearSelector[0] instanceof String))){
                        //Year Slider
                        active_year_tab = 'slider';
                        for(var i=0; i<yearSelector.length; i++){
                            switch (yearSelector[i].parent){
                                case 'from':
                                    selected_start_date = yearSelector[i].value;
                                    break;
                                case 'to':
                                    selected_end_date = yearSelector[i].value;
                                    break;
                            }
                        }
                    }
                    else {
                        //Year List
                        selected_year_list = values;
                        active_year_tab = 'classic';
                    }
                }
            }
            else {
                //log,error(s.ERROR + " -- "+ S.ERR_MSG.filter_values);
                return;
            }

            var conf = {button_preview_action_type: "preview", policy_domain_code: policy_domain_code, commodity_domain_code : commodity_domain_code,
                commodity_class_code: commodity_class_code,
                policy_type_code : policy_type_code, policy_measure_code : policy_measure_configuration, country_code : country_code,
                year_tab : active_year_tab, year_list : selected_year_list, start_date : selected_start_date, end_date : selected_end_date};

            var preview = new Preview(conf)._init();

            //this.filterValues[this.currentDashboard] = values;
            //
            //_.each(this.dashboards, _.bind(function (dashboard) {
            //    if (dashboard && $.isFunction(dashboard.refresh)) {
            //        dashboard.refresh(values);
            //    }
            //}, this));
        },

        _policyMeasureConf: function (policy_type_code, policy_type_label, policy_measure_code, policy_measure_label) {
            var policy_measure_conf = null;

            if((!policy_type_code)&&(!policy_type_label)&&(!policy_measure_code)&&(!policy_measure_label)){
               for(var i= 0; i< policy_type_code.length; i++){
                   var policy_measure_string_codes = [];
                   var pol_type_code = policy_type_code[i];
                   var pol_type_label = policy_type_label[pol_type_code];
                   //var keys = [];
                   //for(var k in policy_measure_label) keys.push(k);
                   for(var iPm= 0; iPm< policy_measure_code.length; iPm++){
                       var single_pol_measure_code = policy_measure_code[iPm];
                       var single_pol_measure_label = policy_measure_code[single_pol_measure_code];
                       if(single_pol_measure_label.indexOf(pol_type_label)!=-1){
                           policy_measure_string_codes[i].push(single_pol_measure_code)
                       }
                   }
                   policy_measure_conf.push(policy_measure_string_codes.toString());
               }
            }
            else{
                log,error(s.ERROR + " -- "+ S.ERR_MSG.pol_meas_config_params);
                return null;
            }

            return policy_measure_conf;
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

        //Disposition process

        dispose: function () {

            this._unbindFilterEventListeners();

            this._unbindPageEventListeners();

            this.filterValues = {};

            View.prototype.dispose.call(this, arguments);

        },

        _unbindFilterEventListeners: function (config) {

            if (this.filter && $.isFunction(this.filter.dispose)) {
                this.filter.dispose();
            }
        },

        _unbindPageEventListeners: function () {

            this.$filtercontent.off();

            if (this.$filterSubmit && this.$filterSubmit.length > 0) {
                this.$filterSubmit.off();
            }

        }

    });

    return QaDView;
});
