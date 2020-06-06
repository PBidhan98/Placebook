import React, { useCallback, useReducer } from "react";
// now we have to manage multiple states thus using useReducer

import Input from "../../shared/components/FormElements/Input";
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./PlaceForm.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
          // taking stored validity for this inputId becoz it is not updating with current action
        }
      }
      return {
        // here we need to change the input state and overall form validity state
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  // arguments reducer function, initial state(object)
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      }
    },
    // nested object which stores the information about the validity of individual inputs
    isValid: false,
    // stores the info about whether the overall form is valid
  });

  // titleInputHandler is triggered when child component calls this function, if in this function we do anything that changes the state of NewPlace component and rerenders it
  // then a new titleInputHandler function is created, thus the new function is fed into <Input /> component and there in Input component we again call onInput() and would effecticely reach to infinite loop
  // to avoid this we import {useCallback} hook
  // useCallback is used to wrap the function and to find dependencies of this function under which it should rerender
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({type:'INPUT_CHANGE', value:value, isValid:isValid, inputId:id});
  }, [dispatch]);
  // empty array of dependencies means if the component rerenders then titleInputHandler will be stored away by react and will be reused and no new function object is created, that does not lead to run useEffect() in <Input />
  // we want to find out that whether the whole form is valid and stor all the values of individual inputs

  const placeSubmitHandler = event => {
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



// A hook is a normal Javascript function
// But a function which starts with use, is a function which can share stateful logic
// Custom Hook is a special function that react recognises, which can use useReducer or useState inside of it, which react then recognises and if state is updated in custom hook then component using custom hook is rerendered