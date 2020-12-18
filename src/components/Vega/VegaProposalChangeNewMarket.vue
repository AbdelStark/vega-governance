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
  </div>
</template>

<script>
export default {
  name: "VegaProposalChangeNewMarket",
  props: ['change'],
  methods: {

  }
}
</script>