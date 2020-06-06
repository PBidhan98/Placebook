import { useCallback, useReducer } from "react";
// now we have to manage multiple states thus using useReducer

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

// custom hooks have to always start from lower case use
export const useForm = (initialInputs, initialFormValidity) => {
    // arguments reducer function, initial state(object)
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    // nested object which stores the information about the validity of individual inputs
    isValid: initialFormValidity
    // stores the info about whether the overall form is valid
  });
  
  // inputHandler is triggered when child component calls this function, if in this function we do anything that changes the state of NewPlace component and rerenders it
  // then a new inputHandler function is created, thus the new function is fed into <Input /> component and there in Input component we again call onInput() and would effecticely reach to infinite loop
  // to avoid this we import {useCallback} hook
  // useCallback is used to wrap the function and to find dependencies of this function under which it should rerender
  const inputHandler = useCallback(
    (id, value, isValid) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    [dispatch]
  );
  // empty array of dependencies means if the component rerenders then titleInputHandler will be stored away by react and will be reused and no new function object is created, that does not lead to run useEffect() in <Input />
  // we want to find out that whether the whole form is valid and stor all the values of individual inputs

  return [formState, inputHandler];

};