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

/**
 * @description Creates and adds new item to the database
 * @param {Object[]} item - fields: String amount, String category, String name 
* @param {String} account - user's email
*/
export async function createItem(item, account) {
  // auto-id, auto timestamp
}

export async function destroyItem(docId) {
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

/**
 * @description deletes multiple documents from the Inventory collection
 * @param {Object[]}
 */
export async function destroyItems(docs) {
  const deletePromises = docs.map((item) => {
    const docRef = doc(firebaseDb, "Inventory", item.id);
    return deleteDoc(docRef);
  });

  await Promise.all(deletePromises);
}

/**
 * @description This function will take an Array of DocIds to put into the "Store List" collection
 * @param {String[]} docIds
 */
export async function addItemsToStoreList(docIds) {}
