import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import firebaseApp from "../../service/Firebase";

const db = getFirestore(firebaseApp);

export async function getInventoryItems(account) {
  let items = [];
  const q = query(
    collection(db, "Inventory"),
    where("account", "==", account)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    items.push(doc.data());
  });
  console.log("items: ", items);
  return items;
}
