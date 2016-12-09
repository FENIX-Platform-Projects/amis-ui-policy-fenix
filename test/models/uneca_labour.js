/*global define*/
define(function () {

    'use strict';

    /**
     UNECA_Education
     UNECA_Health
     ILO_Labour
     UNECA_Labour
     **/

    return {

        uid: "UNECA_Labour",
        //version: "",
        //preProcess : {} //D3P process
        //postProcess : {} //D3P process
        items: [
            {
                id: "chart_1", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type: "line",
                    x: ["Year"], //x axis and series
                    y: ["Value"],
                    series: ["IndicatorCode_EN"], //Y dimension
                    aggregationFn: {"Value": "sum"}
                }, // :type-creator config
                filter: { //FX-filter format
                    IndicatorCode: ["010401"],
                    SectorCode : ["4"],
                    GenderCode: ["3"],
                    CountryCode: ["AGO"]//column id and values to include,
                }
                //filterFor: ["Year"], // allowed dimension ids to filter,
            },


            {
                id: "chart_2", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type: "column",
                    x: ["Year"], //x axis and series
                    y: ["Value"],
                    series: ["SectorCode"], //Y dimension
                    aggregationFn: {"Value": "sum"}
                }, // :type-creator config
                filter: { //FX-filter format
                    CountryCode: ["AGO"],//column id and values to include,
                    IndicatorCode: ["010401"],
                    SectorCode : ["1","2","3"],
                    GenderCode : ["3"]
                }
                //filterFor: ["Year"], // allowed dimension ids to filter,
            },


            {
                id: "chart_3", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type: "column",
                    x: ["Year"], //x axis and series
                    y: ["Value"],
                    series: ["GenderCode_EN"], //Y dimension
                    aggregationFn: {"Value": "sum"}
                }, // :type-creator config
                filter: { //FX-filter format
                    CountryCode: ["AGO"],//column id and values to include,
                    IndicatorCode: ["010401"],
                    SectorCode : ["4"],
                    GenderCode : ["1","2"]
                }
                //filterFor: ["Year"], // allowed dimension ids to filter,
            }
        ]
    }

});