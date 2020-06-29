import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import Home from "../src/Pages/Home/Home";

// Styles
import { PageWrapper } from "./App.styles";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <PageWrapper>
          <Route exact path="/">
            <Home />
          </Route>
        </PageWrapper>
      </Switch>
    </Router>
  );
}

export default App;
