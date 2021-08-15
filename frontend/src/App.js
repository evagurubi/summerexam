import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import Articles from "./Components/Articles/Articles";
import Holidays from "./Components/Holidays/Holidays";
import ArticlesWithTasks from "./Components/Articles/ArticlesWithTasks";
import OwnArticles from "./Components/Articles/OwnArticles";
import Contributions from "./Components/Articles/Contributions";
import OwnAccount from "./Components/User/OwnAccount";
import Login from "./Components/User/Login";
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
          <Route path="/" exact component={Home} />
          <Route path="/articles" component={Articles} />
          <Route path="/holidays" component={Holidays} />
          {user ? (
            <>
              {" "}
              <Route path="/articleswithtasks" component={ArticlesWithTasks} />
              <Route path="/contributions" component={Contributions} />
              <Route path="/ownarticles" component={OwnArticles} />
              <Route path="/ownaccount">
                <OwnAccount setUser={setUser} />
              </Route>
            </>
          ) : (
            <>
              {" "}
              <Route path="/login" component={Login} />{" "}
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
