import React from 'react';

const SVG = (
	style = {},
	fill = '#000',
	stroke = '',
	width = '100%',
	className = '',
	viewBox = '0 0 48 48'
) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		xmlnsXlink='http://www.w3.org/1999/xlink'
		width={width}
		style={style}
		height={width}
		viewBox={viewBox}
		stroke={stroke}
		className={`svg-icon ${className || ''}`}
	>
		<path
			fill={fill}
			d='M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z'
		>
			<animateTransform
				attributeType='xml'
				attributeName='transform'
				type='rotate'
				from='0 25 25'
				to='360 25 25'
				dur='0.6s'
				repeatCount='indefinite'
			/>
		</path>
	</svg>
);

export default SVG;
