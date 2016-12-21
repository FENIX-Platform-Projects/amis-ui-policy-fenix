define([
    "jquery",
    "loglevel",
    "underscore",
    "../config/config",
    "../config/policiesAtAglance/config",
    "../html/policyAtGlance/template.hbs",
    "../html/policyAtGlance/dashboard.hbs",
    "../html/policyAtGlance/bases.hbs",
    "../html/policyAtGlance/page_descriptions.hbs",
    "../config/policiesAtAglance/lateral_menu",
    "fenix-ui-dashboard",
    "fenix-ui-filter",
    "fenix-ui-filter-utils",
    "../lib/utils",
    "../nls/labels",
    "fenix-ui-bridge",
    "highcharts",
    "jstree"
    //($, _, log, View, EVT, C, PC, Dashboard, Filter, FxUtils, Utils, i18nLabels, template, dashboardTemplate, basesTemplate, Descriptions, LateralMenuConfig, Bridge, Handlebars) {
], function ($, log, _, C, PAGC, template, dashboardTemplate,  basesTemplate, Descriptions, LateralMenuConfig, Dashboard, Filter, FxUtils, Utils, labels, Bridge, Highcharts) {

    "use strict";

    var s = {
        EL: "#policyAtGlance",
        ERRORS : "[data-role='errors']",
        CONTENT: "#domain-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        DASHBOARD_CONTENT: "#dashboard-content",
        LATERAL_MENU: '#lateral-menu',
        MAP_CONTAINER: "#country-map-container",
        FILTER_CONTAINER: '#filter-container',
        FILTER_CONTAINER_SLIDER_DROPDOWN: '#filter-container-slider-dropdown',
        FILTER_CONTAINER_DROPDOWN: '#filter-container-dropdown',
        FILTER_CONTAINER_TWO_DROPDOWNS: "#filter-container-two-dropdowns",
        FILTER_HOLDER : "#domain-filter-holder",
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
        EXPORT_SUBSIDIES_Graph_uid: 'Policy_exportSubsidiesGraph',
        EXPORT_RESTRICTIONS_DASHBOARD_FreqGraph: 'exportRestrictionsFreqGraph',
        EXPORT_RESTRICTIONS_DASHBOARD_FreqGraph_uid: 	'Policy_exportRestrictionsFreqGraph',
        DESCRIPTION: '#description-container',

        custom_code:{
            policy_type: {
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
            commodity_class: {
                maize:{
                    code : '3',
                    name : 'Maize'
                },
                maizeRice:{
                    code : '9',
                    name : 'Maize + Rice'
                },
                maizeRiceSoybeans:{
                    code : '13',
                    name : 'Maize + Rice + Soybeans'
                },
                maizeRiceSoybeansWheat:{
                    code : '18',
                    name : 'Maize + Rice + Soybeans + Wheat'
                },
                maizeRiceWheat:{
                    code : '11',
                    name : 'Maize + Rice + Wheat'
                },
                maizeSoybeans:{
                    code : '10',
                    name : 'Maize + Soybeans'
                },
                maizeSoybeansWheat:{
                    code : '14',
                    name : 'Maize + Soybeans + Wheat'
                },
                maizeWheat:{
                    code : '8',
                    name : 'Maize + Wheat'
                },
                rice:{
                    code : '2',
                    name : 'Rice'
                },
                riceSoybeans:{
                    code : '15',
                    name : 'Rice + Soybeans'
                },
                riceSoybeansWheat:{
                    code : '16',
                    name : 'Rice + Soybeans + Wheat'
                },
                riceWheat:{
                    code : '12',
                    name : 'Rice + Wheat'
                },
                soybeans:{
                    code : '4',
                    name : 'Soybeans'
                },
                soybeansWheat:{
                    code : '17',
                    name : 'Soybeans + Wheat'
                },
                wheat:{
                    code : '1',
                    name : 'Wheat'
                }
            },
            country: {
                argentina:{
                    code : '12',
                    name : 'Argentina'
                },
                australia:{
                    code : '17',
                    name : 'Australia'
                },
                brazil:{
                    code : '37',
                    name : 'Brazil'
                },
                canada:{
                    code : '46',
                    name : 'Canada'
                },
                china:{
                    code : '53',
                    name : 'China'
                },
                egypt:{
                    code : '40765',
                    name : 'Egypt'
                },
                europeanUnion:{
                    code : '999000',
                    name : 'European Union'
                },
                france:{
                    code : '85',
                    name : 'France'
                },
                germany:{
                    code : '93',
                    name : 'Germany'
                },
                india:{
                    code : '115',
                    name : 'India'
                },
                indonesia:{
                    code : '116',
                    name : 'Indonesia'
                },
                italy:{
                    code : '122',
                    name : 'Italy'
                },
                japan:{
                    code : '126',
                    name : 'Japan'
                },
                kazakhstan:{
                    code : '132',
                    name : 'Kazakhstan'
                },
                mexico:{
                    code : '162',
                    name : 'Mexico'
                },
                nigeria:{
                    code : '182',
                    name : 'Nigeria'
                },
                philippines:{
                    code : '196',
                    name : 'Philippines'
                },
                republicOfKorea:{
                    code : '202',
                    name : 'RepublicOfKorea'
                },
                russianFederation:{
                    code : '204',
                    name : 'Russian Federation'
                },
                saudiArabia:{
                    code : '215',
                    name : 'Saudi Arabia'
                },
                southAfrica:{
                    code : '227',
                    name : 'South Africa'
                },
                spain:{
                    code : '229',
                    name : 'Spain'
                },
                thailand:{
                    code : '240',
                    name : 'Thailand'
                },
                turkey:{
                    code : '249',
                    name : 'Turkey'
                },
                ukraine:{
                    code : '254',
                    name : 'Ukraine'
                },

                unitedKingdom:{
                    code : '256',
                    name : 'United Kingdom'
                },
                unitedStatesOfAmerica:{
                    code : '259',
                    name : 'United States Of America'
                },
                vietNam:{
                    code : '264',
                    name : 'Viet Nam'
                }
            }
        },

        FILTER_VALUES :{
            YEAR : "Year",
            POLICY_TYPE: "policyType",
            COMMODITY_CLASS: "commodityClass",
            COUNTRY: "country"
        },

        BIOFUELS_POLICIES_DETAILED : {
            title: {
                biofuelsPoliciesFreqGraph: {
                    zero: 'Number of AMIS Countries',
                    first:'Number of AMIS countries with ' + 'POLICYTYPENAME' + ' policies, disaggregated by policy measure'
                },
                // biofuelsPoliciesTimeSeriesGraph2: {
                //     zero: 'Number of AMIS Countries',
                //     first: 'Number of AMIS countries with ethanol policies, disaggregated by policy type and policy measure',
                //     second: 'Number of AMIS countries with biodiesel policies, disaggregated by policy type and policy measure',
                //     third: 'Number of AMIS countries with biofuel (unspecified) policies, disaggregated by policy type and policy measure',
                //     fourth: 'Number of AMIS countries with biofuel policies targeted at ethanol, biodiesel or an unspecified type of biofuel, disaggregated by policy type and policy measure'
                // },

                biofuelsPoliciesTimeSeriesGraph: {
                    zero: 'Number of AMIS Countries',
                    first: 'Number of AMIS countries with ' + 'POLICYTYPENAME' + ' on ethanol, disaggregated by policy measure',
                    second: 'Number of AMIS countries with ' + 'POLICYTYPENAME' + ' on biodiesel, disaggregated by policy measure',
                    third: 'Number of AMIS countries with ' + 'POLICYTYPENAME' + ' on unspecified biofuel, disaggregated by policy measure',
                    fourth: 'Number of AMIS countries with ' + 'POLICYTYPENAME' + ' on biofuel, disaggregated by policy measure'
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

        EXPORT_SUBSIDIES : {
            title: {
                exportSubsidies: {
                    first: 'Quantity and budgetary outlay export subsidies in COUNTRYNAME for COMMODITYCLASSNAME, commitments and notifications'
                }
            }
        },

        error : {
            NO_FILTER_VALUES: 'No filter values'
        }
    };

    function PolicyAtGlance() {

        console.clear();

        // Load Exporting Module after Highcharts loaded
        //require('highcharts/modules/drilldown')(Highcharts);
        require('highcharts-no-data-to-display')(Highcharts);

        log.setLevel("silent");

        this._importThirdPartyCss();

        //update State
        //amplify.publish(EVT.STATE_CHANGE, {menu: 'policiesAtAglance'});

        this._validateConfig();

        this._attach();

        this._initVariables();

        this._printDomainDashboard();
    }

    PolicyAtGlance.prototype._validateConfig = function () {

        if (!C.lang) {
            alert("Please specify a valid LANGUAGE in config/config.js");
        }
    };

    PolicyAtGlance.prototype._attach = function () {

        $(s.EL).html(template(labels[C.lang.toLowerCase()]));
    };

    PolicyAtGlance.prototype._initVariables = function () {

        this.$el = $(s.EL);

        this.lang = C.lang.toLowerCase();
        this.environment = C.ENVIRONMENT;
        this.cache = C.cache;

        this.$content = this.$el.find(s.CONTENT);

        this.filterValues = {};

        this.dashboards = [];

        this.environment = C.ENVIRONMENT;

        this.currentDashboard = s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph;

        this.bridge = new Bridge({
            environment : this.environment
        });

    };

    PolicyAtGlance.prototype._printDomainDashboard = function () {

        var self = this,
            template = dashboardTemplate,
            html = template();

        this.$content.html(html);

        this._initDashboardVariables();

        this._bindDashboardEventListeners();
        var itemObj = {};
        //print lateral menu
        this.$lateralMenu.jstree(Utils.setI18nToJsTreeConfig(LateralMenuConfig, labels[this.lang]))

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
    };

    //country dashboard
    PolicyAtGlance.prototype._bindDashboardEventListeners =  function () {

        this.$filterSubmit.on('click', _.bind(this._onFilterClick, this));
    };

    PolicyAtGlance.prototype._initDashboardVariables =  function () {

        this.$filterSubmit = this.$el.find(s.FILTER_SUBMIT);

        this.$lateralMenu = this.$el.find(s.LATERAL_MENU);

    };

    PolicyAtGlance.prototype._printDashboard = function () {

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
        if (conf && !_.isEmpty(conf)) {
           this._renderDashboard(conf);
        }

        if (!_.isEmpty(filterConfig)) {
            this.$el.find(s.FILTER_BLOCK).show();
            this._renderFilter(filterConfig);
        } else {
            this.$el.find(s.FILTER_BLOCK).hide();
        }
    };

    PolicyAtGlance.prototype._loadPolicyTypeSuccess = function (resource) {

        for(var i=0; i<resource.length; i++){

            var policy_type_code = resource[i].code;
            var policy_type_name = resource[i].title["EN"];

            switch(policy_type_code) {
                case s.custom_code.policy_type.biofuel_targets.code:
                    s.custom_code.policy_type.biofuel_targets.name = policy_type_name;
                    break;
                case s.custom_code.policy_type.domestic_price_regulation.code:
                    s.custom_code.policy_type.domestic_price_regulation.name = policy_type_name;
                    break;
                case s.custom_code.policy_type.export_measures.code:
                    s.custom_code.policy_type.export_measures.name = policy_type_name;
                    break;
                case s.custom_code.policy_type.import_measures.code:
                    s.custom_code.policy_type.import_measures.name = policy_type_name;
                    break;
                case s.custom_code.policy_type.production_measures.code:
                    s.custom_code.policy_type.production_measures.name = policy_type_name;
                    break;
                case s.custom_code.policy_type.tax_concessions.code:
                    s.custom_code.policy_type.tax_concessions.name = policy_type_name;
                    break;
            }
        }
        this._printDashboard();
    };

    PolicyAtGlance.prototype._loadPolicyTypeError = function (resource) {

        log.info("_loadPolicyTypeError");
        log.error(resource)
        return;
    };

    PolicyAtGlance.prototype._loadPolicyType = function () {
        return this.bridge.getCodeList({serviceProvider:"http://fenixservices.fao.org/", codeListService:"policy/selectors/policyTypes", type:"GET"});
    };

    PolicyAtGlance.prototype._initCustomVariables = function(itemObj){
        var item = itemObj.item;
        this.itemObj = itemObj;
        switch (item){
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph:
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1:
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2:
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3:
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4:
                this._loadPolicyType().then(
                    _.bind(this._loadPolicyTypeSuccess, this),
                    _.bind(this._loadPolicyTypeError, this)
                );
                break;
            default:
                this._printDashboard();
        }
    };

    PolicyAtGlance.prototype._printDashboardBase = function(id){
        // console.log("_printDashboardBase")
        //Inject HTML
        // var source = $(basesTemplate).find("[data-dashboard='" + id + "']"),
        //     template = Handlebars.compile(source.prop('outerHTML')),
        //     html = template(i18nLabels);

        // console.log(id)
        var html = basesTemplate(labels[this.lang]);
        //Inject HTML
        var source = $(html).find("[data-dashboard='" + id + "']");

        this.$el.find(s.DASHBOARD_CONTENT).html(source);
    };

    PolicyAtGlance.prototype._printDescription = function(id){

        //Inject HTML
        // var source = $(Descriptions).find("[data-description='" + id + "']");
        // console.log(source)
        // var template = Handlebars.compile(source.prop('outerHTML')),
        //     html = template(i18nLabels);

        var html = Descriptions(labels[this.lang]);
        //Inject HTML
        var source = $(html).find("[data-description='" + id + "']");

        this.$el.find(s.DESCRIPTION).html(source);
    };

    PolicyAtGlance.prototype._onChangeDashboard = function(itemObj){

        var item = itemObj.item;
        if (this.currentDashboard !== item) {
            this.currentDashboard = item;
            // this._printDashboard(itemObj);
            this._initCustomVariables(itemObj);
        }
    };

    PolicyAtGlance.prototype._onFilterClick = function(){

        var values = this.filter.getValues();

        this.filterValues[this.currentDashboard] = values;

        var dashboard_conf = this._getDashboardConfig(this.currentDashboard);
        var new_dashboard_config = this._dashboardConfigCreation();

        if (this.dashboards[this.currentDashboard] && $.isFunction(this.dashboards[this.currentDashboard].dispose)) {
            this.dashboards[this.currentDashboard].dispose();
        }

        // console.log(new_dashboard_config)
        var newDashboard = new Dashboard($.extend(true, {environment : this.environment}, new_dashboard_config));
        this.dashboards[this.currentDashboard] = newDashboard;
    };

    PolicyAtGlance.prototype._createCountryFilter = function(){

        //create country filter

        return {"CountryCode": [this.id]};
    };

    PolicyAtGlance.prototype._getDashboardConfig = function(id){

        var conf = PAGC[id].dashboard,
            filterValues = this.filterValues[this.currentDashboard] || {};

        if (!Array.isArray(conf)) {
            conf = FxUtils.cleanArray([conf]);
        }

        return conf;
    };

    PolicyAtGlance.prototype._getFilterConfig = function(id){

        var conf = $.extend(true, {}, PAGC[id].filter),
            values = this.filterValues[id] || {},
            result = FxUtils.mergeConfigurations(conf, values);

        _.each(result, _.bind(function (obj, key) {

            if (!obj.template) {
                obj.template = {};
            }
            //Add i18n label
            obj.template.title = Utils.getI18nLabel(key, labels, "filter_");

        }, this));

        return result;
    };

    PolicyAtGlance.prototype._dashboardConfigCreation = function(){

        var dashboard_conf = this._getDashboardConfig(this.currentDashboard);
        var values = this.filter.getValues();
        // console.log('VALUES!!!')
        // console.log(values)

        var new_dashboardConfig = this._new_dashboardConfig(this.currentDashboard, values, dashboard_conf);

        return new_dashboardConfig;
    };

    PolicyAtGlance.prototype._new_dashboardConfig = function(dashboard, filter_values, dashboard_conf){

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
    };

    PolicyAtGlance.prototype._filterValues_parsing = function(filter_values, dashboard){
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
                    var policyType_obj = filter_values.values[s.FILTER_VALUES.POLICY_TYPE];
                    result.policy_type_code = policyType_obj[0];
                    break;
                case s.EXPORT_SUBSIDIES_Graph:
                    //console.log(filter_values)
                    var commodityClass_obj = filter_values.values[s.FILTER_VALUES.COMMODITY_CLASS];
                    var countryCode_obj = filter_values.values[s.FILTER_VALUES.COUNTRY];
                    result.commodity_class_code = commodityClass_obj[0];
                    result.country_code = countryCode_obj[0];
                    //console.log(result)
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
    };

    PolicyAtGlance.prototype._configRecreation = function(dashboard, parsed_filter_values, dashboard_conf){
        //console.log( moment(data.from,"X").format("DD/MM/YYYY") + " - " + moment(data.to,"X").format("DD/MM/YYYY"))
        var dashboard_confI={};
        //console.log("In _configRecreation ", dashboard)
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
                    case s.custom_code.policy_type.biofuel_targets.code:
                        policy_type_name = s.custom_code.policy_type.biofuel_targets.name;
                        break;
                    case s.custom_code.policy_type.domestic_price_regulation.code:
                        policy_type_name = s.custom_code.policy_type.domestic_price_regulation.name;
                        break;
                    case s.custom_code.policy_type.export_measures.code:
                        policy_type_name = s.custom_code.policy_type.export_measures.name;
                        break;
                    case s.custom_code.policy_type.import_measures.code:
                        policy_type_name = s.custom_code.policy_type.import_measures.name;
                        break;
                    case s.custom_code.policy_type.production_measures.code:
                        policy_type_name = s.custom_code.policy_type.production_measures.name;
                        break;
                    case s.custom_code.policy_type.tax_concessions.code:
                        policy_type_name= s.custom_code.policy_type.tax_concessions.name;
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
                // console.log(postProcess)
                // console.log(postProcess[0])
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

                //console.log(dashboard_confI);
                break;

            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1:
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2:
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3:
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4:
                //
                for(var j=0; j< dashboard_conf.length;j++){
                    if((dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4_uid)){
                        dashboard_confI = dashboard_conf[j];
                        break;
                    }
                }
                var postProcess = dashboard_confI.items[0].postProcess[0];
                postProcess.parameters.rows.policytype.codes[0].codes[0] = ""+parsed_filter_values.policy_type_code;
                dashboard_confI.items[0].postProcess[0] = postProcess;

                var policy_type_code = postProcess.parameters.rows.policytype.codes[0].codes[0];
                var policy_type_name = '';

                switch(policy_type_code) {
                    case s.custom_code.policy_type.biofuel_targets.code:
                        policy_type_name = s.custom_code.policy_type.biofuel_targets.name;
                        break;
                    case s.custom_code.policy_type.domestic_price_regulation.code:
                        policy_type_name = s.custom_code.policy_type.domestic_price_regulation.name;
                        break;
                    case s.custom_code.policy_type.export_measures.code:
                        policy_type_name = s.custom_code.policy_type.export_measures.name;
                        break;
                    case s.custom_code.policy_type.import_measures.code:
                        policy_type_name = s.custom_code.policy_type.import_measures.name;
                        break;
                    case s.custom_code.policy_type.production_measures.code:
                        policy_type_name = s.custom_code.policy_type.production_measures.name;
                        break;
                    case s.custom_code.policy_type.tax_concessions.code:
                        policy_type_name= s.custom_code.policy_type.tax_concessions.name;
                        break;
                }

                dashboard_confI.items[0].config.config.title.text = {};
                var uid = '';
                if(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1_uid) {
                    uid = s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1_uid;
                }
                else if(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2_uid) {
                    uid = s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2_uid;
                }
                else if(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3_uid) {
                    uid = s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3_uid;
                }
                else if(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4_uid) {
                    uid = s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4_uid;
                }

                dashboard_confI.items[0].config.config.title.text = this._titleCreation(uid, policy_type_name);
                break;
                //

            // case s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph:
            //     for(var j=0; j< dashboard_conf.length;j++){
            //         if(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph_uid){
            //             dashboard_confI = dashboard_conf[j];
            //             break;
            //         }
            //     }
            //     var postProcess = dashboard_confI.items[0].postProcess;
            //     var start_date = parsed_filter_values.from;
            //     var end_date = parsed_filter_values.to;
            //
            //     var partial_start_date = parsed_filter_values.from.substring(4,6)+'/'+parsed_filter_values.from.substring(0,4);
            //     var partial_end_date = parsed_filter_values.to.substring(4,6)+'/'+parsed_filter_values.to.substring(0,4);
            //     dashboard_confI.items[0].config.config.subtitle = {};
            //     dashboard_confI.items[0].config.config.subtitle.text = this._subtitleCreation(s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph_uid, partial_start_date, partial_end_date);
            //
            //     for(var i=0; i<postProcess[1].parameters.queryParameters.length; i++){
            //         if($.inArray( i, [0,2,4])!=-1){
            //             postProcess[1].parameters.queryParameters[i].value = parseInt(start_date, 10);
            //         }
            //         else{
            //             postProcess[1].parameters.queryParameters[i].value = parseInt(end_date, 10);
            //         }
            //     }
            //     dashboard_confI.items[0].postProcess = postProcess;
            //     break;
            case s.EXPORT_SUBSIDIES_Graph:
                for(var j=0; j< dashboard_conf.length;j++){
                    if(dashboard_conf[j].uid == s.EXPORT_SUBSIDIES_Graph_uid){
                        dashboard_confI = dashboard_conf[j];
                        break;
                    }
                }
                var postProcess = dashboard_confI.items[0].postProcess;

                var commodity_class_code =  ""+parsed_filter_values.commodity_class_code;
                var commodity_class_name = '';
                var country_code =  ""+parsed_filter_values.country_code;
                var country_name = '';
                switch(commodity_class_code) {
                    case s.custom_code.commodity_class.maize.code:
                        commodity_class_name = s.custom_code.commodity_class.maize.name;
                        break;
                    case s.custom_code.commodity_class.maizeRice.code:
                        commodity_class_name = s.custom_code.commodity_class.maizeRice.name;
                        break;
                    case s.custom_code.commodity_class.maizeRiceSoybeans.code:
                        commodity_class_name = s.custom_code.commodity_class.maizeRiceSoybeans.name;
                        break;
                    case s.custom_code.commodity_class.maizeRiceSoybeansWheat.code:
                        commodity_class_name = s.custom_code.commodity_class.maizeRiceSoybeansWheat.name;
                        break;
                    case s.custom_code.commodity_class.maizeRiceWheat.code:
                        commodity_class_name = s.custom_code.commodity_class.maizeRiceWheat.name;
                        break;
                    case s.custom_code.commodity_class.maizeSoybeans.code:
                        commodity_class_name= s.custom_code.commodity_class.maizeSoybeans.name;
                        break;
                    case s.custom_code.commodity_class.maizeSoybeansWheat.code:
                        commodity_class_name= s.custom_code.commodity_class.maizeSoybeansWheat.name;
                        break;
                    case s.custom_code.commodity_class.maizeWheat.code:
                        commodity_class_name= s.custom_code.commodity_class.maizeWheat.name;
                        break;
                    case s.custom_code.commodity_class.rice.code:
                        commodity_class_name= s.custom_code.commodity_class.rice.name;
                        break;
                    case s.custom_code.commodity_class.riceSoybeans.code:
                        commodity_class_name= s.custom_code.commodity_class.riceSoybeans.name;
                        break;
                    case s.custom_code.commodity_class.riceSoybeansWheat.code:
                        commodity_class_name= s.custom_code.commodity_class.riceSoybeansWheat.name;
                        break;
                    case s.custom_code.commodity_class.riceWheat.code:
                        commodity_class_name= s.custom_code.commodity_class.riceWheat.name;
                        break;
                    case s.custom_code.commodity_class.soybeans.code:
                        commodity_class_name= s.custom_code.commodity_class.soybeans.name;
                        break;
                    case s.custom_code.commodity_class.soybeansWheat.code:
                        commodity_class_name= s.custom_code.commodity_class.soybeansWheat.name;
                        break;
                    case s.custom_code.commodity_class.wheat.code:
                        commodity_class_name= s.custom_code.commodity_class.wheat.name;
                        break;
                }

                switch(country_code) {
                    case s.custom_code.country.argentina.code:
                        country_name = s.custom_code.country.argentina.name;
                        break;
                    case s.custom_code.country.australia.code:
                        country_name = s.custom_code.country.australia.name;
                        break;
                    case s.custom_code.country.brazil.code:
                        country_name = s.custom_code.country.brazil.name;
                        break;
                    case s.custom_code.country.canada.code:
                        country_name = s.custom_code.country.canada.name;
                        break;
                    case s.custom_code.country.china.code:
                        country_name = s.custom_code.country.china.name;
                        break;
                    case s.custom_code.country.egypt.code:
                        country_name = s.custom_code.country.egypt.name;
                        break;
                    case s.custom_code.country.europeanUnion.code:
                        country_name = s.custom_code.country.europeanUnion.name;
                        break;
                    case s.custom_code.country.france.code:
                        country_name = s.custom_code.country.france.name;
                        break;
                    case s.custom_code.country.germany.code:
                        country_name = s.custom_code.country.germany.name;
                        break;
                    case s.custom_code.country.india.code:
                        country_name = s.custom_code.country.india.name;
                        break;
                    case s.custom_code.country.indonesia.code:
                        country_name = s.custom_code.country.indonesia.name;
                        break;
                    case s.custom_code.country.italy.code:
                        country_name = s.custom_code.country.italy.name;
                        break;
                    case s.custom_code.country.japan.code:
                        country_name = s.custom_code.country.japan.name;
                        break;
                    case s.custom_code.country.kazakhstan.code:
                        country_name = s.custom_code.country.kazakhstan.name;
                        break;
                    case s.custom_code.country.mexico.code:
                        country_name = s.custom_code.country.mexico.name;
                        break;
                    case s.custom_code.country.nigeria.code:
                        country_name = s.custom_code.country.nigeria.name;
                        break;
                    case s.custom_code.country.philippines.code:
                        country_name = s.custom_code.country.philippines.name;
                        break;
                    case s.custom_code.country.republicOfKorea.code:
                        country_name = s.custom_code.country.republicOfKorea.name;
                        break;
                    case s.custom_code.country.russianFederation.code:
                        country_name = s.custom_code.country.russianFederation.name;
                        break;
                    case s.custom_code.country.saudiArabia.code:
                        country_name = s.custom_code.country.saudiArabia.name;
                        break;
                    case s.custom_code.country.southAfrica.code:
                        country_name = s.custom_code.country.southAfrica.name;
                        break;
                    case s.custom_code.country.spain.code:
                        country_name = s.custom_code.country.spain.name;
                        break;
                    case s.custom_code.country.thailand.code:
                        country_name = s.custom_code.country.thailand.name;
                        break;
                    case s.custom_code.country.turkey.code:
                        country_name = s.custom_code.country.turkey.name;
                        break;
                    case s.custom_code.country.ukraine.code:
                        country_name = s.custom_code.country.ukraine.name;
                        break;
                    case s.custom_code.country.unitedKingdom.code:
                        country_name = s.custom_code.country.unitedKingdom.name;
                        break;
                    case s.custom_code.country.unitedStatesOfAmerica.code:
                        country_name = s.custom_code.country.unitedStatesOfAmerica.name;
                        break;
                    case s.custom_code.country.vietNam.code:
                        country_name = s.custom_code.country.vietNam.name;
                        break;
                }
                dashboard_confI.items[0].config.config.title.text = {};
                var selection = {};
                selection.commodity_class_name = commodity_class_name;
                selection.country_name = country_name;

                dashboard_confI.items[0].config.config.title.text = this._titleCreation(s.EXPORT_SUBSIDIES_Graph_uid, selection);

                postProcess[0].parameters.rows.commodityclass.codes[0].codes[0] = ""+parsed_filter_values.commodity_class_code;
                postProcess[0].parameters.rows.country.codes[0].codes[0] = ""+parsed_filter_values.country_code;

                dashboard_confI.items[0].postProcess = postProcess;
                break;

            case s.EXPORT_RESTRICTIONS_DASHBOARD_FreqGraph:
                //console.log("len = ",dashboard_conf.length)
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
    };

    PolicyAtGlance.prototype._customConfigCreation = function(dashboard, dashboard_conf){
        //console.log( moment(data.from,"X").format("DD/MM/YYYY") + " - " + moment(data.to,"X").format("DD/MM/YYYY"))
        var dashboard_confI={};
        //console.log(dashboard)
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
                    case s.custom_code.policy_type.biofuel_targets.code:
                        policy_type_name = s.custom_code.policy_type.biofuel_targets.name;
                        break;
                    case s.custom_code.policy_type.domestic_price_regulation.code:
                        policy_type_name = s.custom_code.policy_type.domestic_price_regulation.name;
                        break;
                    case s.custom_code.policy_type.export_measures.code:
                        policy_type_name = s.custom_code.policy_type.export_measures.name;
                        break;
                    case s.custom_code.policy_type.import_measures.code:
                        policy_type_name = s.custom_code.policy_type.import_measures.name;
                        break;
                    case s.custom_code.policy_type.production_measures.code:
                        policy_type_name = s.custom_code.policy_type.production_measures.name;
                        break;
                    case s.custom_code.policy_type.tax_concessions.code:
                        policy_type_name= s.custom_code.policy_type.tax_concessions.name;
                        break;
                }
                dashboard_confI.items[0].config.config.title.text = {};
                dashboard_confI.items[0].config.config.title.text = this._titleCreation(s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph_uid, policy_type_name);
                var note = '';
                if(policy_type_code == s.custom_code.policy_type.import_measures.code){
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
                    case s.custom_code.policy_type.biofuel_targets.code:
                        policy_type_name = s.custom_code.policy_type.biofuel_targets.name;
                        break;
                    case s.custom_code.policy_type.domestic_price_regulation.code:
                        policy_type_name = s.custom_code.policy_type.domestic_price_regulation.name;
                        break;
                    case s.custom_code.policy_type.export_measures.code:
                        policy_type_name = s.custom_code.policy_type.export_measures.name;
                        break;
                    case s.custom_code.policy_type.import_measures.code:
                        policy_type_name = s.custom_code.policy_type.import_measures.name;
                        break;
                    case s.custom_code.policy_type.production_measures.code:
                        policy_type_name = s.custom_code.policy_type.production_measures.name;
                        break;
                    case s.custom_code.policy_type.tax_concessions.code:
                        policy_type_name= s.custom_code.policy_type.tax_concessions.name;
                        break;
                }

                dashboard_confI.items[0].config.config.title.text = {};
                dashboard_confI.items[0].config.config.title.text = this._titleCreation(s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph_uid, policy_type_name);
                break;

            case s.EXPORT_SUBSIDIES_Graph:
                for(var j=0; j< dashboard_conf.length;j++){
                    if(dashboard_conf[j].uid == s.EXPORT_SUBSIDIES_Graph_uid){
                        dashboard_confI = dashboard_conf[j];
                        break;
                    }
                }

                var postProcess = dashboard_confI.items[0].postProcess;
                var commodity_class_code = postProcess[0].parameters.rows.commodityclass.codes[0].codes[0];
                var commodity_class_name = '';
                var country_code = postProcess[0].parameters.rows.country.codes[0].codes[0];
                var country_name = '';
                switch(commodity_class_code) {
                    case s.custom_code.commodity_class.maize.code:
                        commodity_class_name = s.custom_code.commodity_class.maize.name;
                        break;
                    case s.custom_code.commodity_class.maizeRice.code:
                        commodity_class_name = s.custom_code.commodity_class.maizeRice.name;
                        break;
                    case s.custom_code.commodity_class.maizeRiceSoybeans.code:
                        commodity_class_name = s.custom_code.commodity_class.maizeRiceSoybeans.name;
                        break;
                    case s.custom_code.commodity_class.maizeRiceSoybeansWheat.code:
                        commodity_class_name = s.custom_code.commodity_class.maizeRiceSoybeansWheat.name;
                        break;
                    case s.custom_code.commodity_class.maizeRiceWheat.code:
                        commodity_class_name = s.custom_code.commodity_class.maizeRiceWheat.name;
                        break;
                    case s.custom_code.commodity_class.maizeSoybeans.code:
                        commodity_class_name= s.custom_code.commodity_class.maizeSoybeans.name;
                        break;
                    case s.custom_code.commodity_class.maizeSoybeansWheat.code:
                        commodity_class_name= s.custom_code.commodity_class.maizeSoybeansWheat.name;
                        break;
                    case s.custom_code.commodity_class.maizeWheat.code:
                        commodity_class_name= s.custom_code.commodity_class.maizeWheat.name;
                        break;
                    case s.custom_code.commodity_class.rice.code:
                        commodity_class_name= s.custom_code.commodity_class.rice.name;
                        break;
                    case s.custom_code.commodity_class.riceSoybeans.code:
                        commodity_class_name= s.custom_code.commodity_class.riceSoybeans.name;
                        break;
                    case s.custom_code.commodity_class.riceSoybeansWheat.code:
                        commodity_class_name= s.custom_code.commodity_class.riceSoybeansWheat.name;
                        break;
                    case s.custom_code.commodity_class.riceWheat.code:
                        commodity_class_name= s.custom_code.commodity_class.riceWheat.name;
                        break;
                    case s.custom_code.commodity_class.soybeans.code:
                        commodity_class_name= s.custom_code.commodity_class.soybeans.name;
                        break;
                    case s.custom_code.commodity_class.soybeansWheat.code:
                        commodity_class_name= s.custom_code.commodity_class.soybeansWheat.name;
                        break;
                    case s.custom_code.commodity_class.wheat.code:
                        commodity_class_name= s.custom_code.commodity_class.wheat.name;
                        break;
                }

                switch(country_code) {
                    case s.custom_code.country.argentina.code:
                        country_name = s.custom_code.country.argentina.name;
                        break;
                    case s.custom_code.country.australia.code:
                        country_name = s.custom_code.country.australia.name;
                        break;
                    case s.custom_code.country.brazil.code:
                        country_name = s.custom_code.country.brazil.name;
                        break;
                    case s.custom_code.country.canada.code:
                        country_name = s.custom_code.country.canada.name;
                        break;
                    case s.custom_code.country.china.code:
                        country_name = s.custom_code.country.china.name;
                        break;
                    case s.custom_code.country.egypt.code:
                        country_name = s.custom_code.country.egypt.name;
                        break;
                    case s.custom_code.country.europeanUnion.code:
                        country_name = s.custom_code.country.europeanUnion.name;
                        break;
                    case s.custom_code.country.france.code:
                        country_name = s.custom_code.country.france.name;
                        break;
                    case s.custom_code.country.germany.code:
                        country_name = s.custom_code.country.germany.name;
                        break;
                    case s.custom_code.country.india.code:
                        country_name = s.custom_code.country.india.name;
                        break;
                    case s.custom_code.country.indonesia.code:
                        country_name = s.custom_code.country.indonesia.name;
                        break;
                    case s.custom_code.country.italy.code:
                        country_name = s.custom_code.country.italy.name;
                        break;
                    case s.custom_code.country.japan.code:
                        country_name = s.custom_code.country.japan.name;
                        break;
                    case s.custom_code.country.kazakhstan.code:
                        country_name = s.custom_code.country.kazakhstan.name;
                        break;
                    case s.custom_code.country.mexico.code:
                        country_name = s.custom_code.country.mexico.name;
                        break;
                    case s.custom_code.country.nigeria.code:
                        country_name = s.custom_code.country.nigeria.name;
                        break;
                    case s.custom_code.country.philippines.code:
                        country_name = s.custom_code.country.philippines.name;
                        break;
                    case s.custom_code.country.republicOfKorea.code:
                        country_name = s.custom_code.country.republicOfKorea.name;
                        break;
                    case s.custom_code.country.russianFederation.code:
                        country_name = s.custom_code.country.russianFederation.name;
                        break;
                    case s.custom_code.country.saudiArabia.code:
                        country_name = s.custom_code.country.saudiArabia.name;
                        break;
                    case s.custom_code.country.southAfrica.code:
                        country_name = s.custom_code.country.southAfrica.name;
                        break;
                    case s.custom_code.country.spain.code:
                        country_name = s.custom_code.country.spain.name;
                        break;
                    case s.custom_code.country.thailand.code:
                        country_name = s.custom_code.country.thailand.name;
                        break;
                    case s.custom_code.country.turkey.code:
                        country_name = s.custom_code.country.turkey.name;
                        break;
                    case s.custom_code.country.ukraine.code:
                        country_name = s.custom_code.country.ukraine.name;
                        break;
                    case s.custom_code.country.unitedKingdom.code:
                        country_name = s.custom_code.country.unitedKingdom.name;
                        break;
                    case s.custom_code.country.unitedStatesOfAmerica.code:
                        country_name = s.custom_code.country.unitedStatesOfAmerica.name;
                        break;
                    case s.custom_code.country.vietNam.code:
                        country_name = s.custom_code.country.vietNam.name;
                        break;
                }
                dashboard_confI.items[0].config.config.title.text = {};
                var selection = {};
                selection.commodity_class_name = commodity_class_name;
                selection.country_name = country_name;

                dashboard_confI.items[0].config.config.title.text = this._titleCreation(s.EXPORT_SUBSIDIES_Graph_uid, selection);

                // postProcess[0].parameters.rows.commodityclass.codes[0].codes[0] = ""+parsed_filter_values.commodity_class_code;
                // postProcess[0].parameters.rows.country.codes[0].codes[0] = ""+parsed_filter_values.country_code;
                //
                // dashboard_confI.items[0].postProcess = postProcess;
                break;

            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1:
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2:
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3:
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4:
                // for(var j=0; j< dashboard_conf.length;j++){
                //     if((dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph5_uid)){
                //         dashboard_confI = dashboard_conf[j];
                //         break;
                //     }
                // }
                // var postProcess = dashboard_confI.items[0].postProcess[0];
                // postProcess.parameters.rows.policytype.codes[0].codes[0] = ""+parsed_filter_values.policy_type_code;
                // dashboard_confI.items[0].postProcess[0] = postProcess;
                for(var j=0; j< dashboard_conf.length;j++){
                    if((dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3_uid)||(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4_uid)){
                        dashboard_confI = dashboard_conf[j];
                        break;
                    }
                }
                var postProcess = dashboard_confI.items[0].postProcess;
                var policy_type_code = postProcess[0].parameters.rows.policytype.codes[0].codes[0];
                var policy_type_name = '';
                switch(policy_type_code) {
                    case s.custom_code.policy_type.biofuel_targets.code:
                        policy_type_name = s.custom_code.policy_type.biofuel_targets.name;
                        break;
                    case s.custom_code.policy_type.domestic_price_regulation.code:
                        policy_type_name = s.custom_code.policy_type.domestic_price_regulation.name;
                        break;
                    case s.custom_code.policy_type.export_measures.code:
                        policy_type_name = s.custom_code.policy_type.export_measures.name;
                        break;
                    case s.custom_code.policy_type.import_measures.code:
                        policy_type_name = s.custom_code.policy_type.import_measures.name;
                        break;
                    case s.custom_code.policy_type.production_measures.code:
                        policy_type_name = s.custom_code.policy_type.production_measures.name;
                        break;
                    case s.custom_code.policy_type.tax_concessions.code:
                        policy_type_name= s.custom_code.policy_type.tax_concessions.name;
                        break;
                }

                dashboard_confI.items[0].config.config.title.text = {};
                var uid = '';
                if(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1_uid) {
                    uid = s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1_uid;
                }
                else if(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2_uid) {
                    uid = s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2_uid;
                }
                else if(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3_uid) {
                    uid = s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3_uid;
                }
                else if(dashboard_conf[j].uid == s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4_uid) {
                    uid = s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4_uid;
                }

                dashboard_confI.items[0].config.config.title.text = this._titleCreation(uid, policy_type_name);
                break;
        }
        //Check if the return has to be array or config
        return dashboard_conf;
    };

    PolicyAtGlance.prototype._titleCreation = function(chart, selectionName){
        var title = '';
        switch (chart){
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph_uid:
                title = s.BIOFUELS_POLICIES_DETAILED.title.biofuelsPoliciesFreqGraph.first.replace('POLICYTYPENAME', selectionName);
                break;
            case s.EXPORT_SUBSIDIES_Graph_uid:
                title = s.EXPORT_SUBSIDIES.title.exportSubsidies.first.replace('COMMODITYCLASSNAME', selectionName.commodity_class_name);
                title = title.replace('COUNTRYNAME', selectionName.country_name);
                break;
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph1_uid:
                title = s.BIOFUELS_POLICIES_DETAILED.title.biofuelsPoliciesTimeSeriesGraph.first.replace('POLICYTYPENAME', selectionName);
                break;
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph2_uid:
                title = s.BIOFUELS_POLICIES_DETAILED.title.biofuelsPoliciesTimeSeriesGraph.second.replace('POLICYTYPENAME', selectionName);
                break;
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph3_uid:
                title = s.BIOFUELS_POLICIES_DETAILED.title.biofuelsPoliciesTimeSeriesGraph.third.replace('POLICYTYPENAME', selectionName);
                break;
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_TimeseriesGraph4_uid:
                title = s.BIOFUELS_POLICIES_DETAILED.title.biofuelsPoliciesTimeSeriesGraph.fourth.replace('POLICYTYPENAME', selectionName);
                break;
        }

        return title;
    };

    PolicyAtGlance.prototype._subtitleCreation = function(chart, partial_start_date, partial_end_date){

        var subtitle = '';
        switch (chart){
            case s.BIOFUELS_POLICIES_DASHBOARD_FreqGraph_uid:
            case s.BIOFUELS_POLICIES_DETAILED_DASHBOARD_FreqGraph_uid:
            case s.EXPORT_RESTRICTIONS_DASHBOARD_FreqGraph_uid:
                subtitle = "Period "+partial_start_date+" until "+partial_end_date;
                break;
        }

        return subtitle;
    };

    PolicyAtGlance.prototype._renderDashboard = function(config){

        //console.log(JSON.stringify(config))
        //console.log(config[0].model.data)
        //console.log("In _renderDashboard end")
        this._disposeDashboards();

        _.each(config, _.bind(function (c) {

            this.dashboards.push(new Dashboard($.extend(true, {
                environment : this.environment
            }, c)));

        }, this));

    };

    PolicyAtGlance.prototype._disposeDashboards = function(config){

        _.each(this.dashboards, _.bind(function (dashboard) {
            if (dashboard && $.isFunction(dashboard.dispose)) {
                dashboard.dispose();
            }
        }, this));

        this.dashboards = [];
    };

    PolicyAtGlance.prototype._renderFilter = function(config){

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

        //var $cointainerContent = $('<div id="filter-container"><div class="row"><div class="col-xs-6"><div data-selector="CountryCode"></div></div><div class="col-xs-6"><div data-selector="Year"></div></div></div></div>');


        var filterContent = this.filterContainerContentHTML();
        var $cointainerContent = $(filterContent);

        if($(filter_container).length === 0){
            $(s.FILTER_HOLDER).html($cointainerContent);
        }

        actual_filter_conteiner_id= filter_container.substring(1);
        this.$el.find("div[id='"+actual_filter_conteiner_id+"']").removeClass('collapse')

        //console.log(config)
        //console.log(filter_container)
        this.filter = new Filter({
            // el: "#filter-container",
            //el: "#domain-filter-holder",
            el: filter_container,
            selectors: config,
            common: {
                template: {
                    hideSwitch: true,
                    hideRemoveButton: true
                }
            }
        });
    };

    PolicyAtGlance.prototype.filterContainerContentHTML = function () {

        var filter_container = '<div id="filter-container" class="row"></div>';
        filter_container += '<div data-test id="filter-container-slider-dropdown" class="row collapse"><div class="col-xs-6"><div data-selector="Year"></div></div><div class="col-xs-6"><div data-selector="policyType"></div></div></div>';
        filter_container += '<div id="filter-container-dropdown" class="row collapse"><div class="col-xs-6 col-xs-offset-2"><div data-selector="policyType"></div></div></div>';
        filter_container += '<div id="filter-container-two-dropdowns" class="row collapse"><div class="col-xs-6"><div data-selector="country"></div></div><div class="col-xs-6"><div data-selector="commodityClass"></div></div></div>';

        return filter_container;
    }

    //Disposition process
    PolicyAtGlance.prototype.dispose = function(){

        if (this.$lateralMenu && this.$lateralMenu.length > 0) {
            this.$lateralMenu.jstree(true).destroy();
        }

        this._disposeDashboards();

        this._unbindDashboardEventListeners();

        this.currentDashboard = {};
        this.filterValues = {};

        //View.prototype.dispose.call(this, arguments);

    };

    PolicyAtGlance.prototype._unbindDashboardEventListeners = function(){

        if (this.$filterSubmit && this.$filterSubmit.length > 0) {
            this.$filterSubmit.off();
        }
    };

    PolicyAtGlance.prototype._importThirdPartyCss = function () {

        //SANDBOXED BOOTSTRAP
        require("../css/sandboxed-bootstrap.css");

        //dropdown selector
        require("../../node_modules/selectize/dist/css/selectize.bootstrap3.css");
        //tree selector
        require("../../node_modules/jstree/dist/themes/default/style.min.css");
        //range selector
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.css");
        require("../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css");
        //time selector
        require("../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css");
        // fenix-ui-filter
        require("../../node_modules/fenix-ui-filter/dist/fenix-ui-filter.min.css");

        // fenix-ui-dropdown
        require("../../node_modules/fenix-ui-dropdown/dist/fenix-ui-dropdown.min.css");

        // bootstrap-table
        require("../../node_modules/bootstrap-table/dist/bootstrap-table.min.css");
        // // fenix-ui-catalog
        //require("../../node_modules/fenix-ui-catalog/dist/fenix-ui-catalog.min.css");

        //meta viewer requirements
        require("jquery-treegrid-webpack/css/jquery.treegrid.css");

        //AMIS Policy CSS
        //require("../css/amisPolicy.css");

    };

    return new PolicyAtGlance();
});