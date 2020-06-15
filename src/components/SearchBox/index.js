import React from 'react';

import './searchbox.module.scss';

type Props = {
	onSearchChange: Function,
};

export const SearchBox = (props: Props) => (
	<input
		className='searchBox'
		type='search'
		name='search'
		placeholder='SEARCH EVENTS'
		onChange={props.onSearchChange}
	/>
);
