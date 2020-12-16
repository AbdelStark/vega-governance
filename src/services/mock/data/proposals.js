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

export {
    proposals,
    proposal1,
    proposal2,
    proposal3,
}
