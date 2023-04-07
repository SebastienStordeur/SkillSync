import { useEffect } from "react";
import Router from "./router/Router";
import { useDispatch } from "react-redux";
import { authActions } from "./redux/Auth/auth";
import { useQuery } from "@apollo/client";
import GET_PROFILE_QUERY from "./graphql/QUERY/GetProfileQuery";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_PROFILE_QUERY, {
    skip: !token,
  });

  useEffect(() => {
    if (!token) return;

    dispatch(authActions.retriveStoredToken());

    if (data) {
      const currentUser = data.GetCurrentUser;
      dispatch(authActions.getProfile({ currentUser }));
    }
  }, [data, token]);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
