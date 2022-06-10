<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Aplikacija za vođenje evidencije servisa
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item clickable v-ripple @click="homePage">
          <q-item-section> Početna stranica </q-item-section>
        </q-item>
        <q-separator :key="'sep1'" />
        <q-item clickable v-ripple @click="otvaranjeKorisnika">
          <q-item-section> Korisnici </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="otvaranjeNaloga">
          <q-item-section> Nalozi </q-item-section>
        </q-item>
        <q-separator :key="'sep3'" />

        <q-item clickable v-ripple @click="logout">
          <q-item-section> Odjava </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import firebase from "firebase";

export default defineComponent({
  name: "MainLayout",
  methods: {
    homePage() {
      this.$router.push("/home");
    },
    otvaranjeNaloga() {
      this.$router.push("/nalozi");
    },
    otvaranjeKorisnika() {
      this.$router.push("/korisnici");
    },
    logout() {
      firebase.auth().signOut();
      this.$router
        .push("/")
        .then(() => {
          this.$q.notify({ message: "Uspješan logout!!" });
        })
        .catch((error) => console.log("error", error));
    },
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
