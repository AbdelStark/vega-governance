import VegaWallet from "../../src/services/VegaWallet";

const chai = require('chai');
const expect = chai.expect;
const walletEndpoint = 'http://127.0.0.1:1789';
const vegaWallet = new VegaWallet(walletEndpoint);

describe('Vega Wallet', function () {
    describe('#endtoend()', function () {
        it.only('should work', async function () {
            const now = Date.now().toString();
            const wallet = `wallet-${now}`;
            const passphrase = `passphrase-${now}`;
            expect(await vegaWallet.createWallet(wallet, passphrase)).to.be.true;
            expect(await vegaWallet.login(wallet, passphrase)).to.be.true;
            expect(vegaWallet.token).not.to.be.null;
            let keys = await vegaWallet.listKeys();
            expect(keys).not.to.be.null;
            expect(keys).to.be.an('array').that.is.empty;
            expect(await vegaWallet.logout()).to.be.true;
            expect(vegaWallet.token).to.be.null;
        });
    });
});
