<template>
  <h3 text-center>Za login odaberite vaše ime</h3>
  <div class="q-pa-md column q-gutter-sm">
    <q-btn color="primary" label="Dean Ladavec" @click="dean = true" />
    <q-btn color="primary" label="Elvis Jurić" @click="elvis = true" />
    <q-btn color="primary" label="Žarko Kovačević" @click="zarko = true" />
    <q-btn color="primary" label="Goran Močibob" @click="goran = true" />
    <q-btn color="primary" label="Stefano Brozan" @click="stefano = true" />
    <q-btn color="primary" label="Ervin Štifanić" @click="ervin = true" />
    <q-btn color="primary" label="Admin" @click="admin = true" />
  </div>
  <q-dialog v-model="dean">
    <q-card>
      <q-card-section>
        <q-input v-model="text" label="Email" />
        <q-input v-model="text" label="Password" />
        <q-btn flat label="Odustani" color="primary" v-close-popup />
        <q-btn flat label="Prihvati" color="primary" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="elvis">
    <q-card>
      <q-card-section>
        <q-input v-model="text" label="Email" />
        <q-input v-model="text" label="Password" />
        <q-btn flat label="Odustani" color="primary" v-close-popup />
        <q-btn flat label="Prihvati" color="primary" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="zarko">
    <q-card>
      <q-card-section>
        <q-input v-model="text" label="Email" />
        <q-input v-model="text" label="Password" />
        <q-btn flat label="Odustani" color="primary" v-close-popup />
        <q-btn flat label="Prihvati" color="primary" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="goran">
    <q-card>
      <q-card-section>
        <q-input v-model="text" label="Email" />
        <q-input v-model="text" label="Password" />
        <q-btn flat label="Odustani" color="primary" v-close-popup />
        <q-btn flat label="Prihvati" color="primary" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="stefano">
    <q-card>
      <q-card-section>
        <q-input v-model="text" label="Email" />
        <q-input v-model="text" label="Password" />
        <q-btn flat label="Odustani" color="primary" v-close-popup />
        <q-btn flat label="Prihvati" color="primary" v-close-popup />
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-dialog v-model="ervin">
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
        <q-input v-model="text" label="Email" />
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
      dean: ref(false),
      elvis: ref(false),
      zarko: ref(false),
      goran: ref(false),
      stefano: ref(false),
      ervin: ref(false),
      admin: ref(false),
    };
  },
};
</script>
