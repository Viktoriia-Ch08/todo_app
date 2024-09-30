import { css } from '@emotion/css';
import { colors, fontSize, fonts } from '~shared/styles';

export const checkboxStyles = css`
	height: 15px;
	padding: 0 10px;
	font-size: ${fontSize.s};
	color: ${colors.jacarta};
	border: ${`2px solid ${colors.jacarta}`};
	border-radius: 17px;
	box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.06);
`;

export const checkboxLabel = css`
	display: flex;
	align-items: center;
	gap: 7px;
	font-family: ${fonts.workSans};
	font-size: ${fontSize.l};
`;
