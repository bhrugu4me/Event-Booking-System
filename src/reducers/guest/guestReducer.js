import type { GuestDetail, EventDetail } from '../../models/guest';

export type StateType = {
	bookEvent: EventDetail,
	guestDetail: GuestDetail,
};

const initialState: StateType = {
	bookEvent: {},
	guestDetail: {},
};

const guestReducer = (state = initialState, action) => {
	switch (action.type) {
		/*case GET_USER_DATA:
			return {
				...state,
				currentUser: action.payload,
			};
			*/
		default:
			return state;
	}
};

export default guestReducer;
