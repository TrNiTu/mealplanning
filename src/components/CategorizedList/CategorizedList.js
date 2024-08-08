import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firebaseDb } from "../../service/Firebase";

export async function getItems(account, category) {
  let items = [];
  const q = query(
    collection(firebaseDb, "Inventory"),
    where("account", "==", account),
    where("category", "==", category)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });

  return items;
}
