const axios = require("axios");
import {StatusCodes} from 'http-status-codes';

export default class VegaWallet {


    constructor(endpoint) {
        this.endpoint = endpoint;
        this.endpointCreateWallet = `${endpoint}/api/v1/wallets`;
        this.endpointLogin = `${endpoint}/api/v1/auth/token`;
        this.endpointLogout = this.endpointLogin;
        this.endpointListKeys = `${endpoint}/api/v1/keys`;
        this._token = null;
    }

    /**
     * Creates new wallet.
     * @param wallet {String}
     * @param passphrase {String}
     * @returns {Promise<boolean>}
     */
    async createWallet(wallet, passphrase) {
        return this.loginOrCreate(true, wallet, passphrase);
    }

    /**
     * Logins to existing wallet.
     * @param wallet {String}
     * @param passphrase {String}
     * @returns {Promise<boolean>}
     */
    async login(wallet, passphrase) {
        return this.loginOrCreate(false, wallet, passphrase);
    }

    /**
     *
     * @param create {boolean}
     * @param wallet {String}
     * @param passphrase {String}
     * @returns {Promise<boolean>}
     */
    async loginOrCreate(create, wallet, passphrase){
        try {
            const response = await axios.post(
                create ? this.endpointCreateWallet : this.endpointLogin,
                {
                    wallet: wallet,
                    passphrase: passphrase,
                }
            );
            if (response.status !== StatusCodes.OK) {
                return false;
            }
            this.token = response.data.token;
            return true;
        } catch (e) {
            console.error('authentication failed: ', e);
            throw e;
        }
    }

    async listKeys() {
        try {
            const response = await axios.get(
                this.endpointListKeys,
                this.authenticated(),
            );
            return response.data.keys;
        } catch (e) {
            console.error('logout failed: ', e);
            throw e;
        }
    }

    async logout() {
        try {
            const response = await axios.delete(
                this.endpointLogout,
                this.authenticated(),
            );
            if (response.status !== StatusCodes.OK) {
                return false;
            }
            this.token = null;
            return true;
        } catch (e) {
            console.error('logout failed: ', e);
            throw e;
        }
    }

    authenticated() {
        return {
            headers: this.authorizationHeader(),
        }
    }

    authorizationHeader() {
        return {
            'Authorization': `Bearer ${this.token}`,
        }
    }

    get token() {
        return this._token;
    }

    set token(value) {
        this._token = value;
    }
}