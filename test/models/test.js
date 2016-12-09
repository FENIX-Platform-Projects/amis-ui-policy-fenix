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
                ]
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
                ]
            },

            template: {
                title: "Policy Domain"
            }
        },

        radio: {

            selector: {
                id: "input",
                type: "radio",
                source: [
                    {value: "cd_item_1", label: "Agricultural"},
                    {value: "cd_item_2", label: "Biofuels"},
                    {value: "cd_item_3", label: "Both"}
                ],
                default: ["cd_item_1"]
            },

            template: {
                title: "Commodity Domain",
                hideSelectAllButton: false,
                hideClearAllButton : false
            }
        },

        dropdown: {

            selector: {
                id: "dropdown",
                source: [
                    {value: "pt_item_1", label: "Item 1"},
                    {value: "pt_item_2", label: "Item 2"}
                ]
            },

            template: {
                title: "Policy Type",
                hideSelectAllButton: false,
                hideClearAllButton : false
            }
        },

        checkbox: {

            selector: {
                id: "input",
                type: "checkbox",
                source: [
                    {value: "item_1", label: "Checkbox 1"}
                ]
            },

            template: {
                title: "Checkbox"
            }
        },

        year: {

            selectors: {

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
                },
                YearList: {
                    selector: {
                        id: "dropdown",
                        source: [
                            {value: "item_3", label: "Item 3"},
                            {value: "item_4", label: "Item 4"}
                        ]
                    },

                    template: {
                        title: "Year List"
                    }
                }
            },

            template: {
                title: "3) Select time period or specify years"
            }
        },


    }
});