import { createRouter, createWebHistory } from 'vue-router';
import { authGuard } from '@auth0/auth0-vue';
import HomeView from '../views/HomeView.vue';
import ProfileView from '../views/ProfileView.vue';
import VenuesView from "../views/VenuesView.vue";
import VenueView from "../views/VenueView.vue";
import MachineView from "../views/MachineView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/venues',
      name: 'venues',
      component: VenuesView,
      beforeEnter: authGuard
    },
    {
      path: '/venue/:venueId',
      name: 'venue',
      component: VenueView,
      beforeEnter: authGuard
    },
    {
      path: '/venue/:venueId/machine/:machineId',
      name: 'machine',
      component: MachineView,
      beforeEnter: authGuard
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
      component: ProfileView,
      beforeEnter: authGuard
    }
  ]
})

export default router
