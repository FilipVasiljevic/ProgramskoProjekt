<template>
  <div class="q-pa-md" style="max-width: 600px align">
    <h4>Završavanje servisnih naloga</h4>
    <q-form @submit="zavrsiNalog" @reset="onReset" class="q-gutter-md">
      <ln />
      <h5>Izvršene usluge / utrošeni materijal</h5>
      <div>
        <q-input
          style="display: inline-block; width: 30%"
          filled
          v-model="usluge_materijali"
          label="Izvršene usluge i utrošeni materijal"
          lazy-rules
        />
        <q-btn color="primary" icon="add" @click="dodajUslugu" />
      </div>
      <q-chip
        removable
        v-for="item in doneServices"
        v-model="item.Service"
        v-bind:key="item.Service"
        color="primary"
        text-color="white"
      >
        {{ item.Service }}
      </q-chip>
      <q-input filled v-model="cijena" label="Cijena usluge" lazy-rules />
      <div>
        <q-btn label="Završi nalog" type="submit" color="primary" />
        <q-btn
          label="Obriši formu"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
//zavrsi nalog
import { useQuasar } from "quasar";
import { ref } from "vue";
import firebase from "firebase";
export default {
  setup() {
    const $q = useQuasar();
    const chip = ref(true);
    const usluge_materijali = ref(null);
    const cijena = ref(null);

    return {
      chip,
      usluge_materijali,
      cijena,

      onReset() {
        usluge_materijali.value = null;
        cijena.value = null;
      },
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      doneServices: [],
    };
  },
  methods: {
    dodajUslugu() {
      this.doneServices.push({ Service: this.usluge_materijali });
      this.usluge_materijali = "";
    },
    zavrsiNalog() {
      firebase
        .firestore()
        .collection("ServiceOrders")
        .doc(this.id)
        .set(
          {
            Done: true,
            PerformedServicesList: this.doneServices,
            TotalPrice: this.cijena,
          },
          { merge: true }
        )
        .then((docRef) => {
          this.$q.notify({ message: "Uspješno ste završili servisni nalog" });
          this.$router.push("/nalozi");
        })
        .catch((error) => {
          this.$q.notify({ message: error });
        });
    },
  },
};
</script>

<style>
h3 {
  text-align: center;
}
</style>
