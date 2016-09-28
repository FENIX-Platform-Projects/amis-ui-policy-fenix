/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'loglevel',
    'views/base/view',
    'config/events',
    'config/config',
    'config/policiesAtAglance/config',
    'fx-dashboard/start',
    'fx-filter/start',
    'fx-common/utils',
    'lib/utils',
    'i18n!nls/labels',
    'text!templates/policyAtGlance/policyAtGlance.hbs',
    'text!templates/policyAtGlance/dashboard.hbs',
    'text!templates/policyAtGlance/bases.hbs',
    'text!templates/policyAtGlance/page_descriptions.hbs',
    'config/policiesAtAglance/lateral_menu',
    'fx-common/bridge',
    'handlebars',
    'amplify',
    'jstree'
], function ($, _, log, View, EVT, C, PC, Dashboard, Filter, FxUtils, Utils, i18nLabels, template, dashboardTemplate, basesTemplate, Descriptions, LateralMenuConfig, Bridge, Handlebars) {

    'use strict';

    var s = {
        CONTENT: "#domain-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        DASHBOARD_CONTENT: "#dashboard-content",
        LATERAL_MENU: '#lateral-menu',
        MAP_CONTAINER: "#country-map-container",
        FILTER_CONTAINER: '#filter-container',
        FILTER_CONTAINER_SLIDER_DROPDOWN: '#filter-container-slider-dropdown',
        FILTER_CONTAINER_DROPDOWN: '#filter-container-dropdown',
        FILTER_CONTAINER_TWO_DROPDOWNS: "#filter-container-two-dropdowns",
        FILTER_SUBMIT: '#filter-submit',
        FILTER_BLOCK: "[data-role='filter-block']",
        BIOFUELS_POLICIES_PARENT: 'biofuelsPolicies',
        BIOFUELS_POLICIES_DASHBOARD_FreqGraph: 'biofuelsPoliciesFreqGraph',
        BIOFUELS_POLICIES_DASHBOARD_FreqGraph_uid: 	'Policy_biofuelsPoliciesFreqGraph',
        BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph: 'biofuelsPoliciesDetailedFreqGraph',
        BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph_uid: 	'Policy_biofuelsPoliciesDetailedFreqGraph',
        BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1: 'biofuelsPoliciesDetailedTimeSeriesGraph1',
        BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1_uid: 'Policy_biofuelsPoliciesDetailedTimeSeriesGraph1',
        BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2: 'biofuelsPoliciesDetailedTimeSeriesGraph2',
        BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2_uid: 'Policy_biofuelsPoliciesDetailedTimeSeriesGraph2',
        BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3: 'biofuelsPoliciesDetailedTimeSeriesGraph3',
        BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3_uid: 'Policy_biofuelsPoliciesDetailedTimeSeriesGraph3',
        BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4: 'biofuelsPoliciesDetailedTimeSeriesGraph4',
        BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4_uid: 'Policy_biofuelsPoliciesDetailedTimeSeriesGraph4',
        BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph5: 'biofuelsPoliciesDetailedTimeSeriesGraph5',
        BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph5_uid: 'Policy_biofuelsPoliciesDetailedTimeSeriesGraph5',
        EXPORT_SUBSIDIES_Graph: 'exportSubsidiesGraph',
        EXPORT_RESTRICTIONS_DASHBOARD_FreqGraph: 'exportRestrictionsFreqGraph',
        EXPORT_RESTRICTIONS_DASHBOARD_FreqGraph_uid: 	'Policy_exportRestrictionsFreqGraph',
        DESCRIPTION: '#description-container',

        custom_code:{
            biofuel_targets:{
                code : '8',
                name : ''
            },
            domestic_price_regulation:{
                code : '10',
                name : ''
            },
            export_measures:{
                code : '1',
                name : ''
            },
            import_measures:{
                code : '2',
                name : ''
            },
            production_measures:{
                code : '12',
                name : ''
            },
            tax_concessions:{
                code : '9',
                name : ''
            }
        },

        FILTER_VALUES :{
            YEAR : "Year",
            POLICY_TYPE: "policyType"
        },

        BIOFUELS_POLICIES_DETAILED : {
            title: {
                biofuelsPoliciesFreqGraph: {
                    zero: 'Number of AMIS Countries',
                    first:'Number of AMIS countries with ' + 'POLICYTYPENAME' + ' policies, disaggregated by policy measure'
                },
                biofuelsPoliciesTimeSeriesGraph: {
                    zero: 'Number of AMIS Countries',
                    first: 'Number of AMIS countries with ethanol policies, disaggregated by policy type and policy measure',
                    second: 'Number of AMIS countries with biodiesel policies, disaggregated by policy type and policy measure',
                    third: 'Number of AMIS countries with biofuel (unspecified) policies, disaggregated by policy type and policy measure',
                    fourth: 'Number of AMIS countries with biofuel policies targeted at ethanol, biodiesel or an unspecified type of biofuel, disaggregated by policy type and policy measure'
                }
            },
            notes: {
                biofuelsPoliciesFreqGraph: {
                    first: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level. <br>Ethanol, biodiesel and biofuel (unspecified) are mutually exclusive categories.<br>Import measures do not include import tariffs or tariff quotas. <br>Source: AMIS Policy Database',
                    second: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level. <br>Ethanol, biodiesel and biofuel (unspecified) are mutually exclusive categories.<br>Source: AMIS Policy Database'
                },
                biofuelsPoliciesTimeSeriesGraph: {
                    first: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level.<br>Import measures do not include import tariffs or tariff quotas.<br>Source: AMIS Policy Database',
                    second: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level.<br>Import measures do not include import tariffs or tariff quotas.<br>Source: AMIS Policy Database',
                    third: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level.<br>Unspecified biofuel policies can apply to ethanol and/or biodiesel.<br>Import measures do not include import tariffs or tariff quotas.<br>Source: AMIS Policy Database',
                    fourth: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level. <br>Combination of policies targeted on ethanol, biodiesel and biofuel (unspecified).<br>Import measures do not include import tariffs or tariff quotas.<br>Source: AMIS Policy Database'
                }
            }
        },

        error : {
            NO_FILTER_VALUES: 'No filter values'
        }
    };

    var PolicyAtGlanceView = View.extend({

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
            var itemObj = {};
            //print lateral menu
            this.$lateralMenu.jstree(Utils.setI18nToJsTreeConfig(LateralMenuConfig, i18nLabels))

                //Limit selection e select only leafs for indicators
                .on("select_node.jstree", _.bind(function (e, data) {

                    // console.log(data.instance.get_parent(data.instance.get_parent(data.node)))
                    var level = data.instance.get_node(data.node).parents.length;
                    // console.log(level)
                    var node;
                    if (level == 3) {
                        itemObj.parent = data.instance.get_parent(data.instance.get_parent(data.node));
                        // console.log(data.instance.get_parent(data.instance.get_parent(data.node)))
                    }
                    else if (level == 2) {
                        itemObj.parent = data.instance.get_parent(data.node);
                        // console.log(data.instance.get_parent(data.node))
                    }

                    if (!data.instance.is_leaf(data.node)) {

                        self.$lateralMenu.jstree(true).deselect_node(data.node, true);

                        self.$lateralMenu.jstree(true).open_node(data.node, true);

                    } else {
                        itemObj.item = data.selected[0];
                        self._onChangeDashboard(itemObj);
                    }

                }, this));

            itemObj.parent = s.BIOFUELS_POLICIES_PARENT;
            itemObj.item = s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph;
            this._initCustomVariables(itemObj);
        },

        _initVariables: function () {

            this.$content = this.$el.find(s.CONTENT);

            this.filterValues = {};

            this.dashboards = [];

            this.environment = C.ENVIRONMENT;

            this.currentDashboard = s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph;

            this.bridge = new Bridge({
                environment : this.environment
            });
        },

        //country dashboard

        _bindDashboardEventListeners: function () {

            this.$filterSubmit.on('click', _.bind(this._onFilterClick, this));
        },

        _initDashboardVariables: function () {

            this.$filterSubmit = this.$el.find(s.FILTER_SUBMIT);

            this.$lateralMenu = this.$el.find(s.LATERAL_MENU);

        },

        _printDashboard: function () {
            var itemObj = this.itemObj;
            var item = itemObj.item;
            this._printDescription(itemObj.parent);

            this._printDashboardBase(item);

            var conf = this._getDashboardConfig(item),
                filterConfig = this._getFilterConfig(item);

            var custom_conf = this._customConfigCreation(this.currentDashboard, conf);

            if((typeof custom_conf!='undefined')&&(!$.isEmptyObject(custom_conf))){
                conf = custom_conf;
            }
            console.log(JSON.stringify(conf))
            if (conf && !_.isEmpty(conf)) {
                this._renderDashboard(conf);
            }

            if (!_.isEmpty(filterConfig)) {
                this.$el.find(s.FILTER_BLOCK).show();
                this._renderFilter(filterConfig);
            } else {
                this.$el.find(s.FILTER_BLOCK).hide();
            }
        },

        _loadPolicyTypeSuccess :function (resource) {

            for(var i=0; i<resource.length; i++){

                var policy_type_code = resource[i].code;
                var policy_type_name = resource[i].title["EN"];

                switch(policy_type_code) {
                    case s.custom_code.biofuel_targets.code:
                        s.custom_code.biofuel_targets.name = policy_type_name;
                        break;
                    case s.custom_code.domestic_price_regulation.code:
                        s.custom_code.domestic_price_regulation.name = policy_type_name;
                        break;
                    case s.custom_code.export_measures.code:
                        s.custom_code.export_measures.name = policy_type_name;
                        break;
                    case s.custom_code.import_measures.code:
                        s.custom_code.import_measures.name = policy_type_name;
                        break;
                    case s.custom_code.production_measures.code:
                        s.custom_code.production_measures.name = policy_type_name;
                        break;
                    case s.custom_code.tax_concessions.code:
                        s.custom_code.tax_concessions.name = policy_type_name;
                        break;
                }
            }
            this._printDashboard();
        },

        _loadPolicyTypeError :function (resource) {

            log.info("_loadPolicyTypeError");
            log.error(resource)
            return;
        },

        _loadPolicyType: function(){
            return this.bridge.getCodeList({serviceProvider:"http://fenixservices.fao.org/", codeListService:"policy/selectors/policyTypes", type:"GET"});
        },

        _initCustomVariables: function(itemObj){
            var item = itemObj.item;
            this.itemObj = itemObj;
            switch (item){
                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph:
                    this._loadPolicyType().then(
                        _.bind(this._loadPolicyTypeSuccess, this),
                        _.bind(this._loadPolicyTypeError, this)
                    );
                    break;
                default:
                    this._printDashboard();
            }
        },

        _printDashboardBase: function (id) {
            console.log(id)

            //Inject HTML
            var source = $(basesTemplate).find("[data-dashboard='" + id + "']"),
                template = Handlebars.compile(source.prop('outerHTML')),
                html = template(i18nLabels);

            this.$el.find(s.DASHBOARD_CONTENT).html(html);
        },

        _printDescription: function (id) {

            //Inject HTML
            var source = $(Descriptions).find("[data-description='" + id + "']");
            console.log(source)
                var template = Handlebars.compile(source.prop('outerHTML')),
                html = template(i18nLabels);

            this.$el.find(s.DESCRIPTION).html(html);
        },

        _onChangeDashboard: function (itemObj) {

            var item = itemObj.item;
            if (this.currentDashboard !== item) {
                this.currentDashboard = item;
                // this._printDashboard(itemObj);
                this._initCustomVariables(itemObj);
            }
        },

        _onFilterClick: function () {

            var values = this.filter.getValues();
            console.log(values);

            this.filterValues[this.currentDashboard] = values;

            var dashboard_conf = this._getDashboardConfig(this.currentDashboard);
            var new_dashboard_config = this._dashboardConfigCreation();
            console.log("AFTER *************************************************")
            console.log(JSON.stringify(new_dashboard_config))
            console.log(new_dashboard_config)

            if (this.dashboards[this.currentDashboard] && $.isFunction(this.dashboards[this.currentDashboard].dispose)) {
                this.dashboards[this.currentDashboard].dispose();
            }

            var newDashboard = new Dashboard($.extend(true, {environment : this.environment}, new_dashboard_config));
            this.dashboards[this.currentDashboard] = newDashboard;
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

        _dashboardConfigCreation: function () {

            var dashboard_conf = this._getDashboardConfig(this.currentDashboard);
            console.log(dashboard_conf);
            var values = this.filter.getValues();

            var new_dashboardConfig = this._new_dashboardConfig(this.currentDashboard, values, dashboard_conf);

            //console.log(this.currentDashboard);

            return new_dashboardConfig;
        },

        _new_dashboardConfig: function(dashboard, filter_values, dashboard_conf) {

             var result ={};
            // var filterParsingResult = {};
            // switch(dashboard) {
            //     case s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph:
            //         filterParsingResult = this._filterValues_parsing(filter_values, s.YEAR);
            //         // result = this._configRecreation(s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph, this._filterValues_parsing(filter_values, s.FILTER_VALUES.YEAR), dashboard_conf);
            //         break;
            // }
            result = this._configRecreation(dashboard, this._filterValues_parsing(filter_values, dashboard), dashboard_conf);

            return result;
        },

        _filterValues_parsing: function(filter_values, dashboard){
            var result = {};
            if((filter_values!=null)&&(typeof filter_values!="undefined")){
                switch (dashboard){
                    case s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph:
                        var year_obj = filter_values.values[s.FILTER_VALUES.YEAR];
                        result.from = year_obj[1].value;
                        result.to = year_obj[0].value;
                        break;
                    case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph:
                        var year_obj = filter_values.values[s.FILTER_VALUES.YEAR];
                        result.from = year_obj[1].value;
                        result.to = year_obj[0].value;
                        var policyType_obj = filter_values.values[s.FILTER_VALUES.POLICY_TYPE];
                        result.policy_type_code = policyType_obj[0];
                        break;
                    case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1:
                    case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2:
                    case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3:
                    case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4:
                    case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph5:
                        var policyType_obj = filter_values.values[s.FILTER_VALUES.POLICY_TYPE];
                        result.policy_type_code = policyType_obj[0];
                        break;
                    case s.EXPORT_RESTRICTIONS_DASHBOARD_FreqGraph:
                        var year_obj = filter_values.values[s.FILTER_VALUES.YEAR];
                        result.from = year_obj[1].value;
                        result.to = year_obj[0].value;
                        break;
                }
            }
            else {
                log.error(s.error.NO_FILTER_VALUES);
                return null;
            }
            return result;
        },

        _configRecreation: function(dashboard, parsed_filter_values, dashboard_conf) {
            //console.log( moment(data.from,"X").format("DD/MM/YYYY") + " - " + moment(data.to,"X").format("DD/MM/YYYY"))
            var dashboard_confI={};
            console.log(dashboard_conf)
            switch(dashboard) {
                case s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph:
                    for(var j=0; j< dashboard_conf.length;j++){
                        if(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph_uid){
                            dashboard_confI = dashboard_conf[j];
                            break;
                        }
                    }
                    var postProcess = dashboard_confI.items[0].postProcess;
                    var start_date = parsed_filter_values.from;
                    var end_date = parsed_filter_values.to;

                    var partial_start_date = parsed_filter_values.from.substring(4,6)+'/'+parsed_filter_values.from.substring(0,4);
                    var partial_end_date = parsed_filter_values.to.substring(4,6)+'/'+parsed_filter_values.to.substring(0,4);
                    dashboard_confI.items[0].config.config.subtitle = {};
                    dashboard_confI.items[0].config.config.subtitle.text = this._subtitleCreation(s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph_uid, partial_start_date, partial_end_date);

                    //var start_date = new Date(parsed_filter_values.from);
                    //var month = parseInt(start_date.getMonth(), 10) +1;
                    //if(month<10)
                    //    month = '0'+month;
                    //var day = parseInt(start_date.getDate(), 10);
                    //if(day<10)
                    //    day = '0'+day;
                    //start_date = start_date.getFullYear()+month+day;
                    //var end_date = new Date(parsed_filter_values.to);
                    //month = parseInt(end_date.getMonth(), 10) +1;
                    //if(month<10)
                    //    month = '0'+month;
                    //day = parseInt(end_date.getDate(), 10);
                    //if(day<10)
                    //    day = '0'+day;
                    //end_date = end_date.getFullYear()+month+day;
                    //Millisecond to date format 20110101
                    for(var i=0; i<postProcess[1].parameters.queryParameters.length; i++){
                        if($.inArray( i, [0,2,4])!=-1){
                            postProcess[1].parameters.queryParameters[i].value = parseInt(start_date, 10);
                        }
                        else{
                            postProcess[1].parameters.queryParameters[i].value = parseInt(end_date, 10);
                        }
                    }
                    dashboard_confI.items[0].postProcess = postProcess;
                    break;
                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph:

                    for(var j=0; j< dashboard_conf.length;j++){
                        if(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph_uid){
                            dashboard_confI = dashboard_conf[j];
                            break;
                        }
                    }
                    var postProcess = dashboard_confI.items[0].postProcess;
                    var start_date = parsed_filter_values.from;
                    var end_date = parsed_filter_values.to;

                    var partial_start_date = parsed_filter_values.from.substring(4,6)+'/'+parsed_filter_values.from.substring(0,4);
                    var partial_end_date = parsed_filter_values.to.substring(4,6)+'/'+parsed_filter_values.to.substring(0,4);
                    dashboard_confI.items[0].config.config.subtitle.text = {};
                    dashboard_confI.items[0].config.config.subtitle.text = this._subtitleCreation(s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph_uid, partial_start_date, partial_end_date);

                    var policy_type_code =  ""+parsed_filter_values.policy_type_code;
                    var policy_type_name = '';
                    switch(policy_type_code) {
                        case s.custom_code.biofuel_targets.code:
                            policy_type_name = s.custom_code.biofuel_targets.name;
                            break;
                        case s.custom_code.domestic_price_regulation.code:
                            policy_type_name = s.custom_code.domestic_price_regulation.name;
                            break;
                        case s.custom_code.export_measures.code:
                            policy_type_name = s.custom_code.export_measures.name;
                            break;
                        case s.custom_code.import_measures.code:
                            policy_type_name = s.custom_code.import_measures.name;
                            break;
                        case s.custom_code.production_measures.code:
                            policy_type_name = s.custom_code.production_measures.name;
                            break;
                        case s.custom_code.tax_concessions.code:
                            policy_type_name= s.custom_code.tax_concessions.name;
                            break;
                    }
                    dashboard_confI.items[0].config.config.title.text = {};
                    dashboard_confI.items[0].config.config.title.text = this._titleCreation(s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph_uid, policy_type_name);

                    for(var i=0; i<postProcess[1].parameters.queryParameters.length; i++){
                        if($.inArray( i, [0,2,4])!=-1){
                            postProcess[1].parameters.queryParameters[i].value = parseInt(start_date, 10);
                        }
                        else{
                            postProcess[1].parameters.queryParameters[i].value = parseInt(end_date, 10);
                        }
                    }
                    console.log(postProcess)
                    console.log(postProcess[0])
                    postProcess[0].parameters.rows.policytype.codes[0].codes[0] = ""+parsed_filter_values.policy_type_code;

                    dashboard_confI.items[0].postProcess = postProcess;

                    var note = '';
                    if(parsed_filter_values.policy_type_code == s.custom_code.import_measures.code){
                        note = s.BIOFUELS_POLICIES_DETAILED.notes.biofuelsPoliciesFreqGraph.first;
                    }
                    else{
                        note = s.BIOFUELS_POLICIES_DETAILED.notes.biofuelsPoliciesFreqGraph.second;
                    }

                    var events = {
                        load: function () {
                            var label = this.renderer.label(note)
                                .css({
                                    width: '450px',
                                    fontSize: '9px'
                                })
                                .attr({
                                    'r': 5,
                                    'padding': 10
                                })
                                .add();

                            label.align(Highcharts.extend(label.getBBox(), {
                                align: 'left',
                                x: 0, // offset
                                verticalAlign: 'bottom',
                                y: 50 // offset
                            }), null, 'spacingBox');
                        }
                    };

                    dashboard_confI.items[0].config.config.chart.events = events;

                    console.log(dashboard_confI);
                    break;

                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1:
                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2:
                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3:
                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4:
                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph5:
                    for(var j=0; j< dashboard_conf.length;j++){
                        if((dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph5_uid)){
                            dashboard_confI = dashboard_conf[j];
                            break;
                        }
                    }
                    var postProcess = dashboard_confI.items[0].postProcess[0];
                    postProcess.parameters.rows.policytype.codes[0].codes[0] = ""+parsed_filter_values.policy_type_code;
                    dashboard_confI.items[0].postProcess[0] = postProcess;
                    break;

                case s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph:
                    for(var j=0; j< dashboard_conf.length;j++){
                        if(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph_uid){
                            dashboard_confI = dashboard_conf[j];
                            break;
                        }
                    }
                    var postProcess = dashboard_confI.items[0].postProcess;
                    var start_date = parsed_filter_values.from;
                    var end_date = parsed_filter_values.to;

                    var partial_start_date = parsed_filter_values.from.substring(4,6)+'/'+parsed_filter_values.from.substring(0,4);
                    var partial_end_date = parsed_filter_values.to.substring(4,6)+'/'+parsed_filter_values.to.substring(0,4);
                    dashboard_confI.items[0].config.config.subtitle = {};
                    dashboard_confI.items[0].config.config.subtitle.text = this._subtitleCreation(s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph_uid, partial_start_date, partial_end_date);

                    for(var i=0; i<postProcess[1].parameters.queryParameters.length; i++){
                        if($.inArray( i, [0,2,4])!=-1){
                            postProcess[1].parameters.queryParameters[i].value = parseInt(start_date, 10);
                        }
                        else{
                            postProcess[1].parameters.queryParameters[i].value = parseInt(end_date, 10);
                        }
                    }
                    dashboard_confI.items[0].postProcess = postProcess;
                    break;
                case s.EXPORT_RESTRICTIONS_DASHBOARD_FreqGraph:
                    for(var j=0; j< dashboard_conf.length;j++){
                        if(dashboard_conf[j].uid == s.EXPORT_RESTRICTIONS_DASHBOARD_FreqGraph_uid){
                            dashboard_confI = dashboard_conf[j];
                            break;
                        }
                    }
                    var postProcess = dashboard_confI.items[0].postProcess;
                    var start_date = parsed_filter_values.from;
                    var end_date = parsed_filter_values.to;

                    var partial_start_date = parsed_filter_values.from.substring(4,6)+'/'+parsed_filter_values.from.substring(0,4);
                    var partial_end_date = parsed_filter_values.to.substring(4,6)+'/'+parsed_filter_values.to.substring(0,4);
                    dashboard_confI.items[0].config.config.subtitle = {};
                    dashboard_confI.items[0].config.config.subtitle.text = this._subtitleCreation(s.EXPORT_RESTRICTIONS_DASHBOARD_FreqGraph_uid, partial_start_date, partial_end_date);

                    //Millisecond to date format 20110101
                    for(var i=0; i<postProcess[1].parameters.queryParameters.length; i++){
                        if($.inArray( i, [0,2,4])!=-1){
                            postProcess[1].parameters.queryParameters[i].value = parseInt(start_date, 10);
                        }
                        else{
                            postProcess[1].parameters.queryParameters[i].value = parseInt(end_date, 10);
                        }
                    }
                    dashboard_confI.items[0].postProcess = postProcess;
                    break;
            }

            //Check if the return has to be array or config
            return dashboard_confI;
        },

        _customConfigCreation: function(dashboard, dashboard_conf) {
            //console.log( moment(data.from,"X").format("DD/MM/YYYY") + " - " + moment(data.to,"X").format("DD/MM/YYYY"))
            var dashboard_confI={};
            switch(dashboard) {
                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph:

                    for(var j=0; j< dashboard_conf.length;j++){
                        if(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph_uid){
                            dashboard_confI = dashboard_conf[j];
                            break;
                        }
                    }
                    var postProcess = dashboard_confI.items[0].postProcess;
                    var policy_type_code = postProcess[0].parameters.rows.policytype.codes[0].codes[0];
                    var policy_type_name = '';
                    switch(policy_type_code) {
                        case s.custom_code.biofuel_targets.code:
                            policy_type_name = s.custom_code.biofuel_targets.name;
                            break;
                        case s.custom_code.domestic_price_regulation.code:
                            policy_type_name = s.custom_code.domestic_price_regulation.name;
                            break;
                        case s.custom_code.export_measures.code:
                            policy_type_name = s.custom_code.export_measures.name;
                            break;
                        case s.custom_code.import_measures.code:
                            policy_type_name = s.custom_code.import_measures.name;
                            break;
                        case s.custom_code.production_measures.code:
                            policy_type_name = s.custom_code.production_measures.name;
                            break;
                        case s.custom_code.tax_concessions.code:
                            policy_type_name= s.custom_code.tax_concessions.name;
                            break;
                    }

                    dashboard_confI.items[0].config.config.title.text = {};
                    dashboard_confI.items[0].config.config.title.text = this._titleCreation(s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph_uid, policy_type_name);

                    var note = '';
                    if(policy_type_code == s.custom_code.import_measures.code){
                        note = s.BIOFUELS_POLICIES_DETAILED.notes.biofuelsPoliciesFreqGraph.first;
                    }
                    else{
                        note = s.BIOFUELS_POLICIES_DETAILED.notes.biofuelsPoliciesFreqGraph.second;
                    }

                    var events = {
                        load: function () {
                            var label = this.renderer.label(note)
                                .css({
                                    width: '450px',
                                    fontSize: '9px'
                                })
                                .attr({
                                    'r': 5,
                                    'padding': 10
                                })
                                .add();

                            label.align(Highcharts.extend(label.getBBox(), {
                                align: 'left',
                                x: 0, // offset
                                verticalAlign: 'bottom',
                                y: 50 // offset
                            }), null, 'spacingBox');
                        }
                    };

                    dashboard_confI.items[0].config.config.chart.events = events;

                    break;

                // case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1:
                // case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2:
                // case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3:
                // case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4:
                // case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph5:
                //     for(var j=0; j< dashboard_conf.length;j++){
                //         if((dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph5_uid)){
                //             dashboard_confI = dashboard_conf[j];
                //             break;
                //         }
                //     }
                //     var postProcess = dashboard_confI.items[0].postProcess[0];
                //     postProcess.parameters.rows.policytype.codes[0].codes[0] = ""+parsed_filter_values.policy_type_code;
                //     dashboard_confI.items[0].postProcess[0] = postProcess;
                //     break;
            }

            //Check if the return has to be array or config
            console.log(dashboard_conf)
            console.log(dashboard_confI)
            return dashboard_conf;
        },

        _titleCreation: function (chart, policyTypeName) {
            console.log(chart)
            console.log(policyTypeName)
            var title = '';
            switch (chart){
                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph_uid:
                    title = s.BIOFUELS_POLICIES_DETAILED.title.biofuelsPoliciesFreqGraph.first.replace('POLICYTYPENAME', policyTypeName);
                    break;
            }

            return title;
        },

        _subtitleCreation: function (chart, partial_start_date, partial_end_date) {

            var subtitle = '';
            switch (chart){
                case s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph_uid:
                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph_uid:
                case s.EXPORT_RESTRICTIONS_DASHBOARD_FreqGraph_uid:
                    subtitle = "Period "+partial_start_date+" until "+partial_end_date;
                    break;
            }

            return subtitle;
        },

        _renderDashboard: function (config) {

            this._disposeDashboards();

            _.each(config, _.bind(function (c) {

                this.dashboards.push(new Dashboard($.extend(true, {
                    environment : this.environment
                }, c)));

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

            var filter_container='';
            var actual_filter_conteiner_id='';
            var actualContainerObj = '';
            this.$el.find("div[id^='filter-container']").addClass('collapse');

           // $('#filter-container').addClass('collapse')
            switch (this.currentDashboard){
                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph:
                // <div id="filter-container-slider-dropdown" class="row collapse">
                //     <div class="col-xs-6">
                //     <div data-selector="Year"></div>
                //     </div>
                //     <div class="col-xs-6">
                //     <div data-selector="policyType"></div>
                // </div>
                // </div>
                    filter_container = s.FILTER_CONTAINER_SLIDER_DROPDOWN;
                    actual_filter_conteiner_id= filter_container.substring(1);
                    var actualContainerObj = this.$el.find("div[id='"+actual_filter_conteiner_id+"']");
                    var elem = actualContainerObj.find('*[data-selector="Year"]').parent();
                    elem.removeClass();
                    elem.addClass("col-xs-6");
                    elem = actualContainerObj.find('*[data-selector="policyType"]').parent();
                    elem.removeClass();
                    elem.addClass("col-xs-6");
                    break;
                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1:
                // <div id="filter-container-dropdown" class="row collapse">
                //     <div class="col-xs-6 col-xs-offset-2">
                //     <div data-selector="policyType"></div>
                // </div>
                // </div>
                    filter_container = s.FILTER_CONTAINER_DROPDOWN;
                    break;
                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2:
                    filter_container = s.FILTER_CONTAINER_DROPDOWN;
                    break;
                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3:
                    filter_container = s.FILTER_CONTAINER_DROPDOWN;
                    break;
                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4:
                    filter_container = s.FILTER_CONTAINER_DROPDOWN;
                    break;
                case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph5:
                    filter_container = s.FILTER_CONTAINER_DROPDOWN;
                    break;
                case s.EXPORT_SUBSIDIES_Graph:
                // <div id="filter-container-two-dropdowns" class="row collapse">
                //     <div class="col-xs-6">
                //     <div data-selector="country"></div>
                //     </div>
                //     <div class="col-xs-6">
                //     <div data-selector="policyType"></div>
                // </div>
                // </div>
                    filter_container = s.FILTER_CONTAINER_TWO_DROPDOWNS;
                    break;
                default:
                    filter_container = s.FILTER_CONTAINER;
            }

            actual_filter_conteiner_id= filter_container.substring(1);
            this.$el.find("div[id='"+actual_filter_conteiner_id+"']").removeClass('collapse')
            console.log("/////////////////////////////////////////////////")
            console.log(filter_container)
            console.log(actual_filter_conteiner_id)

            this.filter = new Filter({
               // el: "#filter-container",
                //el: "#domain-filter-holder",
                el: filter_container,
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

    return PolicyAtGlanceView;
});
