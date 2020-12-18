<template>
  <card>
    <div class="row">
      <div class="col-md-6 mt-2">
        <label>
          <i class="tim-icons icon-link-72 mr-2"></i>
          Closing
        </label>
        <h4> {{formatDate(proposal.terms.closingDatetime)}}</h4>
      </div>
      <div class="col-md-6 mt-2">
        <label>
          <i class="tim-icons icon-key-25 mr-2"></i>
          Enactement
        </label>
        <h4> {{formatDate(proposal.terms.enactmentDatetime)}}</h4>
      </div>
    </div>
  </card>
</template>

<script>
export default {
  name: "VegaProposalDetails",
  props: ['proposal'],
  methods: {
    formatDate(iso8601Date) {
      const date = new Date(Date.parse(iso8601Date));
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },
  }
}
</script>