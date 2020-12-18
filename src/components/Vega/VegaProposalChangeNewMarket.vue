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
    <div v-if="hasTradingMode">
      <hr class="rounded" style="border-color: white"/>
      <h3>Trading mode</h3>
      <div class="row">
        <div class="col-md-6 mt-2" v-if="change.tradingMode.hasOwnProperty('duration')">
          <label>
            Duration
          </label>
          <h4> {{ change.tradingMode.duration }}</h4>
        </div>
        <div class="col-md-6 mt-2" v-if="change.tradingMode.hasOwnProperty('tickSize')">
          <label>
            Tick size
          </label>
          <h4> {{ change.tradingMode.tickSize }}</h4>
        </div>
      </div>
    </div>
    <div v-if="hasRiskParameters">
      <hr class="rounded" style="border-color: white"/>
      <h3>Risk parameters</h3>
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
          <label>
            Mu
          </label>
          <h4> {{ change.riskParameters.params.mu }}</h4>
        </div>
        <div class="col-md-12 mt-2">
          <label>
            R
          </label>
          <h4> {{ change.riskParameters.params.r }}</h4>
        </div>
        <div class="col-md-12 mt-2">
          <label>
            Sigma
          </label>
          <h4> {{ change.riskParameters.params.sigma }}</h4>
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