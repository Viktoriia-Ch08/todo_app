import { css } from '@emotion/css';
import { colors, fontSize } from '~shared/styles';

export const inputStyles = (error: boolean): string => {
	return css`
		width: 100%;
		height: 45px;
		padding: 0 10px;
		margin-bottom: ${error ? '10px' : '0'};
		font-size: ${fontSize.s};
		color: ${colors.jacarta};
		border: ${`2px solid ${colors.jacarta}`};
		border-radius: 17px;
		box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.06);
	`;
};
