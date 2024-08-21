import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firebaseDb } from "../../../service/Firebase";

/**
 * Gets all docs from the "Meals" collection in Firestore bound to the account
 * @param {String} account
 * @returns {Object[]} meals
 */
export async function getMeals(account) {
	let meals = [];
	try {
		const q = query(
			collection(firebaseDb, "Meals"),
			where("account", "==", account)
		);

		const querySnapshot = await getDocs(q);
		meals = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		console.log("meals: ", meals);

		if (meals.size < 1) {
			return meals;
		} else {
			meals.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());
			return meals;
		}
	} catch (error) {
		console.error("Error while retrieving Meals: ", error);
		return meals;
	}
}
