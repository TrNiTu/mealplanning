import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { firebaseDb } from "../../../../service/Firebase";

/**
 *  Fetches from Firestore all ingredient references from collection of a given meal from parameter
 * @param {Object} meal
 * @returns {Object[]} items
 */
export async function getMealIngredients(meal) {
	let items = [];
	try {
		let path = "Meals/" + meal.id + "/ingredients";
		const ingredientsCollectionRef = collection(firebaseDb, path);
		const snapshot = await getDocs(ingredientsCollectionRef);
		if (!snapshot.empty) {
			snapshot.forEach((doc) => {
				items.push({
					id: doc.id,
					...doc.data(),
				});
			});
			return items;
		}
	} catch (error) {
		console.error("Could not retrieve ingredient refs: ", error);
		return items;
	}
}

/**
 * Gets Items from the "Items" collection in Firestore based off ingredient references that point to items in the collection
 * @param {Object} ingredients
 * @returns {Object[]} items
 */
export async function getIngredientItems(ingredients) {
	let items = [];
	try {
		for (let i of ingredients) {
			if (i.reference) {
				const itemSnapshot = await getDoc(i.reference);
				if (itemSnapshot.exists()) {
					items.push({
						id: itemSnapshot.id,
						...itemSnapshot.data(),
					});
				}
			}
		}
		return items;
	} catch (error) {
		console.error("Error while retrieving Items from ingredient refs: ", error);
		return items;
	}
}
