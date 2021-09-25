import { GET_LIST, FILTERED_LIST } from './actionTypes';

export const dataList = value => ({
	type: GET_LIST,
	value: value,
});

export const filteredList = value => ({
	type: FILTERED_LIST,
	value: value,
})