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

                <label
                    v-b-toggle="proposalDetailsCollapseId(proposal)"
                    class="btn btn-lg btn-simple mb-4 btn-primary"
                >
                  {{ proposalTitle(proposal) }}
                  <font-awesome-icon icon="info-circle"/>
                </label>
                <div class="row">
                  <div class="col-md-12">
                    <h2>{{ formatDate(proposal.datetime) }}</h2>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 pr-md-1">
                    <h5 class="card-category">Reference</h5>
                    <h3 class="card-title">
                      <i class="tim-icons icon-link-72 text-success"></i>
                      {{ proposal.reference }}
                    </h3>
                  </div>
                  <div class="col-md-6 pr-md-1">
                    <h5 class="card-category">State</h5>
                    <h3 class="card-title">
                      <i :class="classForProposalState(proposal.state)"></i>
                      {{ proposal.state }}
                    </h3>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 pr-md-1">
                    <h2 style="color: #5cb85c">{{ proposal.yesVotes.length }} YES</h2>
                  </div>
                  <div class="col-md-6 pr-md-1">
                    <h2 style="color: #d9534f">{{ proposal.noVotes.length }} NO</h2>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <b-progress :max="proposal.yesVotes.length+proposal.noVotes.length">
                      <b-progress-bar :value="proposal.yesVotes.length" variant="success"></b-progress-bar>
                      <b-progress-bar :value="proposal.noVotes.length" variant="danger"></b-progress-bar>
                    </b-progress>
                  </div>
                </div>
              </div>
              <b-collapse :id="proposalDetailsCollapseId(proposal)" class="mt-2">
                <vega-proposal-details :proposal="proposal">

                </vega-proposal-details>
              </b-collapse>
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
import {guessProposalChangeType} from "@/util/proposal-util";
import VegaProposalDetails from "@/components/Vega/VegaProposalDetails";

export default {
  components: {
    VegaProposalDetails,
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
  async mounted() {
    const response = await this.services.vegaGovernance.listProposals();
    this.proposals = response.data.proposals;
  },
  methods: {
    proposalDetailsCollapseId(proposal) {
      return 'collapse-proposal-details-' + proposal.id;
    },
    proposalTitle(proposal) {
      return guessProposalChangeType(proposal);
    },
    formatDate(iso8601Date) {
      const date = new Date(Date.parse(iso8601Date));
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
    classForProposalState(state) {
      if (state === 'Open') {
        return 'tim-icons icon-button-power text-success';
      } else if (state === 'Rejected' || state === 'Declined') {
        return 'tim-icons icon-button-power text-danger';
      } else {
      }
      return 'tim-icons';
    }
  },
};
</script>
