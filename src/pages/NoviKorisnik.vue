<template>
  <div>
    <h4 class="text-center">Kreiranje novog korisnika</h4>

    <q-form @submit="submitForm">
      <!-- <q-input
        outlined
        class="q-mb-md"
        type="name"
        label="Ime"
        v-model="formData.name"
      /> -->
      <q-input
        outlined
        class="q-mb-md"
        type="email"
        label="Email"
        v-model="formData.email"
      />
      <q-input
        outlined
        class="q-mb-md"
        type="password"
        label="Password"
        v-model="formData.password"
      />
      <div class="q-pa-md column q-gutter-sm">
        <q-btn type="submit" color="primary" label="Kreiraj novog korisnika" />
      </div>
    </q-form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    submitForm() {
      this.createUser(this.formData.email, this.formData.email);
    },

    createUser(email, password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((email) => {
          this.$q.notify({ message: "Novi korisnik je kreiran" });
          this.$router.push("/korisnici");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
