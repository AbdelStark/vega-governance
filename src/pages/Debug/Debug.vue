<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <card>
          <h5 slot="header" class="title">Debug</h5>
          <div class="row">
            <div class="col-md-12">
              <base-input label="Title" v-model="notification.title"></base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <base-input label="Body" v-model="notification.body"></base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <base-button @click="showLocalNotification" n>Show</base-button>
            </div>
          </div>
        </card>
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
      notification: {
        title: 'title',
        body: 'body',
      }
    }
  },
  computed: {
    ...mapState([
      'services',
      'settings',
    ])
  },
  mounted() {

  },
  methods: {
    showLocalNotification(){
      this.services.notification.showNotification(
          this.notification.title,
          {
            body: this.notification.body,
          }
      );
    }
  },
};
</script>
