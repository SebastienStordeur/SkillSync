import { useEffect } from "react";
import Router from "./router/Router";
import { useDispatch } from "react-redux";
import { authActions } from "./redux/Auth/auth";
import { gql } from "@apollo/client";

const GET_PROFILE_QUERY = gql`
  query GetCurrentUser()
`;

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    /** Get the stored token from localStorage */
    dispatch(authActions.retriveStoredToken());
    dispatch(authActions.getProfile({}));
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
