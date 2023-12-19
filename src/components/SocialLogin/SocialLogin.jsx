import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
    const { googleLogIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogIn = () => {
        googleLogIn()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                const user = { name: loggedUser.displayName, email: loggedUser.email };
                const url = "http://localhost:5000/users";
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'User Login successfull.',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate(from, { replace: true })
                    }
                    )
            })
    }
    return (
        <div>
            <div className="divider">OR</div>

            <button
                onClick={handleGoogleLogIn}
                className='btn btn-outline w-full'
            >
                CONTINUE WITH GOOGLE
            </button>
        </div>
    );
};

export default SocialLogin;