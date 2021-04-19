// set up react-router-dom
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import {lazy, Suspense} from 'react'
// import Home from "./pages/Home";
// import Courses from "./pages/Courses";
// import Course from "./pages/Course";
// import LoginPage from './pages/LoginPage'

// Layout
import AppLayout from "./layouts/AppLayout";
import AdminLayout from "./layouts/AdminLayout";
// import AdminCourses from "./pages/AdminCourses";
// import AdminUser from "./pages/AdminUser";
import AdminRoute from './auth/AdminRoute';
import LoginPage from './pages/LoginPage';

const Home = lazy(() => import("./pages/Home"));

const Courses = lazy(() => import("./pages/Courses"));
const Course = lazy(() => import("./pages/Course"));
const AdminCourses = lazy(() => import("./pages/AdminCourses"));
const AdminUser = lazy(() => import("./pages/AdminUser"));


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
      <Switch>
        <Route path="/admin">
            <AdminLayout>
                <Switch>
                  <Redirect exact from="/admin" to="/admin/courses"/>
                  <AdminRoute path="/admin/courses">
                      <AdminCourses />
                  </AdminRoute>
                  <AdminRoute path="/admin/users">
                      <AdminUser />
                  </AdminRoute>
                </Switch>
            </AdminLayout>
        </Route>

        {/* Route main */}
        <Route path="/">
          <AppLayout >
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/courses/:category">
                <Courses />
              </Route>
              <Route path="/course/:courseId">
                <Course />
              </Route>
              <Route path="/login">
                  <LoginPage />
              </Route>
            </Switch>
          </AppLayout>
          </Route>
      </Switch>
    </BrowserRouter>
    </Suspense>
  );
}

export default App;
