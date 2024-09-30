import { css } from '@emotion/css';
import { colors, fontSize, fontWeight, fonts } from '~shared/styles';

export const todoTable = css`
	text-align: center;
	width: 100%;
	min-height: 500px;

	tr:nth-child(even) {
		background-color: ${colors.white};
	}
`;

export const todoTableHeader = css`
	font-family: ${fonts.workSans};
	font-size: ${fontSize.l};
	margin: 0 auto;
`;

export const paginationWrapper = css`
	display: flex;
	gap: 20px;
	align-items: baseline;
	justify-content: center;
	width: 100px;
	margin: 0 auto;
	font-family: ${fonts.workSans};
	font-size: ${fontSize.l};
	font-weight: ${fontWeight.medium};
	color: ${colors.jacarta};
`;
