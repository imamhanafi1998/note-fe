import React from "react";
import Header from "./components/Header";
import Note from "./components/Note";
// import Footer from "./components/Footer";
import Detail from "./components/Detail";
import Edit from "./components/Edit";
import Create from "./components/Create";
import Delete from './components/Delete'
import history from './components/History'
import { Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router history={history}>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Note} />
          <Route exact path="/create" component={Create} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="/delete/:id" component={Delete} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
