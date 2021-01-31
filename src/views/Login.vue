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
        <ion-label
          color="danger"
          v-show="hasEmailValidationError"
          position="stacked"
        >
          Please enter an email
        </ion-label>
        <ion-input v-model="credentials.email" type="email"></ion-input>
      </ion-item>
      <ion-item class="ion-margin-top">
        <ion-label position="stacked">Password</ion-label>
        <ion-label
          color="danger"
          v-show="hasPaswordValidationError"
          position="stacked"
        >
          Please enter a password
        </ion-label>
        <ion-input v-model="credentials.password" type="password"></ion-input>
      </ion-item>

      <ion-grid>
        <ion-row v-show="hasLoginError" class="ion-justify-content-center">
          <ion-col size="100%">
            <ion-label color="danger">{{ loginError }}</ion-label>
          </ion-col>
        </ion-row>
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
import { reactive, ref, computed } from "vue";
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
    const { login, user, error } = useFirebaseAuth();
    const credentials = reactive({ email: "", password: "" });
    const triedLogin = ref(false);
    const hasEmailValidationError = computed(
      () => triedLogin.value && credentials.email === ""
    );
    const hasPasswordValidationError = computed(
      () => triedLogin.value && credentials.password === ""
    );

    const loginError = ref("");

    const hasLoginError = ref(false);

    const doLogin = async () => {
      triedLogin.value = true;
      console.log(hasPasswordValidationError.value);
      if (!hasEmailValidationError.value && !hasPasswordValidationError.value) {
        await login(credentials.email, credentials.password);
      }

      if (user.value) {
        router.replace({ path: "/tabs/vitals" });
      } else if (error.value) {
        hasLoginError.value = true;
        loginError.value = error.value.message;
      }
    };
    return {
      doLogin,
      credentials,
      router,
    };
  },
};
</script>
