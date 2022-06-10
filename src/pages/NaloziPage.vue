<!-- dodavanje naloga
pregled naloga
zavrsavanje naloga -->
<template>
  <div class="q-pa-md column q-gutter-sm">
    <q-btn
      color="primary"
      label="Kreiraj novi nalog"
      @click="otvoriNoviNalog()"
    />
    <q-btn
      :disable="this.selected.length === 0"
      color="primary"
      label="Završi nalog"
      icon="done"
      @click="zavrsiNalog()"
    />
    <q-btn
      :disable="this.selected.length === 0"
      color="primary"
      label="Obrisi nalog"
      icon="delete"
      @click="obrisiNalog()"
    />
  </div>
  <div class="q-pa-md">
    <q-table
      title="Nalozi u tijeku"
      :rows="tableData"
      :columns="columns"
      row-key="Id"
      :selected-rows-label="getSelectedString"
      selection="single"
      v-model:selected="selected"
      :rows-per-page-option="[0]"
    />
    Selected: {{ JSON.stringify(selected) }}
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "NaloziPage",
  data() {
    //const selected = ref([]);
    return {
      selected: [],
      editRowDialog: false,
      deleteRowDialog: false,
      Article: null,
      //Costumer: [Name, PhoneNumber],
      Description: null,
      Done: null,
      EssentialData: null,
      OrderDate: null,
      Recived: null,
      WarratntyPeriod: null,
      columns: [
        {
          name: "Article",
          label: "Artikl",
          field: "Article",
          sortable: true,
        },
        {
          name: "Description",
          label: "Opis problema",
          field: "Description",
          sortable: true,
        },
        {
          name: "EssentialData",
          label: "Podatci važni?",
          field: "EssentialData",
          sortable: true,
        },
        {
          name: "OrderDate",
          label: "Zaprimljeno",
          field: "OrderDate",
          sortable: true,
        },
        {
          name: "WarratntyPeriod",
          label: "Garancija",
          field: "WarratntyPeriod",
          sortable: true,
        },
        {
          name: "Costumer.Name",
          label: "Ime kupca",
          field: "Costumer.Name",
          sortable: true,
        },
        {
          name: "Costumer.PhoneNumber",
          label: "Ime kupca",
          field: "Costumer.PhoneNumber",
          sortable: true,
        },
      ],
      tableData: [],
    };
  },
  mounted: function () {
    firebase
      .firestore()
      .collection("ServiceOrders")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.tableData.push(doc.data());
        });

        console.log(this.tableData);
      });
  },

  methods: {
    otvoriNoviNalog() {
      this.$router.push("/dodavanje");
    },
    zavrsiNalog() {
      this.$router.push("/zavrsavanje");
    },
    obrisiNalog() {},
    retriveCollection() {
      var objectArray = [];
      firebase
        .firestore()
        .collection("ServiceOrders")
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
