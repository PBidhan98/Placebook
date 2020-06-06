import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./PlaceForm.css";
import { useForm } from "../../shared/hooks/form-hook";

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    // when we update the state inside this custom hook, then the component which uses that custom hook will update as well
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      }
      // nested object which stores the information about the validity of individual inputs
    },
    false
  );
  // 2nd argument stores the info about whether the overall form is valid

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    // send data to server
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        // array of validators, which is an array of values, objects, identifiers which we pick up in Input component, and using it we find out that Input entered by user is valid or not, and pass information whether input is valid or not, and value entered, back to NewPlace component using a callback function onInput(), we use to send data from child to parent
        validators={[VALIDATOR_REQUIRE()]}
        // VALIDATOR_REQUIRE() returns a validator configuration object
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (atleast 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        // VALIDATOR_REQUIRE() returns a validator configuration object
        errorText="Please enter a valid address."
        // we will not check here that address exists, we will later do it at the backend
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
