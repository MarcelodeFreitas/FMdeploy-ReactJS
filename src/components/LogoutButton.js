import { useAuth0 } from '@auth0/auth0-react'
import './Button.css'

const LogoutButton = () => {
  const { logout } = useAuth0()
  return (
    <button
      className="btn btn--outline"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      LOGOUT
    </button>
  );
};

export default LogoutButton