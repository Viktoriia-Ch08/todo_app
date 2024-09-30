import { css } from '@emotion/css';

export const todosSearchForm = css`
	display: flex;
	gap: 20px;
	justify-content: center;
	align-items: center;
	width: 280px;

	@media screen and (min-width: 400px) {
		width: 300px;
	}
`;
