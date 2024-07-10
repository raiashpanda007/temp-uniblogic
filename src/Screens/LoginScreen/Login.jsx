import React, { useState } from "react";
import "./Login.css";
import { ButtonComponent, Input } from "../../Components/indexComponent";
import { useDispatch, useSelector } from "react-redux";
import auth  from "../../appwrite/auth";
import { Login as LoginSlice } from "../../store/authSlice";
import { set, useForm } from "react-hook-form";
import { useNavigate,Link } from "react-router-dom";
import { setLoading } from "../../store/LoadingSLice";

function LoginScreen() {
  const theme = useSelector((state) => state.theme.currtheme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const isLoading = useSelector(state => state.Loading.DataLoading);

  const { register, handleSubmit, formState: { errors } } = useForm(); // Destructure errors

  const loginFunction = async (data) => {
    setError("");
    dispatch(setLoading(true));
    try {
      
      const session = await auth.login(data);
      if (session) {
        const userData = await auth.getCurrentUser();

        if (userData) {
          dispatch(LoginSlice(userData));
          
          dispatch(setLoading(false));
          navigate(`/home`);
        }
      }
    } catch (error) {
      dispatch(setLoading(false));
      setError(error.message);
    }
  };
  

  return (
    <div className="Login">
      <div className={`Login_Card ${theme}`}>
        <div className="Login_Card_Heading">
          <h2>Login</h2>
          <h1>UniBLOGic</h1>
        </div>
        <form onSubmit={handleSubmit(loginFunction)} className="LoginForm">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your Email"
            {...register('email', {
              required: 'Email is required',
              validate: {
                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
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

          <Link to={'/sign-up'} className={`Login_sign_up Login_sign_up_${theme}`}>Don't Have Account</Link>
          <ButtonComponent type="submit" label={'Login'} theme={theme} className={'Button_Login'}/>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
