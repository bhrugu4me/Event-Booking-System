import React, { type Node, PureComponent } from 'react';
import './a11ybutton.module.scss';

type Props = {
	children: Node,
	className: string,
};

export default class A11yButton extends PureComponent<Props> {
	static defaultProps = {
		children: null,
		className: '',
	};

	render() {
		const { children, className } = this.props;

		return (
			<button
				{...this.props}
				className={`a11y-button ${className}`}
				type='button'
			>
				{children}
			</button>
		);
	}
}
