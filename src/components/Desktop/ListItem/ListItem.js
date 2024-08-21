import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../../../service/Firebase";

/**
 * @param {String} docId
 * @param {String} newAmount
 * @returns {Object} String description, String status, String title
 */
export async function updateItemAmount(docId, newAmount) {
	const docRef = doc(firebaseDb, "Items", docId);
	try {
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log("Document data: ", docSnap.data());

			await updateDoc(docRef, {
				amount: newAmount,
				timestamp: serverTimestamp(),
			});

			return {
				description: "Item updated successfully",
				status: "success",
				title: "Success",
			};
		} else {
			return {
				description: "Item does not exist",
				status: "error",
				title: "Error",
			};
		}
	} catch (error) {
		console.error("Error while updating document: ", error);
		return {
			description: "Error while updating item",
			status: "error",
			title: "Error",
		};
	}
}
