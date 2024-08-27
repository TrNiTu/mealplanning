import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	where,
} from "firebase/firestore";
import { firebaseDb } from "../../../../service/Firebase";

/**
 * Creates a new document in the "Meals" collection and adds documents to the "ingredients" subcollection
 * @param {String} account - The account associated with the meal
 * @param {Object} newItem - The new meal item, including name, instructions, and amounts (ingredients)
 * @returns {Object} result - The result of the operation with status and description
 */
export async function addMeal(account, newItem) {
	let result = {
		description: "Could not add meal",
		status: "error",
		title: "Error",
	};
	try {
		const mealsColRef = collection(firebaseDb, "Meals");
		const newDocRef = await addDoc(mealsColRef, {
			account: account,
			timestamp: serverTimestamp(),
			instructions: newItem.instructions,
			name: newItem.name,
		});

		const ingredientsColRef = collection(newDocRef, "ingredients");

		await Promise.all(
			newItem.amounts.map(async (item) => {
				await addDoc(ingredientsColRef, {
					amount: item.value,
					reference: doc(firebaseDb, "Items", item.ingredientId), // Reference to the item document in the "Items" collection
				});
			})
		);

		result = {
			description: "Meal added successfully",
			status: "success",
			title: "Success",
		};
		return result;
	} catch (error) {
		console.error("Error while adding meal: ", error);
		return result;
	}
}

/**
 * Deletes meal document from the "Meals" collection
 * @param {Object} meal
 */
export async function deleteMeal(account, meal) {
	let result = {
		description: "Could not delete meal recipe",
		status: "error",
		title: "Error",
	};
	try {
		const q = query(
			collection(firebaseDb, "Meals"),
			where("__name__", "==", meal.id),
			where("account", "==", account)
		);
		const mealDocs = await getDocs(q);
		const mealDoc = mealDocs.docs[0].ref;
		const ingredientsRef = collection(mealDoc, "ingredients");
		const ingredientDocs = await getDocs(ingredientsRef);

		const deletePromises = [];
		ingredientDocs.forEach((doc) => {
			deletePromises.push(deleteDoc(doc.ref));
		});
		await Promise.all(deletePromises);
		await deleteDoc(mealDoc);
		result = {
			description: "Meal recipe deleted successfully",
			status: "success",
			title: "Success",
		};
		return result;
	} catch (error) {
		console.error("Error while deleting meal: ", error);
		return result;
	}
}

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
