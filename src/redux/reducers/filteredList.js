import { FILTERED_LIST } from "../actions/actionTypes";

const initialState = {}

const FilteredList = (state = initialState, action) => {
  switch (action.type) {
    case FILTERED_LIST:
      return {
        ...state,
        value: action.value,
      };
    default:  
      return state;
  }
};

export default FilteredList;