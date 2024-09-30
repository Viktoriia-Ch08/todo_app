import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import 'modern-normalize/modern-normalize.css';
import { PortalProvider } from '@blueprintjs/core';
import './shared/styles/global-styles.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Router from './router/router';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<PortalProvider portalClassName="my-custom-class">
		<Router />
		<ToastContainer />
	</PortalProvider>,
);
