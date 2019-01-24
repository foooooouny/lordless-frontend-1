import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync'
import store from '../store'

import { mutationTypes } from '@/store/types'
import { mobileBool, isWechat } from 'utils/tool'

import Sign from '@/pages/user/sign.vue'
import Taverns from '@/pages/taverns'
import Lbs from '@/pages/lbs'

import TavernDetail from '@/pages/ldb/_detail.vue'

import Guide from '@/pages/help/guide'
import Terms from '@/pages/help/terms'
import Privacy from '@/pages/help/privacy'

import TaskDetail from '@/pages/task/_detail.vue'

import LordlessProject from '@/pages/project/index.vue'
import LordlessPromotions from '@/pages/project/promotions.vue'
import ProjectDetail from '@/pages/project/_project.vue'

import UserDetail from '@/pages/user/_detail'

import Owner from '@/pages/user/owner'
import OwnerInfo from '@/pages/user/owner/children/info'
import OwnerCandy from '@/pages/user/owner/children/candy'
import OwnerTaverns from '@/pages/user/owner/children/taverns'
import OwnerQuests from '@/pages/user/owner/children/tasks'
import OwnerAuthorization from '@/pages/user/owner/children/authorization'
import OwnerActivity from '@/pages/user/owner/children/activity'

// mobile page
import MobileHome from '@/pages/_mobile/home'
import MobileTaverns from '@/pages/_mobile/taverns'
import MobileOwnerIndex from '@/pages/_mobile/owner'
import MobileOwnerCandy from '@/pages/_mobile/owner/candy'
import MobileOwnerQuest from '@/pages/_mobile/owner/quest'

import MobileProject from '@/pages/_mobile/_project'

import MobileMeInfo from '@/pages/_mobile/owner/_user/info'
import MobileMeInfoDetail from '@/pages/_mobile/owner/_user/infoDetail'
import MobileMeActivity from '@/pages/_mobile/owner/_user/activity'
import MobileMeAuthorization from '@/pages/_mobile/owner/_user/authorization'
import MobileMeTaverns from '@/pages/_mobile/owner/_user/taverns'

import OwnerBindTelegram from '@/pages/_mobile/owner/_user/bind/telegram'
import MobilePlanHops from '@/pages/_mobile/owner/_user/plan/hops'
import MobilePlanBaseDetail from '@/pages/_mobile/owner/_user/plan/baseDetail'
import MobileDeposits from '@/pages/_mobile/owner/_user/plan/deposits'
import MobilePlanRecords from '@/pages/_mobile/owner/_user/plan/records'

import MobileTavernDetail from '@/pages/_mobile/_tavern'

// mobile routes
const mobileRoutes = [
  {
    path: '/home',
    name: 'mobile-home',
    component: MobileHome,
    meta: {
      title: 'Home - LORDLESS',
      keepAlive: true,
      transition: true
      // header: {
      //   show: false
      // },
      // footer: {
      //   show: false
      // }
    }
  },
  {
    path: '/taverns',
    name: 'mobile-taverns',
    component: MobileTaverns,
    meta: {
      title: 'Taverns - LORDLESS',
      keepAlive: true,
      transition: true
      // header: {
      //   show: false
      // },
      // footer: {
      //   show: false
      // }
    }
  },
  {
    path: '/tavern/:tavernId',
    name: 'mobile-tavern-detail',
    component: MobileTavernDetail,
    meta: {
      title: 'Tavern Detail - LORDLESS',
      keepAlive: true,
      transition: true
      // header: {
      //   show: false
      // },
      // footer: {
      //   show: false
      // }
    }
  },
  {
    path: '/project/:projectId',
    name: 'mobile-project-detail',
    component: MobileProject,
    meta: {
      title: 'Project Detail - LORDLESS',
      keepAlive: true,
      transition: true
    }
  },
  {
    path: '/owner/',
    name: 'mobile-page',
    component: MobileOwnerIndex,
    children: [
      {
        path: 'candy',
        name: 'mobile-user-candy',
        component: MobileOwnerCandy,
        meta: {
          title: 'Candy - LORDLESS',
          keepAlive: true,
          transition: true

          // header: {
          //   show: false
          // },
          // footer: {
          //   show: false
          // }
        }
      },
      {
        path: 'quests',
        name: 'mobile-user-quests',
        component: MobileOwnerQuest,
        meta: {
          title: 'Quests - LORDLESS',
          keepAlive: true,
          transition: true
          // header: {
          //   show: false
          // },
          // footer: {
          //   show: false
          // }
        }
      },
      {
        path: 'info',
        name: 'mobile-owner-info',
        component: MobileMeInfo,
        meta: {
          title: 'OwnerInfo - LORDLESS',
          keepAlive: true,
          transition: true
          // header: {
          //   show: false
          // },
          // footer: {
          //   show: false
          // }
        }
      },
      {
        path: 'detail',
        name: 'mobile-owner-info-detail',
        component: MobileMeInfoDetail,
        meta: {
          title: 'OwnerInfoDetail - LORDLESS',
          keepAlive: true,
          transition: true
        }
      },
      {
        path: 'activities',
        name: 'mobile-owner-activities',
        component: MobileMeActivity,
        meta: {
          title: 'Owner Activities - LORDLESS',
          navText: 'Activities',
          keepAlive: true,
          transition: false
          // header: {
          //   show: false
          // },
          // footer: {
          //   show: false
          // }
        }
      },
      {
        path: 'authorization',
        name: 'mobile-owner-authorization',
        component: MobileMeAuthorization,
        meta: {
          title: 'Owner Authorization - LORDLESS',
          navText: 'Authorization',
          keepAlive: true,
          transition: false
          // header: {
          //   show: false
          // },
          // footer: {
          //   show: false
          // }
        }
      },
      {
        path: 'taverns',
        name: 'mobile-me-taverns',
        component: MobileMeTaverns,
        meta: {
          title: 'Owner Taverns - LORDLESS',
          navText: 'Taverns',
          keepAlive: true,
          transition: false
        }
      },
      {
        path: 'bind/telegram',
        name: 'mobile-telegram-bind',
        component: OwnerBindTelegram,
        meta: {
          title: 'Telegram bind - LORDLESS',
          navText: 'Bind Telegram',
          keepAlive: true,
          transition: false,
          hideTab: true
        }
      },
      {
        path: 'hops',
        name: 'mobile-hops-page',
        component: MobilePlanHops,
        meta: {
          title: 'HOPS - LORDLESS',
          navText: 'HOPS',
          keepAlive: true,
          transition: false
        }
      },
      {
        path: 'planBase/:planBaseId',
        name: 'mobile-planBase-detail',
        component: MobilePlanBaseDetail,
        meta: {
          title: 'PlanBase Detail - LORDLESS',
          keepAlive: true,
          transition: false
        }
      },
      {
        path: 'deposits',
        name: 'mobile-deposits-page',
        component: MobileDeposits,
        meta: {
          title: 'Owner deposits - LORDLESS',
          keepAlive: true,
          transition: false
        }
      },
      {
        path: 'plan/records',
        name: 'mobile-plan-records-page',
        component: MobilePlanRecords,
        meta: {
          title: 'PlanRecords - LORDLESS',
          keepAlive: true,
          transition: false
        }
      },
      {
        path: '*',
        redirect: '/home'
      }
    ]
  },
  {
    path: '*',
    name: 'other',
    redirect: '/home'
  }
]

// pc端 routes
const routes = [
  {
    path: '/taverns',
    name: 'taverns',
    component: Taverns,
    meta: {
      title: 'Taverns - LORDLESS',
      header: {
        show: true
      }
    }
  },
  {
    path: '/map',
    name: 'Lbs',
    component: Lbs,
    meta: {
      title: 'Map - LORDLESS',
      header: {
        show: false
      },
      footer: {
        show: false
      }
    }
  },
  {
    path: '/tavern/:ldbId',
    name: 'TavernDetail',
    component: TavernDetail,
    meta: {
      title: 'Tavern - LORDLESS',
      header: {
        fixed: true,
        scroll: true,
        transparent: true
      }
    }
  },
  {
    path: '/task/:taskId',
    name: 'taskDetail',
    component: TaskDetail,
    meta: {
      title: 'Quest - LORDLESS',
      header: {
        fixed: true,
        scroll: true,
        transparent: true
      }
    }
  },
  {
    path: '/guide',
    name: 'guide',
    component: Guide,
    meta: {
      title: 'Guide - LORDLESS ',
      header: {
        fixed: true,
        scroll: true,
        transparent: false
      }
    }
  },
  {
    path: '/terms',
    name: 'terms',
    component: Terms,
    meta: {
      title: 'Terms - LORDLESS ',
      header: {
        pageTitle: 'LORDLESS Term of Use',
        fixed: true,
        scroll: true,
        transparent: false
      }
    }
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: Privacy,
    meta: {
      title: 'Privacy - LORDLESS ',
      header: {
        pageTitle: 'LORDLESS Privacy policy',
        fixed: true,
        scroll: true,
        transparent: false
      }
    }
  },
  {
    path: '/sign',
    name: 'lordless-sign',
    component: Sign,
    meta: {
      title: 'Sign - LORDLESS',
      header: {
        fixed: true,
        transparent: true
      }
    }
  },
  {
    path: '/user/:address',
    name: 'userDetail',
    component: UserDetail,
    meta: {
      title: 'USER - LORDLESS'
    }
  },
  {
    path: '/project/',
    name: 'project',
    component: LordlessProject,
    children: [
      {
        path: 'promotions',
        name: 'Promotions Page',
        component: LordlessPromotions,
        meta: {
          title: 'Promotions - LORDLESS',
          header: {
            show: true
          },
          footer: {
            show: true
          }
        }
      },
      {
        path: ':projectId',
        name: 'ProjectInfo',
        component: ProjectDetail,
        meta: {
          title: 'Project - LORDLESS',
          header: {
            show: true
          },
          footer: {
            show: true
          }
        }
      },
      {
        path: '*',
        redirect: 'promotions'
      }
    ]
  },
  {
    path: '/owner',
    name: 'owner',
    component: Owner,
    children: [
      {
        path: 'info',
        name: 'OwnerInfo',
        component: OwnerInfo,
        meta: {
          title: 'Overview - LORDLESS',
          navgation: 'overview',
          header: {
            show: false
          },
          footer: {
            show: false
          }
        }
      },
      {
        path: 'candy',
        name: 'Owner-candy',
        component: OwnerCandy,
        meta: {
          title: 'My Candies - LORDLESS',
          navgation: 'candy',
          header: {
            show: false
          },
          footer: {
            show: false
          }
        }
      },
      {
        path: 'taverns',
        name: 'Owner-taverns',
        component: OwnerTaverns,
        meta: {
          title: 'My Taverns - LORDLESS',
          navgation: 'taverns',
          header: {
            show: false
          },
          footer: {
            show: false
          }
        }
      },
      {
        path: 'quests',
        name: 'Owner-quests',
        component: OwnerQuests,
        meta: {
          title: 'My Quests - LORDLESS',
          navgation: 'quests',
          header: {
            show: false
          },
          footer: {
            show: false
          }
        }
      },
      {
        path: 'authorization',
        name: 'Owner-authorization',
        component: OwnerAuthorization,
        meta: {
          title: 'Authorization - LORDLESS',
          navgation: 'authorization',
          header: {
            show: false
          },
          footer: {
            show: false
          }
        }
      },
      {
        path: 'activity',
        name: 'Owner-activity',
        component: OwnerActivity,
        meta: {
          title: 'My Activities - LORDLESS',
          navgation: 'activity',
          header: {
            show: false
          },
          footer: {
            show: false
          }
        }
      },
      {
        path: '*',
        redirect: '/owner/info'
      }
    ]
  },
  {
    path: '*',
    name: 'other',
    redirect: '/project/promotions'
  }
]

Vue.use(Router)

const isMobile = mobileBool()
console.log('----isMobile', isMobile)

const router = new Router({
  mode: 'history',

  /**
   * scrollBehavior 只有 mode 为 history,并且开启了 keep-alive 的组件才会生效
   * savedPosition 只有浏览器 history.go(1) 及 history.go(-1) 时才会有值
   *
   * scrollBehavior 执行时机是在 mounted 之后， beforeUpdate 之前
   */
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition && to.meta.keepAlive) return savedPosition
    return new Promise(resolve => {
      const { activated } = store.state.layout
      const path = to.path

      // 因为在 非通过 popstate 导航时，同步的 scrollBehavior 不会起作用
      setTimeout(() => {
        const { y = 0 } = activated[path] || {}
        resolve({ x: 0, y })
      }, 0)
    })
  },
  routes: isMobile ? mobileRoutes : routes
})

// simple history management
let isPush = false
let endTime = Date.now()

// 移动端才会使用页面 pop 效果
if (isMobile) {
  const methods = ['push', 'go', 'replace', 'forward', 'back']

  document.addEventListener('touchend', () => {
    endTime = Date.now()
  })
  methods.forEach(key => {
    const method = router[key].bind(router)
    router[key] = function (...args) {
      isPush = true
      method.apply(null, args)
    }
  })
}

/**
 * router loading status
 */
router.beforeEach((to, from, next) => {
  if (isWechat()) {
    location.href = location.origin + to.fullPath
  }
  // 只有在移动端的时候会使用 keep-alive 和 scrollBehavior，所以该操作在 pc 端没必要浪费内存
  if (isMobile) {
    // 之前是将 popDirection 存储进 vuex 中，但实际存储在 sessionStorage 中即可，读写方便
    // let _popDirection = store.state.layout.popDirection || 'forward'
    let _popDirection = sessionStorage.getItem('lordless_direction') || 'forward'

    /**
     * 如果 popDirection 中含有 '_' 字符，代表已经被其他规则规则好方向，这里就不需要修改 popDirection 了
     * 比如点击 tabbar 的时候，就需要根据 tabbar 的位置做改变
     */
    const isCheckDirection = !_popDirection.includes('_')

    const _pHistory = store.state.layout.pHistory
    const toIndex = _pHistory[to.path]
    const fromIndex = _pHistory[from.path]

    // console.log('endTime', endTime, Date.now(), Date.now() - endTime, toIndex, fromIndex)
    if (isCheckDirection) {
      if (toIndex) {
        // 判断是否是ios左滑返回
        if (!isPush && (Date.now() - endTime) < 377) {
          _popDirection = ''
        } else if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
          _popDirection = 'forward'
        } else {
          _popDirection = 'reverse'
        }
      } else {
        /* 储存 page pop history */
        store.commit(`layout/${mutationTypes.LAYOUT_SET_PHISTORY}`, to.path)

        /** update pop direction */
        _popDirection = ''
      }
    }

    /** set store pop direction */
    let popTransitionName = ''
    switch (_popDirection) {
      case '': popTransitionName = 'lordless-pop-none'
        break
      case 'forward': popTransitionName = 'lordless-pop-in'
        break
      case '_forward': popTransitionName = 'lordless-pop-in'
        break
      case 'reverse': popTransitionName = 'lordless-pop-out'
        break
      case '_reverse': popTransitionName = 'lordless-pop-out'
        break
      default: break
    }
    const { transition } = to.meta
    if (!transition) popTransitionName = 'lordless-pop-none'

    store.commit(`layout/${mutationTypes.LAYOUT_SET_POP_TRANSITION}`, popTransitionName)

    // 存储页面离开时的 scrollTop，方便在返回的时候使用
    const fPath = from.path
    const fromY = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    store.commit(`layout/${mutationTypes.LAYOUT_SET_ACTIVATED_OPTIONS}`, { [fPath]: { y: fromY } })
  }

  const { header, footer, title } = to.meta

  // set header 和 footer option
  store.commit(`layout/${mutationTypes.LAYOUT_SET_HEADER_OPTIONS}`, header)
  store.commit(`layout/${mutationTypes.LAYOUT_SET_FOOTER_OPTIONS}`, footer)

  // 重置 blurs
  store.commit(`layout/${mutationTypes.LAYOUT_SET_BLURS}`, 0)

  /* 路由发生变化修改页面title */
  if (title) {
    document.title = title
  }
  window.requestAnimationFrame(next)
})

router.afterEach(() => {
  isPush = false
  sessionStorage.setItem('lordless_direction', 'forward')
  // store.commit(`layout/${mutationTypes.LAYOUT_SET_POP_DIRECTION}`, 'forward')
})

store.router = router
sync(store, router)
export default router
