import Vue from "vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Play from "../pages/Play.vue";
import Router from "vue-router";

Vue.use(Router);


export default new Router({
  routes: [
    {path: "/login", name: "Login", component: Login},
    {path: "/register", name: "Register", component: Register},
    {path: "/play", name: "Play", component: Play},
  ],
  mode: "history",
  linkExactActiveClass: "active",
});