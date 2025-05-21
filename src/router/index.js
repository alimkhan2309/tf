import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/portfolio/:projectName',
    name: 'project-details',
    component: () => import('@/views/PortfolioSections/PortfolioDetailView.vue'),
    props: true
  },
  {
    path: '/packages/:selectedPackage?',
    name: 'packages',
    component: () => import('@/views/PackageView.vue'),
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
