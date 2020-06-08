import React from 'react';
import * as Button from '../../components/Button';
import styles from './styles.scss';
import { withRouter } from 'react-router-dom';

type Props = {
	children: React.ReactNode,
	history: Object,
};

class Error extends React.PureComponent<Props> {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}

	redirectToHome() {
		if (window.location.pathname === '/') {
			window.location.reload();
		} else {
			this.props.history.push('/');
			window.location.reload();
		}
	}

	render() {
		if (this.state.errorInfo) {
			return (
				<div className={styles.error}>
					<h1>Something went wrong</h1>
					<details style={{ whiteSpace: 'pre-wrap', width: '80%' }}>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo.componentStack}
					</details>
					<br />
					<Button.Danger
						text='Back to home'
						type='submit'
						onClick={() => {
							this.redirectToHome();
						}}
						buttonSize={Button.SIZES.LARGE}
					/>
				</div>
			);
		}
		return this.props.children;
	}
}

export default withRouter(Error);
