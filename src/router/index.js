import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'Project' }
  },
  {
    path: '/project',
    name: 'Project',
    icon: 'fa-code-branch',
    component: () => import('../views/Project.vue'),
    redirect: '/project/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('../views/ProjectOverview.vue')
      },
      {
        path: ':detail',
        name: 'Detail',
        component: () => import('../views/ProjectDetail.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    icon: 'fa-address-card',
    component: () => import('../views/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    icon: 'fa-at',
    component: () => import('../views/Contact.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router