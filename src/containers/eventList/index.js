import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getEventList } from '../../actions/event/eventActions';

import Event from '../../components/Event';
import { SearchBox } from '../../components/SearchBox';

import { EventDetail } from '../../models/event';

import style from './eventList.module.scss';

const mapStateToProps = (state) => {
	return {
		eventList: state.event.eventList,
		currentEvent: state.event.currentEvent,
	};
};

const mapDispatchToProps = (dispatch) => ({
	getEventList: () => dispatch(getEventList()),
});

type Props = {
	eventList: Array<EventDetail>,
	getEventList: Promise<any>,
};

type State = {
	filterText: string,
};

class EventList extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = { filterText: '' };
	}

	async componentDidMount() {
		const { getEventList } = this.props;
		await getEventList();
	}

	onSearchChange = (e) => {
		this.setState({ filterText: e.target.value });
	};

	render() {
		const { filterText } = this.state;
		const { eventList } = this.props;
		const filteredEvents = eventList.filter((event) =>
			event.eventName.toLowerCase().includes(filterText.toLowerCase())
		);

		return (
			<div className={style.home}>
				<SearchBox onSearchChange={this.onSearchChange} />

				<div className={style.row}>
					{filteredEvents.map((event: EventDetail) => (
						<div key={event.eventId} className={style.col}>
							<Event eventDetail={event} />
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
