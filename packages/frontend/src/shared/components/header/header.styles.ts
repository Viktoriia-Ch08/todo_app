import { css } from '@emotion/css';
import { colors, fontSize, fontWeight } from '~shared/styles';

export const loginLink = css`
	padding: 5px;
	font-size: ${fontSize.l};
	font-weight: ${fontWeight.bold};
	color: ${colors.jacarta};
`;

export const header = css`
	.bp5-navbar {
		display: flex;
		justify-content: space-between;
	}
`;

export const logoutWrapper = css`
	width: 60px;
`;

export const navbar = css`
	display: flex;
	align-items: center;
`;
