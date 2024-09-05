import HomePage from "./routes/homePage/home";
import ListPage from "./routes/listPage/list";
import SinglePage from "./routes/singlePage/single";
import ProfilePage from "./routes/profilePage/profilePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAuth } from "./routes/layout/layout";
import Register from "./routes/register/register";
import Login from "./routes/login/login";
import ProfileUpdatePage from "./routes/profileUpdate/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import AboutPage from "./routes/aboutPage/about"
import ContactPage from "./routes/contactPage/contact"
import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from "./lib/loaders";
import UpdatePostPage from "./routes/updatePost/updatePost";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/about",
          element: <AboutPage />
        },
        {
          path: "/contact",
          element: <ContactPage />
        }
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
        {
          path: "/update/:id",
          element: <UpdatePostPage />,
          loader: singlePageLoader,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
