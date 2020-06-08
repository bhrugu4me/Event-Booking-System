import axios from 'axios';

import { GET_EVENT_LIST } from './event.actionTypes';
import type { EventDetail } from '../../models/event';

export function getEventList() {
	return (dispatch) => {
		axios
			.get('./data.json')
			.then((response) => {
				if (response.status === 200) dispatch(updateEvents(response.data));
			})
			.catch(function(error) {
				console.log(error);
			});
	};
}

function updateEvents(_data: Array<EventDetail>) {
	return {
		type: GET_EVENT_LIST,
		payload: _data,
	};
}
