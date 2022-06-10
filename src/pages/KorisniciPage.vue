<!--
dodavanje korisnika
brisanje korisnika -->
<template>
  <div class="q-pa-md column q-gutter-sm">
    <q-btn
      color="primary"
      label="Kreiranje novog korisnika"
      @click="otvaranjeNovogKorisnika"
    />
    <q-btn
      :disable="this.selected.length === 0"
      color="primary"
      label="Obrisi korisnika"
      icon="delete"
      @click="obrisiKorisnika"
    />
  </div>

  <div class="q-pa-md">
    <q-table
      title="Zaposlenici"
      :rows="tableData"
      :columns="columns"
      row-key="Id"
      :selected-rows-label="getSelectedString"
      selection="single"
      v-model:selected="selected"
      :rows-per-page-option="[0]"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";

export default {
  data() {
    const selected = ref([]);

    return {
      selected: [],
      editRowDialog: false,
      deleteRowDialog: false,
      Name: null,
      Email: null,
      columns: [
        {
          name: "Name",
          label: "Ime zaposlenika",
          field: "Name",
          sortable: true,
        },
        {
          name: "Email",
          label: "Email zaposlenika",
          field: "Email",
          sortable: true,
        },
      ],
      tableData: [],

      // getSelectedString() {
      //   return selected.value.length === 0
      //     ? ""
      //     : `${selected.value.length} record${
      //         selected.value.length > 1 ? "s" : ""
      //       } selected of ${rows.length}`;
      // },
    };
  },
  mounted: function () {
    firebase
      .firestore()
      .collection("Employees")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.tableData.push(doc.data());
        });

        console.log(this.tableData);
      });
    firebase
      .firestore()
      .collection("Employees")
      .doc("8UKo3pNw3Wv32qEeOvH0")
      .onSnapshot((doc) => {
        console.log("Data: ", doc.data());
      });
  },

  // created() {
  //   firebase.firestore().collection("Employees").orderBy("Name").get().then((querySnapshot) =>
  //   this.loading = false,
  //   querySnapshot.array.forEach(document => {
  //     const rows = {
  //       ime: document.data().name,
  //       email: document.data().email
  //     },
  // });)
  // },

  methods: {
    otvaranjeNovogKorisnika() {
      this.$router.push("/novi");
    },

    obrisiKorisnika() {
      firebase
        .firestore()
        .collection("Employees")
        .doc(this.selected[0]["Id"].toString().trim())
        .delete()
        .then((docReference) => {
          this.$q.notify({
            message:
              "Korisnik" + this.selected[0]["Name"] + " je uspješno obrisan.",
          });
        })
        .catch((error) => console.log("nesto ne valja"));
    },

    retriveCollection() {
      var objectArray = [];
      firebase
        .firestore()
        .collection("Employees")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            objectArray.push(doc.data());
          });
        });
      return objectArray;
    },
  },
};
</script>
