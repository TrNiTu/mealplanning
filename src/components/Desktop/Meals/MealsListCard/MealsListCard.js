import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from "firebase/firestore";
import { firebaseDb } from "../../../../service/Firebase";

/**
 *
 * @param {*} account
 * @returns {Object} result
 */
export async function addMeal(account) {
	let result = {
		description: "Could not create new meal",
		status: "error",
		title: "Error",
	};
	try {
		const mealsRef = collection(firebaseDb, "Meals");

		result = {
			description: "Created new meal successfully",
			status: "success",
			title: "Success",
		};
		return result;
	} catch (error) {
		console.error("Error whlie creating new Meal: ", error);
		return result;
	}
}

/**
 * Adds a new ingredient to a meal
 * @param {String} ingredientAmount
 * @param {String} itemId
 * @param {Object} meal
 * @returns
 */
export async function addMealIngredient(ingredientAmount, itemId, meal) {
	let result = {
		description: "Could not add ingredient",
		status: "error",
		title: "Error",
	};
	try {
		const itemRef = doc(firebaseDb, "Items", itemId);
		const mealDocRef = doc(firebaseDb, "Meals", meal.id);

		const q = query(
			collection(firebaseDb, "Meals/" + meal.id + "/ingredients"),
			where("reference", "==", itemRef)
		);
		const ingredientExists = await getDocs(q);
		if (!ingredientExists.empty) {
			return (result = {
				description: "Ingredient already in list",
				status: "error",
				title: "Error",
			});
		}

		if (itemRef.id && mealDocRef.id) {
			const addResult = await addDoc(
				collection(firebaseDb, "Meals/" + meal.id + "/ingredients"),
				{
					amount: ingredientAmount,
					reference: itemRef,
				}
			);

			result = {
				description: "Ingredient added successfully",
				status: "success",
				title: "Success",
			};
		}
		return result;
	} catch (error) {
		console.error("Error while adding ingredient: ", error);
		return result;
	}
}

export async function deleteMeal(meal) {
	let result = {
		description: "Could not delete meal",
		status: "error",
		title: "Error",
	};
	try {
		const mealRef = doc(collection(firebaseDb, "Meals"), meal.id);
		const ingredientsCol = collection(mealRef, "ingredients");
		const ingredientsRefs = await getDocs(ingredientsCol);
		const deletePromises = ingredientsRefs.doc.map((doc) => {
			deleteDoc(doc);
		});

		await Promise.all(deletePromises);
		await deleteDoc(mealRef);

		result = {
			description: "Meal deleted successfully",
			status: "success",
			title: "Success",
		};
		return result;
	} catch (error) {
		console.error("Could not delete meal: ", error);
	}
}

/**
 * Gets a doc from the "Meals" collection
 * @param {Object} meal
 * @returns
 */
export async function getMeal(meal) {
	let item = {};
	try {
		const mealDoc = await getDoc(collection(firebaseDb, "Meals", meal.id));
		if (!mealDoc.exists()) {
			console.error("Error while retrieving meal: Not found");
			return item;
		} else {
			return mealDoc.data;
		}
	} catch (error) {
		console.error("Error while retrieving meal ", error);
		return item;
	}
}

/**
 * Retrieves docs from the "Items" collection off of meal.collection("ingredients").reference
 * references
 * @param {Object[]} meal
 * @returns {Object[]} items
 */
export async function getMealIngredients(meal) {
	let items = [];

	try {
		const mealDocRef = doc(firebaseDb, "Meals", meal.id);
		const mealDoc = await getDoc(mealDocRef);

		if (!mealDoc.exists()) {
			console.error(
				"Item " + meal.name + " with id: " + meal.id + " doesn't exist"
			);
			return items;
		}

		const ingredientsColRef = collection(mealDocRef, "ingredients");
		const ingredientsSnapshot = await getDocs(ingredientsColRef);

		for (const ingredientDoc of ingredientsSnapshot.docs) {
			const itemRef = ingredientDoc.data().reference;
			const itemDoc = await getDoc(itemRef);
			if (itemDoc.exists()) {
				items.push({ id: itemDoc.id, ...itemDoc.data() });
			}
		}

		return items;
	} catch (error) {
		console.error(
			"Error while retrieving " + meal.name + " ingredients: ",
			error
		);
		return items;
	}
}

/**
 * Deletes docs in the "ingredients" collection on a meal
 * @param {Object[]} items
 * @returns {Object} result
 */
export async function removeIngredients(meal, items) {
	let result = {
		description: "Could not delete ingredients",
		status: "error",
		title: "Error",
	};
	try {
		let path = `Meals/${meal.id}/ingredients`;
		const ingredientsColRef = collection(firebaseDb, path);

		for (let item of items) {
			const ingredientRef = doc(ingredientsColRef, item.id);
			await deleteDoc(ingredientRef);
		}

		result = {
			description: "Ingredients deleted successfully",
			status: "success",
			title: "Success",
		};
		return result;
	} catch (error) {
		console.error("Could not delete ingredients: ", error);
		return result;
	}
}

/**
 * Updates the meal to have the edited instructions
 * @param {String} newInstructions
 * @param {Object} meal
 * @returns {Object} result for toast event
 */
export async function saveMealInstructions(meal, newInstructions) {
	let result = {
		description: "Could not save instructions",
		status: "error",
		title: "Error",
	};
	try {
		const mealDocRef = doc(firebaseDb, "Meals", meal.id);
		const updateResult = updateDoc(mealDocRef, {
			instructions: newInstructions,
		});
		if (updateResult) {
			result = {
				description: "New instructions saved",
				status: "success",
				title: "Success",
			};
		}
		return result;
	} catch (error) {
		console.error(
			"Could not save instructions on meal " + meal.name + ": ",
			error
		);
		return result;
	}
}

/**
 * Utility function that formats a Firebase/Firestore timestamp
 * @param {String} timestamp
 * @returns {String} formattedDate
 */
export function formatTimestamp(timestamp) {
	if (!timestamp) return "";

	const date = timestamp.toDate();
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		day: "2-digit",
		month: "2-digit",
		year: "2-digit",
	}).format(date);

	return formattedDate;
}

/**
 * Check if an item exists in the "Items" collection by the name and the account
 * If it does, get the reference and use it, if it doesn't, have user create new Item
 * @param {String} itemName
 * @returns {Boolean} item exists
 */
export async function checkItemExists(account, category, name) {
	let result = {
		docRef: "",
		status: "error",
	};
	try {
		const itemName = name.replace(/\b\w/g, (char) => char.toUpperCase());
		const itemCategory = category.charAt(0).toUpperCase() + category.slice(1);
		const q = query(
			collection(firebaseDb, "Items"),
			where("account", "==", account),
			where("category", "==", itemCategory),
			where("name", "==", itemName)
		);
		const querySnapshot = await getDocs(q);
		if (!querySnapshot.empty) {
			const doc = querySnapshot.docs[0];
			// TODO: implement create Item (not ingredient)
			// return docref?
			result = {
				docRef: "",
				status: "Success",
			};
		} else {
			const addDocResult = await firebaseDb.collection("Items").add({
				account: account,
				timestamp: serverTimestamp(),
				inInventory: false,
				inShoppingList: false,
				amount: "Out",
				category: itemCategory,
				name: itemName,
			});
			result = {
				docRef: "",
				status: "Success",
			};
		}
	} catch (error) {
		console.error("Error while checking if item " + name + " exists: ", error);
		return false;
	}
}
