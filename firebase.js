import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB-jeFbbXzROor5LSbR7QKyoR8Em-wDvKs",
    authDomain: "rnrecipes.firebaseapp.com",
    databaseURL: "https://rnrecipes.firebaseio.com",
    projectId: "rnrecipes",
    storageBucket: "rnrecipes.appspot.com"
}

export default  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();