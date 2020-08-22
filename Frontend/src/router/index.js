import Vue from "vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Play from "../pages/Play.vue";
import Router from "vue-router";
import Profile from "../pages/Profile.vue";
import Contribute from "../pages/Contribute.vue";
import Home from "../components/Home.vue";
Vue.use(Router);


let router = new Router({
  routes: [
    {path: "/", name:"Home",component: Home, meta:{
      auth:true
    }},
    {path: "/login", name: "Login", component: Login,meta:{
      guest: true
    }},
    {path: "/register", name: "Register", component: Register, meta:{
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
  ],
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.auth)){
    if (localStorage.getItem('jwt') == null){
      console.log(to.fullPath)
      localStorage.setItem('nextUrl',to.fullPath)
      next({
        path: '/login',
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
      next({name: 'Home'})
    }
  }
  else{
    next()
  }
})

export default router