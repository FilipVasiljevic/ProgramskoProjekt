<template>
  <div>
    <h4 class="text-center">Kreiranje novog korisnika</h4>

    <q-form @submit="submitForm">
      <q-input
        outlined
        class="q-mb-md"
        type="name"
        label="Ime"
        v-model="formData.name"
      />
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
      this.createUser(
        this.formData.name,
        this.formData.email,
        this.formData.email
      );
    },

    createUser(name, email, password) {
      let newUser = {
        Name: name,
        Email: email,
      };
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          firebase
            .firestore()
            .collection("Employees")
            .add(newUser)
            .then((docRef) => {
              docRef.set({ Id: docRef.id }, { merge: true });
              this.$q.notify({ message: "Novi korisnik je kreiran" });
              this.$router.push("/korisnici");
              firebase
                .auth()
                .currentUser.sendEmailVerification()
                .then(() => {
                  this.$q.notify({ message: "Mail poslan" });
                })
                .catch((error) => {
                  this.$q.notify({ message: error });
                });
            })
            .catch((error) => {
              this.$q.notify({ message: error });
            });
        })
        .catch((error) => {
          this.$q.notify({ message: error });
        });
    },
  },
};
</script>
