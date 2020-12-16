import VegaGovernance from "../../src/services/VegaGovernance";

const chai = require('chai');
const expect = chai.expect;
const governanceEndpoint = 'https://lb.testnet.vega.xyz/query';

const vegaGovernance = new VegaGovernance(governanceEndpoint);

describe('Vega Governance', function () {
    describe('#endtoend()', function () {
        it.only('should work', async function () {
            const proposals = await vegaGovernance.listProposals();
            console.log(proposals);
        });
    });
});
