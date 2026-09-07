// context/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserByEmail = async () => {
      try {
        setLoading(true);
        const storedEmail = (await AsyncStorage.getItem("email"))?.toLowerCase();
        console.log("Stored email:", storedEmail);
        
        if (storedEmail) {
          const querySnapshot = await firestore()
            .collection("Users")
            .where("email", "==", storedEmail)
            .limit(1)
            .get();

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            setUserData({ id: doc.id, ...doc.data() });
          } else {
            console.log("No user found with this email.");
            setUserData(null);
          }
        } else {
          console.log("No email found in AsyncStorage.");
          setUserData(null);
        }
      } catch (error) {
        console.log("Error fetching user by stored email:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserByEmail();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};
