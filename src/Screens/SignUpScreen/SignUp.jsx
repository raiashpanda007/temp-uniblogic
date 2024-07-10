import React, { useState } from 'react';
import './SignUp.css';
import { ButtonComponent, Input } from '../../Components/indexComponent';
import { useForm } from 'react-hook-form';
import auth  from '../../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Login as LoginSlice } from '../../store/authSlice';
import { setLoading } from '../../store/LoadingSLice';

function SignUp() {
    const theme = useSelector((state) => state.theme.currtheme);
    const isLoading = useSelector(state => state.Loading.DataLoading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const SignUPFunction = async (data) => {
        try {
            setError('');
            dispatch(setLoading(true));
            const account = await auth.signUp(data);
            if (account) {
                const session = await auth.getCurrentUser();
                if (session) {
                    dispatch(LoginSlice(session));
                    navigate('/');
                    dispatch(setLoading(false));
                    reset();  // Reset the form after successful signup
                }
            }
        } catch (error) {
            dispatch(setLoading(false));
            setError(error.message);
        }
    };

    return (
        <div className="SignUP">
            <div className={`SignUP_Card ${theme}`}>
                <div className="SignUP_Card_Heading">
                    <h2>SignUP</h2>
                    <h1>UniBLOGic</h1>
                </div>
                <form onSubmit={handleSubmit(SignUPFunction)} className="SignUPForm">
                    <Input
                        label="Username"
                        type="text"
                        placeholder="Enter your Username"
                        {...register('username', {
                            required: 'Username is required'
                        })}
                    />
                    {errors.username && <p className="error">{errors.username.message}</p>}
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your Email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
                                message: 'Invalid Email'
                            }
                        })}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your Password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters'
                            }
                        })}
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                    <ButtonComponent type="submit" label={'SignUP'} theme={theme} />
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default SignUp;
