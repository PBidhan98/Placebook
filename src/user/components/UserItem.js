// Presentational Component, it et's data from outside using props and renders it

import React from 'react';
import './UserItem.css';
import Avatar from '../../shared/components/UIElements/Avatar';
// going to level up in folders
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';

const UserItem = props => {
  return (
    <li className="user-item">
      {/* We want to click the list item to render the list of places created by the user */}
      {/* for that we won't render a link with a regular anchor tag becoz we don't want to reload the page when we click a link */}
      {/* instead we want a react routing package i.e. react router dom can step in before navigation happens(before page reload happens) */}
      {/* It blocks that default action  and instead have a look at configured routes in App.js and loads the appropriate react component */}
      {/* Link component wraps and renders an anchor and also adds block the navigation logic */}
      <Card className="user-item__content">
        {/* Link has to prop which defines where you wanna go, that will be a dynamic path becoz this URL should reflect the id of the user, so as to load all the places created by a given user */}
        {/* Back ticks to create a template literal which means a string where we can easily inject values */}
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            {/* <img src={props.image} alt={props.name} /> */}
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;

// We have two main types of components in react i.e. presentational components and stateful components