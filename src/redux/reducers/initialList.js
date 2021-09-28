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

export const InitialList = (state = initialState, action) => {
  console.log("aqui no Reducers DataList, action = ", action);
  switch (action.type) {
    case GET_LIST:
      console.log("abc");
      return {
        ...state,
        value: action.value,
      };
    default:
      return state;
  }
};
