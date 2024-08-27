import { collection, getDocs, query, where } from "firebase/firestore";
import { firebaseDb } from "../../../service/Firebase";

export async function getItems(account, category) {
	try {
		let items = [];
		const q = query(
			collection(firebaseDb, "Items"),
			where("account", "==", account),
			where("category", "==", category),
			where("inInventory", "==", true)
		);

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			items.push({ id: doc.id, ...doc.data() });
		});

		// sort list by timestamp
		if (items.length <= 1) {
			return items;
		} else {
			items.sort((a, b) => {
				return b.timestamp.toMillis() - a.timestamp.toMillis();
			});
		}
		return items;
	} catch (error) {
		console.error(
			"Error while fetching items in category " + category + ": ",
			error
		);
		return [];
	}
}
