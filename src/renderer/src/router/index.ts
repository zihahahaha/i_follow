import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import SearchMetaView from '../views/search_meta/SearchMeta.vue'
import ManagerSearchMetaView from '@renderer/views/manager_search_meta'
import SearchDataView from '@renderer/views/search_data'
// import MetaView from '../views/meta/Meta.vue'

// import CollectionView from '../views/collection/Collection.vue'
// import EditView from '../views/edit/Edit.vue'
// import LocalMediaView from '../views/loca_media/LocalMedia.vue'
// import ErrorView from '../views/error/Error.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'search_meta',
      component: SearchMetaView,
      meta: {
        keepAlive: true,
        name: SearchMetaView.__name
      }
    },
    {
      path: '/search_meta/:metaSrcId',
      name: 'manager_search_meta',
      component: ManagerSearchMetaView,
      meta: {
        keepAlive: true,
        name: ManagerSearchMetaView.__name
      }
    },
    {
      path: '/search_data',
      name: 'search_data',
      component: SearchDataView,
      meta: {
        KeepAlive: true,
        name: SearchDataView.__name
      }
    }
    // {
    //   path: '/meta_search',
    //   name: 'meta_search',
    //   component: MetaSearchManagerView,
    //   meta: {
    //     keepAlive: true,
    //     name: MetaSearchManagerView.__name
    //   }
    // },
    // {
    //   path: '/meta',
    //   name: 'meta',
    //   component: MetaView
    // },
    // {
    //   path: '/collection',
    //   name: 'collection',
    //   component: CollectionView,
    //   meta: {
    //     keepAlive: true,
    //     name: CollectionView.__name
    //   }
    // },
    // {
    //   path: '/edit',
    //   name: 'edit',
    //   component: EditView,
    //   meta: {
    //     keepAlive: true,
    //     name: EditView.__name
    //   }
    // },
    // {
    //   path: '/local_media',
    //   name: 'local_media',
    //   component: LocalMediaView
    // },
    // {
    //   path: '/error',
    //   name: 'error',
    //   component: ErrorView
    // }
  ],
  scrollBehavior(to, from, savedPosition) {
    // if (from === to) return false
    if (to.meta.keepAlive) {
      return false
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0
      }
    }
  }
})

// const topLevel = ['discover', 'collection', 'edit']
// export function transition(route: RouteLocationNormalizedLoaded) {
//   console.log(lastRoute?.name)

//   if (route.name === 'discover' && lastRoute.name === 'remote_media')
//     return {
//       enterFromClass: route?.meta?.enterFromClass,
//       enterActiveClass: route?.meta?.enterActiveClass,
//       leaveToClass: lastRoute?.meta?.leaveToClass,
//       leaveActiveClass: lastRoute?.meta?.leaveActiveClass
//     }

//   if (route.name === 'remote_media' && lastRoute.name === 'discover')
//     return {
//       enterFromClass: route?.meta?.enterFromClass,
//       enterActiveClass: route?.meta?.enterActiveClass,
//       leaveToClass: lastRoute?.meta?.leaveToClass,
//       leaveActiveClass: lastRoute?.meta?.leaveActiveClass
//     }
//   if (topLevel.includes(route.name as string) && topLevel.includes(lastRoute.name as string))
//     return {
//       enterFromClass: '',
//       enterActiveClass: '',
//       leaveToClass: '',
//       leaveActiveClass: ''
//     }
//   if (lastRoute?.name === undefined)
//     return {
//       enterFromClass: '',
//       enterActiveClass: '',
//       leaveToClass: '',
//       leaveActiveClass: ''
//     }
//   return {
//     enterFromClass: route?.meta?.enterFromClass,
//     enterActiveClass: route?.meta?.enterActiveClass,
//     leaveToClass: lastRoute?.meta?.leaveToClass,
//     leaveActiveClass: lastRoute?.meta?.leaveActiveClass
//   }
// }

let lastRoute: RouteLocationNormalizedLoaded

router.beforeEach((to, from) => {
  lastRoute = from
  return true
})

export { router, lastRoute }
