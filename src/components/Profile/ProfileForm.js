import { useRef } from "react";

import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import classes from "./ProfileForm.module.css";

import { authActions } from "../../store/authSlice";

const ProfileForm = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const newPasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

    const sendRequest = async () => {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer <token>'
        },
      });

      try {
        const data = await response.json();

        if (response.ok) {
          dispatch(
            authActions.loginHandler({
              token: data.idToken,
            })
          );

          history.replace("/");
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        alert(error);
      }
    };

    sendRequest();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="4"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
