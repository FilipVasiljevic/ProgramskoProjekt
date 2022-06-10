<template>
  <div class="q-pa-md column q-gutter-sm">Dobro dosao {{ user }}</div>
  <!-- <div>
    <q-img
      width="299px"
      height="367px"
      src="src\pages\IMG-d64a3f374e1ca8aa72e0d91575fa6f52-V.jpg"
      ratio="1/1"
    />
  </div> -->
  <div class="q-pa-md column q-gutter-sm">
    <q-btn label="Nalozi" color="primary" @click="otvaranjeNaloga" />
    <q-btn label="Korisnici" color="primary" @click="otvaranjeKorisnika" />
  </div>
  <div class="q-pa-md column q-gutter-sm">
    <q-btn size="md" label="Logout" @click="logout" color="primary" />
  </div>
  <!-- <div class="q-pa-md column q-gutter-sm">
    <q-img
      width="806px"
      height="242px"
      src="src\pages\IMG-0ebc488ed597b383f9b8dc060899ddd4-V.jpg"
    />
  </div> -->
</template>

<script>
import firebase from "firebase";
export default {
  name: "HomePage",
  data() {
    return {
      user: "",
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((auth) => {
      if (auth) {
        this.user = auth.displayName;
      } else {
        console.log("username is null");
      }
    });
  },
  methods: {
    otvaranjeNaloga() {
      this.$router.push("/nalozi");
    },
    otvaranjeKorisnika() {
      this.$router.push("/korisnici");
    },

    logout() {
      firebase.auth().signOut();
      this.$router
        .push("/")
        .then(() => {
          this.$q.notify({ message: "Uspješan logout!!" });
        })
        .catch((error) => console.log("error", error));
    },
  },
};
</script>
