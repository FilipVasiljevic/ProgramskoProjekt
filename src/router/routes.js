const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AuthPage.vue") },
      {
        path: "/home",
        component: () => import("pages/HomePage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/dodavanje",
        component: () => import("pages/DodavanjeNaloga.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/zavrsavanje",
        component: () => import("pages/ZavrsavanjeNaloga.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/nalozi",
        component: () => import("pages/NaloziPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/korisnici",
        component: () => import("pages/KorisniciPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/novi",
        component: () => import("pages/NoviKorisnik.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
