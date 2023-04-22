import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import "./App.css";
import TodoList from "./components/TodoList";
import Registration from "./components/Registration";
import useAuth from "./hooks/useAuth";
import Login from "./components/Login";
import Logout from "./components/Logout";

// TODO: on reload page faild auth
// TODO: root path localhost:3000/todo change to localhost:3000
// TODO: add firestore usage
// TODO: add .env file, add to this file firebase confige properties

function App() {
  const user = useAuth();
  return (
    <Router>
      <div className="todo-app">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <>
                  <TodoList />
                  <Link className="logout-link" to="/logout">
                    Logout
                  </Link>
                </>
              ) : (
                <Navigate to="/register" />
              )
            }
          />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
