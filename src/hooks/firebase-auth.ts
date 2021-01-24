import { toRefs, reactive } from "vue"
import firebase from "firebase"

//Required for side-effects
import "firebase/firebase"

import FIREBASE_CONFIG from "./.env.firebase"

// iniialize firebase, this is directly from the firebase documention
// regarding getting started for the web
if (firebase.apps.length == 0) {
  firebase.intializeApp(FIREBASE_CONFIG)
}

export default function () {

  const state = reactive<any>({
    user: null,
    initialized: false
  })

  // run at startup
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

}
return {
  ...toRefs(state),
  //functions
  authCheck,
}
  }
