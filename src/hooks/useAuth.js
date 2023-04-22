import { useEffect, useState } from "react";
import { auth } from "../firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user is signed in, set the user state
        setUser(user);
      } else {
        // If user is signed out, set the user state to null
        setUser(null);
      }
    });

    // Clean up the auth state listener
    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuth;
