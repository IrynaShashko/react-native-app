import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };
export const authSignInUser = () => async (dispatch, getState) => {};
export const authSignOutUser = () => async (dispatch, getState) => {};
