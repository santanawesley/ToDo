import { NAME_FOR_SEARCH} from "../actions/actionTypes";

const initialState = {};

const NameForSearch = (state = initialState, action) => {
	switch (action.type) {
		case NAME_FOR_SEARCH:
			return {
				...state,
				value: action.value,
			};
		default:
			return state;
	}
};

export default NameForSearch;
