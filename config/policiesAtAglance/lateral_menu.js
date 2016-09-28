/*global define*/
define({
    "core": {
        "multiple": false,
        "data": [
            {
                "id": "biofuelsPolicies",
                "state": {
                    "opened": true
                },
                "children": [
                    {
                        "id": "biofuelsPoliciesFreqGraph"
                    },
                    {
                        "id": "biofuelsPoliciesTimeSeries",
                        "state": {
                            "opened": true
                        },
                        "children": [
                            {
                                "id": "biofuelsPoliciesTimeSeriesGraph1",
                            },
                            {
                                "id": "biofuelsPoliciesTimeSeriesGraph2",
                            },
                            {
                                "id": "biofuelsPoliciesTimeSeriesGraph3",
                            },
                            {
                                "id": "biofuelsPoliciesTimeSeriesGraph4",
                            },
                            {
                                "id": "biofuelsPoliciesDownload"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "biofuelsPoliciesDetailed",
                "state": {
                    "opened": true
                },
                "children": [
                    {
                        "id": "biofuelsPoliciesDetailedFreqGraph"
                    },
                    {
                        "id": "biofuelsPoliciesDetailedTimeSeries",
                        "state": {
                            "opened": true
                        },
                        "children": [
                            {
                                "id": "biofuelsPoliciesDetailedTimeSeriesGraph1",
                            },
                            {
                                "id": "biofuelsPoliciesDetailedTimeSeriesGraph2",
                            },
                            {
                                "id": "biofuelsPoliciesDetailedTimeSeriesGraph3",
                            },
                            {
                                "id": "biofuelsPoliciesDetailedTimeSeriesGraph4",
                            },
                            {
                                "id": "biofuelsPoliciesDetailedDownload"
                            }
                        ]
                    }
                ]
            },
            {
                "id": "importTariffs",
                "state": {
                    "opened": true
                },
                "children": [
                    {
                        "id": "importTariffsGraph"
                    },
                    {
                        "id": "importTariffsDownload"
                    }
                ]
            },
            {
                "id": "exportSubsidies",
                "state": {
                    "opened": true
                },
                "children": [
                    {
                        "id": "exportSubsidiesGraph"
                    },
                    {
                        "id": "exportSubsidiesDownload"
                    }
                ]
            },
            {
                "id": "exportRestrictions",
                "state": {
                    "opened": true
                },
                "children": [
                    {
                        "id": "exportRestrictionsFreqGraph"
                    },
                    {
                        "id": "exportRestrictionsTimeSeries",
                        "state": {
                            "opened": true
                        },
                        "children": [
                            {
                                "id": "exportRestrictionsTimeSeriesGraph1",
                            },
                            {
                                "id": "exportRestrictionsTimeSeriesGraph2",
                            },
                            {
                                "id": "exportRestrictionsTimeSeriesGraph3",
                            },
                            {
                                "id": "exportRestrictionsTimeSeriesGraph4",
                            },
                            {
                                "id": "exportRestrictionsTimeSeriesGraph5",
                            },
                            {
                                "id": "exportRestrictionsDownload"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    "state" : {
        "ttl" : 1
    },
    "plugins": [
        "wholerow"
    ]
});