import { SET_CURRENT_BOOKING } from './booking.actionTypes';
import type { EventDetail } from '../../models/event';

export function setCurrentBooking(event: EventDetail) {
	return (dispatch) => {
		dispatch(updateCurrentBooking(event));
	};
}

function updateCurrentBooking(_data: EventDetail) {
	return {
		type: SET_CURRENT_BOOKING,
		payload: _data,
	};
}
