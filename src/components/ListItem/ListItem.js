import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { firebaseDb } from "../../service/Firebase";

export async function updateItemAmount(docId, newAmount) {
  const docRef = doc(firebaseDb, "Inventory", docId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data: ", docSnap.data());

      await updateDoc(docRef, {
        amount: newAmount,
        timestamp: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error("Error while pdating document: ", error);
  }
}


export async function deleteItem(docId) {
    
}