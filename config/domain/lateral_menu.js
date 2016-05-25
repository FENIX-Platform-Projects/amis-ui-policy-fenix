/*global define*/
define({
    "core": {
        "multiple": false,
        "data": [
            {
                "id": "demographic",
                "state": {
                    "opened": true
                },
                "children": [
                    {
                        "id": "population"
                    },
                    {
                        "id": "education"
                    },
                    {
                        "id": "health"
                    },
                    {
                        "id": "labour"
                    }
                ]
            },
            {
                "id": "economics",
                "state": {
                    "opened": true
                },
                "children": [
                    {
                        "id": "balance_of_payments"
                    },
                    {
                        "id": "gdp"
                    },
                    {
                        "id": "monetary_statistics"
                    },
                    {
                        "id": "financial_flows"
                    },
                    {
                        "id": "public_finance"
                    },
                    {
                        "id": "debt"
                    },
                    {
                        "id": "inflation"
                    },
                    {
                        "id": "energy"
                    },
                    {
                        "id": "tourism"
                    },
                    {
                        "id": "infrastructure"
                    },
                    {
                        "id": "production",
                        "children": [
                            {
                                "id": "agriculture_production"
                            },
                            {
                                "id": "mining_production"
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