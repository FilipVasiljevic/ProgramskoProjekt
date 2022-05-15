<!-- dodavanje naloga
pregled naloga
zavrsavanje naloga -->
<template>
  <div id="q-app" style="min-height: 100vh">
    <div class="q-pa-md column q-gutter-sm">
      <q-card class="my-card">
        <q-card-section class="bg-blue text-white">
          <div class="text-h6">Servisni nalog: {{ ServiceOrderNumber }}</div>
          <div class="text-subtitle2"></div>
        </q-card-section>
        <q-card-actions align="around">
          <q-btn flat>Uredi</q-btn>
          <q-btn flat icon="print"></q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "NaloziPage",
  data() {
    return {
      ServiceOrderNumber: "",
    };
  },

  methods: {
    citanjeIzBaze() {},
  },
};
</script>
