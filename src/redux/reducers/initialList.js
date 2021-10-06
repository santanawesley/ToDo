import { GET_LIST } from "../actions/actionTypes";

const initialState = {
  value: [
    {
      id: null,
      name: "",
      completed: false,
      inserted_at: "",
      updated_at: "",
    },
  ],
};

const InitialList = (state = initialState, action) => {
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

export default InitialList;
