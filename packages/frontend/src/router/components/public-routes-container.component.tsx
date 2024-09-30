import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys/routes-key';
import { useAuthStore } from '~store/auth.store';

export function PublicRoutesContainer(): JSX.Element {
	const user = useAuthStore((state) => state.user);
	return (
		<>
			{user && user.verified ? (
				<Navigate to={ROUTER_KEYS.ALL_TODOS} />
			) : (
				<Suspense>
					<Outlet />
				</Suspense>
			)}
		</>
	);
}
