<template>
  <div class="q-pa-md" style="max-width: 600px align">
    <h4>Kreiranje servisnih naloga</h4>
    <q-form @submit="submitForm" @reset="onReset" class="q-gutter-md">
      <ln />
      <h5>Podatci o Kupcu</h5>
      <q-input
        filled
        v-model="formData.Customer.Name"
        label="Ime i prezime kupca"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Molimo unesite ime i prezime kupca',
        ]"
      />

      <q-input
        filled
        v-model="formData.Customer.PhoneNumber"
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

var nalogDate;
//console.log(nalogDate);
export default {
  data() {
    return {
      formData: {
        Customer: {
          Name: "",
          PhoneNumber: "",
        },
        Article: "",
        Description: "",
        EssentialData: false,
        WarrantyPeriod: false,
        OrderDate: date.formatDate(Date.now(), "YYYY-MM-DD"),
        OrderTime: date.formatDate(Date.now(), "HH:mm:ss"),
        PerformedServicesList: [],
        Received: "",
        TotalPrice: "",
      },
      onReset() {
        this.formData.Customer.Name = null;
        this.formData.Customer.PhoneNumber = null;
        this.formData.Article = null;
        this.formData.Description = null;
        this.formData.WarrantyPeriod = false;
        this.formData.EssentialData = false;
        this.formData.OrderDate = date.formatDate(Date.now(), "YYYY-MM-DD");
        this.formData.OrderTime = date.formatDate(Date.now(), "HH:mm:ss");
        this.formData.PerformedServicesList = [];
        this.formData.Received = null;
        this.formData.TotalPrice = null;
      },
    };
  },

  methods: {
    getSelectedString() {
      return selected.value.length === 0
        ? ""
        : `${selected.value.length} record${
            selected.value.length > 1 ? "s" : ""
          } selected of ${rows.length}`;
    },
    submitForm() {
      let newNalog = {
        Customer: {
          Name: this.formData.Customer.Name,
          PhoneNumber: this.formData.Customer.PhoneNumber,
        },
        Article: this.formData.Article,
        Description: this.formData.Description,
        EssentialData: this.formData.EssentialData,
        WarrantyPeriod: this.formData.WarrantyPeriod,
        OrderDate: this.formData.OrderDate,
        OrderTime: this.formData.OrderTime,
        PerformedServicesList: this.formData.PerformedServicesList,
        Received: this.formData.Received,
        TotalPrice: this.formData.TotalPrice,
      };
      firebase
        .firestore()
        .collection("ServiceOrders")
        .add(newNalog)
        .then((docRef) => {
          this.$q.notify({ message: "Novi nalog je spremljen" });
          docRef.set({ Id: docRef.id }, { merge: true });
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