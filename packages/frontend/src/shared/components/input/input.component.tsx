import React, { ChangeEvent } from 'react';
import { inputStyles } from './input.styles';
import {
	errorMessage,
	formLabel,
} from '../../../modules/todos/components/todo-form/todo-form.styles';
import { TodoType } from '~shared/types/todo-types';
import classNames from 'classnames';

type IInputProps = {
	text?: string;
	name: string;
	type: 'text' | 'password' | 'email';
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	value?: TodoType[keyof TodoType];
	checked?: boolean;
	error: string;
	placeholder?: string;
};

const Input: React.FC<IInputProps> = ({
	text,
	type,
	onChange,
	value,
	name,
	checked,
	error,
	placeholder,
}) => {
	return (
		<>
			<label className={formLabel}>
				{text}

				<input
					id={name}
					type={type}
					onChange={onChange}
					value={String(value)}
					checked={checked}
					name={name}
					className={classNames(inputStyles(Boolean(error)))}
					placeholder={placeholder}
				/>
				{error ? <div className={errorMessage}>{error}</div> : null}
			</label>
		</>
	);
};

export default Input;
