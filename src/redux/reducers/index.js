import { combineReducers } from "redux";
import { InitialList } from "./initialList";
import FilteredList from "./filteredList";

export const Reducers = combineReducers({
  initialList: InitialList,
  filteredList: FilteredList,
});
