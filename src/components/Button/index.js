import React, { PureComponent } from 'react';
import classnames from 'classnames';
import styles from './button.module.scss';

export const TYPES = {
	PRIMARY: 'btnprimary',
	WARNING: 'btnwarning',
	DANGER: 'btndanger',
	SUCCESS: 'btnsuccess',
	DEFAULT: 'btndefault',
};

export const SIZES = {
	SMALL: 'btnsmall',
	MEDIUM: 'btnmedium',
	LARGE: 'btnlarge',
};

type Props = {
	text: string,
	onClick: Function,
	type: string,
	disabled: boolean,
	buttonType: string,
	buttonSize: string,
};

class BaseButton extends PureComponent<Props> {
	render() {
		const {
			text,
			onClick,
			type,
			disabled,
			buttonType,
			buttonSize,
		} = this.props;
		return (
			<button
				type={type}
				disabled={disabled}
				onClick={onClick}
				className={classnames(
					styles.btn,
					styles[buttonType],
					styles[buttonSize || SIZES.MEDIUM]
				)}
			>
				{text}
			</button>
		);
	}
}

export const Primary = (props) => (
	<BaseButton {...props} buttonType={TYPES.PRIMARY} />
);
export const Warning = (props) => (
	<BaseButton {...props} buttonType={TYPES.WARNING} />
);
export const Danger = (props) => (
	<BaseButton {...props} buttonType={TYPES.DANGER} />
);
export const Success = (props) => (
	<BaseButton {...props} buttonType={TYPES.SUCCESS} />
);
export const Default = (props) => (
	<BaseButton {...props} buttonType={TYPES.DEFAULT} />
);
