import Vue from "vue";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Register from "../components/Register.vue";
import Quiz from "../components/Quiz.vue";
import Router from "vue-router";

Vue.use(Router);


export default new Router({
  routes: [
    {path: "/", name: "Home", component: Home},
    {path: "/login", name: "Login", component: Login},
    {path: "/register", name: "Register", component: Register},
    {path: "/quiz", name: "Quiz", component: Quiz},
  ],
  mode: "history",
  linkExactActiveClass: "active",
});