<template>
  <div>
    <div class="row">
      <div class="col-md-6 mt-2">
        <label class="vegaTitle">
          INSTRUMENT
        </label>
        <h4 class="vegaLabel"> {{ change.instrument.code }}</h4>
      </div>
      <div class="col-md-6 mt-2">
        <label class="vegaTitle">
          DECIMAL
        </label>
        <h4 class="vegaLabel"> {{ change.decimalPlaces }}</h4>
      </div>
    </div>
    <div v-if="hasTradingMode">
      <hr class="rounded" style="border-color: white"/>
      <h3 class="vegaTitle">TRADING</h3>
      <div class="row">
        <div class="col-md-6 mt-2" v-if="change.tradingMode.hasOwnProperty('duration')">
          <label class="vegaTitle">
            DURATION
          </label>
          <h4 class="vegaLabel"> {{ change.tradingMode.duration }}</h4>
        </div>
        <div class="col-md-6 mt-2" v-if="change.tradingMode.hasOwnProperty('tickSize')">
          <label class="vegaTitle">
            TICK SIZE
          </label>
          <h4 class="vegaLabel"> {{ change.tradingMode.tickSize }}</h4>
        </div>
      </div>
    </div>
    <div v-if="hasRiskParameters">
      <hr class="rounded" style="border-color: white"/>
      <h3 class="vegaTitle">RISK PARAMETERS</h3>
      <!--card title="Risk Parameters"-->
      <div class="row">
        <div class="col-md-12 mt-2">
          <label class="vegaTitle">
            AVERSION PARAMETERS
          </label>
          <h4 class="vegaLabel"> {{ change.riskParameters.riskAversionParameter }}</h4>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 mt-2">
          <label class="vegaTitle">
            TAU
          </label>
          <h4 class="vegaLabel"> {{ change.riskParameters.tau }}</h4>
        </div>
      </div>
      <div class="row" :v-if="change.riskParameters.hasOwnProperty('params')">
        <div class="col-md-12">
          <h4 class="vegaLabel">Mu {{ change.riskParameters.params.mu }} - R {{ change.riskParameters.params.r }} - Sigma
            {{ change.riskParameters.params.sigma }}</h4>
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
    },
    hasTradingMode() {
      return this.change.hasOwnProperty('tradingMode');
    }
  }
}
</script>