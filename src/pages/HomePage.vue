<template>
  <q-page class="flex q-pa-md">
    Welcome Home {{ user }}
    <q-space />
    <div>
      <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        size="md"
        label="Logout"
        @click="logout"
        color="primary"
      />
      <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        size="md"
        label="Dodavanje naloga"
        @click="otvaranjedodavanja"
        color="primary"
      />
      <q-btn
        class="flex flex-center q-px-lg q-py-sm q-mb-md"
        size="md"
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
        console.log("user name is null");
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

    logout() {
      firebase.auth().signOut();
      this.$router
        .push("/")
        .then(() => {
          this.$q.notify({ message: "Sign Out Success." });
        })
        .catch((error) => console.log("error", error));
    },
  },
};
</script>
