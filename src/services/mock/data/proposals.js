import {party1, party2, party3} from "@/services/mock/data/parties";

const yesVote = {value: "YES"};
const noVote = {value: "NO"};

const proposal1 = {
    id: "7a23b7fb846d1654f1130211dd3b6f98f4142283089d3d8fc6d70897dfabe33d",
    reference: "8ff560e2-27ae-42d0-85ec-baa6d24207da",
    party: party1,
    state: 'Open',
    datetime: '19700119T094212,795-0500',
    yesVotes: [],
    noVotes: [],
};

const proposal2 = {
    id: "1b7863ac032528c896de47be431ec2b7cbdd09133642e9535f88a6119ede252f",
    reference: "37bfbbaa-e778-41a6-9bb0-647484f92238",
    party: party2,
    state: 'Passed',
    datetime: '19700119T094212,795-0500',
    yesVotes: [],
    noVotes: [],
};

const proposal3 = {
    id: "7d4e55ff75c96feffb023d7d87b0a8faa1da52dbca06a40f88e2cfaba5459737",
    reference: "1065cb2e-2b2b-4aa1-8cd2-b50f3847b58d",
    party: party3,
    state: 'Declined',
    datetime: '19700119T094212,795-0500',
    yesVotes: [],
    noVotes: [],
};

fillVotes(proposal1, 37, 52);
fillVotes(proposal2, 15, 27);
fillVotes(proposal3, 77, 32);

const proposals = [
    proposal1,
    proposal2,
    proposal3,
];

function fillVotes(proposal, nbYes, nbNo) {
    for (let i = 0; i <= nbYes; i++) {
        proposal.yesVotes.push(yesVote);
    }
    for (let i = 0; i <= nbNo; i++) {
        proposal.noVotes.push(noVote);
    }
}

const proposalResponse =
    {
        "data": {
            "proposals": [{
                "id": "586f615528d9ef0db35457fac4f6e212dabbdbe02a83def30f298c78ac36694c",
                "datetime": "2020-12-17T13:40:30.597112823Z",
                "party": {"id": "ac9d9fe2e5904308d9c0f6fe758f8a4f4dd9636ab35584f95909010b7ec7edc9"},
                "reference": "ef94b22d-f3ca-4d99-af37-0106ef0d25bf",
                "state": "Rejected",
                "terms": {
                    "closingDatetime": "2020-12-17T13:40:43Z",
                    "enactmentDatetime": "2020-12-17T13:40:48Z",
                    "change": {
                        "instrument": {"code": "TEST:BTCDAI/MAR21"},
                        "decimalPlaces": 5,
                        "tradingMode": {"tickSize": "0.01"},
                        "riskParameters": {
                            "tau": 0.00000190128526884173,
                            "riskAversionParameter": 0.01,
                            "params": {"r": 0.016, "sigma": 0.05, "mu": 0}
                        }
                    }
                },
                "yesVotes": [],
                "noVotes": []
            }, {
                "id": "84253a22f10b52fbad7f2c517b30bd790b45e24cd6c5bbf18511dfa888b262b3",
                "datetime": "2020-12-17T13:41:49.544752656Z",
                "party": {"id": "ac9d9fe2e5904308d9c0f6fe758f8a4f4dd9636ab35584f95909010b7ec7edc9"},
                "reference": "bdbe74da-c70e-4435-95ed-7bf527bb6b29",
                "state": "Rejected",
                "terms": {
                    "closingDatetime": "2020-12-17T14:23:28Z",
                    "enactmentDatetime": "2020-12-17T14:24:18Z",
                    "change": {
                        "instrument": {"code": "TEST:BTCDAI/MAR21"},
                        "decimalPlaces": 5,
                        "tradingMode": {"tickSize": "0.01"},
                        "riskParameters": {
                            "tau": 0.00000190128526884173,
                            "riskAversionParameter": 0.01,
                            "params": {"r": 0.016, "sigma": 0.05, "mu": 0}
                        }
                    }
                },
                "yesVotes": [],
                "noVotes": []
            }, {
                "id": "028789ddf92be41f4309fee09e8fbce875560275b1acc6095a2ecafb49825c68",
                "datetime": "2020-12-17T13:43:42.639112625Z",
                "party": {"id": "ac9d9fe2e5904308d9c0f6fe758f8a4f4dd9636ab35584f95909010b7ec7edc9"},
                "reference": "2ed85084-f4d6-4531-a3e5-3d6ca991b98d",
                "state": "Declined",
                "terms": {
                    "closingDatetime": "2020-12-17T14:43:55Z",
                    "enactmentDatetime": "2020-12-17T14:44:00Z",
                    "change": {
                        "instrument": {"code": "TEST:BTCDAI/MAR21"},
                        "decimalPlaces": 5,
                        "tradingMode": {"tickSize": "0.01"},
                        "riskParameters": {
                            "tau": 0.00000190128526884173,
                            "riskAversionParameter": 0.01,
                            "params": {"r": 0.016, "sigma": 0.05, "mu": 0}
                        }
                    }
                },
                "yesVotes": [{
                    "value": "YES",
                    "party": {"id": "ac9d9fe2e5904308d9c0f6fe758f8a4f4dd9636ab35584f95909010b7ec7edc9"},
                    "datetime": "2020-12-17T13:43:44.243893497Z"
                }],
                "noVotes": []
            }, {
                "id": "b164658b80ab139627b0d5d696ab048296e3ccf462d07f402927f8012345d028",
                "datetime": "2020-12-17T15:50:09.6290552Z",
                "party": {"id": "ac9d9fe2e5904308d9c0f6fe758f8a4f4dd9636ab35584f95909010b7ec7edc9"},
                "reference": "b9a9f567-769c-4f90-8eff-2b3943c196df",
                "state": "Declined",
                "terms": {
                    "closingDatetime": "2020-12-17T16:50:23Z",
                    "enactmentDatetime": "2020-12-17T16:50:28Z",
                    "change": {
                        "instrument": {"code": "TEST:GOLDDAI/MAR21"},
                        "decimalPlaces": 5,
                        "tradingMode": {"tickSize": "0.01"},
                        "riskParameters": {
                            "tau": 0.00000190128526884173,
                            "riskAversionParameter": 0.01,
                            "params": {"r": 0.016, "sigma": 0.05, "mu": 0}
                        }
                    }
                },
                "yesVotes": [{
                    "value": "YES",
                    "party": {"id": "ac9d9fe2e5904308d9c0f6fe758f8a4f4dd9636ab35584f95909010b7ec7edc9"},
                    "datetime": "2020-12-17T15:50:11.327023732Z"
                }],
                "noVotes": []
            }]
        }
    }
;

fillVotes(proposalResponse.data.proposals[0], 17, 15);
fillVotes(proposalResponse.data.proposals[1], 85, 10);
fillVotes(proposalResponse.data.proposals[2], 34, 12);
fillVotes(proposalResponse.data.proposals[3], 50, 50);

export {
    proposalResponse,
    proposals,
    proposal1,
    proposal2,
    proposal3,
}
