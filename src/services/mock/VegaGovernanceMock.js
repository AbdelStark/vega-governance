import {proposals} from "@/services/mock/data/proposals";

export default class VegaGovernanceMock {


    constructor() {
        this.proposals = proposals;
    }

    listProposals() {
        return this.proposals;
    }

    async listProposalsByParty(id) {
        return this.proposals;
    }
}


