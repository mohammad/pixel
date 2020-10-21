import React from 'react';
import Pixel from './components/Pixel';
import Collection from './components/Collection';
import CreateContract from './containers/CreateContractContainer';
import { Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/create-collection">
          <CreateContract />
        </Route>
        <Route exact path="/create">
          <Pixel />
        </Route>
        <Route path="/collection/:address">
          <Collection />
        </Route>
        <Route path="/">
          <Link to={{ pathname: "/create-collection" }}>Create A Collection</Link>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
