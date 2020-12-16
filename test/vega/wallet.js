import VegaWallet from "../../src/services/VegaWallet";

const chai = require('chai');
const expect = chai.expect;
const walletEndpoint = 'http://127.0.0.1:1789';
const vegaWallet = new VegaWallet(walletEndpoint);

describe('Vega Wallet', function () {
    describe('#login()', function () {
        it.only('should authenticate', async function () {
            const response = await vegaWallet.login('gitcoinvega', 'gitcoin');
            console.log(response);
        });
    });
});
