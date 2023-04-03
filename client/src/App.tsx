import { useEffect } from "react";
import Router from "./router/Router";
import { useDispatch } from "react-redux";
import { authActions } from "./redux/Auth/auth";
import { gql, useQuery } from "@apollo/client";

const GET_PROFILE_QUERY = gql`
  query GetCurrentUser {
    GetCurrentUser {
      id
      email
      lastname
      firstname
      applications
    }
  }
`;

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
  }, [data]);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
