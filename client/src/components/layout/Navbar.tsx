import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { authActions } from "../../redux/Auth/auth";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();
  return (
    <nav className="flex justify-between items-center h-16 px-6">
      <ul>
        <li>Find Job</li>
        <li></li>
        <li></li>
      </ul>
      <TextField label="Search a job" size="small" />
      {!isAuthenticated && (
        <Link to="/auth">
          <Button variant="outlined">Login</Button>
        </Link>
      )}
      {isAuthenticated && (
        <div>
          <span>{currentUser.displayableName}</span>
          <Button variant="outlined" onClick={() => dispatch(authActions.logout())}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
