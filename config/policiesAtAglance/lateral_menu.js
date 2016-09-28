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
                                "id": "biofuelsPoliciesGraph",
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
                                "id": "biofuelsPoliciesDetailedGraph",
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
                                "id": "exportRestrictionsGraph",
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