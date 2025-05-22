import { createRouter, createWebHistory } from 'vue-router'
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import Personaldetails from '../components/Personaldetails.vue'
import Selectauth from '../components/Selectauth.vue'
import Home from '../components/Home.vue'
import matches from '../components/matches.vue'
import Editprofile from '../components/Editprofile.vue'
import Message from '../components/Message.vue'
import Requests from '../components/Requests.vue'


const routes = [
    { path: '/', component: Home },
    { path: '/selectauth', component: Selectauth },
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
    { path: '/personal', component: Personaldetails },
    { path: '/matches', component: matches },
    { path: '/editprofile', component: Editprofile },
    { path: '/message', component: Message },
    {path:'/request',component:Requests}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        const visited = localStorage.getItem('visitedSelectAuth')

        if (!visited) {
            localStorage.setItem('visitedSelectAuth', 'true')
            return next('/selectauth')
        }
    }
    next()
})

export default router
