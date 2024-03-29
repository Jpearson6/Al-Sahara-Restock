import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebase/config";

import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(firestore, "users", user.uid);
        getDoc(docRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const role = docSnapshot.data().role;
              setUser({ ...user, role: role });
              setIsFetching(false);
              return;
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        setUser(null);
        setIsFetching(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<SignIn user={user} />} />
        <Route
          index
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <HomePage user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
