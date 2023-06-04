import * as React from "react";
import {
  Routes,
  Route,
  // Link,
  // useNavigate,
  // useLocation,
  // Navigate,
  // Outlet,
} from "react-router-dom";
import { Login, Signup, NotesForm, Notes, UserProfile } from "./pages"
import { RequireAuth } from "./utils";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/create-note"
        element={
          <RequireAuth>
            <NotesForm />
          </RequireAuth>
        }
      />
      <Route
        path="/update-note/:id"
        element={
          <RequireAuth>
            <NotesForm />
          </RequireAuth>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <UserProfile />
          </RequireAuth>
        }
      />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Notes />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

// function Layout() {
//   return (
//     <div>
//       <AuthStatus />

//       <ul>
//         <li>
//           <Link to="/">Public Page</Link>
//         </li>
//         <li>
//           <Link to="/protected">Protected Page</Link>
//         </li>
//       </ul>

//       <Outlet />
//     </div>
//   );
// }








function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}