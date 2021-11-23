import { useAuth0 } from '@auth0/auth0-react'
import './Button.css'

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0()
  return (
    <button
      className="btn btn--outline"
      onClick={() => loginWithRedirect()}
    >
      LOGIN
    </button>
  );
};

export default LoginButton