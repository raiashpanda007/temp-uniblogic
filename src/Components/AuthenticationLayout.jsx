import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoading } from '../store/LoadingSLice'
import Loader from './Loading/Loading';
function AuthenticationLayout({children,authentication = true}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userStatus = useSelector((state) => state.auth.status);
    const isLoading = useSelector((state) => state.Loading.DataLoading);
    useEffect(() => {
        dispatch(setLoading(true));
        if(authentication && !userStatus){
            navigate('/loginUser');
        }
        else if(!authentication && userStatus){
            navigate('/');
        }
        dispatch(setLoading(false));
    }, [userStatus,authentication,navigate])
  return isLoading ? <Loader/>: <>{children}</>
}

export default AuthenticationLayout