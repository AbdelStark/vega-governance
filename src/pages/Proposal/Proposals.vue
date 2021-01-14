<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <div class="row">
          <div class="col-md-12 ml-2 mb-2"
               style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;color: white">
            <b-form-checkbox
                v-on:change="onActiveOnlyChange"
                v-model="activeProposalsOnly" name="check-button" switch size="lg">
              Open only
            </b-form-checkbox>
          </div>
        </div>
        <div v-for="proposal in proposals" :key="proposal.id">
          <card type="user">
            <p class="card-text">
            </p>
            <div class="author">
              <div class="row">
                <div class="col-md-12">
                  <h1 style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">{{
                      proposalTitle(proposal)
                    }}</h1>
                  <h4 class="vegaLabel" v-if="proposalSubtitleTitle(proposal) !== null">
                    {{ proposalSubtitleTitle(proposal) }}</h4>
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
                  <h2 style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">{{ proposal.state }}</h2>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 pr-md-1">
                  <h4 class="vegaTitle">VOTES FOR / AGAINST</h4>
                  <h4 class="vegaLabel">{{ proposal.yesVotes.length }} / {{ proposal.noVotes.length }}</h4>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <b-progress
                      height="3rem"
                      :max="proposal.voteResultProgressMax">
                    <b-progress-bar
                        class="progressBarText"
                        show-progress
                        :value="proposal.voteResultProgressYes"
                        variant="success"></b-progress-bar>
                    <b-progress-bar
                        class="progressBarText"
                        show-progress
                        :value="proposal.voteResultProgressNo"
                        variant="danger"></b-progress-bar>
                  </b-progress>
                </div>
              </div>

              <div class="row mt-2" v-if="proposal.state === 'Open'">
                <div class="col-md-12">
                  <b-button-group>
                    <base-button :loading="voteLoading" class="btn-success" size="lg" @click="onVoteYes(proposal)">
                      YES
                    </base-button>
                    <base-button :loading="voteLoading" class="btn-danger" size="lg" @click="onVoteNo(proposal)">
                      NO
                    </base-button>
                  </b-button-group>
                </div>
              </div>
            </div>
            <div>
            </div>

            <b-collapse :id="proposalDetailsCollapseId(proposal)" class="mt-2">
              <vega-proposal-details :proposal="proposal">
              </vega-proposal-details>
            </b-collapse>

            <div class="row">
              <base-button
                  v-b-toggle="proposalDetailsCollapseId(proposal)"
                  @click="toggleDetailsText"
                  class="btn btn-lg btn-simple mb-2 mt-2" style="color: white" block>
                {{ detailsText }}
              </base-button>
            </div>
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
      detailsText: 'Show details',
      voteLoading: false,
      activeProposalsOnly: false,
    }
  },
  computed: {
    ...mapState([
      'services',
      'settings',
    ])
  },
  async mounted() {
    await this.refreshProposals();
  },
  methods: {
    voteResultProgressMax(proposal) {
      return proposal.yesVotes.length + proposal.noVotes.length;
    },
    voteResultProgressYes(proposal) {
      return proposal.yesVotes.length;
    },
    voteResultProgressNo(proposal) {
      return proposal.noVotes.length;
    },
    async onActiveOnlyChange(activeOnly) {
      if (activeOnly) {
        const filteredProposals = [];
        this.proposals.forEach(proposal => {
          if (proposal.state === 'Open') {
            filteredProposals.push(proposal);
          }
        });
        this.proposals = filteredProposals;
      } else {
        await this.refreshProposals();
      }
    },
    async refreshProposals() {
      try {
        const tmpProposals = [];
        const response = await this.services.vegaGovernance.listProposals();
        const proposals = response.data.proposals;
        for(const proposal of proposals){
          let weightingsAllVotes = 0;
          let weightingsVoteFor = 0;
          let weightingsVoteAgainst = 0;
          for(const yesVote of proposal.yesVotes){
            const balance = await this.services.vegaGovernance.getTVoteBalance(yesVote.party.id);
            weightingsAllVotes+=balance;
            weightingsVoteFor+=balance;
          }
          for(const noVote of proposal.noVotes){
            const balance = await this.services.vegaGovernance.getTVoteBalance(noVote.party.id);
            weightingsAllVotes+=balance;
            weightingsVoteAgainst+=balance;
          }
          console.log(weightingsAllVotes, weightingsVoteFor, weightingsVoteAgainst);
          proposal.voteResultProgressMax =  weightingsAllVotes;
          proposal.voteResultProgressYes = weightingsVoteFor;
          proposal.voteResultProgressNo = weightingsVoteAgainst;
          tmpProposals.push(proposal);
        }
        this.proposals = tmpProposals.sort((a, b) => {

          if (a.terms.closingDatetime > b.terms.closingDatetime) {
            return -1;
          }
          if (a.terms.closingDatetime < b.terms.closingDatetime) {
            return 1;
          }
          return 0;
        });
      } catch (e) {
        this.$notifyMessage("danger", "Cannot load, check settings");
        console.error(e);
      }
    },
    toggleDetailsText() {
      if (this.detailsText === 'Show details') {
        this.detailsText = 'Hide details';
      } else {
        this.detailsText = 'Show details';
      }
    },
    async onVoteYes(proposal) {
      await this.doVote(proposal, 'VALUE_YES');
    },
    async onVoteNo(proposal) {
      await this.doVote(proposal, 'VALUE_NO');
    },
    async doVote(proposal, voteValue) {
      try {
        this.voteLoading = true;
        if (localStorage.getItem('selectedVoteKey') === null) {
          this.$notifyMessage('danger', 'No tVote key selected.');
        } else {
          console.log(`user voted ${voteValue} for proposal: ${proposal.id}`);
          const time = await this.services.vegaGovernance.getTime();
          console.log('calling prepare vote');
          const prepareVoteResult = await this.services.vegaGovernance.prepareVote(
              proposal.id,
              localStorage.getItem('selectedVoteKey'),
              time.timestamp,
              voteValue
          );
          console.log('prepare vote response: ', prepareVoteResult);
          const blob = prepareVoteResult.data.blob;
          console.log('calling sign transaction');
          const response = await this.services.vegaWallet.signTransaction(
              blob,
              localStorage.getItem('selectedVoteKey'),
              true
          );
          console.log('sign transaction response: ', response);
        }
        await this.refreshProposals();
        await this.onActiveOnlyChange(this.activeProposalsOnly);
        this.voteLoading = false;
      } catch (e) {
        this.$notifyMessage('danger', 'Vote failed.');
        this.voteLoading = false;
      }
    },
    proposalDetailsCollapseId(proposal) {
      return 'collapse-proposal-details-' + proposal.id;
    },
    proposalTitle(proposal) {
      return guessProposalChangeType(proposal);
    },
    proposalSubtitleTitle(proposal) {
      const proposalType = guessProposalChangeType(proposal);
      if (proposalType === proposalChangeTypes.NewMarket && proposal.terms.change.hasOwnProperty('instrument')) {
        return proposal.terms.change.instrument.code;
      } else {
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
