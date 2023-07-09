import React, { useEffect, ComponentType } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUserData } from '../features/user/userActions';
import { User } from '../types';

interface WithDataFetchingProps {
  user: User | null;
  isLoading: boolean;
  error: any;
}

export const withUserData = <P extends object>(
  WrappedComponent: ComponentType<P & WithDataFetchingProps>
): React.FC<P> => {
  const WithUserData: React.FC<P> = (props) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.user);
    const isLoading = useAppSelector((state) => state.user.isLoading);
    const error = useAppSelector((state) => state.user.error);

    useEffect(() => {
      dispatch(getUserData());
    }, [dispatch]);

    return (
      <WrappedComponent
        user={user}
        isLoading={isLoading}
        error={error}
        {...props}
      />
    );
  };

  WithUserData.displayName = `WithUserData(${getDisplayName(
    WrappedComponent
  )})`;

  return WithUserData;
};

const getDisplayName = (WrappedComponent: ComponentType<any>): string => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};
