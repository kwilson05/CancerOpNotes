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


const state = reactive<{ user: any; initialized: boolean, error: any }>({
  user: null,
  initialized: false,
  error: null
})

export default function () {
  // run at startup

  const logout = () => {
    return firebase.auth().signOut().then(() => {
      state.user = null;
    })
  }

  const login = (email: string, password: string) => {
    return firebase.auth().
      signInWithEmailAndPassword(email, password).
      then((user) => {
        state.user = user;
        state.error = null;
        return user;
      }, error => {
        state.error = error;
        throw error;
      })
  }



  const authCheck = () => {
    return new Promise((resolve, reject) => {
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
    authCheck,
  }
}
