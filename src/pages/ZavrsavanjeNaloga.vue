<template>
  <div class="q-pa-md" style="max-width: 600px align">
    <h4>Završavanje servisnih naloga</h4>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <ln />
      <h5>Izvršene usluge / utrošeni materijal</h5>

      <q-input
        filled
        v-model="usluge_materijali"
        label="Izvršene usluge i utrošeni materijal"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) ||
            'Molimo unesite izvršene usluge i utrošeni materijal',
        ]"
      />

      <q-input
        filled
        v-model="cijena"
        label="Cijena usluge"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Molimo unesite cijenu usluge',
        ]"
      />

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

export default {
  setup() {
    const $q = useQuasar();

    const usluge_materijali = ref(null);
    const cijena = ref(null);

    return {
      usluge_materijali,
      cijena,

      onReset() {
        usluge_materijali.value = null;
        cijena.value = null;
      },
    };
  },
};
</script>

<style>
h3 {
  text-align: center;
}
</style>
