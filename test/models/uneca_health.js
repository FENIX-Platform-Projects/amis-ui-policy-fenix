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

        uid: "UNECA_Health",
        //version: "",
        //preProcess : {} //D3P process
        //postProcess : {} //D3P process
        items: [
            {
                id: "chart_1", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type: "column",
                    columns: ["Year"], //x axis and series
                    rows: ["IndicatorCode_EN"], //Y dimension
                    values: ["Value"],
                    aggregationFn: {"Value": "sum"}
                }, // :type-creator config
                filter: { //FX-filter format
                    CountryCode: ["AGO"],//column id and values to include,
                    IndicatorCode: ["010307", "010308", "010309", "010310"]
                }
                //filterFor: ["Year"], // allowed dimension ids to filter,
            },

            {
                id: "chart_2", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type: "column",
                    columns: ["Year"], //x axis and series
                    rows: ["IndicatorCode_EN"], //Y dimension
                    values: ["Value"],
                    aggregationFn: {"Value": "sum"}
                }, // :type-creator config
                filter: { //FX-filter format
                    CountryCode: ["AGO"],//column id and values to include,
                    IndicatorCode: ["010301"]
                }
                //filterFor: ["Year"], // allowed dimension ids to filter,
            },
            {
                id: "chart_3", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type: "column",
                    columns: ["Year"], //x axis and series
                    rows: ["IndicatorCode_EN"], //Y dimension
                    values: ["Value"],
                    aggregationFn: {"Value": "sum"}
                }, // :type-creator config
                filter: { //FX-filter format
                    CountryCode: ["AGO"],//column id and values to include,
                    IndicatorCode: ["010302"]
                }
                //filterFor: ["Year"], // allowed dimension ids to filter,
            },


            {
                id: "chart_4", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type: "column",
                    columns: ["Year"], //x axis and series
                    rows: ["IndicatorCode_EN"], //Y dimension
                    values: ["Value"],
                    aggregationFn: {"Value": "sum"}
                }, // :type-creator config
                filter: { //FX-filter format
                    CountryCode: ["AGO"],//column id and values to include,
                    IndicatorCode: ["010303","010304"]
                }
                //filterFor: ["Year"], // allowed dimension ids to filter,
            },
            {
                id: "chart_5", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type: "column",
                    columns: ["Year"], //x axis and series
                    rows: ["IndicatorCode_EN"], //Y dimension
                    values: ["Value"],
                    aggregationFn: {"Value": "sum"}
                }, // :type-creator config
                filter: { //FX-filter format
                    CountryCode: ["AGO"],//column id and values to include,
                    IndicatorCode: ["010313","010314","010315"]
                }
                //filterFor: ["Year"], // allowed dimension ids to filter,
            }

        ]
    }

});