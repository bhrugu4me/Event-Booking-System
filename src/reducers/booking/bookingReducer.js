import type { EventDetail } from '../../models/event';
import { SET_CURRENT_BOOKING } from '../../actions/booking/booking.actionTypes';

export type StateType = {
	currentBooking: EventDetail,
};

const initialState: StateType = {
	currentBooking: {},
};

const bookingReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_BOOKING:
			return {
				...state,
				currentBooking: action.payload,
			};

		default:
			return state;
	}
};

export default bookingReducer;
