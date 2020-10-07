import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Posts from "@/components/Posts";
import PageNotFound from "@/views/404";
import store from "../store";

Vue.use(VueRouter);

const routes = [{
		path: "",
		name: "home",
		component: Home,
	},
	{
		path: "/login",
		name: "login",
		component: Login,
	},
	{
		path: "/register",
		name: "register",
		component: Register,
	},
	{
		path: "/posts",
		name: "posts",
		component: Posts,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "*",
		component: PageNotFound,
	},
	{
		path: "*/*",
		component: PageNotFound,
	},
];

const router = new VueRouter({
	routes,
	mode: "history",
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (store.getters.isLoggedIn) {
			next()
			return
		}
		next("/login");
	} else {
		next();
	}
});

export default router;