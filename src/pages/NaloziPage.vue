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
    <q-btn
      :disable="this.selected.length === 0"
      color="primary"
      label="print"
      icon="print"
      @click="print"
    />
    <q-separator />
    <q-table
      v-model:selected="selected"
      title="Nalozi u tijeku"
      :rows="tableData"
      :columns="columns"
      row-key="Id"
      selection="single"
    />

    Selected: {{ JSON.stringify({ selected }, null, "\t") }}
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
      //Customer: [Name, PhoneNumber],
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
          label: "Nalog zaprimljen (datum)",
          field: "OrderDate",
          sortable: true,
        },
        {
          name: "WarratntyPeriod",
          label: "Garancija",
          field: "WarrantyPeriod",
          sortable: true,
        },
        {
          name: "Customer.Name",
          label: "Ime kupca",
          field: (row) => row.Customer.Name,
          sortable: true,
        },
        {
          name: "Customer.PhoneNumber",
          label: "Broj kupca",
          field: (row) => row.Customer.PhoneNumber,
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
        for (var i = 0; i < querySnapshot.docs.length; i++) {
          this.tableData.push(querySnapshot.docs[i].data());
          console.log(this.tableData[i].Customer);
          this.tableData[i].WarrantyPeriod = querySnapshot.docs[i].data()
            .WarrantyPeriod
            ? "Da"
            : "Ne";

          this.tableData[i].EssentialData = querySnapshot.docs[i].data()
            .EssentialData
            ? "Da"
            : "Ne";
        }

        console.log(this.tableData);
      });
  },

  methods: {
    proba(data) {
      console.log(data);
    },
    otvoriNoviNalog() {
      this.$router.push("/dodavanje");
    },
    zavrsiNalog() {
      this.$router.push("/zavrsavanje");
    },
    obrisiNalog() {
      firebase
        .firestore()
        .collection("ServiceOrders")
        .doc(this.selected[0].Id)
        .delete()
        .then((docRef) => {
          this.$q.notify({ message: "Uspješno ste izbrisali servisni nalog" });
        })
        .catch((error) => {
          this.$q.notify({ message: error });
        });
    },
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
