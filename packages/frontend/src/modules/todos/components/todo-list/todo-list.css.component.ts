import { css } from '@emotion/css';
import { fontSize, fonts } from '~shared/styles';

export const todoList = css`
	display: flex;
	flex-direction: column;
	gap: 15px;
	margin-bottom: 30px;
	padding-left: 0;
	font-family: ${fonts.workSans};
	font-size: ${fontSize.s};
`;
