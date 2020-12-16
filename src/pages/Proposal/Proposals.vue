<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h5 slot="header" class="title">Proposals</h5>
          <div v-for="proposal in proposals" :key="proposal.id">
            <card type="user">
              <p class="card-text">
              </p>
              <div class="author">
                <div class="block block-one"></div>
                <div class="block block-two"></div>
                <div class="block block-three"></div>
                <div class="block block-four"></div>
                <h3 class="title">{{ proposal.id }}</h3>
                <div class="row">
                  <div class="col-md-6 pr-md-1">
                    <h5 class="card-category">Reference</h5>
                    <h3 class="card-title">
                      <i class="tim-icons icon-badge text-success"></i>
                      {{ proposal.reference }}
                    </h3>
                  </div>
                  <div class="col-md-6 pr-md-1">
                    <h5 class="card-category">State</h5>
                    <h3 class="card-title">
                      <i class="tim-icons icon-button-power text-success"></i>
                      {{ proposal.state }}
                    </h3>
                  </div>
                  <div class="col-md-6 pr-md-1">
                    <h2 style="color: #5cb85c">{{proposal.yesVotes.length}} YES</h2>
                  </div>
                  <div class="col-md-6 pr-md-1">
                    <h2 style="color: #d9534f">{{proposal.noVotes.length}} NO</h2>
                  </div>
                </div>
              </div>
            </card>
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
  data() {
    return {
      proposals: [],
    }
  },
  computed: {
    ...mapState([
      'services',
      'settings',
    ])
  },
  mounted() {
    this.proposals = this.services.vegaGovernance.listProposals();
    console.log(this.proposals);
  },
  methods: {},
};
</script>
