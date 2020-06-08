import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as Button from '../Button';

import { setCurrentBooking } from '../../actions/booking/bookingActions';

import type { EventDetail } from '../../models/event';

import style from './event.module.scss';

const mapStateToProps = (state) => {
	return {
		eventList: state.event.eventList,
	};
};

const mapDispatchToProps = (dispatch) => ({
	setCurrentBooking: (eventDetail: EventDetail) =>
		dispatch(setCurrentBooking(eventDetail)),
});

type Props = {
	eventDetail: EventDetail,
	setCurrentBooking(eventDetail: EventDetail): Promise<any>,
	history: Object,
};

class Event extends Component<Props> {
	constructor(props) {
		super(props);
	}

	onSubmit = (eventDetail: EventDetail) => async () => {
		const { setCurrentBooking } = this.props;
		await setCurrentBooking(eventDetail);
		this.props.history.push('/booking');
	};

	render() {
		const { eventDetail } = this.props;

		return (
			<div className={style.event}>
				<div className={style.event_title}>{eventDetail.eventName}</div>
				<div className={style.event_detail}>
					<div>
						<img
							className={style.event_detail_image}
							src={eventDetail.imageUrl}
						/>
					</div>
					<div className={style.event_detail_info}>
						<div>{eventDetail.eventDate}</div>
						<div>Seats Available: {eventDetail.availableSeats}</div>
						<div>
							<Button.Primary
								type='submit'
								onClick={this.onSubmit(eventDetail)}
								disabled={eventDetail.availableSeats === 0}
								buttonSize={Button.SIZES.LARGE}
								text={
									eventDetail.availableSeats === 0 ? 'Sold Out' : 'Book Now'
								}
							></Button.Primary>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Event));
