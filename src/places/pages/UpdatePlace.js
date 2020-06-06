import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// to get placeId from the URL

import Card from '../../shared/components/UIElements/Card';
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
    },
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
    },
  },
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  // hooks must only be used directly in the component function, so you must not use them inside and if block, or loops or inside other functions including then block of promises
  // We only setup the hook after the response is there from DB not when this component first renders, but during first render cycle we want info from our hook. So, we need to call useForm early
  // Still we want to update the form values at later point of time once our response is there, thus we will initialise below fields with invalid values
  // and later when we connect to backend then we will show loading spinner while we are waiting for the place to load
  // So we will not show empty invalid form
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // then here when we got the identified place, then we will update our formState
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  // calling setFormData is bad though becoz whenever UpdatePlace component rerenders then we set new formData and then repeat manier things in form-hook.js, thus we will get in infinite loop
  // to prevent this we will use useEffect()
  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true
          },
          description: {
            value: identifiedPlace.description,
            isValid: true
          }
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);
  // identifiedPlace will not change even if component rerenders
  // setFormData will also not change becoz we have used useCallback() inform-hook.js

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }
  
  return (
    // we will only render the form when we get the indentifiedPlace data and once we use that to update setFormData()
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        // where we get user entered value and validity value
        // below values are taken to initialise the inputState in Input.js componenet
        // So when the values assigned to these props change then nothing happens to our Input component
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
