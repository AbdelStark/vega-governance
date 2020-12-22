<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
          <div v-for="proposal in proposals" :key="proposal.id">
            <card type="user">
              <p class="card-text">
              </p>
              <div class="author">
                <!--div class="block block-one"></div>
                <div class="block block-two"></div>
                <div class="block block-three"></div>
                <div class="block block-four"></div-->

                <div class="row">
                  <div class="col-md-12">
                    <h4 class="vegaTitle">{{ proposalTitle(proposal) }}</h4>
                    <h4 class="vegaLabel" v-if="proposalSubtitleTitle(proposal) !== null">{{ proposalSubtitleTitle(proposal) }}</h4>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <h4 class="vegaTitle">DEADLINE</h4>
                    <h4 class="vegaLabel">{{ formatDate(proposal.datetime) }}</h4>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 pr-md-1">
                    <h4 class="vegaTitle">STATUS</h4>
                    <h4 class="vegaLabel">{{ proposal.state }}</h4>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 pr-md-1">
                    <h4 class="vegaTitle">VOTES FOR / AGAINST</h4>
                    <h4 class="vegaLabel">{{ proposal.yesVotes.length }}  / {{ proposal.noVotes.length }}</h4>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <b-progress
                        height="3rem"
                        :max="proposal.yesVotes.length+proposal.noVotes.length">
                      <b-progress-bar
                          class="progressBarText"
                          show-progress
                          :value="proposal.yesVotes.length"
                          variant="success"></b-progress-bar>
                      <b-progress-bar
                          class="progressBarText"
                          show-progress
                          :value="proposal.noVotes.length"
                          variant="danger"></b-progress-bar>
                    </b-progress>
                  </div>
                </div>


                <div class="row">
                  <table class="mt-2" style="text-align: center">
                    <tr>
                      <td>
                        <font-awesome-icon @click="onVoteYes(proposal)"
                                           style="color: #00f2c3; display: inline-block; width: 100%;"
                                           class="fa-3x"
                                           icon="thumbs-up"></font-awesome-icon>
                      </td>
                      <td>
                        <font-awesome-icon @click="onVoteNo(proposal)"
                                           style="color: #fd5d93; display: inline-block; width: 100%;"
                                           class="fa-3x"
                                           icon="thumbs-down"></font-awesome-icon>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div>
              </div>
              <div class="row">
                <base-button
                    v-b-toggle="proposalDetailsCollapseId(proposal)"
                    class="btn btn-lg btn-simple mb-2 mt-2" style="color: white" block>
                  Details
                </base-button>
              </div>
              <b-collapse :id="proposalDetailsCollapseId(proposal)" class="mt-2">
                <vega-proposal-details :proposal="proposal">

                </vega-proposal-details>
              </b-collapse>
            </card>
          </div>
      </div>
      <router-view></router-view>
    </fade-transition>
  </div>
</template>
<script>
import {FadeTransition} from 'vue2-transitions';
import {mapState} from "vuex";
import {guessProposalChangeType, proposalChangeTypes} from "@/util/proposal-util";
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
    try {
      const response = await this.services.vegaGovernance.listProposals();
      this.proposals = response.data.proposals;
    } catch (e) {
      this.$notifyMessage("danger", "Cannot load, check settings");
    }
  },
  methods: {
    onVoteYes(proposal) {
      console.log('user voted YES for proposal: ', proposal.id);
    },
    onVoteNo(proposal) {
      console.log('user voted NO for proposal: ', proposal.id);
    },
    proposalDetailsCollapseId(proposal) {
      return 'collapse-proposal-details-' + proposal.id;
    },
    proposalTitle(proposal) {
      return guessProposalChangeType(proposal);
    },
    proposalSubtitleTitle(proposal) {
      const proposalType = guessProposalChangeType(proposal);
      if(proposalType === proposalChangeTypes.NewMarket && proposal.terms.change.hasOwnProperty('instrument')){
        return proposal.terms.change.instrument.code;
      }else {
        return null;
      }
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
