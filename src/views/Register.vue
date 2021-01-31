<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cancer Vitals</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding" :fullscreen="true">
      <ion-item>
        <ion-label position="stacked">Full Name</ion-label>
        <ion-label
          color="danger"
          v-show="hasNameValidationError"
          position="stacked"
        >
          Please enter a name
        </ion-label>
        <ion-input v-model="credentials.name" type="text"></ion-input>
      </ion-item>

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
      <ion-item>
        <ion-label position="stacked">Password</ion-label>
        <ion-label
          color="danger"
          v-show="hasPasswordValidationError"
          position="stacked"
        >
          Please enter a password
        </ion-label>
        <ion-input v-model="credentials.password" type="password"></ion-input>
      </ion-item>

      <ion-grid>
        <ion-row
          v-show="hasRegistrationError"
          class="ion-justify-content-center"
        >
          <ion-col size="100%">
            <ion-label color="danger">{{ registrationError }}</ion-label>
          </ion-col>
        </ion-row>
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
  IonRow,
  IonCol,
  IonGrid,
} from "@ionic/vue";
import { reactive, ref, computed } from "vue";
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
    IonRow,
    IonCol,
    IonGrid,
  },
  setup() {
    const router = useRouter();
    const { register } = useFirebaseAuth();
    const state = useFirebaseAuth();

    const triedToRegister = ref(false);
    const hasRegistrationError = ref(false);
    const registrationError = ref("");

    const credentials = reactive({ email: "", password: "", name: "" });

    const hasNameValidationError = computed(
      () => triedToRegister.value && credentials.name === ""
    );

    const hasEmailValidationError = computed(
      () => triedToRegister.value && credentials.email === ""
    );

    const hasPasswordValidationError = computed(
      () => triedToRegister.value && credentials.password === ""
    );

    const doRegister = async () => {
      triedToRegister.value = true;
      if (
        !hasNameValidationError.value &&
        !hasPasswordValidationError.value &&
        !hasEmailValidationError.value
      ) {
        await register(credentials.email, credentials.password);
      }

      if (state.user.value) {
        router.replace({ path: "/tabs/vitals" });
      } else if (state.error.value) {
        hasRegistrationError.value = true;
        registrationError.value = state.error.value.message;
      }
    };
    return {
      credentials,
      doRegister,
      router,
      triedToRegister,
      hasPasswordValidationError,
      hasEmailValidationError,
      hasNameValidationError,
      registrationError,
      hasRegistrationError,
    };
  },
};
</script>
