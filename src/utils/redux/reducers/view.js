import { setItem } from "../../handleStorage";
import { FilterDisplayOptions } from "../../types";

import { RESET_VIEW_OPTION, UPDATE_VIEW_OPTION } from "../actionTypes";

const initialState = FilterDisplayOptions[0];

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case UPDATE_VIEW_OPTION:
      setItem("currentOption", payload);
      return { ...state, ...payload };
    case RESET_VIEW_OPTION:
      setItem("currentOption", initialState);
      return initialState;
    default:
      return state;
  }
};
