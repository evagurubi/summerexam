import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles";
import ArticlesWithTasks from "./Components/ArticlesWithTasks";
import Contributions from "./Components/Contributions";
import Login from "./Components/Login";
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("JWT");
    try {
      if (jwt_decode(token)) setUser(jwt_decode(token));
    } catch {
      return;
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav user={user} setUser={setUser} />
        <Switch>
          {user ? (
            <>
              {" "}
              <Route path="/" exact component={Home} />
              <Route path="/articleswithtasks" component={ArticlesWithTasks} />
              <Route path="/contributions" component={Contributions} />
            </>
          ) : (
            <>
              {" "}
              <Route path="/login" component={Login} />
              <Route path="/" exact component={Home} />
              <Route path="/articles" component={Articles} />{" "}
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
