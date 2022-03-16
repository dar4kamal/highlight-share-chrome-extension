import { RESET_VIEW_OPTION, UPDATE_VIEW_OPTION } from "../actionTypes";

export const updateOption = (option) => (dispatch) => {
  dispatch({ type: UPDATE_VIEW_OPTION, payload: option });
};

export const resetOption = () => (dispatch) => {
  dispatch({ type: RESET_VIEW_OPTION });
};
