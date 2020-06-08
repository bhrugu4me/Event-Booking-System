import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as Button from '../../components/Button';

import { setCurrentBooking } from '../../actions/booking/bookingActions';

import type { EventDetail } from '../../models/event';

import style from './booking.module.scss';

const mapStateToProps = (state) => {
	return {
		currentBooking: state.booking.currentBooking,
	};
};

const mapDispatchToProps = (dispatch) => ({
	setCurrentBooking: (eventDetail: EventDetail) =>
		dispatch(setCurrentBooking(eventDetail)),
});

type Props = {
	currentBooking: EventDetail,
	setCurrentBooking(eventDetail: EventDetail): Promise<any>,
	history: Object,
};

type State = {
	name: string,
	email: string,
	phone: string,
	seats: Number,
	attendees: Array<string>,
	isNameValid: boolean,
	isEmailValid: boolean,
	isPhoneValid: boolean,
	nameValidateMessage: string,
	emailValidateMessage: string,
	phoneValidateMessage: string,
};

class Booking extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			phone: '',
			seats: 0,
			attendees: [],
			isNameValid: true,
			isEmailValid: true,
			isSeatValid: true,
			isSubmitted: false,
			nameValidateMessage: '',
			emailValidateMessage: '',
			seatsValidateMessage: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}

	onCancel = async () => {
		const { setCurrentBooking } = this.props;
		await setCurrentBooking({});
		this.props.history.push('/');
	};

	onSubmit = () => {
		this.setState({ isSubmitted: true });
	};

	handleChange = (event) => {
		const { currentBooking } = this.props;
		const val = event.target.value;
		const name = event.target.name;
		if (event.target.name.includes('_')) {
			const { attendees } = this.state;
			const field = name.split('_')[1];
			const newAttendees = [...attendees];
			newAttendees[field] = val;
			this.setState({ attendees: newAttendees });
		} else {
			this.setState({ [name]: val });
			switch (event.target.name) {
				case 'name':
					if (val === '') {
						this.setState({
							isNameValid: false,
							nameValidateMessage: 'Please enter your name',
						});
					} else {
						const regex = /^[a-zA-Z\s]*$/;
						if (!regex.test(val)) {
							this.setState({
								isNameValid: false,
								nameValidateMessage: 'Please enter valid name',
							});
						} else {
							this.setState({
								isNameValid: true,
								nameValidateMessage: '',
							});
						}
					}
					break;
				case 'email':
					if (val === '') {
						this.setState({
							isEmailValid: false,
							emailValidateMessage: 'Please enter your email',
						});
					} else {
						const regex = /[\w-]+@([\w-]+\.)+[\w-]+$/;
						if (!regex.test(val)) {
							this.setState({
								isEmailValid: false,
								emailValidateMessage: 'Please enter valid email',
							});
						} else {
							this.setState({
								isEmailValid: true,
								emailValidateMessage: '',
							});
						}
					}
					break;
				case 'seats':
					if (val === '' || val === '0') {
						this.setState({
							isSeatsValid: false,
							seatsValidateMessage: 'Please enter the number of seats',
						});
					} else {
						if (currentBooking.availableSeats < Number(val)) {
							this.setState({
								isSeatsValid: false,
								seatsValidateMessage:
									'Number of seats selected is more than available seats',
							});
						} else {
							this.setState({
								isSeatsValid: true,
								seatsValidateMessage: '',
							});
						}
					}
					break;
				default:
					break;
			}
		}
	};

	createAttendee = () => {
		let table = [];
		const { seats, attendees } = this.state;
		const { currentBooking } = this.props;
		if (seats <= currentBooking.availableSeats) {
			for (let i = 2; i <= seats; i++) {
				const name = 'name_' + (i - 2);
				const item = (
					<div>
						Name of attendee {i}#:
						<input
							type='text'
							name={name}
							value={attendees[i - 2]}
							className={style.booking_input}
							onChange={this.handleChange}
						/>
						{attendees && attendees[i - 2] === '' && (
							<span> Please Enter Name of Attendee {i}# </span>
						)}
					</div>
				);
				table.push(item);
			}
		}
		return table;
	};

	showAttendee = () => {
		let table = [];
		const { attendees } = this.state;
		for (let i = 0; i < attendees.length; i++) {
			const item = (
				<div>
					Name of attendee {i + 2}#:
					{attendees[i]}
				</div>
			);
			table.push(item);
		}
		return table;
	};

	isSubmitDisabled = () => {
		const {
			seats,
			attendees,
			isNameValid,
			isEmailValid,
			isSeatsValid,
		} = this.state;

		if (seats > 1) {
			if (attendees.length === 0) return true;
			for (let index = 0; index < seats; index++) {
				if (attendees[index] === '') return true;
			}
		}

		return (
			!isNameValid ||
			!isEmailValid ||
			!isSeatsValid ||
			(seats < 2 && !isNameValid)
		);
	};
	render() {
		const { currentBooking } = this.props;
		const {
			name,
			email,
			phone,
			seats,
			isNameValid,
			isEmailValid,
			isSeatsValid,
			isSubmitted,
			nameValidateMessage,
			emailValidateMessage,
			seatsValidateMessage,
		} = this.state;
		return (
			<div>
				{currentBooking && (
					<div className={style.booking}>
						<h3>{currentBooking.eventName}</h3>
						<span>
							Number of Available Seats : {currentBooking.availableSeats}
						</span>
						{isSubmitted && (
							<div className={style.booking_ticket}>Tickets Booked </div>
						)}
						<div className={style.booking_guestInfo}>
							<div className={style.booking_imgDiv}>
								<img
									src={currentBooking.imageUrl}
									alt={currentBooking.eventId}
									className={style.booking_img}
								/>
							</div>
							<div className={style.booking_guestDetail}>
								<div>
									Name:
									<input
										type='text'
										name='name'
										value={name}
										className={style.booking_input}
										required
										onChange={this.handleChange}
									/>
									{!isNameValid && <span> {nameValidateMessage} </span>}
								</div>
								<div>
									Email:
									<input
										type='email'
										name='email'
										className={style.booking_input}
										value={email}
										required
										onChange={this.handleChange}
									/>
									{!isEmailValid && <span> {emailValidateMessage} </span>}
								</div>
								<div>
									Phone No.:
									<input
										type='text'
										className={style.booking_input}
										name='phone'
										value={phone}
										onChange={this.handleChange}
									/>
								</div>
								<div>
									Number of seats:
									<select
										name='seats'
										className={style.booking_select}
										defaultValue={seats}
										required
										onChange={this.handleChange}
									>
										<option value='0'>0</option>
										<option value='1'>1</option>
										<option value='2'>2</option>
										<option value='3'>3</option>
										<option value='4'>4</option>
										<option value='5'>5</option>
										<option value='6'>6</option>
									</select>
									{!isSeatsValid && <span> {seatsValidateMessage} </span>}
								</div>
								{seats > 1 &&
									seats <= currentBooking.availableSeats &&
									this.createAttendee()}
								<div>
									<Button.Primary
										type='submit'
										buttonSize={Button.SIZES.LARGE}
										disabled={this.isSubmitDisabled()}
										onClick={this.onSubmit}
										text='Submit'
									></Button.Primary>
									<Button.Default
										type='reset'
										buttonSize={Button.SIZES.LARGE}
										text='Cancel'
										onClick={this.onCancel}
									></Button.Default>
								</div>
							</div>
						</div>
						{isSubmitted && (
							<div className={style.booking_submit}>
								<div>Your Name: {name}</div>
								<div>Your Email Id: {email}</div>
								<div>Your Phone Number: {phone}</div>
								<div>Number of Seats Booked: {seats}</div>
								{seats > 1 && this.showAttendee()}
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Booking));
