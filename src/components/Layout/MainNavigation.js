import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../../store/authSlice";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const onLogoutHandler = () => {
    dispatch(authActions.logoutHandler());
    // history.replace("/");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={onLogoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
