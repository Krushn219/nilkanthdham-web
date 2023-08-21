import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./pages/edit/EditUserForm";
import EmployeePresence from "./pages/presence/Presence";

function App() {
  const { darkMode } = useContext(DarkModeContext);

    // Set up a state variable to track authentication status
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="/users/edit/:userId" element={<EditUserForm />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
                // element={<AddUserForm />} // Render the AddUserForm component when "Add New User" is clicked
              />
               <Route path="presence" element={<EmployeePresence/>} />
            </Route>
            <Route path="presence">
            <Route index element={<List />} />


            </Route>
            {/* <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
