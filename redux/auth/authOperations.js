import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useSelector } from "react-redux";
import { authSlice } from "./authReducer";
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
      await (user.displayName = login);
      console.log("user----->", user);
      // const newUserUpdate = await auth.updateCurrentUser(user);
      // console.log("newUserUpdate----->", newUserUpdate);
      const newUserCurrent = await auth.currentUser;
      const newUser = await auth.updateCurrentUser(newUserCurrent);
      console.log("newUser---->", newUser);
      const newUserUpdate = await auth.currentUser;
      console.log("newUserUpdate----->", newUserUpdate);
      const { uid, displayName } = await auth.currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const userCurent = await auth.currentUser;
      console.log("userCurent--->", userCurent);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };
export const authSignOutUser = () => async (dispatch, getState) => {
  await auth.signOut();
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    // const state = useSelector((state) => state.auth);
    // console.log("state in login---->", state);
    console.log("user--->", user);
    if (user) {
      dispatch(authStateChange({ stateChange: true }));

      dispatch(
        updateUserProfile({
          userId: user.uid,
          login: user.displayName,
        })
      );
    }
  });
};
