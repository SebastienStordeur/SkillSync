import { FC, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { authActions } from "../../redux/Auth/auth";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import Backdrop from "../Modal/Backdrop";

const Navbar: FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);

  const toggleFormHandler = () => setFormIsOpen((prev) => !prev);

  return (
    <Fragment>
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
          <div className="flex items-center gap-4">
            {currentUser.is_company && (
              <Button variant="contained" onClick={toggleFormHandler}>
                Add Job
              </Button>
            )}
            <span>{currentUser.displayableName}</span>
            <Button variant="outlined" onClick={() => dispatch(authActions.logout())}>
              Logout
            </Button>
          </div>
        )}
      </nav>
      {formIsOpen && <Backdrop onClick={toggleFormHandler} />}
    </Fragment>
  );
};

export default Navbar;
