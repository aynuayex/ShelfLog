import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import App from "@/App";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import BookUpload from "@/pages/BookUpload";
import RootLayout from "./Layouts/RootLayout";
import VerifyEmail from "./pages/verify-email";
import RequireAuth from "./context/RequireAuth";
import PersistLogin from "./context/PersistLogin";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<Signup />} />
      <Route path="sign-in" element={<Login />} />
      <Route path="verify-email" element={<VerifyEmail />} />
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<App />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="book_upload" element={<BookUpload />} />
            <Route path="*" element="Under construction" />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

export default router;
