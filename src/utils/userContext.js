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
        const storedEmail = (await AsyncStorage.getItem("email"))?.toLowerCase();
        console.log(storedEmail);
        if (storedEmail) {
          const querySnapshot = await firestore().collection("Users").where("email", "==", storedEmail).limit(1).get();

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            setUserData({ id: doc.id, ...doc.data() });
          } else {
            console.log("No user found with this email.");
          }
        } else {
          console.log("No email found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error fetching user by stored email:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserByEmail();
  }, []);

  return <UserContext.Provider value={{ userData, setUserData, loading }}>{children}</UserContext.Provider>;
};
