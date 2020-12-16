const fetch = require('node-fetch');
import {query} from "./query";
export default class VegaGovernance {

    /**
     * Build a new Vega Governance service.
     * @param endpoint {String} Root URL.
     */
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async listProposals() {
        const data = fetch(this.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: query.listProposals})
        })
            .then(r => r.json());
        return await data;
    }
}


