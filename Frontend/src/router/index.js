import Vue from "vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Play from "../pages/Play.vue";
import Router from "vue-router";
import Profile from "../pages/Profile.vue";
import Contribute from "../pages/Contribute.vue";
import Home from "../components/Home.vue";
import Quiz from "../components/Quiz.vue";
Vue.use(Router);


let router = new Router({
  routes: [
    {path: "/", name:"Home", component: Home, meta:{
      auth:true
    }},
    {path: "/auth/login", name: "Login", component: Login, meta:{
      guest: true
    }},
    {path: "/auth/register", name: "Register", component: Register, meta:{
      guest: true
    }},
    {path: "/play", name: "Play", component: Play, meta: {
      auth: true
    }},
    {path: "/profile", name: "Profile", component: Profile, meta: {
      auth: true
    }},
    {path: "/contribute", name: "Contribute", component: Contribute, meta: {
      auth: true
    }},
    {path: "/quiz", name: "Quiz", component: Quiz, meta: {
        auth: true
    }},

  ],
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.auth)){
    if (localStorage.getItem('jwt') == null){
      console.log(to.fullPath)
      localStorage.setItem('nextUrl',to.fullPath)
      next({
        path: '/auth/login',
      })
    }
    else{
      next()
    }
  }
  else if(to.matched.some(record => record.meta.guest)){
    if(localStorage.getItem('jwt') == null){
      next()
    }
    else{
      next({name: 'Play'})
    }
  }
  else{
    next()
  }
})

export default router;