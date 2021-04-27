import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Tip from "../views/Tip.vue";
import SignUp from "../views/SignUp.vue";
import TipUser from "../views/TipUser.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Confirmation from "../views/Confirmation.vue";
import GenerateQR from "../views/GenerateQR.vue";
import Logout from "../views/Logout.vue";
import NotFound from "../views/NotFoundPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/tip",
    name: "Tip",
    component: Tip,
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUp,
  },
  {
    path: "/tip-user/:id",
    name: "TipUser",
    component: TipUser,
  },
  {
    path: "/login/:email?",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile/:id?",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/confirmation/:id",
    name: "Confirmation",
    component: Confirmation,
  },
  {
    path: "/generate/",
    name: "GenerateQR",
    component: GenerateQR,
  },
  {
    path: "/logout/",
    name: "Logout",
    component: Logout,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  history: true,
  routes,
});

export default router;
