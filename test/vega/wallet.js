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

            // Create new wallet
            console.log('create new wallet');
            expect(await vegaWallet.createWallet(wallet, passphrase)).to.be.true;

            // Login to wallet
            console.log('login to wallet');
            expect(await vegaWallet.login(wallet, passphrase)).to.be.true;
            expect(vegaWallet.token).not.to.be.null;

            // Get list of wallet keys (must be empty)
            console.log('list keys (must be empty)');
            let keys = await vegaWallet.listKeys();
            expect(keys).not.to.be.null;
            expect(keys).to.be.an('array').that.is.empty;

            // Generate new key pair
            console.log('generate  new key pair');
            let generateKeypairResponse = await vegaWallet.generateKeypair(passphrase);
            expect(generateKeypairResponse).to.have.property('key');
            assertKeypair(generateKeypairResponse.key);

            // Get list of wallet keys (must contain 1 key)
            console.log('list keys (must contain 1 key)');
            keys = await vegaWallet.listKeys();
            expect(keys).not.to.be.null;
            expect(keys).to.be.an('array').that.has.lengthOf(1);
            assertKeypair(keys[0]);

            // Generate new key pair (with meta data)
            console.log('generate new key pair (with meta data)');
            const meta = new Map();
            meta.set('meta-key1', 'meta-value1');
            meta.set('meta-key2', 'meta-value2');
            generateKeypairResponse = await vegaWallet.generateKeypair(passphrase, meta);
            expect(generateKeypairResponse).to.have.property('key');
            assertKeypair(generateKeypairResponse.key, 2);

            // Logout
            expect(await vegaWallet.logout()).to.be.true;
            expect(vegaWallet.token).to.be.null;
        });
    });
});

function assertKeypair(key, expectedMetaDataSize = 0) {
    expect(key).to.have.property('pub');
    expect(key).to.have.property('algo');
    expect(key).to.have.property('tainted');
    expect(key).to.have.property('meta');
    if (expectedMetaDataSize !== 0) {
        expect(key.meta).to.be.an('array').that.has.lengthOf(expectedMetaDataSize);
    }
}
