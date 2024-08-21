import {
	addDoc,
	db,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	where,
} from "firebase/firestore";
import { firebaseDb } from "../../../service/Firebase";

/**
 * Check if an item exists in the "Items" collection by the name and the account
 * If it does, get the reference and use it, if it doesn't, have user create new Item
 * @param {String} itemName
 * @returns {Boolean} item exists
 */
export async function getIngredientRef(account, category, name) {
	try {
		const itemName = name.replace(/\b\w/g, (char) => char.toUpperCase());
		const itemCategory = category.charAt(0).toUpperCase() + category.slice(1);
		let q = query(
			collection(firebaseDb, "Items"),
			where("account", "==", account),
			where("category", "==", itemCategory),
			where("name", "==", itemName)
		);
		const querySnapshot = await getDocs(q);
		if (!querySnapshot.empty) {
			const doc = querySnapshot.docs[0];
			return doc.id;
		} else {
			const addItemResult = await addDoc(collection(firebaseDb, "Items"), {
				account: account,
				timestamp: serverTimestamp(),
				inInventory: false,
				inShoppingList: false,
				amount: "Out",
				category: itemCategory,
				name: itemName,
			});
			return addItemResult.id;
		}
	} catch (error) {
		console.error("Error while checking if item " + name + " exists: ", error);
		return "";
	}
}
