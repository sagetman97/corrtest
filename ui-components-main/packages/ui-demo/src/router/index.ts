import { createRouter, createWebHistory, RouterView } from 'vue-router'

import { pascalCase } from 'string-ts'

import views from '../views'
import WelcomeView from '../views/WelcomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      setTimeout(() => {
        document.getElementById(to.hash.slice(1))?.scrollIntoView()
        return
      }, 100)
    }

    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/:pathMatch(.*)',
      redirect: '/index.html',
    },
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView,
      meta: { crumb: { label: 'welcome' } },
    },
    {
      name: 'css-variables-borders',
      path: '/css-variables/borders',
      component: () => import('../views/CSSVariablesBordersView.vue'),
      meta: { crumb: { label: 'borders' } },
    },
    {
      name: 'css-variables-colors',
      path: '/css-variables/colors',
      component: () => import('../views/CSSVariablesColorsView.vue'),
      meta: { crumb: { label: 'colors' } },
    },
    {
      name: 'css-variables-typography',
      path: '/css-variables/typography',
      component: () => import('../views/CSSVariablesTypographyView.vue'),
      meta: { crumb: { label: 'typography' } },
    },
    {
      name: 'css-variables-grid',
      path: '/css-variables/grid',
      component: () => import('../views/CSSVariablesGridView.vue'),
      meta: { crumb: { label: 'grid' } },
    },
    {
      name: 'css-variables-layers',
      path: '/css-variables/layers',
      component: () => import('../views/CSSVariablesLayersView.vue'),
      meta: { crumb: { label: 'layers' } },
    },
    {
      name: 'css-variables-spacing',
      path: '/css-variables/spacing',
      component: () => import('../views/CSSVariablesSpacingView.vue'),
      meta: { crumb: { label: 'spacing' } },
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/FormView.vue'),
    },
    ...[
      ...Object.entries(views)
        .filter(([, view]) => {
          return !['p-bread-crumbs', 'p-base-page', 'p-navigation'].includes(view.label)
        })
        .map(([, view]) => ({
          path: `/${view.label}`,
          name: pascalCase(view.label),
          component: view.component,
          meta: {
            transition: 'slide-fade',
            crumb: { label: view.label },
          },
        })),
      {
        path: '/p-bread-crumbs',
        name: 'PBreadCrumbs',
        component: () => import('../views/BreadCrumbsView.vue'),
        meta: {
          transition: 'slide-fade',
          crumb: { label: 'p-bread-crumbs' },
        },
        children: [
          {
            path: 'p-badge',
            name: `PBadgeChild`,
            component: () => import('../views/BadgeView.vue'),
            meta: {
              transition: 'slide-fade',
              crumb: { label: `p-badge-child` },
            },
          },
        ],
      },
      {
        path: '/p-base-page',
        name: 'PBasePage',
        component: () => import('../views/BasePageView.vue'),
        meta: {
          transition: 'slide-fade',
          crumb: { label: 'p-base-page' },
        },
        children: [
          {
            path: 'p-badge',
            name: `PBadgeBasePageChild`,
            component: () => import('../views/BadgeView.vue'),
            meta: {
              transition: 'slide-fade',
              crumb: { label: 'p-badge' },
            },
          },
        ],
      },
      {
        path: '/p-navigation',
        name: 'PNavigation',
        component: () => import('../views/NavigationView.vue'),
        meta: {
          transition: 'slide-fade',
          crumb: { label: 'p-navigation' },
        },
        children: [
          {
            path: 'publish',
            name: 'PNavigation-publish',
            component: RouterView,
            meta: {
              transition: undefined,
              crumb: { label: 'p-navigation-publish' },
            },
          },
          {
            path: 'desk',
            name: 'PNavigation-desk',
            component: RouterView,
            meta: {
              transition: undefined,
              crumb: { label: 'p-navigation-desk' },
            },
          },
          {
            path: 'pipeline',
            name: 'PNavigation-pipeline',
            component: RouterView,
            meta: {
              transition: undefined,
              crumb: { label: 'p-navigation-pipeline' },
            },
          },
          {
            path: 'loan',
            name: 'PNavigation-loan',
            component: RouterView,
            meta: {
              transition: undefined,
              crumb: { label: 'p-navigation-loan' },
            },
          },
          {
            path: 'analytics',
            name: 'PNavigation-analytics',
            component: RouterView,
            meta: {
              transition: undefined,
              crumb: { label: 'p-navigation-analytics' },
            },
          },
          {
            path: 'sell',
            name: 'PNavigation-sell',
            component: RouterView,
            meta: {
              transition: undefined,
              crumb: { label: 'p-navigation-sell' },
            },
          },
          {
            path: 'buy',
            name: 'PNavigation-buy',
            component: RouterView,
            meta: {
              transition: undefined,
              crumb: { label: 'p-navigation-buy' },
            },
          },
        ],
      },
    ],
  ],
})

export default router
