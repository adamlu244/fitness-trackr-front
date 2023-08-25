import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
  
import './App.css';
import NotFound from "./components/NotFound";
import Root from "./routes/Root";
// import Home from "./components/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import Activities from "./routes/Activities";
import Routines from "./routes/Routines";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      // {
      //   path: "home",
      //   element: <Home />
      // },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "activities",
        element: <Activities />
      },
      {
        path: "routines",
        element: <Routines />
      }
    ]
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
