import Navbar from '../Navbar'
import { useAuth0 } from '@auth0/auth0-react'

const Profile = () => {
    const { user } = useAuth0()

    return (
        <>
            <Navbar />
            <div style={{backgroundColor: "white"}}>
                <div className="row align-items-center profile-header">
                    <div className="col-md-2 mb-3">
                        <img
                            src={user.picture}
                            alt="Profile"
                            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                        />
                    </div>
                    <div className="col-md text-center text-md-left">
                        <h2>NAME: {user.name}</h2>
                        <h2>USERNAME: {user['https://fm-deploy.eu.auth0.com/username']}</h2>
                        <p className="lead text-muted">{user.email}</p>
                    </div>
                </div>
                <div className="row">
                    <pre className="col-12 text-light bg-dark p-4">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </div>
            </div>
        </>
    );
};

export default Profile