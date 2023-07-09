import React from 'react';

import { withUserData } from '../hocs';

export const ProfilePageComponent = withUserData(
  ({ user, isLoading, error }) => {
    return (
      <>
        {!user ? (
          <div style={{ height: '10rem' }}>No User</div>
        ) : (
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
        )}
      </>
    );
  }
);
