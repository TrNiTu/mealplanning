import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from "firebase/firestore";
import { firebaseDb } from "../../../../service/Firebase";

// Constants
import { CATEGORIES } from "../../../../service/Constants";

const categoryOrder = CATEGORIES.reduce((acc, category, index) => {
	acc[category] = index;
	return acc;
}, {});

/**
 * Sets flag on each item inShoppingList => false
 * @param {*} items
 * @returns {Object[]} result
 */
export async function deleteItems(items) {
	let result = {
		description: "Could not delete items",
		status: "error",
		title: "Error",
	};
	try {
		let itemsUpdated = false;
		const promises = items.map(async (item) => {
			const itemRef = doc(firebaseDb, "Items", item.id);
			const docSnap = await getDoc(itemRef);
			if (docSnap.exists()) {
				await updateDoc(itemRef, {
					inShoppingList: false,
					timestamp: serverTimestamp(),
				});
				itemsUpdated = true;
			}
		});

		let promiseResult = await Promise.all(promises);
		if (promiseResult && itemsUpdated) {
			console.log("promiseResult: ", promiseResult);
			console.log("result: ", result);
			return (result = {
				description: "Items deleted successfully",
				status: "success",
				title: "Success",
			});
		}
		return result;
	} catch (error) {
		console.error("Error while deleting items: ", error);
		return result;
	}
}
/**
 * Returns a list of items that are bound to the user's account where inShoppingList = true
 * @param {String} account
 * @returns {Object[]} items
 */
export async function getItems(account) {
	let items = [];
	try {
		const q = query(
			collection(firebaseDb, "Items"),
			where("account", "==", account),
			where("inShoppingList", "==", true)
		);
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			return items;
		}
		querySnapshot.forEach((doc) => {
			items.push({ id: doc.id, ...doc.data() });
		});

		// sort by category, consistent with CATEGORIES constant
		items.sort((a, b) => {
			const aIndex =
				categoryOrder[a.category] !== undefined
					? categoryOrder[a.category]
					: CATEGORIES.length;
			const bIndex =
				categoryOrder[b.category] !== undefined
					? categoryOrder[b.category]
					: CATEGORIES.length;
			return aIndex - bIndex;
		});
		return items;
	} catch (error) {
		console.log("Error while fetching Store Items: ", error);
		return items;
	}
}

/**
 * Updates the items passed inShoppingList => false, inInventory => true, amount => 'High'
 * @param {Object[]} items
 * @returns {Object[]} result -- used for show toast event
 */
export async function saveItems(items) {
	let result = {
		description: "Could not save items",
		status: "error",
		title: "error",
	};
	try {
		const promises = items.map(async (item) => {
			const itemRef = doc(firebaseDb, "Items", item.id);

			await updateDoc(itemRef, {
				amount: "High",
				inInventory: true,
				inShoppingList: false,
				timestamp: serverTimestamp(),
			});
		});

		let promiseResult = await Promise.all(promises);
		if (promiseResult) {
			return (result = {
				description: "Items saved successfully",
				status: "success",
				title: "Success",
			});
		}
		return result;
	} catch (error) {
		console.error("Error while saving items: ", error);
		return result;
	}
}
