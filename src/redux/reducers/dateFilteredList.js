import { DATE_FILTERED_LIST } from "../actions/actionTypes";

const initialState = {}

const DateFilteredList = (state = initialState, action) => {
  switch (action.type) {
    case DATE_FILTERED_LIST:
      return {
        ...state,
        value: action.value,
      };
    default:  
      return state;
  }
};

export default DateFilteredList;
