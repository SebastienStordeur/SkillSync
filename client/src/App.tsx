import { useEffect } from "react";
import Router from "./router/Router";
import { useDispatch } from "react-redux";
import { authActions } from "./redux/Auth/auth";
function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;
    dispatch(authActions.retriveStoredToken());
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
