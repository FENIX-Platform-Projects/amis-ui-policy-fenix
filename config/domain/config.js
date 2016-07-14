/*global define*/

define(function () {

    'use strict';

    return {

        "resume": {},

        "biofuelsPoliciesFreqGraph": {

            filter:{

                Year: {

                    className: 'col-md-10',

                    selector: {
                        id: "range",
                        config: {
                            min: 2011,
                            max: 2014,
                            from:2012,
                            to:2013,
                            type: "double"
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

                uid: "UNECA_Population",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                //filter : {} //FX-filter format
                items: [
                    {
                        id: "biofuelsPoliciesFreqGraph-1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["CountryCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010101"],
                            "GenderCode": ["3"],
                            "AgeRangeCode": ["AGT"],
                            "CountryCode": ["BEN", "BFA", "CAF", "COM", "DJI", "ERI", "GHA", "GNB", "KEN", "LBR",
                                "LBY", "MRT", "NER", "NGA", "STP", "SEN", "SLE", "SOM", "SDN", "TGO", "TUN"],
                            "Year": ["2013"]


                        },

                        filterFor: ["IndicatorCode", "GenderCode", "AgeRangeCode", "CountryCode"] // allowed dimension ids to filter,
                    }]
            }]
        },
        "biofuelsPoliciesGraph": {

            dashboard: [{

                uid: "UNECA_Population",
                //version: "",
                //preProcess : {} //D3P process
                //postProcess : {} //D3P process
                //filter : {} //FX-filter format
                items: [
                    {
                        id: "biofuelsPoliciesGraph-1", //ref [data-item=':id']
                        type: "chart", //chart || map || olap,
                        config: {
                            type: "line",
                            x: ["Year"], //x axis and series
                            series: ["CountryCode_EN"], //Y dimension
                            y: ["Value"],
                            aggregationFn: {"Value": "sum"}
                        }, // :type-creator config
                        filter: { //FX-filter format

                            IndicatorCode: ["010101"],
                            "GenderCode": ["3"],
                            "AgeRangeCode": ["AGT"],
                            "CountryCode": ["BEN", "BFA", "CAF", "COM", "DJI", "ERI", "GHA", "GNB", "KEN", "LBR",
                                "LBY", "MRT", "NER", "NGA", "STP", "SEN", "SLE", "SOM", "SDN", "TGO", "TUN"],
                            "Year": ["2013"]


                        },

                        filterFor: ["IndicatorCode", "GenderCode", "AgeRangeCode", "CountryCode"] // allowed dimension ids to filter,
                    }]
            }]
        }
    }

});
