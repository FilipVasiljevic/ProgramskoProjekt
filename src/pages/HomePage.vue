<template>
  <q-page class="flex q-pa-md">
    Dobro dosao {{ user }}
    <q-space />
    <div>
      <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        size="md"
        label="Logout"
        @click="logout"
        color="primary"
      />
    </div>
    <div class="flex-center q-pa-md column q-gutter-sm">
      <q-btn label="Nalozi" color="primary" @click="otvaranjeNaloga" />
      <q-btn label="Korisnici" color="primary" @click="otvaranjeKorisnika" />
      <q-btn
        label="Dodavanje naloga"
        @click="otvaranjedodavanja"
        color="primary"
      />
      <q-btn
        label="Završavanje naloga"
        @click="otvaranjezavrsavanja"
        color="primary"
      />
    </div>
  </q-page>
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
    otvaranjedodavanja() {
      this.$router.push("/dodavanje");
    },
    otvaranjezavrsavanja() {
      this.$router.push("/zavrsavanje");
    },
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
