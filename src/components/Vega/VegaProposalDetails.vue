<template>
  <div>
    <div class="row">
      <div class="col-md-6 mt-2">
        <label class="vegaTitle">
          <font-awesome-icon icon="calendar-alt"></font-awesome-icon>
          CLOSING
        </label>
        <h4 class="vegaLabel"> {{formatDate(proposal.terms.closingDatetime)}}</h4>
      </div>
      <div class="col-md-6 mt-2">
        <label class="vegaTitle">
          <font-awesome-icon icon="calendar-alt"></font-awesome-icon>
          ENACTEMENT
        </label>
        <h4 class="vegaLabel"> {{formatDate(proposal.terms.enactmentDatetime)}}</h4>
      </div>
    </div>
    <div v-if="isNewMarket">
      <vega-proposal-change-new-market :change="proposal.terms.change"></vega-proposal-change-new-market>
    </div>
  </div>
</template>

<script>
import {guessProposalChangeType, proposalChangeTypes} from "@/util/proposal-util";
import VegaProposalChangeNewMarket from "@/components/Vega/VegaProposalChangeNewMarket";

export default {
  name: "VegaProposalDetails",
  components: {VegaProposalChangeNewMarket},
  props: ['proposal'],
  methods: {
    isNewMarket(){
      console.log(guessProposalChangeType(this.proposal) );
      return guessProposalChangeType(this.proposal) === proposalChangeTypes.NewMarket;
    },
    formatDate(iso8601Date) {
      const date = new Date(Date.parse(iso8601Date));
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
  }
}
</script>