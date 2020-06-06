import React from "react";
import { useParams } from "react-router-dom";
// to get placeId from the URL

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the Most famous Sky Scrappers in the World",
    imageUrl: "https://wallpapercave.com/wp/wp1916328.jpg",
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    }
  },
  {
    id: "p2",
    title: "Burj Khalifa",
    description: "One of the Tallest Building in the World",
    imageUrl:
      "https://free4kwallpapers.com/uploads/originals/2015/11/18/burj-khalifa-aka-burj-dubai-wallpaper.jpg",
    address:
      "1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
    creator: "u2",
    location: {
      lat: 25.197197,
      lng: 55.2743764,
    }
  }
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  const [formState, inputHandler] = useForm({
    title:{
      value:identifiedPlace.title,
      isValid: true
    },
    description:{
      value:identifiedPlace.description,
      isValid: true
    }
  }, true);

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  } ; 

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Title."
        onInput={inputHandler}
        // where we get user entered value and validity value
        initialValue={formState.inputs.title.value}
        // set initial value on the input
        initialValid={formState.inputs.title.isValid}
        // initial validity
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );

};

export default UpdatePlace;
