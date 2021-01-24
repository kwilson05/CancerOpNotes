<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Vitals</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Vitals</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-button @click="router.replace({ path: '/register' })">
        Logout</ion-button
      >
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/vue";

import { useRouter } from "vue-router";

export default {
  name: "Vitals",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
  },
  setup() {
    return {
      router: useRouter(),
    };
  },
};
</script>
