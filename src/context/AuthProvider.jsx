import { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth } from "../firebase/firebase.Config";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  //sign up with email password
  const signUpUser = (email, password) => {
    setUserLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //sign in user
  const signInUser = (email, password) => {
    setUserLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //update user
  const updateUser = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  //sign in with google
  const signInWithGoogle = () => {
    setUserLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //logout
  const signOutUser = () => {
    setUserLoading(true);
    return signOut(auth);
  };

  //on state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserLoading(false);
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    signInWithGoogle,
    user,
    setUser,
    userLoading,
    setUserLoading,
    signUpUser,
    signInUser,
    signOutUser,
    updateUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
