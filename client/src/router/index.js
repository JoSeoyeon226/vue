import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Join from "../views/Join.vue"
import BoardList from "../views/board/list.vue"
import BoardWrith from "../views/board/write.vue"
import BoardItem from "../views/board/item.vue"
import BoardMoidfy from "../views/board/modify.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/join",
    component: Join
  },
  {
    path: "/board",
    component: BoardList
  },
  {
    path: "/board/write",
    component: BoardWrith
  },
  {
    path: "/board/item/:id", //:은 동적인 주소값을 받아들일때 씀
    component: BoardItem

  },
  {
    path: "/board/modify/:id", //:은 동적인 주소값을 받아들일때 씀
    component: BoardMoidfy

  },
]

const router = new VueRouter({
  routes
})

export default router
