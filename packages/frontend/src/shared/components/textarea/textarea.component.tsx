import { ChangeEvent } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import {
	errorMessage,
	formLabel,
	textArea,
} from '../../../modules/todos/components/todo-form/todo-form.styles';
import { TodoType } from '~shared/types/todo-types';

type ITextAreaProps = {
	text: string;
	name: string;
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	value?: TodoType[keyof TodoType];
	error: string;
	placeholder: string;
};

const Textarea: React.FC<ITextAreaProps> = ({
	text,
	onChange,
	value,
	name,
	error,
	placeholder,
}) => {
	return (
		<label className={formLabel}>
			{text}
			<ReactTextareaAutosize
				name={name}
				onChange={onChange}
				value={(value as string | number) || ''}
				className={textArea}
				placeholder={placeholder}
			/>
			{error ? <div className={errorMessage}>{error}</div> : null}
		</label>
	);
};

export default Textarea;
