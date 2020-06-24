import { combineReducers } from 'redux';
import { createResponsiveStateReducer } from 'redux-responsive';
import { connectRouter } from 'connected-react-router';
import bookingReducer from '../reducers/booking/bookingReducer';
import eventReducer from '../reducers/event/eventReducer';

const configureReducer = (history) => {
	return combineReducers({
		router: connectRouter(history),
		booking: bookingReducer,
		event: eventReducer,
		browser: createResponsiveStateReducer({
			mobile: 320,
			tablet: 768,
			medium: 900,
			desktop: 1024,
		}),
	});
};

export default configureReducer;
