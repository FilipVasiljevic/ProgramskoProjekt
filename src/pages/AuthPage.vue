<template>
  <div>
    <h4 class="text-center">Za login unjeti email i lozinku</h4>

    <q-form @submit="submitForm">
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
        <q-btn type="submit" color="primary" label="Login" />
      </div>
    </q-form>
  </div>
</template>

<script>
//login
import firebase from "firebase";
export default {
  name: "AuthComponent",
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
      this.signInExistingUser(this.formData.email, this.formData.password);
    },
    signInExistingUser(email, password) {
      console.log(email, password);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          this.$q.notify({ message: "Uspješno ste se ulogirali!!" });
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
