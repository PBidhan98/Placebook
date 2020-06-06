// Collection of links which we render in MainNavigation
// List of Navigation Links, in main header or side drawer

import React from 'react';
import {NavLink} from 'react-router-dom';
// inside NavLinks we have to return JSX code that returns links but for that we will use NavLink
// It can analyse the URL and allows us to color the link differently if we are on the page the link leads to show the user that this is the currently active link

import './NavLinks.css';

const NavLinks = props => {
    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact>ALL USERS</NavLink>
        </li>
        {/* only be rendered if user is logged In */}
        <li>
            <NavLink to="/u1/places">MY PLACES</NavLink>
        </li>
        <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
        {/* Only be rendered if user is not logged In */}
        <li>
            <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
    </ul>
};

export default NavLinks;