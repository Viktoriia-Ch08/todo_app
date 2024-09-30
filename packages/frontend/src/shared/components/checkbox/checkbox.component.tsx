import React, { ChangeEvent } from 'react';
import { checkboxLabel, checkboxStyles } from './checkbox.styles';

type ICheckboxProps = {
	text: string;
	name: string;
	type: 'text' | 'checkbox';
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	checked?: boolean;
};

const Checkbox: React.FC<ICheckboxProps> = ({
	text,
	type,
	onChange,
	name,
	checked,
}) => {
	return (
		<>
			<label className={checkboxLabel}>
				{text}
				<input
					id={name}
					type={type}
					onChange={onChange}
					checked={checked}
					name={name}
					className={checkboxStyles}
				/>
			</label>
		</>
	);
};

export default Checkbox;
