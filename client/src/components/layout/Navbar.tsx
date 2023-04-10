import { FC, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { authActions } from "../../redux/Auth/auth";
import { Button } from "@mui/material";
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
      <nav className="flex flex-col sm:flex-row justify-between items-center h-24 sm:h-16 px-6">
        <div className="flex items-center gap-8 w-fit h-full">
          <div className="flex items-center justify-center border border-blue p-2">
            <h1 className="text-blue text-xl font-bold">SkillSync</h1>
          </div>
          <Link to="/" className="text-lg">
            Find Job
          </Link>
        </div>
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
            {!currentUser.is_company && <Button variant="contained">Upload CV</Button>}
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
