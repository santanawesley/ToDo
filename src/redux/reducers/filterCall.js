import { FILTER_CALL} from "../actions/actionTypes";

const initialState = {};

const FilterCall = (state = initialState, action) => {
	switch (action.type) {
		case FILTER_CALL:
			return {
				...state,
				value: action.value,
			};
		default:
			return state;
	}
};

export default FilterCall;
