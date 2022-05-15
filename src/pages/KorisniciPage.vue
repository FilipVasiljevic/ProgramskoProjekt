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
  </div>

  <div class="q-pa-md">
    <q-table
      title="Zaposlenici"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      v-model:selected="selected"
    />
  </div>
</template>
<script>
import { ref } from "vue";
import firebase from "firebase";

const columns = [
  {
    name: "ime",
    required: true,
    label: "Ime zaposlenika",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "email",
    label: "E-mail zaposlenika",
    field: "email",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [];

export default {
  setup() {
    const selected = ref([]);

    return {
      selected,
      columns,
      rows,

      getSelectedString() {
        return selected.value.length === 0
          ? ""
          : `${selected.value.length} record${
              selected.value.length > 1 ? "s" : ""
            } selected of ${rows.length}`;
      },
    };
  },

  created() {
    firebase.firestore().collection("Employees").orderBy("Name").get().then((querySnapshot) =>
    this.loading = false,
    querySnapshot.array.forEach(document => {
      const rows = {
        ime: document.data().name,
        email: document.data().email
      },
  });)
  },

  methods: {
    otvaranjeNovogKorisnika() {
      this.$router.push("/novi");
    },
  },
};
</script>
