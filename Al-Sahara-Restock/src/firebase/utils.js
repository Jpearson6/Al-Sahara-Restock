import {
  collection,
  getDocs,
  where,
  query,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage, firestore } from "../firebase/config";

function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';
  for (let i = 0; i < length; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomId;
}

const uploadImagesAndReturnURLs = async (images) => {
  let imageUrls = [];

  const uploadPromises = images.map((image) => {
    const storageRef = ref(storage, "images/" + generateRandomId(12) + image.name );
    const uploadTask = uploadBytesResumable(storageRef, image);

    // Listen for state changes, errors, and completion of the upload.
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              imageUrls.push(downloadURL);
              resolve();
            })
            .catch((err) => {
              console.error("Error getting download URL:", err);
              reject(err); // Reject this promise
            });
        }
      );
    });
  });
  //wait for all promises to resolve to get image urls for databse
  await Promise.all(uploadPromises);

  //return array of image urls
  return imageUrls;
};

const getRestockItems = async (setRows) => {
  const itemsCollection = collection(firestore, "items");
  const q = query(itemsCollection, where("ordered", "==", false));

  try {
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    setRows(items);
    return;
  } catch (error) {
    console.error("Error fetching items:", error);
    return;
  }
};

const getOrderedItems = async (setRows) => {
    const itemsCollection = collection(firestore, "items");
    const q = query(
      itemsCollection,
      where("ordered", "==", true),
      where("delivered", "==", false)
    );

    try {
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setRows(items);
      return;
    } catch (error) {
      console.error("Error fetching items:", error);
      return;
    }
}

const markItemAsOrdered = async (itemId) => {
  try {
    // Get a reference to the item document
    const itemDocRef = doc(firestore, "items", itemId);

    // Update the "ordered" field to true
    await updateDoc(itemDocRef, {
      ordered: true,
    });
    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error marking item as ordered:", error);
    return false; // Return false to indicate failure
  }
};

const markItemAsDelivered = async (itemId) => {
  try {
    // Get a reference to the item document
    const itemDocRef = doc(firestore, "items", itemId);

    // Update the "ordered" field to true
    await updateDoc(itemDocRef, {
      delivered: true,
    });
    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error marking item as ordered:", error);
    return false; // Return false to indicate failure
  }
};


const addNewItem = async (newItem) => {
  try {
    // Get a reference to the item document

    // Update the "ordered" field to true
    const dataRef = await addDoc(collection(firestore, "items"), newItem);
    return dataRef.id; // Return true to indicate success
  } catch (error) {
    console.error("Error adding new item to database:", error);
    return false; // Return false to indicate failure
  }
};

export {
  uploadImagesAndReturnURLs,
  getRestockItems,
  markItemAsOrdered,
  addNewItem,
  getOrderedItems,
  markItemAsDelivered
};
