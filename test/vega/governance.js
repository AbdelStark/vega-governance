import VegaGovernance from "../../src/services/VegaGovernance";

const chai = require('chai');
const expect = chai.expect;
const governanceEndpoint = 'https://lb.testnet.vega.xyz/query';

const vegaGovernance = new VegaGovernance(governanceEndpoint);

describe('Vega Governance', function () {
    describe('#endtoend()', function () {
        it('should work', async function () {
            console.log(await vegaGovernance.listProposalsByParty('26af80a94f3fbd595e1d8bdabcc24fe8cecf89778e677322f1143145113571a6'));
            console.log(await vegaGovernance.listProposalsByParty('9c45820e31fcd4bbea6a7b15c50006b30c03c850d7acd3a52760a1dfa31b040a'));

        });
    });
});
