<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h5 slot="header" class="title">Settings</h5>
          <div class="row">
            <div class="col-md-12 mt-2">
              <label>Wallet URL </label>
              <base-input  v-model="walletUrl"></base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mt-2">
              <label>Governance URL </label>
              <base-input v-model="governanceUrl"></base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 mt-2">
              <base-button block @click="validate">OK</base-button>
            </div>
          </div>
        </card>
      </div>
      <router-view></router-view>
    </fade-transition>
  </div>
</template>
<script>
import {FadeTransition} from 'vue2-transitions';
import {mapState} from "vuex";
import {updateSettingsOnLocalStorage} from "@/settings";

export default {
  components: {
    FadeTransition
  },
  data() {
    return {
      walletUrl : '',
      governanceUrl : ''
    }
  },
  computed: {
    ...mapState([
      'services',
      'settings',
    ])
  },
  mounted() {
    this.walletUrl = this.settings.vega.wallet.endpoint;
    this.governanceUrl = this.settings.vega.governance.endpoint;
  },
  methods: {
    async validate () {
      updateSettingsOnLocalStorage((settings)=>{
        settings.vega.wallet.endpoint = this.walletUrl;
        settings.vega.governance.endpoint = this.governanceUrl;
      });
      this.settings.vega.wallet.endpoint= this.walletUrl;
      this.settings.vega.governance.endpoint= this.governanceUrl;
      this.$store.commit("updateServices", this.settings);
      window.location.reload();
    }
  },
};
</script>
