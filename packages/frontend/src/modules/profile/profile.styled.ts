import { css } from '@emotion/css';
import { colors, fontSize, fontWeight } from '~shared/styles';

export const profileWrapper = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const profileTitle = css`
	font-size: ${fontSize.l};
`;

export const profileHeader = css`
	font-size: ${fontSize.xl};
	font-weight: ${fontWeight.bold};
`;

export const changePasswordWrap = css`
	width: 250px;
`;

export const profileText = css`
	font-size: ${fontSize.m};
`;

export const updateUsernameWrap = css`
	display: flex;
	gap: 10px;
	align-items: baseline;
`;

export const editBtn = css`
	border: 1px solid ${colors.jacarta};
`;

export const textWrap = css`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;
