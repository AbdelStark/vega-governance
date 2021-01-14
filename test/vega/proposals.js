const data = {
    "proposals": [
        {
            "id": "586f615528d9ef0db35457fac4f6e212dabbdbe02a83def30f298c78ac36694c",
            "datetime": "2020-12-17T13:40:30.597112823Z",
            "party": {
                "id": "ac9d9fe2e5904308d9c0f6fe758f8a4f4dd9636ab35584f95909010b7ec7edc9"
            },
            "reference": "ef94b22d-f3ca-4d99-af37-0106ef0d25bf",
            "state": "Rejected",
            "terms": {
                "closingDatetime": "2020-12-17T13:40:43Z",
                "enactmentDatetime": "2020-12-17T13:40:48Z",
                "change": {
                    "instrument": {
                        "code": "TEST:BTCDAI/MAR21"
                    },
                    "decimalPlaces": 5
                }
            },
            "yesVotes": [],
            "noVotes": []
        },
        {
            "id": "84253a22f10b52fbad7f2c517b30bd790b45e24cd6c5bbf18511dfa888b262b3",
            "datetime": "2020-12-17T13:41:49.544752656Z",
            "party": {
                "id": "ac9d9fe2e5904308d9c0f6fe758f8a4f4dd9636ab35584f95909010b7ec7edc9"
            },
            "reference": "bdbe74da-c70e-4435-95ed-7bf527bb6b29",
            "state": "Rejected",
            "terms": {
                "closingDatetime": "2020-12-17T14:23:28Z",
                "enactmentDatetime": "2020-12-17T14:24:18Z",
                "change": {
                    "instrument": {
                        "code": "TEST:BTCDAI/MAR21"
                    },
                    "decimalPlaces": 5
                }
            },
            "yesVotes": [],
            "noVotes": []
        },
        {
            "id": "028789ddf92be41f4309fee09e8fbce875560275b1acc6095a2ecafb49825c68",
            "datetime": "2020-12-17T13:43:42.639112625Z",
            "party": {
                "id": "ac9d9fe2e5904308d9c0f6fe758f8a4f4dd9636ab35584f95909010b7ec7edc9"
            },
            "reference": "2ed85084-f4d6-4531-a3e5-3d6ca991b98d",
            "state": "Declined",
            "terms": {
                "closingDatetime": "2020-12-17T14:43:55Z",
                "enactmentDatetime": "2020-12-17T14:44:00Z",
                "change": {
                    "instrument": {
                        "code": "TEST:BTCDAI/MAR21"
                    },
                    "decimalPlaces": 5
                }
            },
            "yesVotes": [
                {
                    "value": "YES",
                    "party": {
                        "id": "ac9d9fe2e5904308d9c0f6fe758f8a4f4dd9636ab35584f95909010b7ec7edc9"
                    },
                    "datetime": "2020-12-17T13:43:44.243893497Z"
                }
            ],
            "noVotes": []
        },
        {
            "id": "b164658b80ab139627b0d5d696ab048296e3ccf462d07f402927f8012345d028",
            "datetime": "2020-12-17T15:50:09.6290552Z",
            "party": {
                "id": "ac9d9fe2e5904308d9c0f6fe758f8a4f4dd9636ab35584f95909010b7ec7edc9"
            },
            "reference": "b9a9f567-769c-4f90-8eff-2b3943c196df",
            "state": "Declined",
            "terms": {
                "closingDatetime": "2020-12-17T16:50:23Z",
                "enactmentDatetime": "2020-12-17T16:50:28Z",
                "change": {
                    "instrument": {
                        "code": "TEST:GOLDDAI/MAR21"
                    },
                    "decimalPlaces": 5
                }
            },
            "yesVotes": [
                {
                    "value": "YES",
                    "party": {
                        "id": "ac9d9fe2e5904308d9c0f6fe758f8a4f4dd9636ab35584f95909010b7ec7edc9"
                    },
                    "datetime": "2020-12-17T15:50:11.327023732Z"
                }
            ],
            "noVotes": []
        }
    ]
};

const weightVotesProposal = {
    "id": "b164658b80ab139627b0d5d696ab048296e3ccf462d07f402927f8012345d028",
    "datetime": "2020-12-17T15:50:09.6290552Z",
    "party": {
        "id": "ac9d9fe2e5904308d9c0f6fe758f8a4f4dd9636ab35584f95909010b7ec7edc9"
    },
    "reference": "b9a9f567-769c-4f90-8eff-2b3943c196df",
    "state": "Declined",
    "terms": {
        "closingDatetime": "2020-12-17T16:50:23Z",
        "enactmentDatetime": "2020-12-17T16:50:28Z",
        "change": {
            "metadata": null,
            "instrument": {
                "code": "TEST:GOLDDAI/MAR21"
            },
            "decimalPlaces": 5,
            "tradingMode": {
                "tickSize": "0.01"
            },
            "riskParameters": {
                "tau": 0.00000190128526884173,
                "riskAversionParameter": 0.01,
                "params": {
                    "r": 0.016,
                    "sigma": 0.05,
                    "mu": 0
                }
            }
        }
    },
    "yesVotes": [
        {
            "value": "YES",
            "party": {
                "id": "ac9d9fe2e5904308d9c0f6fe758f8a4f4dd9636ab35584f95909010b7ec7edc9"
            },
            "datetime": "2020-12-17T15:50:11.327023732Z"
        }
    ],
    "noVotes": []
};

export {
    data,
    weightVotesProposal,
}
