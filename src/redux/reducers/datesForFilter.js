import { DATES_FOR_FILTER } from "../actions/actionTypes";

const initialState = '';

const DatesForFilter = (state = initialState, action) => {
  switch (action.type) {
    case DATES_FOR_FILTER:
      return {
        ...state,
        value: action.value,
      };
    default:  
      return state;
  }
};

export default DatesForFilter;
