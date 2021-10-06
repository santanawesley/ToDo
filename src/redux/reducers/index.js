import { combineReducers } from "redux";
import InitialList from "./initialList";
import DateFilteredList from "./dateFilteredList";
import SearchFilteredList from "./searchFilteredList";
import FilterCall from "./filterCall";

export const Reducers = combineReducers({
  initialList: InitialList,
  dateFilteredList: DateFilteredList,
  searchFilteredList: SearchFilteredList,
  filterCall: FilterCall,
});
