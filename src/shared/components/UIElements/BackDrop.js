// Background which is rendered behind the drawer

import React from 'react';
import ReactDOM from 'react-dom';

import './BackDrop.css';

const Backdrop = props => {
  return ReactDOM.createPortal(
    // it listens to a click on the backdrop and emits a function it expects to get on an onClick prop on its own
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
    // also utilises the portal concept thus we have to add backdrop-hook in index.html file
  );
};

export default Backdrop;
