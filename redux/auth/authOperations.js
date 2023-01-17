import db from "../../firebase/config";

export const authSignInUser = () => async (dispatch, getState) => {};

export const authSignUpUser = ({ login, email, password }) =>
  console.log("login, email, password", login, email, password);
async (dispatch, getState) => {
  console.log("login, email, password", login, email, password);
  try {
    const user = await db
      .auth()
      .createUserWithEmailAndPassword(email, password);
    //   .then((userCredential) => {
    //     // Signed in
    console.log("user in auth--->", user);
    //     const user = userCredential.user;

    //     // ...
    //   });
  } catch (error) {
    console.log("error", error);
    console.log("error.message", error.message);
  }
};

export const authSignOutUser = () => async (dispatch, getState) => {};
