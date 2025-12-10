import { useSelector, useDispatch } from "react-redux";
import Navigation from "./pages/Navigation";
import { useEffect } from "react";
import { getCurrentUser } from "./store/auth/authOperations";
import { selectTokens } from "./store/auth/authSelectors";
import "./styles/style.css";

function App() {
  const isTokens = useSelector(selectTokens);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTokens) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isTokens]);

  return (
    <>
      <Navigation />
    </>
  );
}

export default App;
