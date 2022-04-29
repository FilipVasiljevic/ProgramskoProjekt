<template>
  <h3 class="text-center">Za login odaberite vaše ime</h3>
  <div class="q-pa-md column q-gutter-sm">
    <q-btn color="primary" label="Dean Ladavec" @click="popup = true" />
    <q-btn color="primary" label="Elvis Jurić" @click="popup = true" />
    <q-btn color="primary" label="Žarko Kovačević" @click="popup = true" />
    <q-btn color="primary" label="Goran Močibob" @click="popup = true" />
    <q-btn color="primary" label="Stefano Brozan" @click="popup = true" />
    <q-btn color="primary" label="Ervin Štifanić" @click="popup = true" />
    <q-btn color="primary" label="Admin" @click="admin = true" />
  </div>
  <q-dialog v-model="popup">
    <q-card>
      <q-card-section>
        <q-input v-model="text" label="Email" />
        <q-input v-model="text" label="Password" />
        <q-btn flat label="Odustani" color="primary" v-close-popup />
        <q-btn flat label="Prihvati" color="primary" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="admin">
    <q-card>
      <q-card-section>
        <q-input v-model="text" label="Username" />
        <q-input v-model="text" label="Password" />
        <q-btn flat label="Odustani" color="primary" v-close-popup />
        <q-btn flat label="Prihvati" color="primary" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      popup: ref(false),
      admin: ref(false),
    };
  },
};
</script>
