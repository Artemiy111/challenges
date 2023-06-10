import { createRouter, createWebHistory } from 'vue-router'

import { route as routeDay01 } from '@/modules/day01'
import { route as routeDay02 } from '@/modules/day02'
import { route as routeDay03 } from '@/modules/day03'
import { route as routeDay04 } from '@/modules/day04'
import { route as routeDay05 } from '@/modules/day05'
import { route as routeDay06 } from '@/modules/day05'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [routeDay01, routeDay02, routeDay03, routeDay04, routeDay05, routeDay06],
})

export default router
