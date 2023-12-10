// importing Hooks
import { createContext, useContext, useState } from "react";

// importing Hook from react-router-dom
import { useNavigate } from "react-router-dom";

// importing function for toast notifications
import Notification from "../utils/Notification";

// importing firebase
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

// create context
const authenticationContext = createContext();
// this return  all value pass to authenticationContext
function useAuthentication() {
  const value = useContext(authenticationContext);
  return value;
}

function CustomAuthenticationContext({ children }) {
  // signupValue is use to contain name, email and password entered by user during signup
  const [signUpValues, setSignUpValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUpButtonDisable, setSignUpButtonDisable] = useState(false);
  const navigate = useNavigate();

  // it take care of signup
  const handleSignUp = () => {
    if (signUpValues.name && signUpValues.email && signUpValues.password) {
      setSignUpButtonDisable(true);
      // firebase code
      createUserWithEmailAndPassword(
        auth,
        signUpValues.email,
        signUpValues.password
      )
        .then(async (data) => {
          // sign up successful
          Notification("Sign up successfully", false);
          const user = data.user;

          // create empty product and orders of this user in firebase
          await setDoc(doc(db, "usersCarts", user.uid), {
            products: [],
          });
          await setDoc(doc(db, "usersOrders", user.uid), {
            orders: [],
          });

          // update user displayName to name provided by user
          await updateProfile(user, { displayName: signUpValues.name });
          setSignUpButtonDisable(false);
          navigate("/");
        })
        .catch((error) => {
          setSignUpButtonDisable(false);
          Notification(error.code, true);
        });
    } else {
      Notification("Please fill all fields", true);
    }
  };

  // LoginValue is use to contain email and password entered by user during login
  const [loginValues, setLoginValues] = useState({ email: "", password: "" });
  const [LoginButtonDisable, setLoginButtonDisable] = useState(false);

  // it take care of login
  let handleLogin = () => {
    if (loginValues.email && loginValues.password) {
      setLoginButtonDisable(true);
      // firebase code
      signInWithEmailAndPassword(auth, loginValues.email, loginValues.password)
        .then(() => {
          // successful login
          setLoginButtonDisable(false);
          Notification("Log in successfully");
          navigate("/");
        })
        .catch((error) => {
          // error occur during login
          setLoginButtonDisable(false);
          Notification(error.code, true);
        });
    } else {
      Notification("Please fill all fields", true);
    }
  };

  return (
    <authenticationContext.Provider
      value={{
        setSignUpValues,
        signUpButtonDisable,
        handleSignUp,
        setLoginValues,
        LoginButtonDisable,
        handleLogin,
      }}
    >
      {children}
    </authenticationContext.Provider>
  );
}

// exporting CustomAuthenticationContext Component
export default CustomAuthenticationContext;

// exporting useAuthentication function that return some values
export { useAuthentication };
