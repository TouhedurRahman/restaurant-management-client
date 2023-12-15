import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { AuthContext } from "../../providers/AuthProvider";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [openPassword, setOpenPassword] = useState(false);
    const [openConfirmPassword, setOpenConfirmPassword] = useState(false);

    const toggleBtnPassword = () => {
        setOpenPassword(!openPassword);
    }

    const toggleBtnConfirmPassword = () => {
        setOpenConfirmPassword(!openConfirmPassword);
    }

    const handleRegister = data => {
        console.log(data)
        const userName = data.name;
        const userEmail = data.email;
        const userPass = data.password;
        const userConPass = data.confirmPassword;

        if (userPass === userConPass) {
            createUser(userEmail, userPass)
                .then(userCredential => {
                    const registeredUser = userCredential.userCredential;
                    console.log(registeredUser);
                    const userInfo = {
                        displayName: userName
                    }
                    updateUserProfile(userInfo)
                        .then(() => {
                            console.log("User successfully registered.")
                        })
                        .catch(error => {
                            console.log(error)
                        })
                });
        }
        else {
            console.log("Password & confirm password must be same.")
        }
    };

    return (
        <div>
            <div className="hero w-full bg-[url('../../../src/assets/others/authentication.png')]">
                <div className="hero-content m-10 p-10 shadow-2xl rounded-lg flex-col lg:flex-row-reverse">
                    <div className="flex justify-center items-center">
                        <div className="w-full w-1/2 rounded-xl">
                            <img src="../../../src/assets/others/authentication2.png" />
                        </div>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm p-10">
                        <h2 className='text-2xl text-center font-bold'>Register</h2>
                        <form onSubmit={handleSubmit(handleRegister)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="User Name"
                                    className="input input-accent w-full max-w-xs"
                                />
                                {
                                    errors.name && <p className='text-red-600'>{errors.name?.message}</p>
                                }
                            </div>

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
                                <div className="relative">
                                    <div className="flex">
                                        <input
                                            type={(openPassword === false) ? 'password' : 'text'}
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
                                                (openPassword === false)
                                                    ? <AiFillEyeInvisible
                                                        style={{ cursor: "pointer" }}
                                                        className='w-full text-xl'
                                                        onClick={toggleBtnPassword}
                                                    />
                                                    : <AiFillEye
                                                        style={{ cursor: "pointer" }}
                                                        className='w-full text-xl'
                                                        onClick={toggleBtnPassword}
                                                    />
                                            }
                                        </div>
                                    </div>
                                </div>
                                {
                                    errors.password && <p className='text-red-600'>{errors.password?.message}</p>
                                }
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Confirm password</span>
                                </label>
                                <div className="relative">
                                    <div className="flex">
                                        <input
                                            type={(openConfirmPassword === false) ? 'password' : 'text'}
                                            {...register("confirmPassword", {
                                                required: "Password is required",
                                                maxLength: { value: 8, message: "Password must be 6-8 character" },
                                                minLength: { value: 6, message: "Password must be 6-8 character" },
                                                /* pattern: {
                                                    value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])$/,
                                                    message: "Password must be Strong"
                                                } */
                                            })}
                                            placeholder="●●●●●●●●"
                                            className="input input-accent w-full max-w-xs"
                                        />
                                        <div className="absolute right-2 flex items-center h-full">
                                            {
                                                (openConfirmPassword === false)
                                                    ?
                                                    <AiFillEyeInvisible
                                                        style={{ cursor: "pointer" }}
                                                        className='w-full text-xl'
                                                        onClick={toggleBtnConfirmPassword}
                                                    />
                                                    :
                                                    <AiFillEye
                                                        style={{ cursor: "pointer" }}
                                                        className='w-full text-xl'
                                                        onClick={toggleBtnConfirmPassword}
                                                    />
                                            }
                                        </div>
                                    </div>
                                </div>
                                {
                                    errors.password && <p className='text-red-600'>{errors.password?.message}</p>
                                }
                                <label className="label">
                                    <span className="label-text-alt"></span>
                                </label>
                            </div>

                            <input type="submit" className='btn btn-accent text-white w-full' value='Register' />
                        </form>

                        <p className='pt-3 text-center'>
                            Already have an account? <Link className='text-blue-700 hover:link' to='/login'>Please Login</Link>
                        </p>

                        <div className="divider">OR</div>

                        <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;