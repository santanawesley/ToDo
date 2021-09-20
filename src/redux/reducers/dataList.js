import { GET_LIST } from "../actions/actionTypes";

const initialState = {
  value: [{
    id: null,
    name: "",
    completed: false,
    inserted_at: "",
    updated_at: "",
  }]
}

export const DataList = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
        value: action.value,
      };
    default:  
      return state;
  }
};
