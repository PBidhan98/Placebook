// combines both <label> and <input>, also has built in user input validation
// we also have 3rd party libraries like Formik, which can be used in react to get form functionality for free, with input validations

import React, { useReducer, useEffect } from "react";   
// when we have two kind of connected states, the validitiy depends on input value then using useReducer hook is better
// useReducer allows to manage state in a component and also gives a function we can call to update the state and rerender the component
// but difference btw useState and useReducer is, with useReducer we can manage more complex state with ease, can write some logic that runs whenever state is changed and do complex updates than just set a new value

// useEffect allows to run some logic when some dependency is changed, we can also used it to run something after the first render as we didi it in google maps
// we can also use it to run some logic whenever the input value or validity changes, becoz they change together and send back the new value back to the NewPlace component

import { validate } from "../../util/validators";
import "./Input.css";

// reducer function(currentstate, action)
const inputReducer = (state, action) => {
  // to find out what action we have
  switch (action.type) {
    // action's have type property which have unique identifier that describes the action
    case 'CHANGE':
      // returning new state object, to merge different state pieces in one group state
      return {
        // copy of old state, using  spread operator
        ...state,
        // override value property of old state
        value: action.val,
        // whether input is valid or not
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH':{
      return {
        ...state,
        isTouched: true
      }
    }
    default:
      // returning unchanged state, incase we dispatch some action which we don't handle explicitely in above case
      return state;
  }
};

const Input = props => {
  // we manage some internal state, i.e. what the user entered, validate the user input
  // const [enteredValue, setEnteredVValue] = useState('');
  // const [isValid, setIsValid] = useState(false);   update both, but it would be horrible

  // current state i.e. inputReducer and dispatch function, in this way we can dispatch actions to the reducer function, which will return new state which will update inputState and rerender the component
  // function which recieves a action which we can dispatch, and recieves the current state
  // we update the current state based on the action recieved, return the new state, useReducer() takes the new state and give it back to the component and rerender everything
  // 2nd argument of useReducer is initial state of the component, useReducer returns an array with two elements
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || '',
    isTouched: false,
    isValid: props.valid || false
  });
  
  const {id, onInput} = props;
  const {value, isValid} = inputState;
  // 1st argument is the function to be executed
  // 2nd is array of dependencies, the things that should trigger this function
  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  // changeHandler which is triggered whenever the user enters something, we bind this function on the element
  const changeHandler = event => {
    // when it is triggered want to store the value and validate
    // so we have to manage more than one state snd two states are kindoff connected, we can use {useState}
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      // passing new value to set the value of input entered by user
      validators: props.validators
    });
    // passed action object, event.target is the input element on which this event was triggered
  };

  const touchHandler = () =>{
    dispatch({
      type: 'TOUCH'
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        // event is the object we get automatically onChange()
        onBlur={touchHandler}
        // it is triggered when user looses focus on input element, which means that user had to clickinto it then click out of it, and if it's then invalid after loosing focus then we will show the error
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        // in react we set the value of html tag using value prop
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
