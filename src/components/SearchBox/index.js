import React from 'react';

import style from './searchbox.module.scss';

type Props = {
	onSearchChange: Function,
};

export const SearchBox = (props: Props) => (
	<input
		className={style.searchBox}
		type='search'
		name='search'
		placeholder='SEARCH EVENTS'
		onChange={props.onSearchChange}
	/>
);
