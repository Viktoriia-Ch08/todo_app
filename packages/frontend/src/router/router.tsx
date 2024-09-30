import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoutesContainer } from './components/private-routes-container.component';
import { privateRoutes, publicRoutes } from './routes';
import { PublicRoutesContainer } from './components/public-routes-container.component';
import { useAuthStore } from '~store/auth.store';
import { BASE_NAME, ROUTER_KEYS } from '~shared/keys/routes-key';
import Header from '~shared/components/header/header.component';

const Router: React.FunctionComponent = () => {
	const authByToken = useAuthStore((state) => state.authByToken);
	const fetching = useAuthStore((state) => state.fetching);

	React.useEffect(() => {
		authByToken();
	}, []);

	return (
		<BrowserRouter basename={BASE_NAME.TODOS}>
			<Header />

			{fetching ? (
				<></>
			) : (
				<Routes>
					<Route
						path={ROUTER_KEYS.OPTIONAL}
						element={
							<>
								<Navigate to={ROUTER_KEYS.ALL_TODOS} />
							</>
						}
					/>
					<Route element={<PrivateRoutesContainer />}>
						{privateRoutes()}
					</Route>
					<Route element={<PublicRoutesContainer />}>
						{publicRoutes()}
					</Route>
				</Routes>
			)}
		</BrowserRouter>
	);
};

export default Router;
