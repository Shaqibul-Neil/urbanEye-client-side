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
  const updateUser = async (profile) => {
    await updateProfile(auth.currentUser, profile);
    setUser((prev) => ({
      ...prev,
      displayName: profile.displayName || prev.displayName,
      photoURL: profile.photoURL || prev.photoURL,
    }));
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
      setUser(currentUser);
      setUserLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const refreshUserToken = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      // Force token refresh (true)
      await currentUser.getIdToken(true);
      // console.log("Firebase token refreshed successfully!");
      // Force the user state update to trigger useAxiosSecure and useRole to run again
      setUser({ ...currentUser });
    }
  };
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
    refreshUserToken,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

/* Stale Firebase Token Solved
Problem: Jokhon admin kono staff account create kore, tokhon Firebase Custom Claims (role: "staff") set kora hoy. Staff member jokhon ei email/password diye prothombar login kore, tokhon tar user.accessToken (JWT) e oi notun claim gulo thake na.
Solution (await refreshUserToken()): Ei function ti auth.currentUser.getIdToken(true) call kore. true deyar karone Firebase ke force kora hoy notun token fetch korar jonno. Ei notun token-e staff role er claim thake.
Result: Ei notun, fresh token ti pore useAxiosSecure hook-er modhye $user?.accessToken variable e store hoy.
Eta akhe ashte apnar staff user login korar por immediate logout er shomossa thik hoyeche, ebong staff member ekhon correctly "staff" role dekhte pachche.Ekhon kaj korar main reason gulo holo:🔑 Key Fix: Token Refresh TimingApni je refreshUserToken() function ti AuthProvider-e add korechen ebong SignIn component-er handleSignIn function-er modhye call korechen, setai shobcheye critical fix.JavaScript      //force refresh to get new token so that user role changes
      await refreshUserToken(); // <--- CRITICAL STEP
      setUser(result?.user);
      //refetch role query
      await refetchRole();    // <--- CRITICAL STEP
1. Stale Firebase Token SolvedProblem: Jokhon admin kono staff account create kore, tokhon Firebase Custom Claims (role: "staff") set kora hoy. Staff member jokhon ei email/password diye prothombar login kore, tokhon tar user.accessToken (JWT) e oi notun claim gulo thake na.Solution (await refreshUserToken()): Ei function ti auth.currentUser.getIdToken(true) call kore. true deyar karone Firebase ke force kora hoy notun token fetch korar jonno. Ei notun token-e staff role er claim thake.Result: Ei notun, fresh token ti pore useAxiosSecure hook-er modhye $user?.accessToken variable e store hoy.
2. Axios Interceptor 401/403 FixProblem: Aghe, staff login korar por dashboard load hote gele, useRole hook-er maddhome /users/[email]/role endpoint e request jeto. Jeto useAxiosSecure diye, jeta stale token use korto. Server er verifyFireBaseToken middleware oi stale token ta ke Invalid bole reject korto, resulting in a 401 (Unauthorized) status code.

Solution (The timing): Apni await refreshUserToken() call korar por, setUser(result?.user) koren. Ete useAuth er user state update hoy. Ei state update useAxiosSecure hook ke re-run korte badhho kore.
Old Flow: Stale token > useAxiosSecure > Request to /role > Server 401 > Logout.
New Flow: Login > Token Refreshed > user state set > useAxiosSecure uses Fresh Token > useRole fires request to /role > Server validates token > Server returns role: "staff".

3. Role Data Refresh
Solution (await refetchRole()): refreshUserToken() cholar por, apnar TanStack Query-based useRole hook-er refetchRole() call kora hoy.

Ei call ti fresh token niye /users/[staff-email]/role endpoint e abar request kore. Backend ei request ti successfully process kore role: "staff" return kore, ebong useRole hook-er data update hoy.
*/
