import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import {
	collection,
	getDocs,
	getFirestore,
	query,
	where,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDWVqz0bx6LO-Vaa4gUqHSHrfaEeKkeU-w",
	authDomain: "grocerylist-72f24.firebaseapp.com",
	projectId: "grocerylist-72f24",
	storageBucket: "grocerylist-72f24.appspot.com",
	messagingSenderId: "693632045296",
	appId: "1:693632045296:web:6b5a29d9ca5052ad1cb235",
	measurementId: "G-HRH84FM83Q",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);

// For Mobile

// create actions
export async function createListItem(item, user) {}
export async function createMeal(item, user) {}

// delete actions
export async function deleteMeal(items, user) {}
export async function deleteInventoryItems(items, user) {}
export async function deleteStoreListItem(item, user) {}

// get actions
export async function getUserDocs(col, user) {
	let items = [];
	try {
		const q = query(
			collection(firebaseDb, col),
			where("account", "==", user.email)
		);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			items.push({ id: doc.id, ...doc.data() });
		});
		return items;
	} catch (error) {
		console.error("Error while retrieving " + col + " docs: ", error);
		return items;
	}
}

export async function getMeals(user) {}

// update actions
export async function updateInventoryItems(user, item) {}
export async function updateStoreListItem(items, user) {}
