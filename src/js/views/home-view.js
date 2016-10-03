/*global define, _:false, $, console, amplify, FM, THREE*/
define([
    'jquery',
    'views/base/view',
    'config/config',
    'config/events',
    'text!json/home/data_at_glance.json',
    'text!templates/home/home.hbs',
    'i18n!nls/labels',
    'handlebars',
    'fx-chart/config/renderers/highcharts_shared',
    'copyShader',
    'effectComposer',
    'maskPass',
    'renderPass',
    'shaderPass',
    'orbitControls',
    'threejs',
    'detector',
    'canvasRender',
    'highcharts',
    'projector',
    'tweenMax',
    'amplify'
], function ($, View, C, EVT, DATA, template, i18nLabels, Handlebars, chartTemplate) {

    'use strict';

    var s = {
        CHART_ONE: "#chart1",
        CHART_TWO: "#chart2",
        CHART_THREE: "#chart3",
        CHART_FOUR: "#chart4",
        CHART_TABS: '#home-charts-tab a[data-toggle="tab"]',
        ANIMATION_CONTAINER: "#animation-container"
    }, renderer, scena, camera, control, stats, controlliCamera, sfondoScena, cameraSfondo, composer, renderScene, containerWidth, containerHeight, terraMesh, nuvoleMesh;

    var mouseX = 0,
        mouseY = 0;

    var windowHalfX = window.innerWidth / 2,
        indowHalfY = window.innerHeight / 2;

    var HomeView = View.extend({

        autoRender: true,

        className: 'home',

        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //this.initWorldMap();

            //update State
            amplify.publish(EVT.STATE_CHANGE, {menu: 'home'});

            this.initVariables();

            this.bindEventListeners();

            this.configurePage();
        },

        initVariables: function () {
        },

        configurePage: function () {

            this.initCharts();
        },

        initCharts: function () {

            this.data = JSON.parse(DATA);

            for (var k in this.data['import']) {
                if (this.data['import'].hasOwnProperty(k)) {
                    this.data['import'][k].length = 9;
                    this.data['export'][k].length = 9;
                }
            }

            var series1GDP = [5.8, 6, 5.4, 3.4, 5.7, 2.8, 6.7, 3.5, 3.9],
                series2GDP = [5.6, 6.9, 10.7, 9.7, 8, 9.2, 9.2, 7, 7.2];

            $(s.CHART_ONE).highcharts($.extend(true, {}, chartTemplate, {
                title: {
                    text: 'Gross Domestic Product of Africa'
                },
                credits: {
                    enabled: false
                },

                xAxis: {
                    categories: [
                        '2006',
                        '2007',
                        '2008',
                        '2009',
                        '2010',
                        '2011',
                        '2012',
                        '2013',
                        '2014'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Million AED'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [
                    {
                        name: 'GDP growth rates',
                        data: series1GDP
                    },
                    {
                        name: 'Inflation',
                        data: series2GDP
                    }]
            }));

            $(s.CHART_TWO).highcharts($.extend(true, {}, chartTemplate, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Export of Goods and services from Africa'
                },
                credits: {
                    enabled: false
                },
                /*  colors: [ //Colori delle charts
                 '#a62d3e',
                 '#986e2e',
                 '#744490',
                 '#E10079',
                 '#2D1706',
                 '#F1E300',
                 '#F7AE3C',
                 '#DF3328'
                 ],*/
                xAxis: {
                    categories: [
                        'AMU',
                        'CAEMC',
                        'COMESA',
                        'ECCAS',
                        'ECOWAS',
                        'FRANC ZONE',
                        'SADC',
                        'WAEMU']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Millions of WSD'
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: "Export",
                    data: this.data.trade.import
                }]
            }));

            $(s.CHART_THREE).highcharts($.extend(true, {}, chartTemplate, {
                title: {
                    text: 'Gender parity index in Africa'
                },
                credits: {
                    enabled: false
                },

                xAxis: {
                    categories: ['2006',
                        '2007',
                        '2008',
                        '2009',
                        '2010',
                        '2011',
                        '2012',
                        '2013']
                },
                crosshair: true,

                yAxis: {
                    min: 0.75,
                    max: 1
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Gender parity index in primary',
                    data: this.data.education.primary
                },
                    {
                        name: 'Gender parity index in secondary',
                        data: this.data.education.secondary
                    }
                ]
            }));

            $(s.CHART_FOUR).highcharts($.extend(true, {}, chartTemplate, {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Import of Goods and services to Africa'
                },
                credits: {
                    enabled: false
                },
                /*  colors: [ //Colori delle charts
                 '#a62d3e',
                 '#986e2e',
                 '#744490',
                 '#E10079',
                 '#2D1706',
                 '#F1E300',
                 '#F7AE3C',
                 '#DF3328'
                 ],*/
                xAxis: {
                    categories: [
                        'AMU',
                        'CAEMC',
                        'COMESA',
                        'ECCAS',
                        'ECOWAS',
                        'FRANC ZONE',
                        'SADC',
                        'WAEMU']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Millions of WSD'
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: "Import",
                    data: this.data.trade.import
                }]
            }));

        },

        _traspostMatrix: function (key, type) {

            var result = [];

            var map = {
                "AFRICA": 0,
                "AMU": 1,
                "CAEMC": 2,
                "COMESA": 3,
                "ECCAS": 4,
                "ECOWAS": 5,
                "FRANC_ZONE": 6,
                "SADC": 7,
                "WAEMU": 8
            };

            var index = map[key];

            for (var field in this.data.trade[type]) {
                result.push(this.data.trade[type][field][index])
            }

            return result;

        },

        _prepareDataForTradeCharts: function () {

            var result = {};

            result['import'] = this.data.trade.import;
            result['export'] = this.data.trade.export;


            return result;


            var semiResult = {'export': {}, 'import': {}};

            for (var key in this.data.trade.export) {
                semiResult['export'][key] = this._traspostMatrix(key, 'export');
                semiResult['import'][key] = this._traspostMatrix(key, 'import');
            }

            //console.log(semiResult);

            this.data.trade = semiResult;

            for (var key in this.data.trade.import) {

                for (var i = 0; i < this.data.trade.import[key].length; i++) {

                    this.data.trade.import[key][i] = parseFloat(this.data.trade.import[key][i].toFixed(2));
                }

                result['import'].push({'name': key, 'data': this.data.trade.import[key]})
            }

            for (var key in this.data.trade.export) {

                for (var i = 0; i < this.data.trade.export[key].length; i++) {

                    this.data.trade.export[key][i] = parseFloat(this.data.trade.export[key][i].toFixed(2));
                }
                result['export'].push({'name': key, 'data': this.data.trade.export[key]})
            }


        },

        bindEventListeners: function () {

            var self = this;

            $(s.CHART_TABS).on('shown.bs.tab', function (e) {
                e.preventDefault();
                self.initCharts();
            });

        },

        unbindEventListeners: function () {

            $(s.CHART_TABS).off('shown.bs.tab');

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        }


    });

    return HomeView;
});
