import { ToastContent, toast } from 'react-toastify';

export const failedNotification = (title: string): ToastContent => {
	return toast.error(title, {
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
