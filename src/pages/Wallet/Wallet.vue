<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h5 slot="header" class="title">Wallet</h5>
          <card>
            <h5 slot="header" class="title">Login</h5>
            <div class="row">
              <div class="col-md-6 mt-2">
                <label>
                  <i class="tim-icons icon-link-72 mr-2"></i>
                  Wallet ID
                </label>
                <base-input v-model="login.walletId"></base-input>
              </div>
              <div class="col-md-6 mt-2">
                <label>
                  <i class="tim-icons icon-key-25 mr-2"></i>
                  Passphrase
                </label>
                <base-input type="password" v-model="login.passphrase"></base-input>
              </div>
            </div>
          </card>
        </card>
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
      login: {
        walletId: '',
        passphrase: '',
      }
    }
  },
  computed: {
    ...mapState([
      'services',
      'settings',
    ])
  },
  mounted() {

  },
  methods: {},
};
</script>
