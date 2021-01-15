<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <div>
          <h5 slot="header" class="title">Wallet</h5>
          <card v-if="!isLogged">
            <h5 slot="header" class="title">Login</h5>
            <div class="row">
              <div class="col-md-12">
                <a href="#" @click="goToSettings">{{ settings.vega.wallet.endpoint }}</a>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mt-2">
                <label>
                  <i class="tim-icons icon-link-72 mr-2"></i>
                  Wallet ID
                </label>
                <base-input v-model="loginData.walletId"></base-input>
              </div>
              <div class="col-md-6 mt-2">
                <label>
                  <i class="tim-icons icon-key-25 mr-2"></i>
                  Passphrase
                </label>
                <base-input type="password" v-model="loginData.passphrase"></base-input>
              </div>
              <div class="col-md-12 mt-2">
                <base-button block class="btn-info" @click="login">Login</base-button>
              </div>
            </div>
          </card>
          <div v-else>
            <card>
              <div class="row">
                <div class="col-md-12 mt-2">
                  <base-button block class="btn-danger" @click="logout">Logout</base-button>
                </div>
                <div class="col-md-6 mt-2">
                  <label>Metadata</label>
                  <b-form-tags input-id="tags" v-model="keyPairPairData.metadata"></b-form-tags>
                </div>
                <div class="col-md-6 mt-2">
                  <label>
                    <i class="tim-icons icon-key-25 mr-2"></i>
                    Passphrase
                  </label>
                  <base-input type="passphrase" v-model="keyPairPairData.passphrase"></base-input>
                </div>
                <div class="col-md-12 mt-2">
                  <base-button block class="btn-info" @click="generateKeyPair">Generate Key Pair</base-button>
                </div>
              </div>
            </card>
            <card>
              <b-form-group label="Eligible voting keys" v-slot="{ ariaDescribedby }"
                            style="color: white;font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: large;font-weight: bold;">
                <b-form-radio
                    v-for="key in tVoteKeys" :key="key.pub"
                    size="lg"
                    v-on:change="keySelectedEvent"
                    v-model="selectedVoteKey" :aria-describedby="ariaDescribedby"  :value="key.pub">
                  <label style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: large;font-weight: bold;">
                    {{ subPubKey(key.pub) }} - {{key.balance}} tVote tokens
                  </label>

                </b-form-radio>
              </b-form-group>
            </card>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </fade-transition>
  </div>
</template>
<script>
import {FadeTransition} from 'vue2-transitions';
import {mapState} from "vuex";

export default {
  components: {
    FadeTransition
  },
  data() {
    return {
      loginData: {
        walletId: '0xceE4A1B8fF1Db2fFAbadDDD3f37Cbe3Aa50Fb42d',
        passphrase: '73Jmbx4FGmNjQPd8Fn7t968GS9Fwnp',
      },
      keyPairPairData: {
        metadata: [],
        passphrase: '73Jmbx4FGmNjQPd8Fn7t968GS9Fwnp'
      },
      keys: [],
      tVoteKeys: [],
      selectedVoteKey: localStorage.getItem('selectedVoteKey'),
    }
  },
  computed: {
    isLogged() {
      return this.services.vegaWallet.token != null;
    },
    ...mapState([
      'services',
      'settings',
    ])
  },
  async mounted() {
    console.log('selected vote key: ', this.selectedVoteKey);
    await this.loadAuthenticatedData();
  },
  methods: {
    keySelectedEvent(evt){
      this.selectedVoteKey = evt;
      localStorage.setItem('selectedVoteKey', evt);
    },
    goToSettings() {
      this.$router.push('settings');
    },
    subPubKey(key) {
      return key.substr(0, 4) + '...' + key.substr(key.length - 4)
    },
    async logout() {
      const isSuccess = await this.services.vegaWallet.logout();
      if (isSuccess) {
        localStorage.removeItem("vega-token");
        localStorage.removeItem('selectedVoteKey');

        this.$router.push("/");
      }
    },
    async loadAuthenticatedData() {
      if (this.isLogged) {
        this.keys = await this.services.vegaWallet.listKeys();
        for (const key of this.keys) {
          const accountsResponse = await this.services.vegaGovernance.listAccounts(key.pub);
          if (Array.isArray(accountsResponse.data.accounts)) {
            accountsResponse.data.accounts.forEach(account => {
              if (account.asset === localStorage.getItem('tVoteAssetId') ) {
                key.balance = account.balance;
                this.tVoteKeys.push(key);
                if (this.selectedVoteKey === null) {
                  this.selectedVoteKey = key.pub;
                  localStorage.setItem('selectedVoteKey', key.pub);
                }
              }
            });
          }
        }
      }
    },
    async login() {
      try {
        const isSuccess = await this.services.vegaWallet.login(this.loginData.walletId, this.loginData.passphrase);
        if (isSuccess) {
          localStorage.setItem("vega-token", this.services.vegaWallet.token);
          await this.loadAuthenticatedData();
        }
      } catch (e) {
        this.$notifyMessage('danger', 'Invalid login/password');
      }

    },
    async generateKeyPair() {
      try {
        let parsedMetaData = new Map();
        this.keyPairPairData.metadata.forEach(function (value) {
          let item = value.split("=")
          parsedMetaData.set(item[0], item[1]);
        });
        await this.services.vegaWallet.generateKeypair(this.keyPairPairData.passphrase, parsedMetaData);
        this.$notifyMessage('success', 'Keypair generated.');
        await this.loadAuthenticatedData();
      } catch (e) {
        this.$notifyMessage('danger', 'Keypair generation failed.');
      }
    },

  },
};
</script>
