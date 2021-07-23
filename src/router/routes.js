
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/start', component: () => import('pages/Start.vue') },
      { path: '/simulation', component: () => import('pages/Simulation.vue') },
      { path: '/simulation/start', component: () => import('pages/SimulationStart.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
