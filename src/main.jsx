import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout , Login} from './components';
import Home from './Pages/Home.jsx';
import AddPost from './Pages/AddPost.jsx';
import Post from './Pages/Post.jsx';
import Signup from './Pages/Signup';
import EditPost from './Pages/EditPost.jsx';
import AllPost from './Pages/AllPost.jsx';
import UploadMedia from './Pages/UploadMedia.jsx';



const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
          {
              path: "/",
              element: (<Home />),
          },
          {
              path: "/login",
              element: (
                  <AuthLayout authentication={false}>
                      <Login />
                  </AuthLayout>
              ),
          },
          {
              path: "/signup",
              element: (
                  <AuthLayout authentication={false}>
                      <Signup />
                  </AuthLayout>
              ),
          },
          {
              path: "/all-posts",
              element: (
                  <AuthLayout authentication>
                      {" "}
                      <AllPost />
                  </AuthLayout>
              ),
          },
          {
              path: "/add-post",
              element: (
                  <AuthLayout authentication>
                      {" "}
                      <UploadMedia/>
                  </AuthLayout>
              ),
          },
          {
            path: "/create-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost/>
                </AuthLayout>
            ),
        },
          {
              path: "/edit-post/:slug",
              element: (
                  <AuthLayout authentication>
                      {" "}
                      <EditPost />
                  </AuthLayout>
              ),
          },
          {
              path: "/post/:slug",
              element: <Post />,
          },
      ],
  },
  ])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store} >
           <RouterProvider router={router} />
        </Provider>

    </React.StrictMode>,
)
