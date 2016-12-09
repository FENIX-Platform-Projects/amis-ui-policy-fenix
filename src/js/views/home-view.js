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
    'swiper',
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
], function ($, View, C, EVT, DATA, template, i18nLabels, Handlebars, chartTemplate, Swiper) {

    'use strict';

    var s = {
        CHART_ONE: "#chart1",
        CHART_TWO: "#chart2",
        CHART_THREE: "#chart3",
        CHART_FOUR: "#chart4",
        CHART_TABS: '#home-charts-tab a[data-toggle="tab"]',
        ANIMATION_CONTAINER: "#animation-container"
    }, renderer, scena, camera, control, stats, controlliCamera, sfondoScena, cameraSfondo, composer, renderScene, containerWidth, containerHeight, terraMesh, nuvoleMesh;

    var AMIS_home_charts = {
        'chartOne':{
            "chart":{
                "type":"column",
                "borderWidth":0,
                "marginBottom":100,
                "backgroundColor": '#fafafa'
            },
            "title":{
                "text":"Number of AMIS countries with biofuel policies, disaggregated by policy type",
                "style": {
                    color: '#2a5d9f',
                    fontFamily: 'Open Sans Condensed'
                }
            },
            "subtitle":{
                "text":"Period 01-2011 until 01-2014"
            },
            "colors":[
                "#125824",
                "#255ba3",
                "#f6b539",
                "#199e34",
                "#7f7f7f",
                "#67b7e3",
                "#dc3018"
            ],
            "xAxis":{
                "categories":[
                    "Ethanol",
                    "Biodiesel",
                    "Biofuel (unspecified)"
                ]
            },
            "yAxis":{
                "min":0,
                "allowDecimals":false,
                "title":{
                    "text":"Number of AMIS Countries"
                }
            },
            "tooltip":{
                "headerFormat":"<span style='font-size:10px'>{point.key}</span><table>",
                "pointFormat":"<tr><td style='color:{series.color};padding:0'>{series.name}: </td><td style='padding:0'><b>{point.y}</b></td></tr>",
                "footerFormat":"</table>",
                "shared":true,
                "useHTML":true,
                "enabled":false
            },
            "labels":{
                "items":[
                    {
                        "html":'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level. <br>Ethanol, biodiesel and biofuel (unspecified) are mutually exclusive categories. <br>Import measures do not include import tariffs or tariff quotas.<br>Source: AMIS Policy Database',
                        "style":{
                            "left":"1px",
                            "top":"270px",
                            "cursor":"default",
                            "color":"#413839",
                            "fontSize":"10px"
                        }
                    }
                ]
            },
            "credits":{
                "enabled":false
            },
            "plotOptions":{
                "column":{
                    "pointPadding":0.2,
                    "borderWidth":0,
                    events: {
                        legendItemClick: function () {
                            return false; // <== returning false will cancel the default action
                        }
                    }
                }
            },
            "legend":{
                "enabled": true,
                "title":{
                    "text":"Policy Type",
                    "style":{
                        "fontStyle":"italic"
                    }
                },
                "layout":"vertical",
                "align":"right",
                "verticalAlign":"top",
                "y":50,
                "borderWidth":1,
                "borderColor":"#4572a7"
            },
            "exporting":{
                "buttons":{
                    "contextButton":{
                        "enabled":false
                    }
                }
            },
            "series":[
                {
                    "name":'1: Biofuel targets',
                    "data":[
                        18,
                        12,
                        8
                    ]
                },
                {
                    "name":'2: Domestic price regulation',
                    "data":[
                        4,
                        4,
                        0
                    ]
                },
                {
                    "name":'3: Export measures',
                    "data":[
                        6,
                        4,
                        0
                    ]
                },
                {
                    "name":'4: Import measures',
                    "data":[
                        4,
                        3,
                        1
                    ]
                },
                {
                    "name":'5: Production measures',
                    "data":[
                        5,
                        3,
                        2
                    ]
                },
                {
                    "name":'6: Tax concessions',
                    "data":[
                        18,
                        15,
                        1
                    ]
                }
            ]
        },
        //'chartTwo': {
        //    "chart":{
        //        "type":"column",
        //        "borderWidth":0,
        //        "marginBottom":100,
        //        "backgroundColor": '#fafafa'
        //    },
        //    "title":{
        //        "text":"Average values of applied and bound ad valorem import tariffs in the AMIS countries",
        //        "style": {
        //            color: '#2a5d9f',
        //            fontFamily: 'Open Sans Condensed'
        //        }
        //    },
        //    "subtitle":{
        //        "text":"Period 2010/2013"
        //    },
        //    "xAxis":{
        //        "categories":[
        //            "2010",
        //            "2011",
        //            "2012",
        //            "2013"
        //        ]
        //    },
        //    "yAxis":{
        //        "min":0,
        //        "title":{
        //            "text":"%",
        //            "rotation":0
        //        }
        //    },
        //    "colors":[
        //        "#255ba3",
        //        "#67b7e3",
        //        "#c52b15",
        //        "#ec6754",
        //        "#125824",
        //        "#199e34",
        //        "#9a9a9a",
        //        "#cccccc"
        //    ],
        //    "tooltip":{
        //        "headerFormat":"<span style='font-size:10px'>{point.key}</span><table>",
        //        "pointFormat":"<tr><td style='color:{series.color};padding:0'>{series.name}:</td><td style='padding:0'><b>{point.y:.1f}</b></td></tr>",
        //        "footerFormat":"</table>",
        //        "shared":true,
        //        "useHTML":true,
        //        "enabled":false
        //    },
        //    "plotOptions":{
        //        "column":{
        //            "pointPadding":0.2,
        //            "borderWidth":0,
        //            events: {
        //                legendItemClick: function () {
        //                    return false; // <== returning false will cancel the default action
        //                }
        //            }
        //        }
        //    },
        //    "legend":{
        //        "enabled": true,
        //        "title":{
        //            "text":"Commodity Class",
        //            "style":{
        //                "fontStyle":"italic"
        //            }
        //        },
        //        "layout":"vertical",
        //        "align":"right",
        //        "verticalAlign":"top",
        //        "y":50,
        //        "borderWidth":1,
        //        "borderColor":"#4572a7"
        //    },
        //    "labels":{
        //        "items":[
        //            {
        //                "html":"Graph excludes mixed commodity classes.<br>Graph only considers ad valorem tariffs for which notifications were made for both the MFN applied tariff and the Final bound tariff.<br>Not all countries notify each year.<br>Source: AMIS Policy Database.",
        //                "style":{
        //                    "left":"1px",
        //                    "top":"220px",
        //                    "cursor":"default",
        //                    "color":"#413839",
        //                    "fontSize":"10px"
        //                }
        //            }
        //        ]
        //    },
        //    "credits":{
        //        "enabled":false
        //    },
        //    "exporting":{
        //        "buttons":{
        //            "contextButton":{
        //                "enabled":false
        //            }
        //        }
        //    },
        //    "series":[{"name":'1: Wheat: Final Bound Tariff',"data":[44,60.1573770491803,34.902500000000025,28.76619718309869]},{"name":'2: Wheat: MFN Applied Tariff',"data":[44,23.217857142857152,11.701626016260152,10.781333333333436]},{"name":'3: Maize: Final Bound Tariff',"data":[33.333333333333336,59.552307692307714,37.541428571430565,51.9243243243246]},{"name":'4: Maize: MFN Applied Tariff',"data":[33.333333333333336,18.82586206896547,12.670422535211138,32.92151898734162]},{"name":'5: Rice: Final Bound Tariff',"data":[41.5625,54.82183908045977,39.16428571428571,34.499999999999915]},{"name":'6: Rice: MFN Applied Tariff',"data":[41.5625,29.25,16.95744680851064,18.260714285714293]},{"name":'7: Soybean: Final Bound Tariff',"data":[4.9,73.5758620689654,28.917045454545587,11.31800000000012]},{"name":'8: Soybean: MFN Applied Tariff',"data":[4.9,12.495652173913033,6.65568181818181,4.241176470588247]}]
        //
        //},
        'chartThree': {
            "chart":{
                "type":"column",
                "borderWidth":0,
                "marginBottom":100,
                "backgroundColor": '#fafafa'
            },
            "title":{
                "text":"Number of AMIS countries with export restriction policies, disaggregated by policy measure",
                "style": {
                    color: '#2a5d9f',
                    fontFamily: 'Open Sans Condensed'
                }
            },
            "subtitle":{
                "text":"Period 01-2010 until 01-2014"
            },
            "colors":[
                "#125824",
                "#255ba3",
                "#f6b539",
                "#199e34",
                "#7f7f7f",
                "#67b7e3",
                "#dc3018"
            ],
            "xAxis":{
                "categories":[
                    "Wheat",
                    "Maize",
                    "Rice",
                    "Soybeans",
                    "All"
                ]
            },
            "yAxis":{
                "min":0,
                "allowDecimals":false,
                "title":{
                    "text":"Number of AMIS Countries"
                }
            },
            "tooltip":{
                "headerFormat":"<span style='font-size:10px'>{point.key}</span><table>",
                "pointFormat":"<tr><td style='color:{series.color};padding:0'>{series.name}: </td><td style='padding:0'><b>{point.y}</b></td></tr>",
                "footerFormat":"</table>",
                "shared":true,
                "useHTML":true,
                "enabled":false
            },
            "labels":{
                "items":[
                    {
                        html: 'Graph excludes mixed commodity classes.<br>Countries target their interventions on specific varieties, often at the HS8 or HS10 digit level.<br>Source: AMIS Policy Database',
                        "style":{
                            "left":"1px",
                            "top":"270px",
                            "cursor":"default",
                            "color":"#413839",
                            "fontSize":"10px"
                        }
                    }
                ]
            },
            "credits":{
                "enabled":false
            },
            "plotOptions":{
                "column":{
                    "pointPadding":0.2,
                    "borderWidth":0,
                    events: {
                        legendItemClick: function () {
                            return false; // <== returning false will cancel the default action
                        }
                    }
                }
            },
            "legend":{
                "title":{
                    "text":"Policy Measure",
                    "style":{
                        "fontStyle":"italic"
                    }
                },
                "layout":"vertical",
                "align":"right",
                "verticalAlign":"top",
                "y":50,
                "borderWidth":1,
                "enabled":true,
                "borderColor":"#4572a7"
            },
            "exporting":{
                "buttons":{
                    "contextButton":{
                        "enabled":false
                    }
                }
            },
            "series":[
                {
                    "name":'1: Export prohibition',
                    "data":[
                        2,
                        2,
                        2,
                        2
                    ]
                },
                {
                    "name":'2: Export quota',
                    "data":[
                        3,
                        1,
                        3,
                        0
                    ]
                },
                {
                    "name":'3: Export tax',
                    "data":[
                        3,
                        3,
                        3,
                        3
                    ]
                },
                {
                    "name":'4: Licensing requirement',
                    "data":[
                        6,
                        5,
                        8,
                        4
                    ]
                },
                {
                    "name":'5: Minimum reference price',
                    "data":[
                        0,
                        1,
                        2,
                        1
                    ]
                }
            ]
        }
    };


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

            this._initSwiper();
        },

        initVariables: function () {
        },

        configurePage: function () {

            this.initCharts();
        },

        _initSwiper: function () {

            var current = "barbara";

            var mySwiper = new Swiper('.swiper-container',{
                slidesPerView: 1,
                //roundLengths: true,
                autoplay : 10000,
                simulateTouch: false,
                watchActiveIndex : true,
                loopAdditionalSlides: 0,
                loop: true,
                autoplayDisableOnInteraction : true,
                onSwiperCreated : function (Swiper) {
                    console.log(Swiper)
                    renderChart(Swiper.activeSlide());
                },
                onSlideChangeStart : function(Swiper){
                    console.log(Swiper)
                    renderChart(Swiper.activeSlide());
                }
            });
            $('.arrow-left').on('click', function(e){
                e.preventDefault();
                mySwiper.swipePrev()
            });
            $('.arrow-right').on('click', function(e){
                e.preventDefault();
                mySwiper.swipeNext()
            });


            function renderChart(  activeSlide  ) {

                if (activeSlide.data('chart') !== current){
                    console.log(current)
                    current = activeSlide.data('chart')
                    $(activeSlide).find('.chart-container').highcharts( AMIS_home_charts[current])
                }
            }
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
