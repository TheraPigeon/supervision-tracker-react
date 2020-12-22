import React from 'react';
import Button from '../Button/Button';
import { useAuth0 } from '@auth0/auth0-react';
const LoginButton = (props) => {
  const { logout } = useAuth0();
  return <Button clicked={() => logout()}>Logout</Button>;
};

export default LoginButton;
