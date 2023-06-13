import { createRouter, createWebHistory } from 'vue-router'

import { route as routeIndex } from '@/modules/index'
import { route as routeDay01 } from '@/modules/day01'
import { route as routeDay02 } from '@/modules/day02'
import { route as routeDay03 } from '@/modules/day03'
import { route as routeDay04 } from '@/modules/day04'
import { route as routeDay05 } from '@/modules/day05'
import { route as routeDay06 } from '@/modules/day06'
import { route as routeDay07 } from '@/modules/day07'
import { route as routeDay08 } from '@/modules/day08'
import { route as routeDay09 } from '@/modules/day09'
import { route as routeDay10 } from '@/modules/day10'
import { route as routeDay11 } from '@/modules/day11'
import { route as routeDay12 } from '@/modules/day12'
import { route as routeDay13 } from '@/modules/day13'
import { route as routeDay14 } from '@/modules/day14'
import { route as routeDay15 } from '@/modules/day15'
import { route as routeDay16 } from '@/modules/day16'
import { route as routeDay17 } from '@/modules/day17'
import { route as routeDay18 } from '@/modules/day18'

import { route as routeDay20 } from '@/modules/day20'
import { route as routeDay22 } from '@/modules/day22'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    routeIndex,
    routeDay01,
    routeDay02,
    routeDay03,
    routeDay04,
    routeDay05,
    routeDay06,
    routeDay07,
    routeDay08,
    routeDay09,
    routeDay10,
    routeDay11,
    routeDay12,
    routeDay13,
    routeDay14,
    routeDay15,
    routeDay16,
    routeDay17,
    routeDay18,
    routeDay20,
    routeDay22,
  ],
})

export default router
