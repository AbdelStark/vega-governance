const axios = require("axios");

export default class VegaWallet {
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.endpointLogin = `${endpoint}/api/v1/auth/token`
    }

    async login(wallet, passphrase){
        try{
            const response = await axios.post(
                this.endpointLogin,
                {
                    wallet: wallet,
                    passphrase: passphrase,
                }
            );
            return response.data;
        }catch (e) {
            console.error('authentication failed: ', e);
            throw e;
        }
    }
}