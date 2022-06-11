<template>
  <div class="q-pa-md" style="max-width: 600px align">
    <h4>Kreiranje servisnih naloga</h4>
    <q-form @submit="submitForm" @reset="onReset" class="q-gutter-md">
      <ln />
      <h5>Podatci o Kupcu</h5>
      <q-input
        filled
        v-model="formData.Costumer.Name"
        label="Ime i prezime kupca"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Molimo unesite ime i prezime kupca',
        ]"
      />

      <q-input
        filled
        v-model="formData.Costumer.PhoneNumber"
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
        v-model="formData.Article"
        label=" Naziv artikla"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Molimo unesite naziv artikla',
        ]"
      />

      <q-input
        filled
        v-model="formData.Description"
        label="Opis servisa"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Molimo unesite opis servisa',
        ]"
      />
      <div>
        <q-toggle v-model="formData.WarrantyPeriod" label="Garantni rok" />
        <q-toggle v-model="formData.EssentialData" label="Podatci bitni" />
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
          @click="onReset()"
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
import { date } from "quasar";
import firebase from "firebase";

const nalogDate = date.formatDate(Date.now(), "YYYY-MM-DDTHH:mm:ss.SSSZ");
console.log(nalogDate);
export default {
  data() {
    return {
      formData: {
        Costumer: {
          Name: "",
          PhoneNumber: "",
        },
        Article: "",
        Description: "",
        EssentialData: "",
        OrderDate: nalogDate,
        Received: "",
        WarrantyPeriod: "",
      },

      onReset() {
        this.formData.Costumer.Name.value = null;
        formData.Costumer.PhoneNumber.value = null;
        formData.Article.value = null;
        formData.Description.value = null;

        formData.WarrantyPeriod.value = false;
        formData.EssentialData.value = false;
      },
    };
  },

  methods: {
    submitForm() {
      (this.formData.Received = firebase.auth().currentUser),
        this.createNalog(
          this.formData.Costumer,
          this.formData.Article,
          this.formData.Description,
          this.formData.EssentialData,
          this.formData.OrderDate,
          this.formData.Received,
          this.formData.WarrantyPeriod
        );
    },
    createNalog(
      costumer,
      article,
      description,
      essentialData,
      orderDate,
      received,
      warrantyPeriod
    ) {
      let newNalog = {
        Costumer: costumer,
        Article: article,
        Description: description,
        EssentialData: essentialData,
        OrderDate: orderDate,
        Received: received,
        WarrantyPeriod: warrantyPeriod,
      };
      firebase
        .firestore()
        .collection("ServiceOrders")
        .add(newNalog)
        .then((docRef) => {
          docRef.set({ Id: docRef.id }, { merge: true });
          this.$q.notify({ message: "Novi nalog je spremljen" });
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
