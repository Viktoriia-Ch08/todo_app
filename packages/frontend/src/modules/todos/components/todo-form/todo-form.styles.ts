import { css } from '@emotion/css';
import { colors, fontSize, fontWeight, fonts } from '~shared/styles';
import { device } from '~shared/styles/deviceSizes';

export const todoFormWrapper = css`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding-top: 30px;
	padding-bottom: 30px;
`;

export const todoForm = css`
	display: flex;
	flex-direction: column;
	gap: 10px;
	justify-content: center;
	@media ${device.tablet} {
		justify-content: flex-start;
	}
`;

export const todoFormSubmitWrapper = css`
	width: 260px;
	@media ${device.tablet} {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

export const textArea = css`
	width: 100%;
	min-height: 80px;
	padding: 10px;
	resize: none;
	font-size: ${fontSize.s};
	color: ${colors.jacarta};
	border: ${`2px solid ${colors.jacarta}`};
	border-radius: 17px;
	box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.06);
`;

export const formLabel = css`
	width: 260px;
	font-family: ${fonts.workSans};
	font-size: ${fontSize.l};
	font-weight: ${fontWeight.medium};
	@media ${device.tablet} {
		width: 450px;
	}
`;

export const errorMessage = css`
	font-size: ${fontSize.xs};
	color: ${colors.mediumVioletRed};
	margin-bottom: 10px;
`;
