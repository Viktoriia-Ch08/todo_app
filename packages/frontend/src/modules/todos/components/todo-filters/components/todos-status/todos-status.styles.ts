import { css } from '@emotion/css';
import { colors, fontSize, fontWeight } from '~shared/styles';
import { device } from '~shared/styles/deviceSizes';

export const statusBtn = css`
	width: 100%;
	padding: 10px;
	font-size: ${fontSize.xs};
	font-weight: ${fontWeight.medium};
	color: ${colors.jacarta};
	border: 2px solid ${colors.jacarta};
	border-radius: 8px;

	&.active {
		color: ${colors.white};
		background-color: ${colors.jacarta};
	}

	@media screen and (min-width: 400px) {
		padding: 10px;
		font-size: ${fontSize.m};
	}
`;

export const statusBtnWrapper = css`
	display: flex;
	gap: 10px;
	justify-content: center;

	margin: 0 auto 20px;

	@media screen and (min-width: 400px) {
		width: 350px;
	}

	@media ${device.tablet} {
		width: 500px;
	}
`;
