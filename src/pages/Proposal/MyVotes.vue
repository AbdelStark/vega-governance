<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>

      </div>
      <router-view></router-view>
    </fade-transition>
  </div>
</template>
<script>
import {FadeTransition} from 'vue2-transitions';
import {mapState} from "vuex";

export default {
  components: {
    FadeTransition
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'services',
      'settings',
    ])
  },
  async mounted() {
  },
  methods: {
  },
};
</script>
