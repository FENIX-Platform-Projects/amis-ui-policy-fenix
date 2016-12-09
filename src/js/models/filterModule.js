/*global define*/

define(function () {

    'use strict';

    return {

        commodityDomain: {

            selector: {
                id: "input",
                type: "checkbox",
                source: [
                    {value: "1", label: "Agricultural"},
                    {value: "2", label: "Biofuels"}
                ],
                default: ["1"],
                hideSelectAllButton: false,
                hideClearAllButton : false
            },

            template: {
                title: "Commodity Domain"
            }
        },

        policyDomain: {

            selector: {
                id: "input",
                type: "checkbox",
                source: [
                    {value: "1", label: "Trade"},
                    {value: "2", label: "Domestic"}
                ],
                default: ["1"],
                hideSelectAllButton: false,
                hideClearAllButton : false
            },

            template: {
                title: "Policy Domain"
            }
        },

        policyType: {

            selector: {
                id: "dropdown",
                source: [
                    {value: "1", label: "Export measures"},
                    {value: "2", label: "Import measures"}
                ],
                hideSelectAllButton: false,
                hideClearAllButton: false,
                config : {
                    //maxItems: 1, // Max amount of selected items,
                    //placeholder: "Please select",
                    plugins: ['remove_button'], //in combination with mode:'multi' create a 'X' button to remove items
                    mode: 'multi'
                }
            },

            template: {
                title: "Policy Type"
            },

            dependencies: {
                commodityDomain: [{
                    id: "process",
                    event: "select",
                    args: {
                        uid: "OECD_View_QueryDownload",
                        payloadIncludes: ["commodityDomain", "policyDomain"],
                        body: [{
                            name: "filter",
                            parameters: {
                                rows: {
                                    commoditydomain: {
                                        codes: [{
                                            uid: "OECD_CommodityDomain",
                                            version: "1.0",
                                            codes: ["{{{commodityDomain}}}"]
                                        }]
                                    },
                                    policydomain: {
                                        codes: [{
                                            uid: "OECD_PolicyDomain",
                                            version: "1.0",
                                            codes: ["{{{policyDomain}}}"]
                                        }]
                                    }
                                },
                                columns: ["policytype"]
                            }
                        },
                        {
                            "name":"group",
                            "parameters":{
                                "by":[
                                    "policytype"

                                ],
                                "aggregations":[

                                ]
                            }
                        }]
                    }
                }],
                policyDomain: [{
                    id: "process",
                    event: "select",
                    args: {
                        uid: "OECD_View_QueryDownload",
                        payloadIncludes: ["commodityDomain", "policyDomain"],
                        body: [{
                            name: "filter",
                            parameters: {
                                rows: {
                                    commoditydomain: {
                                        codes: [{
                                            uid: "OECD_CommodityDomain",
                                            version: "1.0",
                                            codes: ["{{{commodityDomain}}}"]
                                        }]
                                    },
                                    policydomain: {
                                        codes: [{
                                            uid: "OECD_PolicyDomain",
                                            version: "1.0",
                                            codes: ["{{{policyDomain}}}"]
                                        }]
                                    }
                                },
                                columns: ["policytype"]
                            }
                        },
                        {
                            "name":"group",
                            "parameters":{
                                "by":[
                                    "policytype"

                                ],
                                "aggregations":[

                                ]
                            }
                        }]
                    }
                }]
            }
        },

        policyMeasure: {

            selector: {
                id: "dropdown",
                hideSelectAllButton: false,
                hideClearAllButton : false
            },

            cl: {
                "uid": "OECD_PolicyType2_1_1",
                "version": "1.0"
            },

            template: {
                title: "Policy Measure"
            },

            dependencies: {
                commodityDomain: [{
                    id: "process",
                    event: "select",
                    args: {
                        uid: "OECD_View_QueryDownload",
                        payloadIncludes: ["commodityDomain", "policyDomain", "policyType"],
                        body: [{
                            name: "filter",
                            parameters: {
                                rows: {
                                    commoditydomain: {
                                        codes: [{
                                            uid: "OECD_CommodityDomain",
                                            version: "1.0",
                                            codes: ["{{{commodityDomain}}}"]
                                        }]
                                    },
                                    policydomain: {
                                        codes: [{
                                            uid: "OECD_PolicyDomain",
                                            version: "1.0",
                                            codes: ["{{{policyDomain}}}"]
                                        }]
                                    },
                                    policytype: {
                                        codes: [{
                                            uid: "OECD_PolicyType",
                                            version: "1.0",
                                            codes: ["{{{policyType}}}"]
                                        }]
                                    }
                                },
                                columns: ["policymeasure"]
                            }
                        },
                            {
                                "name":"group",
                                "parameters":{
                                    "by":[
                                        "policymeasure"

                                    ],
                                    "aggregations":[

                                    ]
                                }
                            }]
                    }
                }],
                policyDomain: [{
                    id: "process",
                    event: "select",
                    args: {
                        uid: "OECD_View_QueryDownload",
                        payloadIncludes: ["commodityDomain", "policyDomain", "policyType"],
                        body: [{
                            name: "filter",
                            parameters: {
                                rows: {
                                    commoditydomain: {
                                        codes: [{
                                            uid: "OECD_CommodityDomain",
                                            version: "1.0",
                                            codes: ["{{{commodityDomain}}}"]
                                        }]
                                    },
                                    policydomain: {
                                        codes: [{
                                            uid: "OECD_PolicyDomain",
                                            version: "1.0",
                                            codes: ["{{{policyDomain}}}"]
                                        }]
                                    },
                                    policytype: {
                                        codes: [{
                                            uid: "OECD_PolicyType",
                                            version: "1.0",
                                            codes: ["{{{policyType}}}"]
                                        }]
                                    }
                                },
                                columns: ["policymeasure"]
                            }
                        },
                            {
                                "name":"group",
                                "parameters":{
                                    "by":[
                                        "policymeasure"

                                    ],
                                    "aggregations":[

                                    ]
                                }
                            }]
                    }
                }],
                policyType: [{
                    id: "process",
                    event: "select",
                    args: {
                        uid: "OECD_View_QueryDownload",
                        payloadIncludes: ["commodityDomain", "policyDomain", "policyType"],
                        body: [{
                            name: "filter",
                            parameters: {
                                rows: {
                                    commoditydomain: {
                                        codes: [{
                                            uid: "OECD_CommodityDomain",
                                            version: "1.0",
                                            codes: ["{{{commodityDomain}}}"]
                                        }]
                                    },
                                    policydomain: {
                                        codes: [{
                                            uid: "OECD_PolicyDomain",
                                            version: "1.0",
                                            codes: ["{{{policyDomain}}}"]
                                        }]
                                    },
                                    policytype: {
                                        codes: [{
                                            uid: "OECD_PolicyType",
                                            version: "1.0",
                                            codes: ["{{{policyType}}}"]
                                        }]
                                    }
                                },
                                columns: ["policymeasure"]
                            }
                        },
                            {
                                "name":"group",
                                "parameters":{
                                    "by":[
                                        "policymeasure"

                                    ],
                                    "aggregations":[

                                    ]
                                }
                            }]
                    }
                }]
            }
        },

        commodityClass: {

            selector: {
                id: "dropdown",
                hideSelectAllButton: false,
                hideClearAllButton : false
            },

            cl: {
                "uid":  "OECD_CommodityClass1",
                "version": "1.0"
            },

            template: {
                title: "Commodity Class"
            }
        },

        country: {

            selector: {
                id: "dropdown",
                hideSelectAllButton: false,
                hideClearAllButton : false
            },

            cl: {
              "uid": "OECD_Country",
              "version": "1.0"
            },

            template: {
                title: "Country"
            }
        },

        mixedCommodityClass: {

            selector: {
                id: "input",
                type: "checkbox",
                source: [
                    {value: "1", label: "Mixed commodity classes"}
                ],
                default: ["1"],
                hideSelectAllButton: false,
                hideClearAllButton : false
            }
        },

        year: {

            selectors: {

                // Year: {
                //
                //     //className: 'col-md-10',
                //
                //     selector: {
                //         id: "range",
                //         format : "YYYYMMDD",
                //         config: {
                //             type: "double",
                //             min: +moment(filter.biofuelsPoliciesType.year.min).format("X"),
                //             max: +moment(filter.biofuelsPoliciesType.year.max).format("X"),
                //             from: +moment(filter.biofuelsPoliciesType.year.from).format("X"),
                //             to: +moment(filter.biofuelsPoliciesType.year.to).format("X"),
                //             prettify: function (num) {
                //                 return moment(num, "X").format("MM/YYYY");
                //             }
                //         }
                //     },
                //
                //     template: {
                //         title: "Double Range",
                //         hideSwitch: true,
                //         hideRemoveButton: true
                //     }
                // },

                YearSlider: {

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
                        title: "Years Slider"
                    }

                    //dependencies : {"commodityDomain": [{
                    //    "id": "process", "event":"select", "params":  [{"name": "filter", "sid": {"uid": "OECD_View_QueryDownload"}, "parameters": {"columns" :["startDate", "endDate"]}}]
                    //}]
                    //}
                },

                YearList: {
                    selector: {
                        id: "dropdown",
                        source: [
                            {value: "item_3", label: "Item 3"},
                            {value: "item_4", label: "Item 4"}
                        ],
                        hideSelectAllButton: false,
                        hideClearAllButton : false
                    },

                    template: {
                        title: "Year List"
                    }

                    //dependencies : {
                    //    "commodityDomain": [{
                    //        "id": "process",
                    //        "event": "select",
                    //        "params": [{
                    //            "name": "filter",
                    //            "sid": {"uid": "OECD_View_QueryDownload"},
                    //            "parameters": {"columns": ["startDate", "endDate"]}
                    //        }]
                    //    }]
                    //}
                }
            },
            template: {
                hideHeader : true
            }
        }
    }
});