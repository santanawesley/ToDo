import { SEARCH_FILTERED_LIST } from "../actions/actionTypes";

const initialState = {};

const SearchFilteredList = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_FILTERED_LIST:
      return {
        ...state,
        value: action.value,
      };
    default:
      return state;
  }
};

export default SearchFilteredList;
