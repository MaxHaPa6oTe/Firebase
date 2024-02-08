import { BrowserRouter, Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter.jsx";
import { useContext } from "react";
import { Context } from "./index.js";
import {useAuthState} from 'react-firebase-hooks/auth'
import Loader from "./components/Loader.jsx";

function App() {
  const {auth} = useContext(Context)
  const [user, loading, error] = useAuthState(auth)

  if (loading) {
  return <Loader />
  }
  
  return (
    <>
     <BrowserRouter>
      <NavBar />
      <AppRouter />
     </BrowserRouter>
    </>
  );
}

export default App;
