import './App.css';
import { getAuth } from "firebase/auth";
import app from "./firebase/firebase.init";
import RegisterBootstrap from './componets/RegisterBootstrap';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout';
import Login from './componets/Login';

const auth = getAuth(app);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          path: "/",
          element: <RegisterBootstrap></RegisterBootstrap>
        },
        {
          path: "/register",
          element: <RegisterBootstrap></RegisterBootstrap>
        },
        {
          path: "/login",
          element: <Login></Login>
        }
      ]
    }
  ])
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
