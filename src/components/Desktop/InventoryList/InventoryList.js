import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from "firebase/firestore";
import { firebaseDb } from "../../../service/Firebase";

/**
 * Creates new item if Name does not already exist, if name exists, it updates the "inInventory" flag to true
 * @param {Object} item
 * @param {Account} account
 * @returns {Object} String description, String status, String title
 */
export async function createItem(item, account) {
	try {
		let itemName = item.name.replace(/\b\w/g, (char) => char.toUpperCase());
		let itemCategory =
			item.category.charAt(0).toUpperCase() + item.category.slice(1);

		const q = query(
			collection(firebaseDb, "Items"),
			where("account", "==", account),
			where("category", "==", itemCategory),
			where("name", "==", itemName)
		);

		const querySnapshot = await getDocs(q);
		if (!querySnapshot.empty) {
			const doc = querySnapshot.docs[0];
			if (doc.data().inInventory) {
				return {
					description: "Item already in Inventory",
					status: "error",
					title: "Error",
				};
			} else {
				await updateDoc(doc.ref, {
					amount: item.amount,
					inInventory: true,
					timestamp: serverTimestamp(),
				});
				return {
					description: "Item updated successfully",
					status: "success",
					title: "Success",
				};
			}
		} else {
			await addDoc(collection(firebaseDb, "Items"), {
				account: account,
				timestamp: serverTimestamp(),
				inInventory: true,
				inShoppingList: false,
				amount: item.amount,
				category: itemCategory,
				name: itemName,
			});

			return {
				description: "Item added successfully",
				status: "success",
				title: "Success",
			};
		}
	} catch (error) {
		console.error("Error while creating new item: ", error);
		return {
			description: "Error while creating item",
			status: "error",
			title: "Error",
		};
	}
}

/**
 * Updates the "inInventory" flag to false for all the items
 * @param {Object[]} items
 * @returns {Object} Result
 */
export async function deleteItems(items) {
	try {
		const deletePromises = items.map((item) => {
			const docRef = doc(firebaseDb, "Items", item.id);
			return updateDoc(docRef, {
				inInventory: false,
			});
		});

		await Promise.all(deletePromises);
		return {
			description: "Item(s) removed successfully",
			status: "success",
			title: "Success",
		};
	} catch (error) {
		console.error("Error while deleting item(s): " + error);
		return {
			description: "Error while deleting item(s)",
			status: "error",
			title: "Error",
		};
	}
}

/**
 * Function for getting Inventory items of a specific account
 * @param {String} account
 * @returns {Object[]} items
 */
export async function getItems(account) {
	try {
		let items = [];
		const q = query(
			collection(firebaseDb, "Items"),
			where("account", "==", account),
			where("inInventory", "==", true)
		);

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			items.push({ id: doc.id, ...doc.data() });
		});
		return items;
	} catch (error) {
		console.error("Error while fetching Inventory items: ", error);
		return [];
	}
}

/**
 * @description Takes an array of items and sets "inShoppingList" flag to true
 * @param {Object[]} items
 * @returns {Boolean} Success status
 */
export async function shopItems(items) {
	try {
		let itemIds = items.map((item) => item.id);
		const q = query(
			collection(firebaseDb, "Items"),
			where("__name__", "in", itemIds)
		);
		const querySnapshot = await getDocs(q);
		if (!querySnapshot.empty) {
			const existingIds = querySnapshot.docs.map((doc) => doc.id);
			const updateItemsPromise = existingIds
				.filter((id) => {
					const docSnapshot = querySnapshot.docs.find((doc) => doc.id === id);
					return docSnapshot && !docSnapshot.data().inShoppingList;
				})
				.map(async (id) => {
					const docRef = doc(firebaseDb, "Items", id);
					return updateDoc(docRef, {
						inShoppingList: true,
						timestamp: serverTimestamp(),
					});
				});

			if (updateItemsPromise.length < 1) {
				return {
					description: "Item(s) already in Store List",
					status: "warning",
					title: "Warning",
				};
			}
			await Promise.all(updateItemsPromise);
			return {
				description: "Store List updated successfully",
				status: "success",
				title: "Success",
			};
		} else {
			return {
				description: "Item not found",
				status: "error",
				title: "Error",
			};
		}
	} catch (error) {
		console.error("Could not update Store List: ", error);
		return {
			description: "Could not update Store List",
			status: "error",
			title: "Error",
		};
	}
}
