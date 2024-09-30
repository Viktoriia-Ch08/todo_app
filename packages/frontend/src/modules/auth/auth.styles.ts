import { css } from '@emotion/css';
import { colors, fontSize } from '~shared/styles';

export const linkEl = css`
	font-size: ${fontSize.s};
	color: ${colors.jacarta};
	text-decoration: underline;
`;

export const formWrap = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
	justify-content: center;
	align-items: center;
	width: 320px;
`;

export const form = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const submitBtn = css`
	width: 150px;
`;
