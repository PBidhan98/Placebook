// Part of the MainHeader

import React, { useState } from 'react';
// here we want to manage the state whether the drawer is open or not
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import './MainNavigation.css';

const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  // Inititally the drawer is not open

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  // to close the drawer back
  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  }; //but where to trigger this closeDrawer(), for that we need a component we can render as a background to the drawer, so that when we click the background then we close the drawer

  return (
    // In react, one root JSX element per component e.g. we can't return 1 2; i.e. two numbers at the same statement
    // To return multiple root level elements react gives a special wrapper i.e.e React.Fragment, it doesn't render any real HTML element to the screen
    // It just fullfils the requirement of having one root element
    <React.Fragment>
      {/* Normally the SideDrawer would be rendered as part of the MainNavigation therefore wherever this MainNavigation is rendered */}
      {/* With a portal we can mark a new place in index.html where we want to render the portal content */}
      {/* Conditionally render content in React */}
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      {/* {drawerIsOpen && (
        <SideDrawer>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )} */}
      {/* show prop to display in and out animation of SideDrawer */}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      {/* All this under MainHeader JSX will be forwaded under the special children prop to MainHeader */}
      {/* props.children is the placeholder for the content entered in opening and closing tag of your component */}
      <MainHeader>
        {/* all the content here will be rendered in the MainHeader */}
        {/* when we click the button then we do open the drawer */}
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          {/* which will open the Side drawer */}
          {/* Three empty that will work as bars, we will add styling which renders the button as Hamburger item where every span will be one part of the hamburger */}
          <span />
          <span />
          <span />
          </button>
        <h1 className="main-navigation__title">
          {/* Header of the App should be clickable, thus we will use Link component of react-router-dom */}
          <Link to="/">Placebook</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;