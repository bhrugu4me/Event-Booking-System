import React, { Component } from 'react';
import { connect } from 'react-redux';
import Error from '../../components/Error';
import Router from '../../router';
import './app.module.scss';

const mapStateToProps = null;

const mapDispatchToProps = null;

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='app'>
				<Error>
					<Router />
				</Error>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
