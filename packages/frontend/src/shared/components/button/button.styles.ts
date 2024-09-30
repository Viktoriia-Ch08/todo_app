import { css } from '@emotion/css';
import { colors } from '../../styles';

export const btnStyles = (disabled: boolean): string => {
	return css`
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 10px;
		font-size: 20px;
		font-weight: 700;
		color: ${disabled ? colors.white : colors.jacarta};
		background-color: ${disabled ? colors.dimGray : colors.transparent};
		border: ${disabled ? 'none' : `2px solid ${colors.jacarta}`};
		border-radius: 17px;
		box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.06);
		text-align: center;

		&:focus,
		&:hover {
			color: ${colors.white};
			background-color: ${colors.jacarta};
			border: ${colors.jacarta};
		}
	`;
};

export const btnContentWrapper = css`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 35px;
`;

export const iconWrapper = css`
	display: flex;
	align-items: center;
`;

export const mr = css`
	margin-right: 15px;
`;
