import Vue from 'vue'
import Router from 'vue-router'
import AboutView from '@/components/AboutView'
import PythonListView from '@/components/PythonListView'
import PythonDetailView from '@/components/PythonDetailView'
import WalkthroughView from '@/components/WalkthroughView'
import ErrorView from '@/components/ErrorView'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/errors',
      name: 'errors',
      component: ErrorView
    },
    {
      path: '/walkthrough',
      name: 'walkthrough',
      component: WalkthroughView
    },
    {
      path: '/',
      name: 'main',
      component: PythonListView
    },
    {
      path: '/pythons',
      name: 'pythons',
      component: PythonListView
    },
    {
      path: '/python/:path',
      name: 'python-detail',
      component: PythonDetailView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})
