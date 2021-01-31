<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="ion-justify-content-between">
        <ion-title> Cancer Vitals </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding" :fullscreen="true">
      <ion-item>
        <ion-label position="stacked">Email</ion-label>
        <ion-input
          @ionChange="($event) => (credentials.email = $event.target.value)"
          placeholder="Enter an email"
          type="email"
        ></ion-input>
      </ion-item>
      <ion-item class="ion-margin-top">
        <ion-label position="stacked">Password</ion-label>
        <ion-input
          @ionChange="($event) => (credentials.password = $event.target.value)"
          placeholder="Enter a password"
          type="password"
        ></ion-input>
      </ion-item>

      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="100%">
            <ion-button @click="doLogin">Login</ion-button>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <ion-col size="100%">
            <ion-text> or </ion-text>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center">
          <ion-col size="100%">
            <ion-button @click="router.replace({ path: '/register' })"
              >Register</ion-button
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
  IonGrid,
  IonRow,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import useFirebaseAuth from "@/composable/firebase-auth";
export default {
  name: "Login",
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
    IonGrid,
    IonRow,
  },
  setup() {
    const router = useRouter();
    const { login } = useFirebaseAuth();

    const credentials = reactive({ email: "", password: "" });

    const doLogin = async () => {
      await login(credentials.email, credentials.password);
      router.replace({ path: "/tabs/vitals" });
    };
    return {
      doLogin,
      credentials,
      router,
    };
  },
};
</script>
