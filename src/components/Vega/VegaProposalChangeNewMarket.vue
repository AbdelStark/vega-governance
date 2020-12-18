<template>
  <div>
    <div class="row">
      <div class="col-md-6 mt-2">
        <label>
          Instrument code
        </label>
        <h4> {{ change.instrument.code }}</h4>
      </div>
      <div class="col-md-6 mt-2">
        <label>
          Decimal places
        </label>
        <h4> {{ change.decimalPlaces }}</h4>
      </div>
    </div>
    <div v-if="hasRiskParameters">
      <!--card title="Risk Parameters"-->
        <div class="row">
          <div class="col-md-12 mt-2">
            <label>
              Aversion parameter
            </label>
            <h4> {{ change.riskParameters.riskAversionParameter }}</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mt-2">
            <label>
              Tau
            </label>
            <h4> {{ change.riskParameters.tau }}</h4>
          </div>
        </div>
        <div class="row" :v-if="change.riskParameters.hasOwnProperty('params')">
          <div class="col-md-12 mt-2">
            Mu {{ change.riskParameters.params.mu }}
          </div>
          <div class="col-md-12 mt-2">
             R {{ change.riskParameters.params.r }}
          </div>
          <div class="col-md-12 mt-2">
            Sigma {{ change.riskParameters.params.sigma }}
          </div>
        </div>
      <!--/card-->
    </div>
  </div>
</template>

<script>
export default {
  name: "VegaProposalChangeNewMarket",
  props: ['change'],
  methods: {
    hasRiskParameters() {
      return this.change.hasOwnProperty('riskParameters');
    }
  }
}
</script>