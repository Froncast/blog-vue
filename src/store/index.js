import Axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import {
	db
} from "../db";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		status: "",
		token: localStorage.getItem("token") || '',
		user: {},
		posts: [],
		loading: false,
	},
	mutations: {
		auth_request(state) {
			state.status = "loading";
		},
		auth_success(state, payload) {
			(state.status = "success"),
			(state.token = payload.token),
			(state.user = payload.user.userLogin);
		},
		auth_error(state) {
			state.status = "error";
		},
		logout(state) {
			state.status = ''
			state.token = ''
		},
		get_posts(state, posts) {
			state.posts = posts
		},
		setLoading(state, payload) {
			state.loading = payload
		},
	},
	actions: {
		login: async ({
			commit
		}, payload) => {
			commit('auth_request')
			const query = await db.collection("users").get();
			const users = [];
			query.forEach((user) => {
				users.push(user.data());
			});

			return new Promise((resolve, reject) => {
				const u = users.find((user) => user.userLogin === payload.userLogin);

				if (u) {
					if (u.userPassword === payload.userPassword) {
						const token = Math.random()
							.toString(36)
							.substr(2);
						localStorage.setItem("token", token);
						const data = {
							token,
							user: u
						}
						commit("auth_success", data);
						resolve()
					} else {
						commit("auth_error", "Неправильная пара: логин и пароль");
						reject("Неправильная пара: логин и пароль");
					}
				} else {
					commit("auth_error", "Пользователь не найден");
					reject("Пользователь не найден");
				}
			});
		},
		register: async ({
			commit
		}, payload) => {
			commit("auth_request");

			return new Promise((resolve, reject) => {
				try {
					const user = db.collection("users").add(payload);
					payload.id = user.id;
					const token = Math.random()
						.toString(36)
						.substr(2);
					localStorage.setItem("token", token);
					commit("auth_success", token, user);
					resolve();
				} catch (err) {
					commit("auth_error");
					localStorage.removeItem("token");
					reject();
				}
			});
		},
		logout({
			commit
		}) {
			return new Promise((resolve) => {
				commit('logout')
				localStorage.removeItem('token')
				resolve()
			})
		},
		get_posts: async ({
			commit
		}) => {
			commit('setLoading', true)

			try {
				const res = await Axios.post("http://localhost:4000/graphql", {
					query: `{
						posts {
							title
							id
							description
							date
							author {
								name
								id
							}
						}
					}`,
				});
				commit('get_posts', res.data.data.posts)
				commit('setLoading', false)
			} catch (err) {
				commit('setLoading', false)
				throw err
			}
		}
	},
	getters: {
		isLoggedIn: (state) => !!state.token,
		authStatus: (state) => state.status,
		user: (state) => state.user,
		loading: (state) => state.loading,
		get_posts: (state) => state.posts
	},
});