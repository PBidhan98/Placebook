import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
//react-router-dom(3rd party library) has named exports, it exports multiple things by there names

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from "./places/pages/UpdatePlace";

const App = () => {
  //pages should be loaded with the help of the router
  return (
    <Router>
      {/* Header should always be visible, no matter which route is loaded */}
      <MainNavigation />
      {/* main component whose styling is given by MainHeader.css */}
      <main>
        {/* Inside the switch block whenever react router encounters the fitting route it will not evaluate the lines thereafter*/}
        <Switch>
          {/* Rendering different components based on the path user entered in the URl which makes single page application a multi-page application */}
          {/* <Route path="/" component={Users}></Route> */}
          <Route path="/" exact>
            <Users />
          </Route>
          {/* path has a dynamic segment, later you will be able to extract the actual value entered in the URL for this segment in the component which is loaded */}
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="/places/:placeId" exact>
            <UpdatePlace />
          </Route>
          <Redirect to="/" />
          {/* to make sure that app doesn't endup on unsupported pages */}
        </Switch>
      </main>
    </Router>
  );
};

export default App;
