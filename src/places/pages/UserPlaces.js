import React from 'react';
import {useParams} from 'react-router-dom';
// to filter out places by id we need to find out which Id is encoded in the URL

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the Most famous Sky Scrappers in the World',
        imageUrl: 'https://wallpapercave.com/wp/wp1916328.jpg',
        address: '20 W 34th St, New York, NY 10001',
        creator: 'u1',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        }
    },
    {
        id: 'p2',
        title: 'Burj Khalifa',
        description: 'One of the Tallest Building in the World',
        imageUrl: 'https://free4kwallpapers.com/uploads/originals/2015/11/18/burj-khalifa-aka-burj-dubai-wallpaper.jpg',
        address: '1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates',
        creator: 'u2',
        location: {
            lat: 25.197197,
            lng: 55.2743764
        }
    }
];

const UserPlaces = () => {
    const userId = useParams().userId;
    // gives access to the parameters, it returns an object which has dynamic segment you setup in the route config in App.js file as properties
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    // runs filter on every element of array and returns a new array only if creator === userId 
    // return the list of places
    return <PlaceList items={loadedPlaces} />;
  };
  
  export default UserPlaces;