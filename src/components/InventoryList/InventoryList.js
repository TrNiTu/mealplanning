import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firebaseDb } from "../../service/Firebase";

export async function getItems(account) {
  let items = [];
  const q = query(
    collection(firebaseDb, "Inventory"),
    where("account", "==", account)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });
  return items;
}

export async function deleteItem(docId) {
  const docRef = doc(firebaseDb, "Inventory", docId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("You're attempting to delete item: ", docSnap.data());
      deleteDoc(docRef);
    }
  } catch (error) {
    console.error("Error while deleting item: ", error);
  }
}

/**
 * @description This function will take an Array of DocIds to put into the "Store List" collection
 * @param {String[]} docIds
 */
export async function addItemsToStoreList(docIds) {
}
export async function destroyItems(items) {
  // TODO: implement logic to delete items
}
