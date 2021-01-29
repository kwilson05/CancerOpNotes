<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cancer Vitals</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label position="stacked">Email</ion-label>
        <ion-input placeholder="Enter an email" type="email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Password</ion-label>
        <ion-input placeholder="Enter a password" type="password"></ion-input>
      </ion-item>

      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="100%">
            <ion-button>Register</ion-button>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <ion-col size="100%">
            <ion-text> or </ion-text>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <ion-col size="100%">
            <ion-button @click="router.replace({ path: '/login' })"
              >Login</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
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
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/vue";
import { useRouter } from "vue-router";
export default {
  name: "Register",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
  },
  setup() {
    return {
      router: useRouter(),
    };
  },
};
</script>
