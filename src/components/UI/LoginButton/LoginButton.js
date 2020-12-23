import React from 'react';
import Button from '../Button/Button';
import { useAuth0 } from '@auth0/auth0-react';
const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button btnType="Login" clicked={() => loginWithRedirect()}>
      Login / Signup
    </Button>
  );
};

export default LoginButton;
