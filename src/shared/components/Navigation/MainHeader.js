// Shell which provides the styling 

import React from 'react';

import './MainHeader.css';

const MainHeader = props => {
    // Anything can be rendered here i.e. HTML components, custom components
    return <header className="main-header">
        {props.children}
        {/* It is a special prop that react knows, it always refer to the things you pass btw the opening and closing tags of your component */}
        {/* That means we will render MainNavigation here*/}
    </header>;
};

export default MainHeader;