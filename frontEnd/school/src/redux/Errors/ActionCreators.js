import * as ActionTypes from '../ActionTypes';

export const getErrors = (errors) => ({
    type: ActionTypes.GET_ERRORS,
    errors
  });
  
export const resetErrors = () => ({
    type: ActionTypes.RESET_ERRORS
});