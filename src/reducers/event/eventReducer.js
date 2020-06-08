import type { EventDetail } from '../../models/event';
import { GET_EVENT_LIST } from '../../actions/event/event.actionTypes';

export type StateType = {
	eventList: Array<EventDetail>,
};

const initialState: StateType = {
	eventList: [],
};

const eventReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_EVENT_LIST:
			return {
				...state,
				eventList: action.payload,
			};

		default:
			return state;
	}
};

export default eventReducer;
