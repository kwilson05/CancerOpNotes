import { toRefs, reactive } from "vue"
import firebase from "firebase"

//Required for side-effects
import "firebase/firebase"

import FIREBASE_CONFIG from "@/firebase-env"

// iniialize firebase, this is directly from the firebase documention
// regarding getting started for the web
if (firebase.apps.length == 0) {
  firebase.initializeApp(FIREBASE_CONFIG)
}


const state = reactive<{ user: any; initialized: boolean; error: any }>({
  user: null,
  initialized: false,
  error: null
});

export default function () {
  // run at startup

  const register = async (email: string, password: string) => {

    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
      state.user = user;
      return user;
    }
    catch (error) {
      state.error = error;
    }
  }

  const logout = () => {
    return firebase.auth().signOut().then(() => {
      state.user = null;
    })
  }

  const login = async (email: string, password: string) => {
    try {
      const user = await firebase.auth().
        signInWithEmailAndPassword(email, password);
      state.user = user;
      return user;
    }
    catch (error) {
      state.error = error;
    }

  }



  const authCheck = () => {
    return new Promise((resolve) => {
      !state.initialized && firebase.auth().onAuthStateChanged(async (_user) => {
        if (_user) {
          state.user = _user
        }
        else {
          state.user = null
        }
        state.initialized = true
        resolve(true)
      })
    })
  }
  return {
    ...toRefs(state),
    login,
    logout,
    register,
    authCheck,
  }
}
