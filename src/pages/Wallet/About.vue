<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h3>
            Vega Governance Web based portal.
          </h3>
          <p class="card-body">
            This website is a mobile friendly web based portal to view, manage and submit proposal votes.
          </p>
          <div class="row">
            <div class="col-md-12">
              <a href="https://docs.testnet.vega.xyz/">Vega documentation</a>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <a href="https://docs.testnet.vega.xyz/docs/api-howtos/proposals/">Vega Governance and proposals</a>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <a href="https://discord.com/invite/bkAF3Tu">Vega Discord Chat</a>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <a href="https://community.vega.xyz/c/vega-bounties/18">Vega Community Forums</a>
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

export default {
  components: {
    FadeTransition
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
