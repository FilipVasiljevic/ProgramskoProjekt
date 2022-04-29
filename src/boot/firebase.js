import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAlruCO68db8KaNbIaDa8WnE7IOCBSCBzQ",
  authDomain: "evidencijaservisnihnaloga.firebaseapp.com",
  databaseURL:
    "https://evidencijaservisnihnaloga-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "evidencijaservisnihnaloga",
  storageBucket: "evidencijaservisnihnaloga.appspot.com",
  messagingSenderId: "1012416515760",
  appId: "1:1012416515760:web:2ceee44ea3ff94b197b575",
  measurementId: "G-B6YD2NLCEN",
};

firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export default firebase;
