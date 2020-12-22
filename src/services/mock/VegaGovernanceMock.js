import {proposalResponse} from "@/services/mock/data/proposals";

export default class VegaGovernanceMock {


    constructor() {
    }

    listProposals() {
        return proposalResponse ;
    }

    async listProposalsByParty(id) {
        return proposalResponse ;
    }
}


