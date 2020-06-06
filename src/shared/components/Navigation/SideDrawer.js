// For app to work nicely on Mobile Screens

import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
// makes easy to play animation when we add an item to DOM(render item for first time) and the remove it

import "./SideDrawer.css";

const SideDrawer = props => {
  // for adding animations so that content slides in and slides out and render it in different part of the page rather than where we will include the drawer
  // The <aside> tag defines some content aside from the content it is placed in.
  // return <aside className="side-drawer">{props.children}</aside>
  // this <aside> is rendered rendered in root div, but semantically since it is an overlay to the entire page, we want to render it under body, we can implement this by using react portals
  // Portals allow us to project or render a react component in a different place then it normally would be rendered
  const content = (
    //   We have to tell this library (CSSTransition) when SideDrawer becomes visible
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    // to tell that <aside> component, should be added to the DOM and removed from the DOM when it should become visible and Invisible
    >
      {/* timeout is duration of animation i.e. 200milliseconds and classNames property is a special prop accepted by CSSTransition component, silde-in-left is CSS animation present in index.css */}
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
  // here we tell react which content to render where
};

export default SideDrawer;
