import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { getUserData } from '../features/user/userActions';

export const ProfilePageComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(getUserData());

  const user = useSelector((state: RootState) => state.user.user);

  if (!user) return <></>;

  return (
    <div style={{ minHeight: '70vh', marginTop: '5rem' }}>
      <div>
        <h5>First Name</h5>
        <p>{user.firstName}</p>
      </div>
      <div>
        <h5>Last Name</h5>
        <p>{user.lastName}</p>
      </div>
      <div>
        <h5>Email</h5>
        <p>{user.email}</p>
      </div>
    </div>
  );
};
