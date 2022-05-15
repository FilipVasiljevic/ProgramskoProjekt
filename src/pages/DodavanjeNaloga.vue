<template>
  <div class="q-pa-md" style="max-width: 600px align">
    <h4>Kreiranje servisnih naloga</h4>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <ln />
      <h5>Podatci o Kupcu</h5>
      <q-input
        filled
        v-model="ime"
        label="Ime i prezime kupca"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Molimo unesite ime i prezime kupca',
        ]"
      />

      <q-input
        filled
        v-model="kontaktbroj"
        label="Kontakt broj"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Molimo unesite kontakt broj',
        ]"
      />
      <q-separator />
      <q-separator dark />
      <h5>Podatci za servis</h5>

      <q-input
        filled
        v-model="nazivArtikla"
        label=" Naziv artikla"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Molimo unesite naziv artikla',
        ]"
      />

      <q-input
        filled
        v-model="opisServisa"
        label="Opis servisa"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Molimo unesite opis servisa',
        ]"
      />
      <div>
        <q-toggle v-model="garantnirok" label="Garantni rok" />
        <q-toggle v-model="podatcibitni" label="Podatci bitni" />
      </div>

      <q-uploader
        url="http://localhost:8080/upload"
        label="Prilaganje slika artikla za servis"
        multiple
        style="max-width: 800px"
      />

      <div>
        <q-btn label="Kreiranj nalog" type="submit" color="primary" />
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
//dodaj nalog
//dodaj fotografiju
import { useQuasar } from "quasar";
import { ref } from "vue";

export default {
  setup() {
    const $q = useQuasar();

    const ime = ref(null);
    const kontaktbroj = ref(null);
    const nazivArtikla = ref(null);
    const opisServisa = ref(null);

    const garantnirok = ref(false);
    const podatcibitni = ref(false);

    return {
      ime,
      kontaktbroj,
      nazivArtikla,
      opisServisa,

      garantnirok,
      podatcibitni,

      onReset() {
        ime.value = null;
        kontaktbroj.value = null;
        nazivArtikla.value = null;
        opisServisa.value = null;

        garantnirok.value = false;
        podatcibitni.value = false;
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
