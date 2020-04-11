import Vue from 'vue'
import VueRouter from 'vue-router'

const MainPage = () => import('views/mainPage/MainPage')
const PersonalPage = () => import('views/personalPage/PersonalPage')
const ProblemPage = () => import('views/problemPage/ProblemPage')
const TranslationPage = () => import('views/translationPage/TranslationPage')
const LoginPage = () => import('views/loginPage/LoginPage')
const AddLogPage = () => import('views/personalPage/childens/AddLog')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'login',
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/mainPage',
    component: MainPage
  },
  {
    path: '/personalPage',
    component: PersonalPage
  },
  {
    path: '/translationPage',
    component: TranslationPage
  },
  {
    path: '/problemPage',
    component: ProblemPage
  },
  {
    path: '/addLogPage',
    component: AddLogPage
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
