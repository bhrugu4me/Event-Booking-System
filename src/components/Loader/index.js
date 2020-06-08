import React from 'react';
import styles from './loader.module.scss';
import { IconLoading } from '../icons';

const Loader = () => (
	<div className={styles.spinner}>
		<div className={styles.spinnerIcon}>
			<IconLoading fill='#004a64' width='64px' height='64px' />
			<h4>Loading...</h4>
		</div>
	</div>
);

export default Loader;
