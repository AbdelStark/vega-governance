const axios = require("axios");
import {StatusCodes} from 'http-status-codes';

export default class VegaWallet {


    /**
     * Build a new Vega Wallet service.
     * @param endpoint {String} Root URL of the wallet.
     */
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.endpointCreateWallet = `${endpoint}/api/v1/wallets`;
        this.endpointLogin = `${endpoint}/api/v1/auth/token`;
        this.endpointLogout = this.endpointLogin;
        this.endpointGenerateKeypair = `${endpoint}/api/v1/keys`;
        this.endpointListKeys = `${endpoint}/api/v1/keys`;
        this.endpointSignTransaction = `${endpoint}/api/v1/messages`;
        this._token = null;
    }

    /**
     * Create new wallet.
     * @param wallet {String} The wallet identifier.
     * @param passphrase {String} The wallet passphrase.
     * @returns {Promise<boolean>} true if success, false otherwise
     */
    async createWallet(wallet, passphrase) {
        return this.loginOrCreate(true, wallet, passphrase);
    }

    /**
     * Login to existing wallet.
     * @param wallet {String} The wallet identifier.
     * @param passphrase {String} The wallet passphrase.
     * @returns {Promise<boolean>} true if success, false otherwise
     */
    async login(wallet, passphrase) {
        return this.loginOrCreate(false, wallet, passphrase);
    }

    /**
     * Create new wallet or login to existing wallet.
     * @param create {boolean} true if wallet creation requested, false otherwise.
     * @param wallet {String} The wallet identifier.
     * @param passphrase {String} The wallet passphrase.
     * @returns {Promise<boolean>} true if success, false otherwise
     */
    async loginOrCreate(create, wallet, passphrase) {
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
            console.error('loginOrCreate failed: ', e);
            throw e;
        }
    }

    /**
     * List keys managed by the wallet.
     * @returns {Promise<*>}
     */
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

    /**
     * Generate new keypair associated to optional meta data.
     * @param passphrase The wallet passphrase.
     * @param meta {Map<String,String>} Meta data associated to the key.
     * @returns {Promise<*>}
     */
    async generateKeypair(passphrase, meta = null) {
        try {
            const requestPayload = {
                passphrase: passphrase,
            }
            if (meta !== null && meta.size > 0) {
                const keyMetaData = [];
                meta.forEach((value, key) => {
                    keyMetaData.push({
                        key: key,
                        value: value,
                    });
                });
                requestPayload.meta = keyMetaData;
            }
            const response = await axios.post(
                this.endpointGenerateKeypair,
                requestPayload,
                this.authenticated(),
            );
            return response.data;
        } catch (e) {
            console.error('generateKeypair failed: ', e);
            throw e;
        }
    }

    /**
     * Sign a transaction using the specified public key.
     * @param tx {String} The message to sign.
     * @param pubKey {String} The public key to use.
     * @param propagate
     * @returns {Promise<any>}
     */
    async signTransaction(tx, pubKey, propagate) {
        try {
            const response = await axios.post(
                this.endpointSignTransaction,
                {
                    tx: tx,
                    pubKey: pubKey,
                    propagate: propagate,
                },
                this.authenticated(),
            );
            return response.data;
        } catch (e) {
            console.error('signTransaction failed: ', e);
            throw e;
        }
    }

    /**
     * Logout to the wallet.
     * @returns {Promise<boolean>} true if success, false otherwise.
     */
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