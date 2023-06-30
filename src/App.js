import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import store from "./store";

import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsList from "./components/NewsList";
import Article from "./components/Article";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="app-container">
          <Switch>
            <Route path="/article/:id">
              <Article />
            </Route>
            <Route path="/" exact>
              <NewsList />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
