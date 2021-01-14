<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <div v-for="vote in myVotes" :key="vote.timestamp">
          <card type="user">
            <p class="card-text">
            </p>
            <div class="author">
              <div class="row">
                <div class="col-md-12">
                  <h1 style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                    {{ proposalTitle(vote.proposal) }}
                  </h1>
                  <h4 class="vegaLabel">
                    {{ proposalSubtitleTitle(vote.proposal) }}
                  </h4>
                  <h1 style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                    {{ vote.value === 'VALUE_YES' ? 'YES' : 'NO' }}
                  </h1>
                </div>
              </div>
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

export default {
  components: {
    FadeTransition
  },
  data() {
    return {
      partyID: localStorage.getItem('selectedVoteKey'),
      myVotes: []
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
      if (this.partyID === null) {
        this.$notifyMessage('warning', 'Select vote key in wallet.');
      } else {
        const partyVotesResponse = await this.services.vegaGovernance.partyVotes(this.partyID);
        const votes = partyVotesResponse.data.votes;
        for (const vote of votes) {
          const proposalResponse = await this.services.vegaGovernance.getProposal(vote.proposalID);
          const proposal = proposalResponse.data.proposal;
          this.myVotes.push({
            proposalID: vote.proposalID,
            value: vote.value,
            proposal: proposal,
          });
        }
        console.log(this.myVotes);
      }
    } catch (e) {
      this.$notifyMessage('danger', 'Data fetching failed.');
      console.error(e);
    }
  },
  methods: {
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
  },
};
</script>
