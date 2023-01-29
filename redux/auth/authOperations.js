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
      const newUserCurrent = await auth.currentUser;
      const newUser = await auth.updateCurrentUser(newUserCurrent);
      const newUserUpdate = await auth.currentUser;
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
