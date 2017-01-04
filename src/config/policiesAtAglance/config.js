/*global define*/

define(["moment", "highcharts", "../../nls/labels"],function (moment, Highcharts, labels) {

    'use strict';

    var filter = {
        biofuelsPoliciesType : {
            year: {min: '2011-01-01', max: '2014-12-31', from: '2011-01-01', to: '2014-01-01'},
            yearTitle: {from: '01/2011', to: '01/2014'}
        },
        importTariffs : {
            yearTitle: {period: '2012/2015'}
        },
        exportSubsidies : {
            yearTitle: {period: '1995/2011'}
        },
        exportRestrictions : {
            year: {min: '2007-01-01', max: '2014-12-31', from: '2007-01-01', to: '2014-01-01'},
            yearTitle: {from: '01/2010', to: '01/2014'}
        }
    }

    var biofuelsPoliciesType = {
        title: {
            biofuelsPoliciesFreqGraph: {
                zero: 'Number of AMIS Countries',
                first:'Number of AMIS countries with biofuel policies, disaggregated by policy type'
            },
            biofuelsPoliciesTimeSeriesGraph: {
                zero: 'Number of AMIS Countries',
                first: 'Number of AMIS countries with ethanol policies, disaggregated by policy type',
                second: 'Number of AMIS countries with biodiesel policies, disaggregated by policy type',
                third: 'Number of AMIS countries with biofuel (unspecified) policies, disaggregated by policy type',
                fourth: 'Number of AMIS countries with biofuel policies targeted at ethanol, biodiesel or an unspecified type of biofuel, disaggregated by policy type'
            }
        },
        subtitle: {
            biofuelsPoliciesFreqGraph: {
                first: "Period "+ filter.biofuelsPoliciesType.yearTitle.from+" until "+filter.biofuelsPoliciesType.yearTitle.to
            },
            biofuelsPoliciesTimeSeriesGraph: {
            }
        },
        notes: {
            biofuelsPoliciesFreqGraph: {
                first: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level. <br>Ethanol, biodiesel and biofuel (unspecified) are mutually exclusive categories.<br>Import measures do not include import tariffs or tariff quotas. <br>Source: AMIS Policy Database'
            },
            biofuelsPoliciesTimeSeriesGraph: {
                first: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level.<br>Import measures do not include import tariffs or tariff quotas.<br>Source: AMIS Policy Database',
                second: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level.<br>Import measures do not include import tariffs or tariff quotas.<br>Source: AMIS Policy Database',
                third: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level.<br>Unspecified biofuel policies can apply to ethanol and/or biodiesel.<br>Import measures do not include import tariffs or tariff quotas.<br>Source: AMIS Policy Database',
                fourth: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level. <br>Combination of policies targeted on ethanol, biodiesel and biofuel (unspecified).<br>Import measures do not include import tariffs or tariff quotas.<br>Source: AMIS Policy Database'
            }
        },
        legend: {
            biofuelsPoliciesFreqGraph: {
                title: 'Policy Type'
            },
            biofuelsPoliciesTimeSeriesGraph: {
            }
        },
        export: {
            title: 'Download',
            button_items: {
                first: 'As PNG image',
                second: 'As JPEG image',
                third: 'As SVG vector image',
                fourth: 'To PDF document',
            },
            biofuelsPoliciesFreqGraph: {
                filename: {
                    first: 'Biofuels-policies-frequency_graph'
                }
            },
            biofuelsPoliciesTimeSeriesGraph: {
                filename: {
                    first: 'Biofuels-policies-time_series_graph'
                }
            }
        },
        time: {
            biofuelsPoliciesTimeSeriesGraph: {
                min: {year: 2011, month: 0, day: 1},
                max: {year: 2014, month: 11, day: 31},
                floor: {year: 2011, month: 0, day: 1},
                ceiling: {year: 2014, month: 11, day: 31}
            }
        }
    };

    var biofuelsPoliciesDetailed = {
        title: {
            biofuelsPoliciesFreqGraph: {
                zero: 'Number of AMIS Countries',
                first:'Number of AMIS countries with ' + 'Biofuel targets' + ' policies, disaggregated by policy measure'
            },
            biofuelsPoliciesTimeSeriesGraph: {
                zero: 'Number of AMIS Countries',
                first: 'Number of AMIS countries with ethanol policies, disaggregated by policy type and policy measure',
                second: 'Number of AMIS countries with biodiesel policies, disaggregated by policy type and policy measure',
                third: 'Number of AMIS countries with biofuel (unspecified) policies, disaggregated by policy type and policy measure',
                fourth: 'Number of AMIS countries with biofuel policies targeted at ethanol, biodiesel or an unspecified type of biofuel, disaggregated by policy type and policy measure'
            }
        },
        subtitle: {
            biofuelsPoliciesFreqGraph: {
                first: "Period "+ filter.biofuelsPoliciesType.yearTitle.from+" until "+filter.biofuelsPoliciesType.yearTitle.to
            },
            biofuelsPoliciesTimeSeriesGraph: {
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
        },
        legend: {
            biofuelsPoliciesFreqGraph: {
                title: 'Policy Measure'
            },
            biofuelsPoliciesTimeSeriesGraph: {
            }
        },
        export: {
            title: 'Download',
            button_items: {
                first: 'As PNG image',
                second: 'As JPEG image',
                third: 'As SVG vector image',
                fourth: 'To PDF document',
            },
            biofuelsPoliciesFreqGraph: {
                filename: {
                    first: 'Biofuels-policies-frequency_graph'
                }
            },
            biofuelsPoliciesTimeSeriesGraph: {
                filename: {
                    first: 'Biofuels-policies-time_series_graph'
                }
            }
        },
        time: {
            biofuelsPoliciesTimeSeriesGraph: {
                min: {year: 2011, month: 0, day: 1},
                max: {year: 2014, month: 11, day: 31},
                floor: {year: 2011, month: 0, day: 1},
                ceiling: {year: 2014, month: 11, day: 31}
            }
        }
    }

    var importTariffs = {
        title: {
            importTariffsFreqGraph: {
                zero: '%',
                first:'Average values of applied and bound ad valorem import tariffs in the AMIS countries'
            }
        },
        subtitle: {
            importTariffsFreqGraph: {
                first: "Period "+ filter.importTariffs.yearTitle.period
            }
        },
        notes: {
            importTariffsFreqGraph: {
                first: 'Graph only considers tariffs on raw agricultural commodities (HS codes 1001, 1005, 1006, 1201)<br>Non-ad valorem tariffs were excluded in the calculation of the averages<br>Source: AMIS Policy Database.'
            }
        },
        legend: {
            importTariffsFreqGraph: {
                title: 'Commodity Class'
            }
        },
        export: {
            title: 'Download',
            button_items: {
                first: 'As PNG image',
                second: 'As JPEG image',
                third: 'As SVG vector image',
                fourth: 'To PDF document',
            },
            importTariffsFreqGraph: {
                filename: {
                    first: 'Import-tariffs-frequency_graph'
                }
            }
        }
    }

    var exportSubsidies = {
        title: {
            exportSubsidiesFreqGraph: {
                zero: 'USD',
                first:'Quantity and budgetary outlay export subsidies in Brazil for Maize + Rice, commitments and notifications',
                second: 'Tonnes'
            }
        },
        subtitle: {
            exportSubsidiesFreqGraph: {
                first: filter.exportSubsidies.yearTitle.period
            }
        },
        notes: {
            exportSubsidiesFreqGraph: {
                first: 'Graph excludes Special and Differential Treatment (SDT) Notifications<br>Source: AMIS Policy Database.'
            }
        },
        legend: {
            exportSubsidiesFreqGraph: {
                title: 'Policy Measure'
            }
        },
        export: {
            title: 'Download',
            button_items: {
                first: 'As PNG image',
                second: 'As JPEG image',
                third: 'As SVG vector image',
                fourth: 'To PDF document',
            },
            exportSubsidiesFreqGraph: {
                filename: {
                    first: 'Export-Subsidies'
                }
            }
        }
    }

    var exportRestrictions = {
        title: {
            exportRestrictionsFreqGraph: {
                zero: 'Number of AMIS Countries',
                first:'Number of AMIS countries with export restriction policies, disaggregated by policy measure'
            },
            exportRestrictionsTimeSeriesGraph: {
                zero: 'Number of AMIS Countries',
                first: 'Number of AMIS countries with export restrictions on wheat',
                second: 'Number of AMIS countries with export restrictions on maize',
                third: 'Number of AMIS countries with export restrictions on rice',
                fourth: 'Number of AMIS countries with export restrictions on soybeans',
                fifth: 'Number of AMIS countries with export restrictions on wheat, maize, rice or soybeans'
            }
        },
        subtitle: {
            exportRestrictionsFreqGraph: {
                first: "Period "+ filter.exportRestrictions.yearTitle.from+" until "+filter.exportRestrictions.yearTitle.to
            },
            exportRestrictionsTimeSeriesGraph: {
            }
        },
        notes: {
            exportRestrictionsFreqGraph: {
                first: 'Graph excludes mixed commodity classes. <br>Countries target their interventions on specific varieties, often at the HS8 or HS10 digit level.<br>Source: AMIS Policy Database'
            },
            exportRestrictionsTimeSeriesGraph: {
                first: 'Graph excludes mixed commodity classes.<br>Countries target their interventions on specific varieties, often at the HS8 or HS10 digit level.<br>Source: AMIS Policy Database',
                second: 'Graph excludes mixed commodity classes.<br>Countries target their interventions on specific varieties, often at the HS8 or HS10 digit level.<br>Source: AMIS Policy Database',
                third: 'Graph excludes mixed commodity classes.<br>Countries target their interventions on specific varieties, often at the HS8 or HS10 digit level.<br>Source: AMIS Policy Database',
                fourth: 'Graph excludes mixed commodity classes.<br>Countries target their interventions on specific varieties, often at the HS8 or HS10 digit level.<br>Source: AMIS Policy Database',
                fifth: 'Graph excludes mixed commodity classes.<br>Countries target their interventions on specific varieties, often at the HS8 or HS10 digit level.<br>Source: AMIS Policy Database'
            }
        },
        legend: {
            exportRestrictionsFreqGraph: {
                title: 'Policy Measure'
            },
            exportRestrictionsTimeSeriesGraph: {
            }
        },
        export: {
            title: 'Download',
            button_items: {
                first: 'As PNG image',
                second: 'As JPEG image',
                third: 'As SVG vector image',
                fourth: 'To PDF document',
            },
            exportRestrictionsFreqGraph: {
                filename: {
                    first: 'Export-restrictions-frequency_graph'
                }
            },
            exportRestrictionsTimeSeriesGraph: {
                filename: {
                    first: 'Export-restrictions-time_series_graph'
                }
            }
        },
        time: {
            exportRestrictionsTimeSeriesGraph: {
                min: {year: 2010, month: 0, day: 1},
                max: {year: 2014, month: 0, day: 1},
                floor: {year: 2007, month: 0, day: 1},
                ceiling: {year: 2014, month: 11, day: 31}
            }
        }
    };


    return {

        "biofuelsPoliciesFreqGraph": {

            filter: {

                Year: {

                    //className: 'col-md-10',
                    selector: {
                        id: "range",
                        format : "YYYYMMDD",
                        config: {
                            type: "double",
                            min: +moment(filter.biofuelsPoliciesType.year.min).format("X"),
                            max: +moment(filter.biofuelsPoliciesType.year.max).format("X"),
                            //from: +moment(filter.biofuelsPoliciesType.year.from).format("X"),
                            //to: +moment(filter.biofuelsPoliciesType.year.to).format("X"),
                            prettify: function (num) {
                                return moment(num, "X").format("MM/YYYY");
                            }
                        }
                    },

                    template: {
                        title: "Double Range",
                        hideSwitch: true,
                        hideRemoveButton: true
                    }
                }

            },
            dashboard: [{

                uid: "Policy_biofuelsPoliciesFreqGraph",
                items: [
                    {
                        id: "biofuelsPoliciesFreqGraph-1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["commodityclass"], //x axis and series
                            series: ["policytype"], //Y dimension
                            y: ["VALUE0"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},
                            config: {
                                "chart": {
                                    "borderWidth": 2,
                                    "marginBottom": 170,
                                    events: {
                                        load: function () {
                                            var label = this.renderer.label(biofuelsPoliciesType.notes.biofuelsPoliciesFreqGraph.first)
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
                                    },
                                    "spacingBottom": 50
                                },
                                "title": {
                                    "text": biofuelsPoliciesType.title.biofuelsPoliciesFreqGraph.first,
                                    "style": {"fontSize": "15px"}
                                },
                                "subtitle": {"text": biofuelsPoliciesType.subtitle.biofuelsPoliciesFreqGraph.first},
                                "colors": ["#125824", "#255ba3", "#f6b539", "#199e34", "#7f7f7f", "#67b7e3", "#dc3018"],
                                //"xAxis": {"categories": ["Ethanol", "Biodiesel", "Biofuel (unspecified)"]},
                                "yAxis": {
                                    "min": 0,
                                    "allowDecimals": false,
                                    "title": {"text": biofuelsPoliciesType.title.biofuelsPoliciesFreqGraph.zero, enabled: true}
                                },
                                "tooltip": {
                                    "headerFormat": "<span style=\"font-size:10px\">{point.key}</span><table>",
                                    "pointFormat": "<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td><td style=\"padding:0\"><b>{point.y}</b></td></tr>",
                                    "footerFormat": "</table>",
                                    "shared": true,
                                    "useHTML": true
                                },
                                "credits": {"enabled": false},
                                "plotOptions": {"column": {"pointPadding": 0.2, "borderWidth": 0}},
                                "legend": {
                                    "title": {"text": biofuelsPoliciesType.legend.biofuelsPoliciesFreqGraph.title, "style": {"fontWeight": "bold"}},
                                    "itemWidth": 200,
                                    //"verticalAlign": "center",
                                    "layout": "horizontal",
                                    "align": "center",
                                    "y": -30, // Posizionamento in verticale della legenda
                                    "x": 0,
                                    "useHTML": true,
                                    "enabled": true,
                                    "borderColor": "#4572a7",
                                    "itemStyle": {"fontSize": "10px"}
                                },
                                "exporting": {
                                    "buttons": {
                                        "contextButton": {"enabled": false},
                                        "exportButton": {
                                            "theme": {
                                                "title": biofuelsPoliciesType.export.title,
                                                "stroke-width": 1,
                                                "stroke": "#4572a7",
                                                "fill": "#ADD8E6",
                                                "r": 0,
                                                "states": {"hover": {"fill": "#d3d3d3"}}
                                            },
                                            "text": "Download",
                                            "menuItems": [
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.first,
                                                    onclick: function () {

                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                },
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                },
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                },
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }, // :type-creator config
                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "OECD_View_BiofuelPolicy"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "commodityclass",
                                        "policytype",
                                        "country",
                                        "startDate",
                                        "endDate"
                                    ],
                                    "rows": {
                                        "commodityclass": {
                                            "codes": [
                                                {
                                                    "uid": "OECD_CommodityClass",
                                                    "version": "1.0",
                                                    "codes": [
                                                        "5",
                                                        "6",
                                                        "7"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                },
                            },
                            {
                                "name": "select",
                                "parameters": {
                                    "query": "WHERE (((startdate BETWEEN ? AND ?) OR (enddate BETWEEN ? AND ?))OR ((startdate <= ?) AND (enddate>=?)) OR (enddate IS NULL AND  startdate<=?))",
                                    "queryParameters": [
                                        {
                                            "value": 20110101
                                        },
                                        {
                                            "value": 20140131
                                        },
                                        {
                                            "value": 20110101
                                        },
                                        {
                                            "value": 20140131
                                        },
                                        {
                                            "value": 20110101
                                        },
                                        {
                                            "value": 20140131
                                        },
                                        {
                                            "value": 20140131
                                        }
                                    ]
                                },
                                "rid": {"uid" : "filter1"}                            },

                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "commodityclass",
                                        "policytype",
                                        "country"
                                    ],
                                    "aggregations": [

                                    ]
                                }
                            },
                            {
                                "name": "addcolumn",
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "VALUE0",
                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject":"value"
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "commodityclass",
                                        "policytype"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "VALUE0"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                },
                                "rid":{
                                    "uid":"final"
                                }
                            }
                        ]
                    }
                ]
            }]
        },

        "biofuelsPoliciesTimeSeriesGraph1": {

            dashboard: [{

                uid: "Policy_biofuelsPoliciesTimeSeriesGraph1",
                items: [
                    {
                        id: "biofuelsPoliciesTimeSeriesGraph-1_1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "highstock_series",
                            x: ["day"], //x axis and series
                            series: ["policytype"], //Y dimension
                            y: ["value"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},

                            config: {
                                chart: {
                                    borderWidth: 2,
                                    marginBottom: 200,
                                    spacingBottom: 50,
                                    events: {
                                        load: function(event) {
                                            // modify the legend symbol from a rect to a line
                                            $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            var label = this.renderer.label(biofuelsPoliciesType.notes.biofuelsPoliciesTimeSeriesGraph.first)
                                                .css({
                                                    width: '450px',
                                                    margin : '200px',
                                                    fontSize: '9px'
                                                })
                                                .attr({
                                                    'r': 5,
                                                    'padding': 50
                                                })
                                                .add();

                                            label.align(Highcharts.extend(label.getBBox(), {
                                                align: 'left',
                                                x: -40, // offset
                                                verticalAlign: 'bottom',
                                                y: 60 // offset
                                            }), null, 'spacingBox');
                                        }
                                    },
                                     height:600
                                },
                                colors: [
                                    '#125824',//Dark Green
                                    '#255ba3',//Dark Blue
                                    '#f6b539',//
                                    // Dark Yellow
                                    '#199e34',//Light Green
                                    '#7f7f7f',//Dark Gray
                                    '#67b7e3',//Light Blue
                                    '#dc3018'//Red
                                ],
                                rangeSelector: {
                                    enabled: true,
                                    inputDateFormat: '%d-%m-%Y',
                                    inputEditDateFormat: '%d-%m-%Y',
                                    inputDateParser: function (value) {
                                        value = value.split(/[-\.]/);
                                        var month = parseInt(value[1],10)-1;
                                        return Date.UTC(
                                            parseInt(value[2], 10),
                                            month,
                                            parseInt(value[0], 10)
                                        );
                                    }
                                },
                                xAxis : {
                                    min: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.min.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.min.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.min.day),
                                    max: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.max.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.max.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.max.day),
                                    floor: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.floor.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.floor.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.floor.day),
                                    ceiling: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.ceiling.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.ceiling.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.ceiling.day)
                                },
                                yAxis: {
                                    min: 0,
                                    allowDecimals: false,
                                    title: {
                                        text: biofuelsPoliciesType.title.biofuelsPoliciesTimeSeriesGraph.zero
                                    },
                                    opposite: false,
                                    labels: {
                                        formatter: function() {
                                            return this.value;
                                        }
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 2,
                                        color: 'silver'
                                    }]
                                },

                                plotOptions: {
                                    area:{
                                        dataGrouping: {
                                            enabled: false
                                        }
                                    },
                                    series: {
                                        events: {
                                            show: function () {
                                                $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            }
                                        }
                                    }
                                },

                                title : {
                                    text : biofuelsPoliciesType.title.biofuelsPoliciesTimeSeriesGraph.first,
                                    style: {"fontSize": "15px"},
                                    widthAdjust: -200
                                },

                                tooltip: {
                                    formatter: function () {
                                        var s = '<b>' + Highcharts.dateFormat('%B %Y', this.x) + '</b> <br/>';

                                        $.each(this.points, function (i,point) {

                                            s +='<span style="color:'+point.series.color+'">'+point.series.name+'</span>: '+Highcharts.numberFormat(point.y, 0) +'<br/>';

                                        });
                                        return s;
                                    }
                                },
                                legend: {
                                    title: {
                                        text: biofuelsPoliciesType.legend.biofuelsPoliciesFreqGraph.title,
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                    itemWidth: 200,
                                    layout: 'horizontal',
                                    align: 'center',
                                    margin: 90,
                                    y: -60,
                                    x:0,
                                    useHTML: true,
                                    enabled: true,
                                    borderColor: '#4572a7',
                                    labelFormatter: function() {
                                        var html_legend = ''+this.name;
                                        return html_legend;
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                exporting: {
                                    buttons: {
                                        contextButton: {
                                            enabled: false

                                        },
                                        exportButton: {
                                            theme: {
                                                "title": biofuelsPoliciesType.export.title,
                                                'stroke-width': 1,
                                                stroke: '#4572a7',
                                                fill:'#ADD8E6',
                                                r: 0,
                                                states: {
                                                    hover: {
                                                        fill: '#d3d3d3'
                                                    }
                                                }
                                            },
                                            text: biofuelsPoliciesType.export.title,
                                            menuItems: [
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.first,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                },
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                            }
                        }, // :type-creator config

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "OECD_Timeseries_BiofuelPolicy"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "commodityclass",
                                        "policytype",
                                        "policymeasure",
                                        "country",
                                        "day"
                                    ],
                                    "rows": {
                                        "commodityclass": {
                                            "codes": [
                                                {
                                                    "uid": "OECD_CommodityClass",
                                                    "version": "1.0",
                                                    "codes": [
                                                        "5","6","7"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policytype",
                                        "country"
                                    ],
                                    "aggregations": []
                                }
                            },
                            {
                                "name": "addcolumn",
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "value",

                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject":"value"
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policytype"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "value"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                }
                            }
                        ]
                    }]
            }]
        },

        "biofuelsPoliciesTimeSeriesGraph2": {

            dashboard: [{

                uid: "Policy_biofuelsPoliciesTimeSeriesGraph2",
                items: [
                    {
                        id: "biofuelsPoliciesTimeSeriesGraph-2_1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "highstock_series",
                            x: ["day"], //x axis and series
                            series: ["policytype"], //Y dimension
                            y: ["value"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},

                            config: {
                                chart: {
                                    borderWidth: 2,
                                    marginBottom: 200,
                                    spacingBottom: 50,
                                    events: {
                                        load: function(event) {
                                            // modify the legend symbol from a rect to a line
                                            $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            var label = this.renderer.label(biofuelsPoliciesType.notes.biofuelsPoliciesTimeSeriesGraph.second)
                                                .css({
                                                    width: '450px',
                                                    margin : '200px',
                                                    fontSize: '9px'
                                                })
                                                .attr({
                                                    'r': 5,
                                                    'padding': 50
                                                })
                                                .add();

                                            label.align(Highcharts.extend(label.getBBox(), {
                                                align: 'left',
                                                x: -40, // offset
                                                verticalAlign: 'bottom',
                                                y: 60 // offset
                                            }), null, 'spacingBox');
                                        }
                                    },
                                    height:600
                                },
                                colors: [
                                    '#125824',//Dark Green
                                    '#255ba3',//Dark Blue
                                    '#f6b539',//
                                    // Dark Yellow
                                    '#199e34',//Light Green
                                    '#7f7f7f',//Dark Gray
                                    '#67b7e3',//Light Blue
                                    '#dc3018'//Red
                                ],
                                rangeSelector: {
                                    enabled: true,
                                    inputDateFormat: '%d-%m-%Y',
                                    inputEditDateFormat: '%d-%m-%Y',
                                    inputDateParser: function (value) {
                                        value = value.split(/[-\.]/);
                                        var month = parseInt(value[1],10)-1;
                                        return Date.UTC(
                                            parseInt(value[2], 10),
                                            month,
                                            parseInt(value[0], 10)
                                        );
                                    }
                                },
                                xAxis : {
                                    min: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.min.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.min.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.min.day),
                                    max: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.max.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.max.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.max.day),
                                    floor: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.floor.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.floor.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.floor.day),
                                    ceiling: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.ceiling.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.ceiling.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.ceiling.day)
                                },
                                yAxis: {
                                    min: 0,
                                    allowDecimals: false,
                                    title: {
                                        text: biofuelsPoliciesType.title.biofuelsPoliciesTimeSeriesGraph.zero
                                    },
                                    opposite: false,
                                    labels: {
                                        formatter: function() {
                                            return this.value;
                                        }
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 2,
                                        color: 'silver'
                                    }]
                                },

                                plotOptions: {
                                    area:{
                                        dataGrouping: {
                                            enabled: false
                                        }
                                    },
                                    series: {
                                        events: {
                                            show: function () {
                                                $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            }
                                        }
                                    }
                                },

                                title : {
                                    text : biofuelsPoliciesType.title.biofuelsPoliciesTimeSeriesGraph.second,
                                    style: {"fontSize": "15px"},
                                    widthAdjust: -200
                                },

                                tooltip: {
                                    formatter: function () {
                                        var s = '<b>' + Highcharts.dateFormat('%B %Y', this.x) + '</b> <br/>';

                                        $.each(this.points, function (i,point) {

                                            s +='<span style="color:'+point.series.color+'">'+point.series.name+'</span>: '+Highcharts.numberFormat(point.y, 0) +'<br/>';

                                        });
                                        return s;
                                    }
                                },
                                legend: {
                                    title: {
                                        text: biofuelsPoliciesType.legend.biofuelsPoliciesFreqGraph.title,
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                    itemWidth: 200,
                                    layout: 'horizontal',
                                    align: 'center',
                                    margin: 90,
                                    y: -60,
                                    x:0,
                                    useHTML: true,
                                    enabled: true,
                                    borderColor: '#4572a7',
                                    labelFormatter: function() {
                                        var html_legend = ''+this.name;
                                        return html_legend;
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                exporting: {
                                    buttons: {
                                        contextButton: {
                                            enabled: false

                                        },
                                        exportButton: {
                                            theme: {
                                                "title": biofuelsPoliciesType.export.title,
                                                'stroke-width': 1,
                                                stroke: '#4572a7',
                                                fill:'#ADD8E6',
                                                r: 0,
                                                states: {
                                                    hover: {
                                                        fill: '#d3d3d3'
                                                    }
                                                }
                                            },
                                            text: biofuelsPoliciesType.export.title,
                                            menuItems: [
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.first,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                },
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                            }
                        }, // :type-creator config

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "OECD_Timeseries_BiofuelPolicy"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "commodityclass",
                                        "policytype",
                                        "policymeasure",
                                        "country",
                                        "day"
                                    ],
                                    "rows": {
                                        "commodityclass": {
                                            "codes": [
                                                {
                                                    "uid": "OECD_CommodityClass",
                                                    "version": "1.0",
                                                    "codes": [
                                                        "5","6","7"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policytype",
                                        "country"
                                    ],
                                    "aggregations": []
                                }
                            },
                            {
                                "name": "addcolumn",
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "value",

                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject":"value"
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policytype"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "value"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                }
                            }
                        ]
                    }]
            }]
        },

        "biofuelsPoliciesTimeSeriesGraph3": {

            dashboard: [{

                uid: "Policy_biofuelsPoliciesTimeSeriesGraph3",
                items: [
                    {
                        id: "biofuelsPoliciesTimeSeriesGraph-3_1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "highstock_series",
                            x: ["day"], //x axis and series
                            series: ["policytype"], //Y dimension
                            y: ["value"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},

                            config: {
                                chart: {
                                    borderWidth: 2,
                                    marginBottom: 200,
                                    spacingBottom: 50,
                                    events: {
                                        load: function(event) {
                                            // modify the legend symbol from a rect to a line
                                            $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            var label = this.renderer.label(biofuelsPoliciesType.notes.biofuelsPoliciesTimeSeriesGraph.third)
                                                .css({
                                                    width: '450px',
                                                    margin : '200px',
                                                    fontSize: '9px'
                                                })
                                                .attr({
                                                    'r': 5,
                                                    'padding': 50
                                                })
                                                .add();

                                            label.align(Highcharts.extend(label.getBBox(), {
                                                align: 'left',
                                                x: -40, // offset
                                                verticalAlign: 'bottom',
                                                y: 60 // offset
                                            }), null, 'spacingBox');
                                        }
                                    },
                                    height:600
                                },
                                colors: [
                                    '#125824',//Dark Green
                                    '#255ba3',//Dark Blue
                                    '#f6b539',//
                                    // Dark Yellow
                                    '#199e34',//Light Green
                                    '#7f7f7f',//Dark Gray
                                    '#67b7e3',//Light Blue
                                    '#dc3018'//Red
                                ],
                                rangeSelector: {
                                    enabled: true,
                                    inputDateFormat: '%d-%m-%Y',
                                    inputEditDateFormat: '%d-%m-%Y',
                                    inputDateParser: function (value) {
                                        value = value.split(/[-\.]/);
                                        var month = parseInt(value[1],10)-1;
                                        return Date.UTC(
                                            parseInt(value[2], 10),
                                            month,
                                            parseInt(value[0], 10)
                                        );
                                    }
                                },
                                xAxis : {
                                    min: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.min.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.min.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.min.day),
                                    max: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.max.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.max.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.max.day),
                                    floor: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.floor.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.floor.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.floor.day),
                                    ceiling: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.ceiling.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.ceiling.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.ceiling.day)
                                },
                                yAxis: {
                                    min: 0,
                                    allowDecimals: false,
                                    title: {
                                        text: biofuelsPoliciesType.title.biofuelsPoliciesTimeSeriesGraph.zero
                                    },
                                    opposite: false,
                                    labels: {
                                        formatter: function() {
                                            return this.value;
                                        }
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 2,
                                        color: 'silver'
                                    }]
                                },

                                plotOptions: {
                                    area:{
                                        dataGrouping: {
                                            enabled: false
                                        }
                                    },
                                    series: {
                                        events: {
                                            show: function () {
                                                $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            }
                                        }
                                    }
                                },

                                title : {
                                    text : biofuelsPoliciesType.title.biofuelsPoliciesTimeSeriesGraph.third,
                                    style: {"fontSize": "15px"},
                                    widthAdjust: -200
                                },

                                tooltip: {
                                    formatter: function () {
                                        var s = '<b>' + Highcharts.dateFormat('%B %Y', this.x) + '</b> <br/>';

                                        $.each(this.points, function (i,point) {

                                            s +='<span style="color:'+point.series.color+'">'+point.series.name+'</span>: '+Highcharts.numberFormat(point.y, 0) +'<br/>';

                                        });
                                        return s;
                                    }
                                },
                                legend: {
                                    title: {
                                        text: biofuelsPoliciesType.legend.biofuelsPoliciesFreqGraph.title,
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                    itemWidth: 200,
                                    layout: 'horizontal',
                                    align: 'center',
                                    margin: 90,
                                    y: -60,
                                    x:0,
                                    useHTML: true,
                                    enabled: true,
                                    borderColor: '#4572a7',
                                    labelFormatter: function() {
                                        var html_legend = ''+this.name;
                                        return html_legend;
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                exporting: {
                                    buttons: {
                                        contextButton: {
                                            enabled: false

                                        },
                                        exportButton: {
                                            theme: {
                                                "title": biofuelsPoliciesType.export.title,
                                                'stroke-width': 1,
                                                stroke: '#4572a7',
                                                fill:'#ADD8E6',
                                                r: 0,
                                                states: {
                                                    hover: {
                                                        fill: '#d3d3d3'
                                                    }
                                                }
                                            },
                                            text: biofuelsPoliciesType.export.title,
                                            menuItems: [
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.first,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                },
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                            }
                        }, // :type-creator config

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "OECD_Timeseries_BiofuelPolicy"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "commodityclass",
                                        "policytype",
                                        "policymeasure",
                                        "country",
                                        "day"
                                    ],
                                    "rows": {
                                        "commodityclass": {
                                            "codes": [
                                                {
                                                    "uid": "OECD_CommodityClass",
                                                    "version": "1.0",
                                                    "codes": [
                                                        "5","6","7"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policytype",
                                        "country"
                                    ],
                                    "aggregations": []
                                }
                            },
                            {
                                "name": "addcolumn",
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "value",

                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject":"value"
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policytype"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "value"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                }
                            }
                        ]
                    }]
            }]
        },

        "biofuelsPoliciesTimeSeriesGraph4": {

            dashboard: [{

                uid: "Policy_biofuelsPoliciesTimeSeriesGraph4",
                items: [
                    {
                        id: "biofuelsPoliciesTimeSeriesGraph-4_1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "highstock_series",
                            x: ["day"], //x axis and series
                            series: ["policytype"], //Y dimension
                            y: ["value"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},

                            config: {
                                chart: {
                                    borderWidth: 2,
                                    marginBottom: 200,
                                    spacingBottom: 50,
                                    events: {
                                        load: function(event) {
                                            // modify the legend symbol from a rect to a line
                                            $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            var label = this.renderer.label(biofuelsPoliciesType.notes.biofuelsPoliciesTimeSeriesGraph.fourth)
                                                .css({
                                                    width: '450px',
                                                    margin : '200px',
                                                    fontSize: '9px'
                                                })
                                                .attr({
                                                    'r': 5,
                                                    'padding': 50
                                                })
                                                .add();

                                            label.align(Highcharts.extend(label.getBBox(), {
                                                align: 'left',
                                                x: -40, // offset
                                                verticalAlign: 'bottom',
                                                y: 60 // offset
                                            }), null, 'spacingBox');
                                        }
                                    },
                                    height:600
                                },
                                colors: [
                                    '#125824',//Dark Green
                                    '#255ba3',//Dark Blue
                                    '#f6b539',//
                                    // Dark Yellow
                                    '#199e34',//Light Green
                                    '#7f7f7f',//Dark Gray
                                    '#67b7e3',//Light Blue
                                    '#dc3018'//Red
                                ],
                                rangeSelector: {
                                    enabled: true,
                                    inputDateFormat: '%d-%m-%Y',
                                    inputEditDateFormat: '%d-%m-%Y',
                                    inputDateParser: function (value) {
                                        value = value.split(/[-\.]/);
                                        var month = parseInt(value[1],10)-1;
                                        return Date.UTC(
                                            parseInt(value[2], 10),
                                            month,
                                            parseInt(value[0], 10)
                                        );
                                    }
                                },
                                xAxis : {
                                    min: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.min.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.min.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.min.day),
                                    max: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.max.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.max.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.max.day),
                                    floor: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.floor.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.floor.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.floor.day),
                                    ceiling: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.ceiling.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.ceiling.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.ceiling.day)
                                },
                                yAxis: {
                                    min: 0,
                                    allowDecimals: false,
                                    title: {
                                        text: biofuelsPoliciesType.title.biofuelsPoliciesTimeSeriesGraph.zero
                                    },
                                    opposite: false,
                                    labels: {
                                        formatter: function() {
                                            return this.value;
                                        }
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 2,
                                        color: 'silver'
                                    }]
                                },

                                plotOptions: {
                                    area:{
                                        dataGrouping: {
                                            enabled: false
                                        }
                                    },
                                    series: {
                                        events: {
                                            show: function () {
                                                $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            }
                                        }
                                    }
                                },

                                title : {
                                    text : biofuelsPoliciesType.title.biofuelsPoliciesTimeSeriesGraph.fourth,
                                    style: {"fontSize": "15px"},
                                    widthAdjust: -200
                                },

                                tooltip: {
                                    formatter: function () {
                                        var s = '<b>' + Highcharts.dateFormat('%B %Y', this.x) + '</b> <br/>';

                                        $.each(this.points, function (i,point) {

                                            s +='<span style="color:'+point.series.color+'">'+point.series.name+'</span>: '+Highcharts.numberFormat(point.y, 0) +'<br/>';

                                        });
                                        return s;
                                    }
                                },
                                legend: {
                                    title: {
                                        text: biofuelsPoliciesType.legend.biofuelsPoliciesFreqGraph.title,
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                    itemWidth: 200,
                                    layout: 'horizontal',
                                    align: 'center',
                                    margin: 90,
                                    y: -60,
                                    x:0,
                                    useHTML: true,
                                    enabled: true,
                                    borderColor: '#4572a7',
                                    labelFormatter: function() {
                                        var html_legend = ''+this.name;
                                        return html_legend;
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                exporting: {
                                    buttons: {
                                        contextButton: {
                                            enabled: false

                                        },
                                        exportButton: {
                                            theme: {
                                                "title": biofuelsPoliciesType.export.title,
                                                'stroke-width': 1,
                                                stroke: '#4572a7',
                                                fill:'#ADD8E6',
                                                r: 0,
                                                states: {
                                                    hover: {
                                                        fill: '#d3d3d3'
                                                    }
                                                }
                                            },
                                            text: biofuelsPoliciesType.export.title,
                                            menuItems: [
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.first,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                },
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesType.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                            }
                        }, // :type-creator config

                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "OECD_Timeseries_BiofuelPolicy"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "commodityclass",
                                        "policytype",
                                        "policymeasure",
                                        "country",
                                        "day"
                                    ],
                                    "rows": {
                                        "commodityclass": {
                                            "codes": [
                                                {
                                                    "uid": "OECD_CommodityClass",
                                                    "version": "1.0",
                                                    "codes": [
                                                        "5","6","7"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policytype",
                                        "country"
                                    ],
                                    "aggregations": []
                                }
                            },
                            {
                                "name": "addcolumn",
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "value",

                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject":"value"
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policytype"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "value"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                }
                            }
                        ]
                    }]
            }]
        },

        "biofuelsPoliciesDownload": {

            dashboard: [{

                uid: "Policy_biofuelsPoliciesDownload",
                items: [
                    {
                        id: "biofuelsPoliciesDownload-1" //ref [data-item=':id']
                        //type: "chart", //chart || map || olap,
                        //postProcess
                    }
                ]
            }]
        },

        "biofuelsPoliciesDetailedFreqGraph": {

            filter: {

                Year: {

                    //className: 'col-md-10',

                    selector: {
                        id: "range",
                        format : "YYYYMMDD",
                        config: {
                            type: "double",
                            min: +moment(filter.biofuelsPoliciesType.year.min).format("X"),
                            max: +moment(filter.biofuelsPoliciesType.year.max).format("X"),
                            from: +moment(filter.biofuelsPoliciesType.year.from).format("X"),
                            to: +moment(filter.biofuelsPoliciesType.year.to).format("X"),
                            prettify: function (num) {
                                return moment(num, "X").format("MM/YYYY");
                            }
                        }
                    },

                    template: {
                        title: "Double Range",
                        hideSwitch: true,
                        hideRemoveButton: true
                    }
                },
                policyType: {

                    selector: {
                        id: "dropdown",
                        source: [
                            {value: "8", label: "Biofuel targets"},
                            {value: "10", label: "Domestic price regulation"},
                            {value: "1", label: "Export measures"},
                            {value: "2", label: "Import measures"},
                            {value: "12", label: "Production measures"},
                            {value: "9", label: "Tax concessions"}
                        ],
                        default:["8"],
                        config : {
                            placeholder: "Please select a Policy Type",
                            maxItems: 1
                        }
                    },

                    template: {
                        title: "Policy Type"
                    }
                }

            },
            dashboard: [{

                uid: "Policy_biofuelsPoliciesDetailedFreqGraph",
                items: [
                    {
                        id: "biofuelsPoliciesDetailedFreqGraph-1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["commodityclass"], //x axis and series
                            series: ["policymeasure"], //Y dimension
                            y: ["VALUE0"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},
                            config: {
                                "chart": {
                                    "borderWidth": 2,
                                    "marginBottom": 170,
                                    events: {
                                        load: function () {
                                            var label = this.renderer.label(biofuelsPoliciesDetailed.notes.biofuelsPoliciesFreqGraph.second)
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
                                    },
                                    "spacingBottom": 50
                                },
                                "title": {
                                    "text": biofuelsPoliciesDetailed.title.biofuelsPoliciesFreqGraph.first,
                                    "style": {"fontSize": "15px"}
                                },
                                "subtitle": {"text": biofuelsPoliciesDetailed.subtitle.biofuelsPoliciesFreqGraph.first},
                                "colors": ["#125824", "#255ba3", "#f6b539", "#199e34", "#7f7f7f", "#67b7e3", "#dc3018"],
                                //"xAxis": {"categories": ["Ethanol", "Biodiesel", "Biofuel (unspecified)"]},
                                "yAxis": {
                                    "min": 0,
                                    "allowDecimals": false,
                                    "title": {"text": biofuelsPoliciesDetailed.title.biofuelsPoliciesFreqGraph.zero, enabled: true}
                                },
                                "tooltip": {
                                    "headerFormat": "<span style=\"font-size:10px\">{point.key}</span><table>",
                                    "pointFormat": "<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td><td style=\"padding:0\"><b>{point.y}</b></td></tr>",
                                    "footerFormat": "</table>",
                                    "shared": true,
                                    "useHTML": true
                                },
                                "credits": {"enabled": false},
                                "plotOptions": {"column": {"pointPadding": 0.2, "borderWidth": 0}},
                                "legend": {
                                    "title": {"text": biofuelsPoliciesDetailed.legend.biofuelsPoliciesFreqGraph.title, "style": {"fontWeight": "bold"}},
                                    "itemWidth": 200,
                                    //"verticalAlign": "center",
                                    "layout": "horizontal",
                                    "align": "center",
                                    "y": -30, // Posizionamento in verticale della legenda
                                    "x": 0,
                                    "useHTML": true,
                                    "enabled": true,
                                    "borderColor": "#4572a7",
                                    "itemStyle": {"fontSize": "10px"}
                                },
                                "exporting": {
                                    "buttons": {
                                        "contextButton": {"enabled": false},
                                        "exportButton": {
                                            "theme": {
                                                "title": biofuelsPoliciesDetailed.export.title,
                                                "stroke-width": 1,
                                                "stroke": "#4572a7",
                                                "fill": "#ADD8E6",
                                                "r": 0,
                                                "states": {"hover": {"fill": "#d3d3d3"}}
                                            },
                                            "text": "Download",
                                            "menuItems": [
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.first,
                                                    onclick: function () {

                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                },
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                },
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                },
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }, // :type-creator config
                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "OECD_View_BiofuelPolicy"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "commodityclass",
                                        "policymeasure",
                                        "country",
                                        "startDate",
                                        "endDate"
                                    ],
                                    "rows": {
                                        "commodityclass": {
                                            "codes": [
                                                {
                                                    "uid": "OECD_CommodityClass",
                                                    "version": "1.0",
                                                    "codes": [
                                                        "5",
                                                        "6",
                                                        "7"
                                                    ]
                                                }
                                            ]
                                        },
                                        "policytype": {
                                            "codes": [
                                                {
                                                    "uid" : "OECD_PolicyType",
                                                    "version" : "1.0",
                                                    "codes": [
                                                        "8"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                "name": "select",
                                "parameters": {
                                    "query": "WHERE (((startdate BETWEEN ? AND ?) OR (enddate BETWEEN ? AND ?))OR ((startdate <= ?) AND (enddate>=?)) OR (enddate IS NULL AND  startdate<=?))",
                                    "queryParameters": [
                                        {
                                            "value": 20110101
                                        },
                                        {
                                            "value": 20140131
                                        },
                                        {
                                            "value": 20110101
                                        },
                                        {
                                            "value": 20140131
                                        },
                                        {
                                            "value": 20110101
                                        },
                                        {
                                            "value": 20140131
                                        },
                                        {
                                            "value": 20140131
                                        }
                                    ]
                                }
                            },

                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "commodityclass",
                                        "policymeasure",
                                        "country"
                                    ],
                                    "aggregations": [

                                    ]
                                }
                            },
                            {
                                "name": "addcolumn",
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "VALUE0",
                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject": null
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "commodityclass",
                                        "policymeasure"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "VALUE0"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                },
                                "rid":{
                                    "uid":"final"
                                }
                            }
                        ]
                    }
                ]
            }]
        },

        "biofuelsPoliciesDetailedTimeSeriesGraph1": {

            filter: {
                policyType: {

                    selector: {
                        id: "dropdown",
                        title: "Policy Type",
                        source: [
                            {value: "8", label: "Biofuel targets"},
                            {value: "10", label: "Domestic price regulation"},
                            {value: "1", label: "Export measures"},
                            {value: "2", label: "Import measures"},
                            {value: "12", label: "Production measures"},
                            {value: "9", label: "Tax concessions"}
                        ],
                        default:["8"],
                        config : {
                            placeholder: "Please select a Policy Type",
                            maxItems: 1
                        }
                    },

                    template: {
                        title: "Policy Type"
                    }
                }
            },

            dashboard: [{

                uid: "Policy_biofuelsPoliciesDetailedTimeSeriesGraph1",
                items: [
                    {
                        id: "biofuelsPoliciesDetailedTimeSeriesGraph-1_1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "highstock_series",
                            x: ["day"], //x axis and series
                            series: ["policymeasure"], //Y dimension
                            y: ["value"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},

                            config: {
                                chart: {
                                    borderWidth: 2,
                                    marginBottom: 200,
                                    spacingBottom: 50,
                                    events: {
                                        load: function(event) {
                                            // modify the legend symbol from a rect to a line
                                            $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            var label = this.renderer.label(biofuelsPoliciesDetailed.notes.biofuelsPoliciesTimeSeriesGraph.first)
                                                .css({
                                                    width: '450px',
                                                    margin : '200px',
                                                    fontSize: '9px'
                                                })
                                                .attr({
                                                    'r': 5,
                                                    'padding': 50
                                                })
                                                .add();

                                            label.align(Highcharts.extend(label.getBBox(), {
                                                align: 'left',
                                                x: -40, // offset
                                                verticalAlign: 'bottom',
                                                y: 60 // offset
                                            }), null, 'spacingBox');
                                        }
                                    },
                                    height:600
                                },
                                colors: [
                                    '#125824',//Dark Green
                                    '#255ba3',//Dark Blue
                                    '#f6b539',//
                                    // Dark Yellow
                                    '#199e34',//Light Green
                                    '#7f7f7f',//Dark Gray
                                    '#67b7e3',//Light Blue
                                    '#dc3018'//Red
                                ],
                                rangeSelector: {
                                    enabled: true,
                                    inputDateFormat: '%d-%m-%Y',
                                    inputEditDateFormat: '%d-%m-%Y',
                                    inputDateParser: function (value) {
                                        value = value.split(/[-\.]/);
                                        var month = parseInt(value[1],10)-1;
                                        return Date.UTC(
                                            parseInt(value[2], 10),
                                            month,
                                            parseInt(value[0], 10)
                                        );
                                    }
                                },
                                xAxis : {
                                    min: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.min.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.min.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.min.day),
                                    max: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.max.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.max.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.max.day),
                                    floor: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.floor.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.floor.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.floor.day),
                                    ceiling: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.ceiling.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.ceiling.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.ceiling.day)
                                },
                                yAxis: {
                                    min: 0,
                                    allowDecimals: false,
                                    title: {
                                        text: biofuelsPoliciesDetailed.title.biofuelsPoliciesTimeSeriesGraph.zero
                                    },
                                    opposite: false,
                                    labels: {
                                        formatter: function() {
                                            return this.value;
                                        }
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 2,
                                        color: 'silver'
                                    }]
                                },

                                plotOptions: {
                                    area:{
                                        dataGrouping: {
                                            enabled: false
                                        }
                                    },
                                    series: {
                                        events: {
                                            show: function () {
                                                $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            }
                                        }
                                    }
                                },

                                title : {
                                    text : biofuelsPoliciesDetailed.title.biofuelsPoliciesTimeSeriesGraph.first,
                                    style: {"fontSize": "15px"},
                                    widthAdjust: -200
                                },

                                tooltip: {
                                    formatter: function () {
                                        var s = '<b>' + Highcharts.dateFormat('%B %Y', this.x) + '</b> <br/>';

                                        $.each(this.points, function (i,point) {

                                            s +='<span style="color:'+point.series.color+'">'+point.series.name+'</span>: '+Highcharts.numberFormat(point.y, 0) +'<br/>';

                                        });
                                        return s;
                                    }
                                },
                                legend: {
                                    title: {
                                        text: biofuelsPoliciesDetailed.legend.biofuelsPoliciesFreqGraph.title,
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                    itemWidth: 200,
                                    layout: 'horizontal',
                                    align: 'center',
                                    margin: 90,
                                    y: -60,
                                    x:0,
                                    useHTML: true,
                                    enabled: true,
                                    borderColor: '#4572a7',
                                    labelFormatter: function() {
                                        var html_legend = ''+this.name;
                                        return html_legend;
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                exporting: {
                                    buttons: {
                                        contextButton: {
                                            enabled: false

                                        },
                                        exportButton: {
                                            theme: {
                                                "title": biofuelsPoliciesDetailed.export.title,
                                                'stroke-width': 1,
                                                stroke: '#4572a7',
                                                fill:'#ADD8E6',
                                                r: 0,
                                                states: {
                                                    hover: {
                                                        fill: '#d3d3d3'
                                                    }
                                                }
                                            },
                                            text: biofuelsPoliciesDetailed.export.title,
                                            menuItems: [
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.first,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                },
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                            }
                        }, // :type-creator config
                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "OECD_Timeseries_BiofuelPolicy"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "commodityclass",
                                        "policytype",
                                        "policymeasure",
                                        "country",
                                        "day"
                                    ],
                                    "rows": {
                                        "commodityclass": {
                                            "codes": [
                                                {
                                                    "uid": "OECD_CommodityClass",
                                                    "version": "1.0",
                                                    "codes": [
                                                        "5"
                                                    ]
                                                }
                                            ]
                                        },
                                        "policytype": {
                                            "codes": [
                                                {
                                                    "uid" : "OECD_PolicyType",
                                                    "version" : "1.0",
                                                    "codes": [
                                                        "8"
                                                    ]
                                                }
                                            ]
                                        }

                                    }
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure",
                                        "country"
                                    ],
                                    "aggregations": []
                                }
                            },
                            {
                                "name": "addcolumn",
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "value",
                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject": null
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "value"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                }
                            }
                        ]
                    }]
            }]
        },

        "biofuelsPoliciesDetailedTimeSeriesGraph2": {

            filter: {
                policyType: {

                    selector: {
                        id: "dropdown",
                        title: "Policy Type",
                        source: [
                            {value: "8", label: "Biofuel targets"},
                            {value: "10", label: "Domestic price regulation"},
                            {value: "1", label: "Export measures"},
                            {value: "2", label: "Import measures"},
                            {value: "12", label: "Production measures"},
                            {value: "9", label: "Tax concessions"}
                        ],
                        default:["8"],
                        config : {
                            placeholder: "Please select a Policy Type",
                            maxItems: 1
                        }
                    },

                    template: {
                        title: "Policy Type"
                    }
                }
            },

            dashboard: [{

                uid: "Policy_biofuelsPoliciesDetailedTimeSeriesGraph2",
                items: [
                    {
                        id: "biofuelsPoliciesDetailedTimeSeriesGraph-2_1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "highstock_series",
                            x: ["day"], //x axis and series
                            series: ["policymeasure"], //Y dimension
                            y: ["value"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},

                            config: {
                                chart: {
                                    borderWidth: 2,
                                    marginBottom: 200,
                                    spacingBottom: 50,
                                    events: {
                                        load: function(event) {
                                            // modify the legend symbol from a rect to a line
                                            $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            var label = this.renderer.label(biofuelsPoliciesDetailed.notes.biofuelsPoliciesTimeSeriesGraph.first)
                                                .css({
                                                    width: '450px',
                                                    margin : '200px',
                                                    fontSize: '9px'
                                                })
                                                .attr({
                                                    'r': 5,
                                                    'padding': 50
                                                })
                                                .add();

                                            label.align(Highcharts.extend(label.getBBox(), {
                                                align: 'left',
                                                x: -40, // offset
                                                verticalAlign: 'bottom',
                                                y: 60 // offset
                                            }), null, 'spacingBox');
                                        }
                                    },
                                    height:600
                                },
                                colors: [
                                    '#125824',//Dark Green
                                    '#255ba3',//Dark Blue
                                    '#f6b539',//
                                    // Dark Yellow
                                    '#199e34',//Light Green
                                    '#7f7f7f',//Dark Gray
                                    '#67b7e3',//Light Blue
                                    '#dc3018'//Red
                                ],
                                rangeSelector: {
                                    enabled: true,
                                    inputDateFormat: '%d-%m-%Y',
                                    inputEditDateFormat: '%d-%m-%Y',
                                    inputDateParser: function (value) {
                                        value = value.split(/[-\.]/);
                                        var month = parseInt(value[1],10)-1;
                                        return Date.UTC(
                                            parseInt(value[2], 10),
                                            month,
                                            parseInt(value[0], 10)
                                        );
                                    }
                                },
                                xAxis : {
                                    min: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.min.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.min.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.min.day),
                                    max: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.max.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.max.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.max.day),
                                    floor: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.floor.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.floor.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.floor.day),
                                    ceiling: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.ceiling.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.ceiling.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.ceiling.day)
                                },
                                yAxis: {
                                    min: 0,
                                    allowDecimals: false,
                                    title: {
                                        text: biofuelsPoliciesDetailed.title.biofuelsPoliciesTimeSeriesGraph.zero
                                    },
                                    opposite: false,
                                    labels: {
                                        formatter: function() {
                                            return this.value;
                                        }
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 2,
                                        color: 'silver'
                                    }]
                                },

                                plotOptions: {
                                    area:{
                                        dataGrouping: {
                                            enabled: false
                                        }
                                    },
                                    series: {
                                        events: {
                                            show: function () {
                                                $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            }
                                        }
                                    }
                                },

                                title : {
                                    text : biofuelsPoliciesDetailed.title.biofuelsPoliciesTimeSeriesGraph.first,
                                    style: {"fontSize": "15px"},
                                    widthAdjust: -200
                                },

                                tooltip: {
                                    formatter: function () {
                                        var s = '<b>' + Highcharts.dateFormat('%B %Y', this.x) + '</b> <br/>';

                                        $.each(this.points, function (i,point) {

                                            s +='<span style="color:'+point.series.color+'">'+point.series.name+'</span>: '+Highcharts.numberFormat(point.y, 0) +'<br/>';

                                        });
                                        return s;
                                    }
                                },
                                legend: {
                                    title: {
                                        text: biofuelsPoliciesDetailed.legend.biofuelsPoliciesFreqGraph.title,
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                    itemWidth: 200,
                                    layout: 'horizontal',
                                    align: 'center',
                                    margin: 90,
                                    y: -60,
                                    x:0,
                                    useHTML: true,
                                    enabled: true,
                                    borderColor: '#4572a7',
                                    labelFormatter: function() {
                                        var html_legend = ''+this.name;
                                        return html_legend;
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                exporting: {
                                    buttons: {
                                        contextButton: {
                                            enabled: false

                                        },
                                        exportButton: {
                                            theme: {
                                                "title": biofuelsPoliciesDetailed.export.title,
                                                'stroke-width': 1,
                                                stroke: '#4572a7',
                                                fill:'#ADD8E6',
                                                r: 0,
                                                states: {
                                                    hover: {
                                                        fill: '#d3d3d3'
                                                    }
                                                }
                                            },
                                            text: biofuelsPoliciesDetailed.export.title,
                                            menuItems: [
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.first,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                },
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                            }
                        }, // :type-creator config
                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "OECD_Timeseries_BiofuelPolicy"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "commodityclass",
                                        "policytype",
                                        "policymeasure",
                                        "country",
                                        "day"
                                    ],
                                    "rows": {
                                        "commodityclass": {
                                            "codes": [
                                                {
                                                    "uid": "OECD_CommodityClass",
                                                    "version": "1.0",
                                                    "codes": [
                                                        "6"
                                                    ]
                                                }
                                            ]
                                        },
                                        "policytype": {
                                            "codes": [
                                                {
                                                    "uid" : "OECD_PolicyType",
                                                    "version" : "1.0",
                                                    "codes": [
                                                        "8"
                                                    ]
                                                }
                                            ]
                                        }

                                    }
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure",
                                        "country"
                                    ],
                                    "aggregations": []
                                }
                            },
                            {
                                "name": "addcolumn",
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "value",
                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject": null
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "value"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                }
                            }
                        ]
                    }]
            }]
        },

        "biofuelsPoliciesDetailedTimeSeriesGraph3": {

            filter: {
                policyType: {

                    selector: {
                        id: "dropdown",
                        title: "Policy Type",
                        source: [
                            {value: "8", label: "Biofuel targets"},
                            {value: "10", label: "Domestic price regulation"},
                            {value: "1", label: "Export measures"},
                            {value: "2", label: "Import measures"},
                            {value: "12", label: "Production measures"},
                            {value: "9", label: "Tax concessions"}
                        ],
                        default:["8"],
                        config : {
                            placeholder: "Please select a Policy Type",
                            maxItems: 1
                        }
                    },

                    template: {
                        title: "Policy Type"
                    }
                }
            },

            dashboard: [{

                uid: "Policy_biofuelsPoliciesDetailedTimeSeriesGraph3",
                items: [
                    {
                        id: "biofuelsPoliciesDetailedTimeSeriesGraph-3_1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "highstock_series",
                            x: ["day"], //x axis and series
                            series: ["policymeasure"], //Y dimension
                            y: ["value"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},

                            config: {
                                chart: {
                                    borderWidth: 2,
                                    marginBottom: 200,
                                    spacingBottom: 50,
                                    events: {
                                        load: function(event) {
                                            // modify the legend symbol from a rect to a line
                                            $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            var label = this.renderer.label(biofuelsPoliciesDetailed.notes.biofuelsPoliciesTimeSeriesGraph.first)
                                                .css({
                                                    width: '450px',
                                                    margin : '200px',
                                                    fontSize: '9px'
                                                })
                                                .attr({
                                                    'r': 5,
                                                    'padding': 50
                                                })
                                                .add();

                                            label.align(Highcharts.extend(label.getBBox(), {
                                                align: 'left',
                                                x: -40, // offset
                                                verticalAlign: 'bottom',
                                                y: 60 // offset
                                            }), null, 'spacingBox');
                                        }
                                    },
                                    height:600
                                },
                                colors: [
                                    '#125824',//Dark Green
                                    '#255ba3',//Dark Blue
                                    '#f6b539',//
                                    // Dark Yellow
                                    '#199e34',//Light Green
                                    '#7f7f7f',//Dark Gray
                                    '#67b7e3',//Light Blue
                                    '#dc3018'//Red
                                ],
                                rangeSelector: {
                                    enabled: true,
                                    inputDateFormat: '%d-%m-%Y',
                                    inputEditDateFormat: '%d-%m-%Y',
                                    inputDateParser: function (value) {
                                        value = value.split(/[-\.]/);
                                        var month = parseInt(value[1],10)-1;
                                        return Date.UTC(
                                            parseInt(value[2], 10),
                                            month,
                                            parseInt(value[0], 10)
                                        );
                                    }
                                },
                                xAxis : {
                                    min: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.min.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.min.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.min.day),
                                    max: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.max.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.max.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.max.day),
                                    floor: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.floor.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.floor.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.floor.day),
                                    ceiling: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.ceiling.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.ceiling.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.ceiling.day)
                                },
                                yAxis: {
                                    min: 0,
                                    allowDecimals: false,
                                    title: {
                                        text: biofuelsPoliciesDetailed.title.biofuelsPoliciesTimeSeriesGraph.zero
                                    },
                                    opposite: false,
                                    labels: {
                                        formatter: function() {
                                            return this.value;
                                        }
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 2,
                                        color: 'silver'
                                    }]
                                },

                                plotOptions: {
                                    area:{
                                        dataGrouping: {
                                            enabled: false
                                        }
                                    },
                                    series: {
                                        events: {
                                            show: function () {
                                                $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            }
                                        }
                                    }
                                },

                                title : {
                                    text : biofuelsPoliciesDetailed.title.biofuelsPoliciesTimeSeriesGraph.first,
                                    style: {"fontSize": "15px"},
                                    widthAdjust: -200
                                },

                                tooltip: {
                                    formatter: function () {
                                        var s = '<b>' + Highcharts.dateFormat('%B %Y', this.x) + '</b> <br/>';

                                        $.each(this.points, function (i,point) {

                                            s +='<span style="color:'+point.series.color+'">'+point.series.name+'</span>: '+Highcharts.numberFormat(point.y, 0) +'<br/>';

                                        });
                                        return s;
                                    }
                                },
                                legend: {
                                    title: {
                                        text: biofuelsPoliciesDetailed.legend.biofuelsPoliciesFreqGraph.title,
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                    itemWidth: 200,
                                    layout: 'horizontal',
                                    align: 'center',
                                    margin: 90,
                                    y: -60,
                                    x:0,
                                    useHTML: true,
                                    enabled: true,
                                    borderColor: '#4572a7',
                                    labelFormatter: function() {
                                        var html_legend = ''+this.name;
                                        return html_legend;
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                exporting: {
                                    buttons: {
                                        contextButton: {
                                            enabled: false

                                        },
                                        exportButton: {
                                            theme: {
                                                "title": biofuelsPoliciesDetailed.export.title,
                                                'stroke-width': 1,
                                                stroke: '#4572a7',
                                                fill:'#ADD8E6',
                                                r: 0,
                                                states: {
                                                    hover: {
                                                        fill: '#d3d3d3'
                                                    }
                                                }
                                            },
                                            text: biofuelsPoliciesDetailed.export.title,
                                            menuItems: [
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.first,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                },
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                            }
                        }, // :type-creator config
                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "OECD_Timeseries_BiofuelPolicy"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "commodityclass",
                                        "policytype",
                                        "policymeasure",
                                        "country",
                                        "day"
                                    ],
                                    "rows": {
                                        "commodityclass": {
                                            "codes": [
                                                {
                                                    "uid": "OECD_CommodityClass",
                                                    "version": "1.0",
                                                    "codes": [
                                                        "7"
                                                    ]
                                                }
                                            ]
                                        },
                                        "policytype": {
                                            "codes": [
                                                {
                                                    "uid" : "OECD_PolicyType",
                                                    "version" : "1.0",
                                                    "codes": [
                                                        "8"
                                                    ]
                                                }
                                            ]
                                        }

                                    }
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure",
                                        "country"
                                    ],
                                    "aggregations": []
                                }
                            },
                            {
                                "name": "addcolumn",
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "value",
                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject": null
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "value"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                }
                            }
                        ]
                    }]
            }]
        },

        "biofuelsPoliciesDetailedTimeSeriesGraph4": {

            filter: {
                policyType: {

                    selector: {
                        id: "dropdown",
                        title: "Policy Type",
                        source: [
                            {value: "8", label: "Biofuel targets"},
                            {value: "10", label: "Domestic price regulation"},
                            {value: "1", label: "Export measures"},
                            {value: "2", label: "Import measures"},
                            {value: "12", label: "Production measures"},
                            {value: "9", label: "Tax concessions"}
                        ],
                        default:["8"],
                        config : {
                            placeholder: "Please select a Policy Type",
                            maxItems: 1
                        }
                    },

                    template: {
                        title: "Policy Type"
                    }
                }
            },

            dashboard: [{

                uid: "Policy_biofuelsPoliciesDetailedTimeSeriesGraph4",
                items: [
                    {
                        id: "biofuelsPoliciesDetailedTimeSeriesGraph-4_1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "highstock_series",
                            x: ["day"], //x axis and series
                            series: ["policymeasure"], //Y dimension
                            y: ["value"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},

                            config: {
                                chart: {
                                    borderWidth: 2,
                                    marginBottom: 200,
                                    spacingBottom: 50,
                                    events: {
                                        load: function(event) {
                                            // modify the legend symbol from a rect to a line
                                            $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            var label = this.renderer.label(biofuelsPoliciesDetailed.notes.biofuelsPoliciesTimeSeriesGraph.first)
                                                .css({
                                                    width: '450px',
                                                    margin : '200px',
                                                    fontSize: '9px'
                                                })
                                                .attr({
                                                    'r': 5,
                                                    'padding': 50
                                                })
                                                .add();

                                            label.align(Highcharts.extend(label.getBBox(), {
                                                align: 'left',
                                                x: -40, // offset
                                                verticalAlign: 'bottom',
                                                y: 60 // offset
                                            }), null, 'spacingBox');
                                        }
                                    },
                                    height:600
                                },
                                colors: [
                                    '#125824',//Dark Green
                                    '#255ba3',//Dark Blue
                                    '#f6b539',//
                                    // Dark Yellow
                                    '#199e34',//Light Green
                                    '#7f7f7f',//Dark Gray
                                    '#67b7e3',//Light Blue
                                    '#dc3018'//Red
                                ],
                                rangeSelector: {
                                    enabled: true,
                                    inputDateFormat: '%d-%m-%Y',
                                    inputEditDateFormat: '%d-%m-%Y',
                                    inputDateParser: function (value) {
                                        value = value.split(/[-\.]/);
                                        var month = parseInt(value[1],10)-1;
                                        return Date.UTC(
                                            parseInt(value[2], 10),
                                            month,
                                            parseInt(value[0], 10)
                                        );
                                    }
                                },
                                xAxis : {
                                    min: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.min.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.min.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.min.day),
                                    max: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.max.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.max.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.max.day),
                                    floor: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.floor.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.floor.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.floor.day),
                                    ceiling: Date.UTC(biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.ceiling.year,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.ceiling.month,biofuelsPoliciesDetailed.time.biofuelsPoliciesTimeSeriesGraph.ceiling.day)
                                },
                                yAxis: {
                                    min: 0,
                                    allowDecimals: false,
                                    title: {
                                        text: biofuelsPoliciesDetailed.title.biofuelsPoliciesTimeSeriesGraph.zero
                                    },
                                    opposite: false,
                                    labels: {
                                        formatter: function() {
                                            return this.value;
                                        }
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 2,
                                        color: 'silver'
                                    }]
                                },

                                plotOptions: {
                                    area:{
                                        dataGrouping: {
                                            enabled: false
                                        }
                                    },
                                    series: {
                                        events: {
                                            show: function () {
                                                $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            }
                                        }
                                    }
                                },

                                title : {
                                    text : biofuelsPoliciesDetailed.title.biofuelsPoliciesTimeSeriesGraph.first,
                                    style: {"fontSize": "15px"},
                                    widthAdjust: -200
                                },

                                tooltip: {
                                    formatter: function () {
                                        var s = '<b>' + Highcharts.dateFormat('%B %Y', this.x) + '</b> <br/>';

                                        $.each(this.points, function (i,point) {

                                            s +='<span style="color:'+point.series.color+'">'+point.series.name+'</span>: '+Highcharts.numberFormat(point.y, 0) +'<br/>';

                                        });
                                        return s;
                                    }
                                },
                                legend: {
                                    title: {
                                        text: biofuelsPoliciesDetailed.legend.biofuelsPoliciesFreqGraph.title,
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                    itemWidth: 200,
                                    layout: 'horizontal',
                                    align: 'center',
                                    margin: 90,
                                    y: -60,
                                    x:0,
                                    useHTML: true,
                                    enabled: true,
                                    borderColor: '#4572a7',
                                    labelFormatter: function() {
                                        var html_legend = ''+this.name;
                                        return html_legend;
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                exporting: {
                                    buttons: {
                                        contextButton: {
                                            enabled: false

                                        },
                                        exportButton: {
                                            theme: {
                                                "title": biofuelsPoliciesDetailed.export.title,
                                                'stroke-width': 1,
                                                stroke: '#4572a7',
                                                fill:'#ADD8E6',
                                                r: 0,
                                                states: {
                                                    hover: {
                                                        fill: '#d3d3d3'
                                                    }
                                                }
                                            },
                                            text: biofuelsPoliciesDetailed.export.title,
                                            menuItems: [
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.first,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                },
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: biofuelsPoliciesDetailed.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: biofuelsPoliciesDetailed.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                            }
                        }, // :type-creator config
                        postProcess: [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "OECD_Timeseries_BiofuelPolicy"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "commodityclass",
                                        "policytype",
                                        "policymeasure",
                                        "country",
                                        "day"
                                    ],
                                    "rows": {
                                        "commodityclass": {
                                            "codes": [
                                                {
                                                    "uid": "OECD_CommodityClass",
                                                    "version": "1.0",
                                                    "codes": [
                                                        "5","6","7"
                                                    ]
                                                }
                                            ]
                                        },
                                        "policytype": {
                                            "codes": [
                                                {
                                                    "uid" : "OECD_PolicyType",
                                                    "version" : "1.0",
                                                    "codes": [
                                                        "8"
                                                    ]
                                                }
                                            ]
                                        }

                                    }
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure",
                                        "country"
                                    ],
                                    "aggregations": []
                                }
                            },
                            {
                                "name": "addcolumn",
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "value",
                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject": null
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "value"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                }
                            }
                        ]
                    }]
            }]
        },

        "biofuelsPoliciesDetailedDownload": {

            dashboard: [{

                uid: "Policy_biofuelsPoliciesDetailedDownload",
                items: [
                    {
                        id: "biofuelsPoliciesDetailedDownload-1" //ref [data-item=':id']
                        //type: "chart", //chart || map || olap,
                        //postProcess
                    }
                ]
            }]
        },

        "importTariffsGraph": {

            dashboard: [{

                uid: "Policy_importTariffsGraph",
                items: [
                    {
                        id: "importTariffsGraph-1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["year"], //x axis and series
                            series: ["commodityclass", "policyelement"], //Y dimension
                            y: ["value"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            //aggregationFn: {"value": "sum"},
                            config: {
                                "chart": {
                                    "borderWidth": 2,
                                    "marginBottom": 170,
                                    events: {
                                        load: function () {
                                            var label = this.renderer.label(importTariffs.notes.importTariffsFreqGraph.first)
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
                                    },
                                    "spacingBottom": 50
                                },
                                "title": {
                                    "text": importTariffs.title.importTariffsFreqGraph.first,
                                    "style": {"fontSize": "15px"}
                                },
                                "subtitle": {"text": importTariffs.subtitle.importTariffsFreqGraph.first},
                                "colors": ["#125824", "#255ba3", "#f6b539", "#199e34", "#7f7f7f", "#67b7e3", "#dc3018"],
                                //"xAxis": {"categories": ["Ethanol", "Biodiesel", "Biofuel (unspecified)"]},
                                "yAxis": {
                                    "min": 0,
                                    "allowDecimals": false,
                                    "title": {"text": importTariffs.title.importTariffsFreqGraph.zero, enabled: true}
                                },
                                "tooltip": {
                                    "headerFormat": "<span style=\"font-size:10px\">{point.key}</span><table>",
                                    "pointFormat": "<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td><td style=\"padding:0\"><b>{point.y}</b></td></tr>",
                                    "footerFormat": "</table>",
                                    "shared": true,
                                    "useHTML": true
                                },
                                "credits": {"enabled": false},
                                "plotOptions": {"column": {"pointPadding": 0.2, "borderWidth": 0}},
                                "legend": {
                                    "title": {"text": importTariffs.legend.importTariffsFreqGraph.title, "style": {"fontWeight": "bold"}},
                                    "itemWidth": 200,
                                    //"verticalAlign": "center",
                                    "layout": "horizontal",
                                    "align": "center",
                                    "y": -30, // Posizionamento in verticale della legenda
                                    "x": 0,
                                    "useHTML": true,
                                    "enabled": true,
                                    "borderColor": "#4572a7",
                                    "itemStyle": {"fontSize": "10px"}
                                },
                                "exporting": {
                                    "buttons": {
                                        "contextButton": {"enabled": false},
                                        "exportButton": {
                                            "theme": {
                                                "title": importTariffs.export.title,
                                                "stroke-width": 1,
                                                "stroke": "#4572a7",
                                                "fill": "#ADD8E6",
                                                "r": 0,
                                                "states": {"hover": {"fill": "#d3d3d3"}}
                                            },
                                            "text": "Download",
                                            "menuItems": [
                                                {
                                                    text: importTariffs.export.button_items.first,
                                                    onclick: function () {

                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: importTariffs.export.importTariffsFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                },
                                                {
                                                    text: importTariffs.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: importTariffs.export.importTariffsFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                },
                                                {
                                                    text: importTariffs.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: importTariffs.export.importTariffsFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                },
                                                {
                                                    text: importTariffs.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: importTariffs.export.importTariffsFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }, // :type-creator config
                        postProcess:[
                            {
                                "name": "addcolumn",
                                "sid":[{"uid":"OECD_Timeseries_ImportTariffs"}],
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "VALUE0",
                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject": null
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "commodityclass",
                                        "policyelement",
                                        "year",
                                        "um"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "VALUE0"
                                            ],
                                            "rule": "SUM"
                                        },
                                        {
                                            "columns": [
                                                "value"
                                            ],
                                            "rule": "avg"
                                        }
                                    ]
                                },
                                "rid":{
                                    "uid":"final"
                                }
                            }
                        ]
                    }
                ]
            }]
        },

        "importTariffsDownload": {

            dashboard: [{

                uid: "Policy_importTariffsDownload",
                items: [
                    {
                        id: "importTariffsDownload-1" //ref [data-item=':id']
                        //type: "chart", //chart || map || olap,
                        //postProcess
                    }
                ]
            }]
        },

        "exportSubsidiesGraph": {
            filter: {

                country: {

                    selector: {
                        id: "dropdown",
                        source: [
                            {value: "37", label: "Brazil"},
                            {value: "46", label: "Canada"},
                            {value: "999000", label: "European Union"},
                            {value: "116", label: "Indonesia"},
                            {value: "162", label: "Mexico"},
                            {value: "227", label: "South Africa"},
                            {value: "249", label: "Turkey"},
                            {value: "259", label: "United States of America"}
                        ],
                        default:["37"],
                        config : {
                            placeholder: "Please select a Country",
                            maxItems: 1
                        }
                    },

                    template: {
                        title: "Policy Type"
                    }
                },
                commodityClass: {

                    selector: {
                        id: "dropdown",
                        source: [
                            {value: "3", label: "Maize"},
                            {value: "9", label: "Maize + Rice"},
                            {value: "13", label: "Maize + Rice + Soybeans"},
                            {value: "18", label: "Maize + Rice + Soybeans + Wheat"},
                            {value: "11", label: "Maize + Rice + Wheat"},
                            {value: "10", label: "Maize + Soybeans"},
                            {value: "14", label: "Maize + Soybeans + Wheat"},
                            {value: "8", label: "Maize + Wheat"},
                            {value: "2", label: "Rice"},
                            {value: "15", label: "Rice + Soybeans"},
                            {value: "16", label: "Rice + Soybeans + Wheat"},
                            {value: "12", label: "Rice + Wheat"},
                            {value: "4", label: "Soybeans"},
                            {value: "17", label: "Soybeans + Wheat"},
                            {value: "1", label: "Wheat"}
                        ],
                        default:["9"],
                        config : {
                            placeholder: "Please select a Commodity Class",
                            maxItems: 1
                        }
                    },

                    template: {
                        title: "Policy Type"
                    }
                }
            },
            dashboard: [{

                uid: "Policy_exportSubsidiesGraph",
                items: [
                    {
                        id: "exportSubsidiesGraph-1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["startYear"], //x axis and series
                            series: ["element"], //Y dimension
                            y: ["value"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"value": "sum"},
                            config: {
                                "chart": {
                                    "borderWidth": 2,
                                    "marginBottom": 170,
                                    events: {
                                        load: function () {
                                            var label = this.renderer.label(exportSubsidies.notes.exportSubsidiesFreqGraph.first)
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
                                    },
                                    "spacingBottom": 50
                                },
                                "title": {
                                    "text": exportSubsidies.title.exportSubsidiesFreqGraph.first,
                                    "style": {"fontSize": "15px"}
                                },
                                "subtitle": {"text": exportSubsidies.subtitle.exportSubsidiesFreqGraph.first},
                                "colors": ["#125824", "#255ba3", "#f6b539", "#199e34", "#7f7f7f", "#67b7e3", "#dc3018"],
                                //"xAxis": {"categories": ["Ethanol", "Biodiesel", "Biofuel (unspecified)"]},
                                "yAxis": {
                                    "min": 0,
                                    "allowDecimals": false,
                                    "title": {"text": exportSubsidies.title.exportSubsidiesFreqGraph.zero, enabled: true}
                                },
                                "tooltip": {
                                    "headerFormat": "<span style=\"font-size:10px\">{point.key}</span><table>",
                                    "pointFormat": "<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td><td style=\"padding:0\"><b>{point.y}</b></td></tr>",
                                    "footerFormat": "</table>",
                                    "shared": true,
                                    "useHTML": true
                                },
                                "credits": {"enabled": false},
                                "plotOptions": {"column": {"pointPadding": 0.2, "borderWidth": 0}},
                                "legend": {
                                    "title": {"text": exportSubsidies.legend.exportSubsidiesFreqGraph.title, "style": {"fontWeight": "bold"}},
                                    "itemWidth": 200,
                                    //"verticalAlign": "center",
                                    "layout": "horizontal",
                                    "align": "center",
                                    "y": -30, // Posizionamento in verticale della legenda
                                    "x": 0,
                                    "useHTML": true,
                                    "enabled": true,
                                    "borderColor": "#4572a7",
                                    "itemStyle": {"fontSize": "10px"}
                                },
                                "exporting": {
                                    "buttons": {
                                        "contextButton": {"enabled": false},
                                        "exportButton": {
                                            "theme": {
                                                "title": exportSubsidies.export.title,
                                                "stroke-width": 1,
                                                "stroke": "#4572a7",
                                                "fill": "#ADD8E6",
                                                "r": 0,
                                                "states": {"hover": {"fill": "#d3d3d3"}}
                                            },
                                            "text": "Download",
                                            "menuItems": [
                                                {
                                                    text: exportSubsidies.export.button_items.first,
                                                    onclick: function () {

                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: exportSubsidies.export.exportSubsidiesFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                },
                                                {
                                                    text: exportSubsidies.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: exportSubsidies.export.exportSubsidiesFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                },
                                                {
                                                    text: exportSubsidies.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: exportSubsidies.export.exportSubsidiesFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                },
                                                {
                                                    text: exportSubsidies.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: exportSubsidies.export.exportSubsidiesFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }, // :type-creator config
                        postProcess:  [
                            {
                                "name": "filter",
                                "sid": [
                                    {
                                        "uid": "OECD_View_ImportTariffs"
                                    }
                                ],
                                "parameters": {
                                    "columns": [
                                        "commodityclass",
                                        "element",
                                        "country",
                                        "startYear",
                                        "value",
                                        "um"
                                    ],
                                    "rows": {
                                        "commodityclass": {
                                            "codes": [
                                                {
                                                    "uid": "OECD_CommodityClass",
                                                    "version": "1.0",
                                                    "codes": [
                                                        "9"
                                                    ]
                                                }
                                            ]
                                        },
                                        "policymeasure": {
                                            "codes": [
                                                {
                                                    "uid" : "OECD_PolicyMeasure",
                                                    "version" : "1.0",
                                                    "codes": [
                                                        "3"
                                                    ]
                                                }
                                            ]
                                        },
                                        "country": {
                                            "codes": [
                                                {
                                                    "uid" : "OECD_Country",
                                                    "version" : "1.0",
                                                    "codes": [
                                                        "37"
                                                    ]
                                                }
                                            ]
                                        },
                                        "policytype": {
                                            "codes": [
                                                {
                                                    "uid" : "OECD_PolicyType",
                                                    "version" : "1.0",
                                                    "codes": [
                                                        "1"
                                                    ]
                                                }
                                            ]
                                        }
                                    }
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "commodityclass",
                                        "element",
                                        "country",
                                        "startYear",
                                        "um"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "value"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                }
                            },
                            {
                                "name": "order",
                                "parameters": {
                                    "startYear": "ASC"
                                }
                            }
                        ]
                    }
                ]
            }]
        },

        "exportSubsidiesDownload": {

            dashboard: [{

                uid: "Policy_exportSubsidiesDownload",
                items: [
                    {
                        id: "exportSubsidiesDownload-1" //ref [data-item=':id']
                        //type: "chart", //chart || map || olap,
                        //postProcess
                    }
                ]
            }]
        },

        "exportRestrictionsFreqGraph": {


            filter: {

                Year: {

                   // className: 'col-md-10',

                    selector: {
                        id: "range",
                        format : "YYYYMMDD",
                        config: {
                            type: "double",
                            min: +moment(filter.exportRestrictions.year.min).format("X"),
                            max: +moment(filter.exportRestrictions.year.max).format("X"),
                            from: +moment(filter.exportRestrictions.year.from).format("X"),
                            to: +moment(filter.exportRestrictions.year.to).format("X"),
                            prettify: function (num) {
                                return moment(num, "X").format("MM/YYYY");
                            }
                        }
                    },

                    template: {
                        title: "Double Range",
                        hideSwitch: true,
                        hideRemoveButton: true
                    }
                }

            },
            dashboard: [{

                uid: "Policy_exportRestrictionsFreqGraph",
                items: [
                    {
                        id: "exportRestrictionsFreqGraph-1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "column",
                            x: ["commodityclass"], //x axis and series
                            series: ["policymeasure"], //Y dimension
                            y: ["VALUE0"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},
                            config: {
                                "chart": {
                                    "borderWidth": 2,
                                    "marginBottom": 170,
                                    events: {
                                        load: function () {
                                            var label = this.renderer.label(exportRestrictions.notes.exportRestrictionsFreqGraph.first)
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
                                    },
                                    "spacingBottom": 50
                                },
                                "title": {
                                    "text": exportRestrictions.title.exportRestrictionsFreqGraph.first,
                                    "style": {"fontSize": "15px"}
                                },
                                "subtitle": {"text": exportRestrictions.subtitle.exportRestrictionsFreqGraph.first},
                                "colors": ["#125824", "#255ba3", "#f6b539", "#199e34", "#7f7f7f", "#67b7e3", "#dc3018"],
                                //"xAxis": {"categories": ["Ethanol", "Biodiesel", "Biofuel (unspecified)"]},
                                "yAxis": {
                                    "min": 0,
                                    "allowDecimals": false,
                                    "title": {"text": exportRestrictions.title.exportRestrictionsFreqGraph.zero, enabled: true}
                                },
                                "tooltip": {
                                    "headerFormat": "<span style=\"font-size:10px\">{point.key}</span><table>",
                                    "pointFormat": "<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td><td style=\"padding:0\"><b>{point.y}</b></td></tr>",
                                    "footerFormat": "</table>",
                                    "shared": true,
                                    "useHTML": true
                                },
                                "credits": {"enabled": false},
                                "plotOptions": {"column": {"pointPadding": 0.2, "borderWidth": 0}},
                                "legend": {
                                    "title": {"text": exportRestrictions.legend.exportRestrictionsFreqGraph.title, "style": {"fontWeight": "bold"}},
                                    "itemWidth": 200,
                                    //"verticalAlign": "center",
                                    "layout": "horizontal",
                                    "align": "center",
                                    "y": -30, // Posizionamento in verticale della legenda
                                    "x": 0,
                                    "useHTML": true,
                                    "enabled": true,
                                    "borderColor": "#4572a7",
                                    "itemStyle": {"fontSize": "10px"}
                                },
                                "exporting": {
                                    "buttons": {
                                        "contextButton": {"enabled": false},
                                        "exportButton": {
                                            "theme": {
                                                "title": exportRestrictions.export.title,
                                                "stroke-width": 1,
                                                "stroke": "#4572a7",
                                                "fill": "#ADD8E6",
                                                "r": 0,
                                                "states": {"hover": {"fill": "#d3d3d3"}}
                                            },
                                            "text": "Download",
                                            "menuItems": [
                                                {
                                                    text: exportRestrictions.export.button_items.first,
                                                    onclick: function () {

                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: exportRestrictions.export.exportRestrictionsFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: exportRestrictions.export.exportRestrictionsFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: exportRestrictions.export.exportRestrictionsFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: exportRestrictions.export.exportRestrictionsFreqGraph.filename.first
                                                        }, {subtitle: {text: this.subtitle.textStr+today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }, // :type-creator config
                        postProcess:
                            [
                                {
                                    "name": "filter",
                                    "sid": [
                                        {
                                            "uid": "OECD_View_BiofuelPolicy"
                                        }
                                    ],
                                    "parameters": {
                                        "columns": [
                                            "commodityclass",
                                            "policymeasure",
                                            "country",
                                            "startDate",
                                            "endDate"
                                        ],
                                        "rows": {
                                            "commodityclass": {
                                                "codes": [
                                                    {
                                                        "uid": "OECD_CommodityClass",
                                                        "version": "1.0",
                                                        "codes": [
                                                            "1","2","3","4"
                                                        ]
                                                    }
                                                ]
                                            },
                                            "policymeasure": {
                                                "codes": [
                                                    {
                                                        "uid" : "OECD_PolicyMeasure",
                                                        "version" : "1.0",
                                                        "codes": [
                                                            "1",
                                                            "2",
                                                            "4",
                                                            "5",
                                                            "8"
                                                        ]
                                                    }
                                                ]
                                            },
                                            "policytype": {
                                                "codes": [
                                                    {
                                                        "uid" : "OECD_PolicyType",
                                                        "version" : "1.0",
                                                        "codes": [
                                                            "1"
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                },
                                {
                                    "name": "select",
                                    "parameters": {
                                        "query": "WHERE (((startdate BETWEEN ? AND ?) OR (enddate BETWEEN ? AND ?))OR ((startdate <= ?) AND (enddate>=?)) OR (enddate IS NULL AND  startdate<=?))",
                                        "queryParameters": [
                                            {
                                                "value": 20110116
                                            },
                                            {
                                                "value": 20140104
                                            },
                                            {
                                                "value": 20110116
                                            },
                                            {
                                                "value": 20140104
                                            },
                                            {
                                                "value": 20110116
                                            },
                                            {
                                                "value": 20140104
                                            },
                                            {
                                                "value": 20140104
                                            }
                                        ]
                                    }
                                },

                                {
                                    "name": "group",
                                    "parameters": {
                                        "by": [
                                            "commodityclass",
                                            "policymeasure",
                                            "country"
                                        ],
                                        "aggregations": [

                                        ]
                                    }
                                },
                                {
                                    "name": "addcolumn",
                                    "parameters": {
                                        "column": {
                                            "dataType": "number",
                                            "id": "VALUE0",
                                            "title": {
                                                "EN": "Value"
                                            },
                                            "subject": null
                                        },
                                        "value": 1
                                    }
                                },
                                {
                                    "name": "group",
                                    "parameters": {
                                        "by": [
                                            "commodityclass",
                                            "policymeasure"
                                        ],
                                        "aggregations": [
                                            {
                                                "columns": [
                                                    "VALUE0"
                                                ],
                                                "rule": "SUM"
                                            }
                                        ]
                                    },
                                    "rid":{
                                        "uid":"final"
                                    }
                                }
                            ]
                    }
                ]
            }]
        },

        "exportRestrictionsTimeSeriesGraph1": {

            dashboard: [{

                uid: "Policy_exportRestrictionsTimeSeriesGraph1",
                items: [
                    {
                        id: "exportRestrictionsTimeSeriesGraph-1_1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "highstock_series",
                            x: ["day"], //x axis and series
                            series: ["policymeasure"], //Y dimension
                            y: ["value"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},

                            config: {
                                chart: {
                                    borderWidth: 2,
                                    marginBottom: 200,
                                    spacingBottom: 50,
                                    events: {
                                        load: function(event) {
                                            // modify the legend symbol from a rect to a line
                                            $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            var label = this.renderer.label(exportRestrictions.notes.exportRestrictionsTimeSeriesGraph.first)
                                                .css({
                                                    width: '450px',
                                                    margin : '200px',
                                                    fontSize: '9px'
                                                })
                                                .attr({
                                                    'r': 5,
                                                    'padding': 50
                                                })
                                                .add();

                                            label.align(Highcharts.extend(label.getBBox(), {
                                                align: 'left',
                                                x: -40, // offset
                                                verticalAlign: 'bottom',
                                                y: 60 // offset
                                            }), null, 'spacingBox');
                                        }
                                    },
                                    height:600
                                },
                                colors: [
                                    '#125824',//Dark Green
                                    '#255ba3',//Dark Blue
                                    '#f6b539',//
                                    // Dark Yellow
                                    '#199e34',//Light Green
                                    '#7f7f7f',//Dark Gray
                                    '#67b7e3',//Light Blue
                                    '#dc3018'//Red
                                ],
                                rangeSelector: {
                                    enabled: true,
                                    inputDateFormat: '%d-%m-%Y',
                                    inputEditDateFormat: '%d-%m-%Y',
                                    inputDateParser: function (value) {
                                        value = value.split(/[-\.]/);
                                        var month = parseInt(value[1],10)-1;
                                        return Date.UTC(
                                            parseInt(value[2], 10),
                                            month,
                                            parseInt(value[0], 10)
                                        );
                                    }
                                },
                                xAxis : {
                                    min: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.min.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.min.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.min.day),
                                    max: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.max.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.max.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.max.day),
                                    floor: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.floor.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.floor.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.floor.day),
                                    ceiling: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.ceiling.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.ceiling.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.ceiling.day)
                                },
                                yAxis: {
                                    min: 0,
                                    allowDecimals: false,
                                    title: {
                                        text: exportRestrictions.title.exportRestrictionsTimeSeriesGraph.zero
                                    },
                                    opposite: false,
                                    labels: {
                                        formatter: function() {
                                            return this.value;
                                        }
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 2,
                                        color: 'silver'
                                    }]
                                },

                                plotOptions: {
                                    area:{
                                        dataGrouping: {
                                            enabled: false
                                        }
                                    },
                                    series: {
                                        events: {
                                            show: function () {
                                                $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            }
                                        }
                                    }
                                },

                                title : {
                                    text : exportRestrictions.title.exportRestrictionsTimeSeriesGraph.first,
                                    style: {"fontSize": "15px"},
                                    widthAdjust: -200
                                },

                                tooltip: {
                                    formatter: function () {
                                        var s = '<b>' + Highcharts.dateFormat('%B %Y', this.x) + '</b> <br/>';

                                        $.each(this.points, function (i,point) {

                                            s +='<span style="color:'+point.series.color+'">'+point.series.name+'</span>: '+Highcharts.numberFormat(point.y, 0) +'<br/>';

                                        });
                                        return s;
                                    }
                                },
                                legend: {
                                    title: {
                                        text: exportRestrictions.legend.exportRestrictionsFreqGraph.title,
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                    itemWidth: 200,
                                    layout: 'horizontal',
                                    align: 'center',
                                    margin: 90,
                                    y: -60,
                                    x:0,
                                    useHTML: true,
                                    enabled: true,
                                    borderColor: '#4572a7',
                                    labelFormatter: function() {
                                        var html_legend = ''+this.name;
                                        return html_legend;
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                exporting: {
                                    buttons: {
                                        contextButton: {
                                            enabled: false

                                        },
                                        exportButton: {
                                            theme: {
                                                "title": exportRestrictions.export.title,
                                                'stroke-width': 1,
                                                stroke: '#4572a7',
                                                fill:'#ADD8E6',
                                                r: 0,
                                                states: {
                                                    hover: {
                                                        fill: '#d3d3d3'
                                                    }
                                                }
                                            },
                                            text: exportRestrictions.export.title,
                                            menuItems: [
                                                {
                                                    text: exportRestrictions.export.button_items.first,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                            }
                        }, // :type-creator config

                        postProcess:[{
                            "name": "filter",
                            "sid": [
                                {
                                    "uid": "OECD_Timeseries_ExportRestrictions"
                                }
                            ],
                            "parameters": {
                                "columns": [
                                    "day",
                                    "policymeasure",
                                    "country"
                                ],
                                "rows": {
                                    "commodityclass": {
                                        "codes": [
                                            {
                                                "uid": "OECD_CommodityClass",
                                                "version": "1.0",
                                                "codes": [
                                                    "1"
                                                ]
                                            }
                                        ]
                                    },
                                    "policytype": {
                                        "codes": [
                                            {
                                                "uid" : "OECD_PolicyType",
                                                "version" : "1.0",
                                                "codes": [
                                                    "1"
                                                ]
                                            }
                                        ]
                                    }

                                }
                            }
                        },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure",
                                        "country"
                                    ],
                                    "aggregations": []
                                }
                            },
                            {
                                "name": "addcolumn",
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "value",
                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject": null
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "value"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                }
                            }
                        ]
                    }]
            }]
        },

        "exportRestrictionsTimeSeriesGraph2": {

            dashboard: [{

                uid: "Policy_exportRestrictionsTimeSeriesGraph2",
                items: [
                    {
                        id: "exportRestrictionsTimeSeriesGraph-2_1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "highstock_series",
                            x: ["day"], //x axis and series
                            series: ["policymeasure"], //Y dimension
                            y: ["value"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},

                            config: {
                                chart: {
                                    borderWidth: 2,
                                    marginBottom: 200,
                                    spacingBottom: 50,
                                    events: {
                                        load: function(event) {
                                            // modify the legend symbol from a rect to a line
                                            $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            var label = this.renderer.label(exportRestrictions.notes.exportRestrictionsTimeSeriesGraph.second)
                                                .css({
                                                    width: '450px',
                                                    margin : '200px',
                                                    fontSize: '9px'
                                                })
                                                .attr({
                                                    'r': 5,
                                                    'padding': 50
                                                })
                                                .add();

                                            label.align(Highcharts.extend(label.getBBox(), {
                                                align: 'left',
                                                x: -40, // offset
                                                verticalAlign: 'bottom',
                                                y: 60 // offset
                                            }), null, 'spacingBox');
                                        }
                                    },
                                    height:600
                                },
                                colors: [
                                    '#125824',//Dark Green
                                    '#255ba3',//Dark Blue
                                    '#f6b539',//
                                    // Dark Yellow
                                    '#199e34',//Light Green
                                    '#7f7f7f',//Dark Gray
                                    '#67b7e3',//Light Blue
                                    '#dc3018'//Red
                                ],
                                rangeSelector: {
                                    enabled: true,
                                    inputDateFormat: '%d-%m-%Y',
                                    inputEditDateFormat: '%d-%m-%Y',
                                    inputDateParser: function (value) {
                                        value = value.split(/[-\.]/);
                                        var month = parseInt(value[1],10)-1;
                                        return Date.UTC(
                                            parseInt(value[2], 10),
                                            month,
                                            parseInt(value[0], 10)
                                        );
                                    }
                                },
                                xAxis : {
                                    min: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.min.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.min.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.min.day),
                                    max: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.max.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.max.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.max.day),
                                    floor: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.floor.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.floor.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.floor.day),
                                    ceiling: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.ceiling.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.ceiling.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.ceiling.day)
                                },
                                yAxis: {
                                    min: 0,
                                    allowDecimals: false,
                                    title: {
                                        text: exportRestrictions.title.exportRestrictionsTimeSeriesGraph.zero
                                    },
                                    opposite: false,
                                    labels: {
                                        formatter: function() {
                                            return this.value;
                                        }
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 2,
                                        color: 'silver'
                                    }]
                                },

                                plotOptions: {
                                    area:{
                                        dataGrouping: {
                                            enabled: false
                                        }
                                    },
                                    series: {
                                        events: {
                                            show: function () {
                                                $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            }
                                        }
                                    }
                                },

                                title : {
                                    text : exportRestrictions.title.exportRestrictionsTimeSeriesGraph.second,
                                    style: {"fontSize": "15px"},
                                    widthAdjust: -200
                                },

                                tooltip: {
                                    formatter: function () {
                                        var s = '<b>' + Highcharts.dateFormat('%B %Y', this.x) + '</b> <br/>';

                                        $.each(this.points, function (i,point) {

                                            s +='<span style="color:'+point.series.color+'">'+point.series.name+'</span>: '+Highcharts.numberFormat(point.y, 0) +'<br/>';

                                        });
                                        return s;
                                    }
                                },
                                legend: {
                                    title: {
                                        text: exportRestrictions.legend.exportRestrictionsFreqGraph.title,
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                    itemWidth: 200,
                                    layout: 'horizontal',
                                    align: 'center',
                                    margin: 90,
                                    y: -60,
                                    x:0,
                                    useHTML: true,
                                    enabled: true,
                                    borderColor: '#4572a7',
                                    labelFormatter: function() {
                                        var html_legend = ''+this.name;
                                        return html_legend;
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                exporting: {
                                    buttons: {
                                        contextButton: {
                                            enabled: false

                                        },
                                        exportButton: {
                                            theme: {
                                                "title": exportRestrictions.export.title,
                                                'stroke-width': 1,
                                                stroke: '#4572a7',
                                                fill:'#ADD8E6',
                                                r: 0,
                                                states: {
                                                    hover: {
                                                        fill: '#d3d3d3'
                                                    }
                                                }
                                            },
                                            text: exportRestrictions.export.title,
                                            menuItems: [
                                                {
                                                    text: exportRestrictions.export.button_items.first,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                            }
                        }, // :type-creator config

                        postProcess:[{
                            "name": "filter",
                            "sid": [
                                {
                                    "uid": "OECD_Timeseries_ExportRestrictions"
                                }
                            ],
                            "parameters": {
                                "columns": [
                                    "day",
                                    "policymeasure",
                                    "country"
                                ],
                                "rows": {
                                    "commodityclass": {
                                        "codes": [
                                            {
                                                "uid": "OECD_CommodityClass",
                                                "version": "1.0",
                                                "codes": [
                                                    "3"
                                                ]
                                            }
                                        ]
                                    },
                                    "policytype": {
                                        "codes": [
                                            {
                                                "uid" : "OECD_PolicyType",
                                                "version" : "1.0",
                                                "codes": [
                                                    "1"
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure",
                                        "country"
                                    ],
                                    "aggregations": []
                                }
                            },
                            {
                                "name": "addcolumn",
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "value",
                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject": null
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "value"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                }
                            }
                        ]

                    }]
            }]
        },

        "exportRestrictionsTimeSeriesGraph3": {

            dashboard: [{

                uid: "Policy_exportRestrictionsTimeSeriesGraph3",
                items: [
                    {
                        id: "exportRestrictionsTimeSeriesGraph-3_1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "highstock_series",
                            x: ["day"], //x axis and series
                            series: ["policymeasure"], //Y dimension
                            y: ["value"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},

                            config: {
                                chart: {
                                    borderWidth: 2,
                                    marginBottom: 200,
                                    spacingBottom: 50,
                                    events: {
                                        load: function(event) {
                                            // modify the legend symbol from a rect to a line
                                            $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            var label = this.renderer.label(exportRestrictions.notes.exportRestrictionsTimeSeriesGraph.third)
                                                .css({
                                                    width: '450px',
                                                    margin : '200px',
                                                    fontSize: '9px'
                                                })
                                                .attr({
                                                    'r': 5,
                                                    'padding': 50
                                                })
                                                .add();

                                            label.align(Highcharts.extend(label.getBBox(), {
                                                align: 'left',
                                                x: -40, // offset
                                                verticalAlign: 'bottom',
                                                y: 60 // offset
                                            }), null, 'spacingBox');
                                        }
                                    },
                                    height:600
                                },
                                colors: [
                                    '#125824',//Dark Green
                                    '#255ba3',//Dark Blue
                                    '#f6b539',//
                                    // Dark Yellow
                                    '#199e34',//Light Green
                                    '#7f7f7f',//Dark Gray
                                    '#67b7e3',//Light Blue
                                    '#dc3018'//Red
                                ],
                                rangeSelector: {
                                    enabled: true,
                                    inputDateFormat: '%d-%m-%Y',
                                    inputEditDateFormat: '%d-%m-%Y',
                                    inputDateParser: function (value) {
                                        value = value.split(/[-\.]/);
                                        var month = parseInt(value[1],10)-1;
                                        return Date.UTC(
                                            parseInt(value[2], 10),
                                            month,
                                            parseInt(value[0], 10)
                                        );
                                    }
                                },
                                xAxis : {
                                    min: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.min.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.min.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.min.day),
                                    max: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.max.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.max.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.max.day),
                                    floor: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.floor.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.floor.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.floor.day),
                                    ceiling: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.ceiling.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.ceiling.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.ceiling.day)
                                },
                                yAxis: {
                                    min: 0,
                                    allowDecimals: false,
                                    title: {
                                        text: exportRestrictions.title.exportRestrictionsTimeSeriesGraph.zero
                                    },
                                    opposite: false,
                                    labels: {
                                        formatter: function() {
                                            return this.value;
                                        }
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 2,
                                        color: 'silver'
                                    }]
                                },

                                plotOptions: {
                                    area:{
                                        dataGrouping: {
                                            enabled: false
                                        }
                                    },
                                    series: {
                                        events: {
                                            show: function () {
                                                $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            }
                                        }
                                    }
                                },

                                title : {
                                    text : exportRestrictions.title.exportRestrictionsTimeSeriesGraph.third,
                                    style: {"fontSize": "15px"},
                                    widthAdjust: -200
                                },

                                tooltip: {
                                    formatter: function () {
                                        var s = '<b>' + Highcharts.dateFormat('%B %Y', this.x) + '</b> <br/>';

                                        $.each(this.points, function (i,point) {

                                            s +='<span style="color:'+point.series.color+'">'+point.series.name+'</span>: '+Highcharts.numberFormat(point.y, 0) +'<br/>';

                                        });
                                        return s;
                                    }
                                },
                                legend: {
                                    title: {
                                        text: exportRestrictions.legend.exportRestrictionsFreqGraph.title,
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                    itemWidth: 200,
                                    layout: 'horizontal',
                                    align: 'center',
                                    margin: 90,
                                    y: -60,
                                    x:0,
                                    useHTML: true,
                                    enabled: true,
                                    borderColor: '#4572a7',
                                    labelFormatter: function() {
                                        var html_legend = ''+this.name;
                                        return html_legend;
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                exporting: {
                                    buttons: {
                                        contextButton: {
                                            enabled: false

                                        },
                                        exportButton: {
                                            theme: {
                                                "title": exportRestrictions.export.title,
                                                'stroke-width': 1,
                                                stroke: '#4572a7',
                                                fill:'#ADD8E6',
                                                r: 0,
                                                states: {
                                                    hover: {
                                                        fill: '#d3d3d3'
                                                    }
                                                }
                                            },
                                            text: exportRestrictions.export.title,
                                            menuItems: [
                                                {
                                                    text: exportRestrictions.export.button_items.first,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                            }
                        }, // :type-creator config
                        postProcess:[{
                            "name": "filter",
                            "sid": [
                                {
                                    "uid": "OECD_Timeseries_ExportRestrictions"
                                }
                            ],
                            "parameters": {
                                "columns": [
                                    "day",
                                    "policymeasure",
                                    "country"
                                ],
                                "rows": {
                                    "commodityclass": {
                                        "codes": [
                                            {
                                                "uid": "OECD_CommodityClass",
                                                "version": "1.0",
                                                "codes": [
                                                    "2"
                                                ]
                                            }
                                        ]
                                    },
                                    "policytype": {
                                        "codes": [
                                            {
                                                "uid" : "OECD_PolicyType",
                                                "version" : "1.0",
                                                "codes": [
                                                    "1"
                                                ]
                                            }
                                        ]
                                    }

                                }
                            }
                        },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure",
                                        "country"
                                    ],
                                    "aggregations": []
                                }
                            },
                            {
                                "name": "addcolumn",
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "value",
                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject": null
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "value"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                }
                            }
                        ]
                    }]
            }]
        },

        "exportRestrictionsTimeSeriesGraph4": {

            dashboard: [{

                uid: "Policy_exportRestrictionsTimeSeriesGraph4",
                items: [
                    {
                        id: "exportRestrictionsTimeSeriesGraph-4_1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "highstock_series",
                            x: ["day"], //x axis and series
                            series: ["policymeasure"], //Y dimension
                            y: ["value"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},

                            config: {
                                chart: {
                                    borderWidth: 2,
                                    marginBottom: 200,
                                    spacingBottom: 50,
                                    events: {
                                        load: function(event) {
                                            // modify the legend symbol from a rect to a line
                                            $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            var label = this.renderer.label(exportRestrictions.notes.exportRestrictionsTimeSeriesGraph.fourth)
                                                .css({
                                                    width: '450px',
                                                    margin : '200px',
                                                    fontSize: '9px'
                                                })
                                                .attr({
                                                    'r': 5,
                                                    'padding': 50
                                                })
                                                .add();

                                            label.align(Highcharts.extend(label.getBBox(), {
                                                align: 'left',
                                                x: -40, // offset
                                                verticalAlign: 'bottom',
                                                y: 60 // offset
                                            }), null, 'spacingBox');
                                        }
                                    },
                                    height:600
                                },
                                colors: [
                                    '#125824',//Dark Green
                                    '#255ba3',//Dark Blue
                                    '#f6b539',//
                                    // Dark Yellow
                                    '#199e34',//Light Green
                                    '#7f7f7f',//Dark Gray
                                    '#67b7e3',//Light Blue
                                    '#dc3018'//Red
                                ],
                                rangeSelector: {
                                    enabled: true,
                                    inputDateFormat: '%d-%m-%Y',
                                    inputEditDateFormat: '%d-%m-%Y',
                                    inputDateParser: function (value) {
                                        value = value.split(/[-\.]/);
                                        var month = parseInt(value[1],10)-1;
                                        return Date.UTC(
                                            parseInt(value[2], 10),
                                            month,
                                            parseInt(value[0], 10)
                                        );
                                    }
                                },
                                xAxis : {
                                    min: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.min.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.min.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.min.day),
                                    max: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.max.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.max.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.max.day),
                                    floor: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.floor.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.floor.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.floor.day),
                                    ceiling: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.ceiling.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.ceiling.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.ceiling.day)
                                },
                                yAxis: {
                                    min: 0,
                                    allowDecimals: false,
                                    title: {
                                        text: exportRestrictions.title.exportRestrictionsTimeSeriesGraph.zero
                                    },
                                    opposite: false,
                                    labels: {
                                        formatter: function() {
                                            return this.value;
                                        }
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 2,
                                        color: 'silver'
                                    }]
                                },

                                plotOptions: {
                                    area:{
                                        dataGrouping: {
                                            enabled: false
                                        }
                                    },
                                    series: {
                                        events: {
                                            show: function () {
                                                $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            }
                                        }
                                    }
                                },

                                title : {
                                    text : exportRestrictions.title.exportRestrictionsTimeSeriesGraph.fourth,
                                    style: {"fontSize": "15px"},
                                    widthAdjust: -200
                                },

                                tooltip: {
                                    formatter: function () {
                                        var s = '<b>' + Highcharts.dateFormat('%B %Y', this.x) + '</b> <br/>';

                                        $.each(this.points, function (i,point) {

                                            s +='<span style="color:'+point.series.color+'">'+point.series.name+'</span>: '+Highcharts.numberFormat(point.y, 0) +'<br/>';

                                        });
                                        return s;
                                    }
                                },
                                legend: {
                                    title: {
                                        text: exportRestrictions.legend.exportRestrictionsFreqGraph.title,
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                    itemWidth: 200,
                                    layout: 'horizontal',
                                    align: 'center',
                                    margin: 90,
                                    y: -60,
                                    x:0,
                                    useHTML: true,
                                    enabled: true,
                                    borderColor: '#4572a7',
                                    labelFormatter: function() {
                                        var html_legend = ''+this.name;
                                        return html_legend;
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                exporting: {
                                    buttons: {
                                        contextButton: {
                                            enabled: false

                                        },
                                        exportButton: {
                                            theme: {
                                                "title": exportRestrictions.export.title,
                                                'stroke-width': 1,
                                                stroke: '#4572a7',
                                                fill:'#ADD8E6',
                                                r: 0,
                                                states: {
                                                    hover: {
                                                        fill: '#d3d3d3'
                                                    }
                                                }
                                            },
                                            text: exportRestrictions.export.title,
                                            menuItems: [
                                                {
                                                    text: exportRestrictions.export.button_items.first,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                            }
                        }, // :type-creator config

                        postProcess:[{
                            "name": "filter",
                            "sid": [
                                {
                                    "uid": "OECD_Timeseries_ExportRestrictions"
                                }
                            ],
                            "parameters": {
                                "columns": [
                                    "day",
                                    "policymeasure",
                                    "country"
                                ],
                                "rows": {
                                    "commodityclass": {
                                        "codes": [
                                            {
                                                "uid": "OECD_CommodityClass",
                                                "version": "1.0",
                                                "codes": [
                                                    "4"
                                                ]
                                            }
                                        ]
                                    },
                                    "policytype": {
                                        "codes": [
                                            {
                                                "uid" : "OECD_PolicyType",
                                                "version" : "1.0",
                                                "codes": [
                                                    "1"
                                                ]
                                            }
                                        ]
                                    }

                                }
                            }
                        },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure",
                                        "country"
                                    ],
                                    "aggregations": []
                                }
                            },
                            {
                                "name": "addcolumn",
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "value",
                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject": null
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "value"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                }
                            }
                        ]
                    }]
            }]
        },

        "exportRestrictionsTimeSeriesGraph5": {

            dashboard: [{

                uid: "Policy_exportRestrictionsTimeSeriesGraph5",
                items: [
                    {
                        id: "exportRestrictionsTimeSeriesGraph-5_1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "highstock_series",
                            x: ["day"], //x axis and series
                            series: ["policymeasure"], //Y dimension
                            y: ["value"],

                            useDimensionLabelsIfExist: true,// || default raw else fenixtool
                            aggregationFn: {"VALUE0": "sum"},

                            config: {
                                chart: {
                                    borderWidth: 2,
                                    marginBottom: 200,
                                    spacingBottom: 50,
                                    events: {
                                        load: function(event) {
                                            // modify the legend symbol from a rect to a line
                                            $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            var label = this.renderer.label(exportRestrictions.notes.exportRestrictionsTimeSeriesGraph.fifth)
                                                .css({
                                                    width: '450px',
                                                    margin : '200px',
                                                    fontSize: '9px'
                                                })
                                                .attr({
                                                    'r': 5,
                                                    'padding': 50
                                                })
                                                .add();

                                            label.align(Highcharts.extend(label.getBBox(), {
                                                align: 'left',
                                                x: -40, // offset
                                                verticalAlign: 'bottom',
                                                y: 60 // offset
                                            }), null, 'spacingBox');
                                        }
                                    },
                                    height:600
                                },
                                colors: [
                                    '#125824',//Dark Green
                                    '#255ba3',//Dark Blue
                                    '#f6b539',//
                                    // Dark Yellow
                                    '#199e34',//Light Green
                                    '#7f7f7f',//Dark Gray
                                    '#67b7e3',//Light Blue
                                    '#dc3018'//Red
                                ],
                                rangeSelector: {
                                    enabled: true,
                                    inputDateFormat: '%d-%m-%Y',
                                    inputEditDateFormat: '%d-%m-%Y',
                                    inputDateParser: function (value) {
                                        value = value.split(/[-\.]/);
                                        var month = parseInt(value[1],10)-1;
                                        return Date.UTC(
                                            parseInt(value[2], 10),
                                            month,
                                            parseInt(value[0], 10)
                                        );
                                    }
                                },
                                xAxis : {
                                    min: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.min.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.min.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.min.day),
                                    max: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.max.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.max.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.max.day),
                                    floor: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.floor.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.floor.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.floor.day),
                                    ceiling: Date.UTC(exportRestrictions.time.exportRestrictionsTimeSeriesGraph.ceiling.year,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.ceiling.month,exportRestrictions.time.exportRestrictionsTimeSeriesGraph.ceiling.day)
                                },
                                yAxis: {
                                    min: 0,
                                    allowDecimals: false,
                                    title: {
                                        text: exportRestrictions.title.exportRestrictionsTimeSeriesGraph.zero
                                    },
                                    opposite: false,
                                    labels: {
                                        formatter: function() {
                                            return this.value;
                                        }
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 2,
                                        color: 'silver'
                                    }]
                                },

                                plotOptions: {
                                    area:{
                                        dataGrouping: {
                                            enabled: false
                                        }
                                    },
                                    series: {
                                        events: {
                                            show: function () {
                                                $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                            }
                                        }
                                    }
                                },

                                title : {
                                    text : exportRestrictions.title.exportRestrictionsTimeSeriesGraph.fifth,
                                    style: {"fontSize": "15px"},
                                    widthAdjust: -200
                                },

                                tooltip: {
                                    formatter: function () {
                                        var s = '<b>' + Highcharts.dateFormat('%B %Y', this.x) + '</b> <br/>';

                                        $.each(this.points, function (i,point) {

                                            s +='<span style="color:'+point.series.color+'">'+point.series.name+'</span>: '+Highcharts.numberFormat(point.y, 0) +'<br/>';

                                        });
                                        return s;
                                    }
                                },
                                legend: {
                                    title: {
                                        text: exportRestrictions.legend.exportRestrictionsFreqGraph.title,
                                        style: {
                                            fontWeight: 'bold'
                                        }
                                    },
                                    itemWidth: 200,
                                    layout: 'horizontal',
                                    align: 'center',
                                    margin: 90,
                                    y: -60,
                                    x:0,
                                    useHTML: true,
                                    enabled: true,
                                    borderColor: '#4572a7',
                                    labelFormatter: function() {
                                        var html_legend = ''+this.name;
                                        return html_legend;
                                    }
                                },
                                credits: {
                                    enabled: false
                                },
                                exporting: {
                                    buttons: {
                                        contextButton: {
                                            enabled: false

                                        },
                                        exportButton: {
                                            theme: {
                                                "title": exportRestrictions.export.title,
                                                'stroke-width': 1,
                                                stroke: '#4572a7',
                                                fill:'#ADD8E6',
                                                r: 0,
                                                states: {
                                                    hover: {
                                                        fill: '#d3d3d3'
                                                    }
                                                }
                                            },
                                            text: exportRestrictions.export.title,
                                            menuItems: [
                                                {
                                                    text: exportRestrictions.export.button_items.first,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.second,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/jpeg',
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.third,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'image/svg+xml',
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }

                                                },
                                                {
                                                    text: exportRestrictions.export.button_items.fourth,
                                                    onclick: function () {
                                                        var today = currentDate();
                                                        this.exportChart({
                                                            type: 'application/pdf',
                                                            filename: exportRestrictions.export.exportRestrictionsTimeSeriesGraph.filename.first
                                                        }, {subtitle: {text: today}});
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                            }
                        }, // :type-creator config

                        postProcess:[{
                            "name": "filter",
                            "sid": [
                                {
                                    "uid": "OECD_Timeseries_ExportRestrictions"
                                }
                            ],
                            "parameters": {
                                "columns": [
                                    "day",
                                    "policymeasure",
                                    "country"
                                ],
                                "rows": {
                                    "commodityclass": {
                                        "codes": [
                                            {
                                                "uid": "OECD_CommodityClass",
                                                "version": "1.0",
                                                "codes": [
                                                    "1","3","2","4"
                                                ]
                                            }
                                        ]
                                    },
                                    "policytype": {
                                        "codes": [
                                            {
                                                "uid" : "OECD_PolicyType",
                                                "version" : "1.0",
                                                "codes": [
                                                    "1"
                                                ]
                                            }
                                        ]
                                    }

                                }
                            }
                        },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure",
                                        "country"
                                    ],
                                    "aggregations": []
                                }
                            },
                            {
                                "name": "addcolumn",
                                "parameters": {
                                    "column": {
                                        "dataType": "number",
                                        "id": "value",
                                        "title": {
                                            "EN": "Value"
                                        },
                                        "subject": null
                                    },
                                    "value": 1
                                }
                            },
                            {
                                "name": "group",
                                "parameters": {
                                    "by": [
                                        "day",
                                        "policymeasure"
                                    ],
                                    "aggregations": [
                                        {
                                            "columns": [
                                                "value"
                                            ],
                                            "rule": "SUM"
                                        }
                                    ]
                                }
                            }
                        ]
                    }]
            }]
        },

        "exportRestrictionsDownload": {

            dashboard: [{

                uid: "Policy_exportRestrictionsDownload",
                items: [
                    {
                        id: "exportRestrictionsDownload-1" //ref [data-item=':id']
                        //type: "chart", //chart || map || olap,
                        //postProcess
                    }
                ]
            }]
        }
    }

    function currentDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }
        if(mm<10) {
            mm='0'+mm
        }

        var month = monthToAlph(mm);

        //today = month+'/'+dd+'/'+yyyy;
        today = dd+'/'+month+'/'+yyyy;
        today = "[Created on:"+today+"]";

        return today;
    };

    function monthToAlph(mm){
        var month = 'Jan';
        if(mm=='01'){
            month = 'Jan';
        }
        else if(mm=='02'){
            month = 'Feb';
        }
        else if(mm=='03'){
            month = 'Mar';
        }
        else if(mm=='04'){
            month = 'Apr';
        }
        else if(mm=='05'){
            month = 'May';
        }
        else if(mm=='06'){
            month = 'Jun';
        }
        else if(mm=='07'){
            month = 'Jul';
        }
        else if(mm=='08'){
            month = 'Aug';
        }
        else if(mm=='09'){
            month = 'Sep';
        }
        else if(mm=='10'){
            month = 'Oct';
        }
        else if(mm=='11'){
            month = 'Nov';
        }
        else if(mm=='12'){
            month = 'Dec';
        }

        return month;
    };

});
