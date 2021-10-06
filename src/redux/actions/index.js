import {
  GET_LIST,
  DATE_FILTERED_LIST,
  FILTER_CALL,
  SEARCH_FILTERED_LIST,
} from "./actionTypes";

export const initialList = (value) => ({
  type: GET_LIST,
  value,
});

export const dateFilteredList = (value) => ({
  type: DATE_FILTERED_LIST,
  value,
});

export const searchFilteredList = (value) => ({
  type: SEARCH_FILTERED_LIST,
  value,
});

export const filterCall = (value) => ({
  type: FILTER_CALL,
  value,
});
