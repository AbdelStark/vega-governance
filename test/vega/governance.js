import VegaGovernance from "../../src/services/VegaGovernance";
import VegaWallet from "../../src/services/VegaWallet";

const chai = require('chai');
const expect = chai.expect;
const governanceEndpoint = 'https://lb.testnet.vega.xyz';
const walletID = '0xceE4A1B8fF1Db2fFAbadDDD3f37Cbe3Aa50Fb42d';
const passphrase = '73Jmbx4FGmNjQPd8Fn7t968GS9Fwnp';
const vegaGovernance = new VegaGovernance(governanceEndpoint);
const vegaWallet = new VegaWallet('https://wallet.testnet.vega.xyz');

describe('Vega Governance', function () {
    describe('#endtoend()', function () {
        it.only('should work', async function () {
            const time = await vegaGovernance.getTime();
            //console.log(time);
            const proposalID = '84253a22f10b52fbad7f2c517b30bd790b45e24cd6c5bbf18511dfa888b262b3';
            const partyID = 'ac9d9fe2e5904308d9c0f6fe758f8a4f4dd9636ab35584f95909010b7ec7edc9';
            const timestamp = time.timestamp;
            const voteValue = 'VALUE_YES';
            const prepareVoteResult = await vegaGovernance.prepareVote(
                proposalID,
                partyID,
                timestamp,
                voteValue
            );
            console.log(prepareVoteResult);
            const blob = prepareVoteResult.data.blob;
            await vegaWallet.login(walletID, passphrase);
            const keys = await vegaWallet.listKeys();
            //console.log(keys);
            const signingKey = keys[0].pub;
            //console.log(signingKey);
            /*const signed = await vegaWallet.signTransaction(blob, signingKey, true);
            //console.log(signed);
            const tx = signed.signedTx;
            const submitTransactionResponse = await vegaGovernance.submitTransaction(
              tx,
              'TYPE_COMMIT'
            );
            console.log(submitTransactionResponse);*/
        });
    });
});
