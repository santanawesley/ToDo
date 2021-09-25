import { combineReducers } from 'redux';
import { DataList } from './dataList';
import FilteredList from './filteredList';

export const Reducers = combineReducers({
  dataList: DataList,
  filteredList: FilteredList,
});