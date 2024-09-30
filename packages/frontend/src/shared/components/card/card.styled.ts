import { css } from '@emotion/css';
import { colors, fontSize, fontWeight, fonts } from '~shared/styles';
import { device } from '~shared/styles/deviceSizes';

export const todoTitle = css`
	font-family: ${fonts.workSans};
	font-size: ${fontSize.xl};
`;

export const todoDescr = css`
	min-height: 50px;
	margin-bottom: 0;
	font-family: ${fonts.workSans};
	font-size: ${fontSize.s};

	@media ${device.tablet} {
		height: 50px;
	}
`;

export const todoTextContainer = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 20px;
`;

export const todoWrapper = css`
	display: flex;
	justify-content: space-around;
	align-items: baseline;

	.bp5-control.bp5-switch input:checked ~ .bp5-control-indicator {
		background-color: ${colors.malachite};
	}
	.bp5-control-indicator:focus {
		outline: none;
	}
`;

export const todoViewLink = css`
	font-size: ${fontSize.l};
	font-weight: ${fontWeight.bold};
	color: ${colors.jacarta};
`;

export const todoBtnContainer = css`
	display: flex;
	gap: 20px;
`;

export const todoCard = css`
	margin-bottom: 10px;
`;
