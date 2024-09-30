import { css } from '@emotion/css';
import { colors, fontSize, fontWeight } from '~shared/styles';

export const todoTitle = css`
	font-size: ${fontSize.xl};
	font-weight: ${fontWeight.medium};
`;

export const todoWrapper = css`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;

export const todoBtnsWrapper = css`
	display: flex;
	gap: 20px;
	width: 300px;
`;

export const todoBackBtnWrapper = css`
	width: 150px;
	margin-bottom: 20px;
`;

export const todoSwitchWrapper = css`
	display: flex;
	gap: 7px;

	.bp5-control.bp5-switch input:checked ~ .bp5-control-indicator {
		background-color: ${colors.malachite};
	}
	.bp5-control-indicator:focus {
		outline: none;
	}
`;
