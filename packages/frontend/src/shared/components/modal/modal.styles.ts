import { css } from '@emotion/css';
import { colors } from '~shared/styles';
import { device } from '~shared/styles/deviceSizes';

export const Backdrop = css`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 10;
	backdrop-filter: blur(7px);
	overflow: auto;
	transition:
		opacity 300ms linear,
		visibility 300ms linear;
`;

export const ModalBody = css`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 300px;
	max-height: 90%;
	min-height: 300px;
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 50px;
	padding-bottom: 50px;
	overflow-y: auto;
	transform: translate(-50%, -50%);
	border-radius: 12px;
	background-color: ${colors.white};
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

	@media ${device.tablet} {
		width: 500px;
	}
`;

export const CloseBtnThumb = css`
	position: relative;
`;

export const ModalCloseBtn = css`
	position: absolute;
	top: -25px;
	right: 0;

	&:active,
	&:focus,
	&:hover {
		fill: var(--text-special-clr);
	}
`;
