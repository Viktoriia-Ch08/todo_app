import { ToastContent, toast } from 'react-toastify';

export const successfulNotification = (title: string): ToastContent => {
	return toast.success(title, {
		position: 'top-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'light',
	});
};
