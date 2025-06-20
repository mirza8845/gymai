// context/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const doc = await firestore().collection("Users").doc(currentUser.uid).get();
        setUserData(doc.data());
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
