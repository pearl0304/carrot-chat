import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/layout.tsx";
import Home from "./routes/home.tsx";
import Profile from "./routes/profile.tsx";
import Login from "./routes/login.tsx";
import CreateAccount from "./routes/create-account.tsx";
import styled, {createGlobalStyle} from "styled-components";
import reset from "styled-reset";
import {useEffect, useState} from "react";
import Loading from "./components/loading.tsx";
import {firebaseAuth} from "./firebase.ts";
import ProtectedRoute from "./components/protected-route.ts";


const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: (<ProtectedRoute><Layout/></ProtectedRoute>),
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: "profile",
        element: (<Profile/>)
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/create-account",
    element: <CreateAccount/>
  }
])

const GlobalStyles = createGlobalStyle`
  ${reset}

  ;
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'S-CoreDream-3Light';
  }

  @font-face {
    font-family: 'S-CoreDream-3Light';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const init = async () => {
    /** WAIT FOR FIREBASE **/
    await firebaseAuth.authStateReady();
    setIsLoading(false)
  }

  useEffect(() => {
    init();
  }, []);
  return (
    <Wrapper>
      <GlobalStyles/>{isLoading ? <Loading/> : <RouterProvider router={router}/>}
    </Wrapper>
  )
}

export default App