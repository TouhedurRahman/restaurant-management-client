import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
    const { logIn } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [open, setOpen] = useState(false);
    const captchaRef = useRef(null);
    const [loginDisabled, setLoginDisabled] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const toggleBtn = () => {
        setOpen(!open);
    }

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (data) => {
        const email = data.email;
        const password = data.password;
        // console.log(email, password);

        logIn(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                // console.log(user);
                Swal.fire({
                    icon: "success",
                    title: "Login successfull!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
    };

    const handleValidateCaptcha = () => {
        const captchaValue = captchaRef.current.value;
        // console.log(captchaValue);

        if (validateCaptcha(captchaValue)) {
            setLoginDisabled(false);
        } else {
            setLoginDisabled(true);
        }
    }

    return (
        <div>
            <div className="hero w-full bg-[url('../../../src/assets/others/authentication.png')]">
                <div className="hero-content m-10 p-10 shadow-2xl rounded-lg flex-col lg:flex-row">
                    <div className="flex justify-center items-center">
                        <div className="w-full w-1/2 rounded-xl">
                            <img src="../../../src/assets/others/authentication2.png" />
                        </div>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm p-10">
                        <h2 className='text-2xl text-center font-bold'>Login</h2>
                        <form onSubmit={handleSubmit(handleLogin)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email Address is required" })}
                                    placeholder="user@gmail.com"
                                    className="input input-accent w-full max-w-xs"
                                />
                                {
                                    errors.email && <p className='text-red-600'>{errors.email?.message}</p>
                                }
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">password</span>
                                </label>
                                <div className='relative'>
                                    <div className='flex'>
                                        <input
                                            type={(open === false) ? 'password' : 'text'}
                                            {...register("password", {
                                                required: "Password is required",
                                                maxLength: { value: 8, message: "Password must be 6-8 characters" },
                                                minLength: { value: 6, message: "Password must be 6-8 characters" },
                                            })}
                                            placeholder="●●●●●●●●"
                                            className="input input-accent w-full max-w-xs"
                                        />
                                        <div className="absolute right-2 flex items-center h-full">
                                            {
                                                (open === false)
                                                    ?
                                                    <AiFillEyeInvisible
                                                        style={{ cursor: "pointer" }}
                                                        className='w-full text-xl'
                                                        onClick={toggleBtn}
                                                    />
                                                    :
                                                    <AiFillEye
                                                        style={{ cursor: "pointer" }}
                                                        className='w-full text-xl'
                                                        onClick={toggleBtn}
                                                    />
                                            }
                                        </div>
                                    </div>
                                </div>
                                {
                                    errors.password && <p className='text-red-600'>{errors.password?.message}</p>
                                }

                                <div className="form-control">
                                    <label className="label">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <input
                                        onBlur={handleValidateCaptcha}
                                        type="text"
                                        name="captcha"
                                        ref={captchaRef}
                                        placeholder="Type the captcha above"
                                        className="input input-bordered"
                                        required
                                    />
                                    {/* <button onClick={handleValidateCaptcha} className='btn btn-outline btn-xs mt-2'>Validate</button> */}
                                </div>

                                <label className="label">
                                    <span className="label-text-alt">Forget password?</span>
                                </label>
                            </div>
                            <input type="submit" className='btn btn-accent text-white w-full' value='Login' disabled={loginDisabled} />
                        </form>

                        <p className='pt-3 text-center'>
                            New to Bistro? <Link className='text-blue-700 hover:link' to='/register'>Create an account</Link>
                        </p>

                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;