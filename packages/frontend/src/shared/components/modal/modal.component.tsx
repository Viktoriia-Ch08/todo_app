import { Button, Icon } from '@blueprintjs/core';
import React, { ReactNode, useEffect } from 'react';
import {
	Backdrop,
	CloseBtnThumb,
	ModalBody,
	ModalCloseBtn,
} from './modal.styles';
import ReactDOM from 'react-dom';

interface IModal {
	children: ReactNode;
	setShow: (show: boolean) => void;
	show: boolean;
}

const Modal: React.FC<IModal> = ({ children, setShow, show }) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent): void => {
			if (e.code === 'Escape') {
				setShow(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [setShow]);

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
		if (e.currentTarget === e.target) {
			setShow(false);
		}
	};

	const toggleModal = (): void => {
		setShow(!show);
	};

	const modalRoot = document.getElementById('modal-root');

	modalRoot.id = 'modal-root';

	if (!show) return null;

	return ReactDOM.createPortal(
		<div onClick={handleBackdropClick} className={Backdrop}>
			<div className={ModalBody}>
				<div className={CloseBtnThumb}>
					<Button
						className={ModalCloseBtn}
						onClick={toggleModal}
						icon={<Icon icon="cross" size={20} />}
					/>
				</div>
				{children}
			</div>
		</div>,
		modalRoot,
	);
};

export default Modal;
