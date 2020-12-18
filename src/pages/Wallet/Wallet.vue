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
                <base-button block @click="login">Login</base-button>
              </div>
            </div>
          </card>
          <div v-else>
            <card>
              <div class="row">
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
                <div class="col-md-6 mt-2">
                  <base-button block @click="generateKeyPair">Generate Key Pair</base-button>
                </div>
              </div>
            </card>
            <card>
              <div class="row" v-for="address in addresses" :key="address.pub">
                <div class="col-md-12 mt-2">
                  {{ address.pub }}
                  <label class="ml-2">
                    <i class="tim-icons icon-key-25 mr-2"></i>
                    Algo : {{ address.algo }}
                  </label>
                  <div v-for="metadata in address.meta" :key="metadata.key">
                    <label>
                      - {{ metadata.key }} = {{ metadata.value }}
                    </label>
                  </div>
                  <hr class="rounded" style="border-color: white"/>
                </div>
              </div>
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
      addresses: []
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
    await this.loadAuthenticatedData();
  },
  methods: {
    async loadAuthenticatedData() {
      if (this.isLogged) {
        this.addresses = await this.services.vegaWallet.listKeys();
      }
    },
    async login() {
      const isSuccess = await this.services.vegaWallet.login(this.loginData.walletId, this.loginData.passphrase);
      if (isSuccess) {
        localStorage.setItem("vega-token", this.services.vegaWallet.token);
        await this.loadAuthenticatedData();
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
