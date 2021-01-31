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
        <ion-input
          v-model="credentials.email"
          placeholder="Enter an email"
          type="email"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Password</ion-label>
        <ion-input
          v-model="credentials.password"
          placeholder="Enter a password"
          type="password"
        ></ion-input>
      </ion-item>

      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="100%">
            <ion-button @click="doRegister">Register</ion-button>
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
import { reactive } from "vue";
import { useRouter } from "vue-router";
import useFirebaseAuth from "@/composable/firebase-auth";
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
    const router = useRouter();
    const { register } = useFirebaseAuth();
    const state = useFirebaseAuth();

    const credentials = reactive({ email: "", password: "" });

    const doRegister = async () => {
      await register(credentials.email, credentials.password);
      if (state.user.value) {
        router.replace({ path: "/tabs/vitals" });
      }
    };
    return {
      credentials,
      doRegister,
      router,
    };
  },
};
</script>
