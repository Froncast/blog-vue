import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase
	.initializeApp({
		apiKey: "AIzaSyCCovWx8UsriDTkYMsEIkdaKU_lWR0kPAE",
		authDomain: "todo-vue-7d916.firebaseapp.com",
		databaseURL: "https://todo-vue-7d916.firebaseio.com",
		projectId: "todo-vue-7d916",
		storageBucket: "todo-vue-7d916.appspot.com",
		messagingSenderId: "646482519820",
		appId: "1:646482519820:web:65452002b18b3da9eb0b29",
		measurementId: "G-LKX79RVVFD"
	})
	.firestore()