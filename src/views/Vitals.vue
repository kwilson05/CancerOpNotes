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

      {{ user.email }}

      <ion-button @click="doLogout"> Logout</ion-button>
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
import useFirebaseAuth from "../composable/firebase-auth";

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
    const { logout, user } = useFirebaseAuth();
    const router = useRouter();
    const doLogout = async () => {
      await logout();
      router.replace({ path: "/login" });
    };
    return {
      doLogout,
      user,
    };
  },
};
</script>
