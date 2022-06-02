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
    <q-btn color="primary" label="Obrisi korisnika" />
  </div>

  <div class="q-pa-md">
    <q-table
      title="Zaposlenici"
      :data="tebleData"
      :columns="columns"
      row-key="name"
      :selected-rows-label="getSelectedString"
      selection="multiple"
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
        var buffer = [];
        querySnapshot.forEach((doc) => {
          buffer.push({ Name: doc.Name, ...doc.data() });
          console.log(buffer.data);
        });
        this.tableData = buffer;
        console.log("a");
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
