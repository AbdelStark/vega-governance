import VegaGovernance from "../../src/services/VegaGovernance";

const chai = require('chai');
const expect = chai.expect;
import {data as proposalsData} from './proposals';

describe('Vega Governance', function () {
    describe('#parse()', function () {
        it('should work', async function () {
            const proposal1 = proposalsData.proposals[0];
            console.log(proposal1.datetime);
            const parsedDate = new Date(Date.parse(proposal1.datetime));
            console.log(parsedDate.toLocaleString('en-US'));
            console.log(parsedDate.toLocaleDateString() + " " + parsedDate.toLocaleTimeString());
        });
    });
});
