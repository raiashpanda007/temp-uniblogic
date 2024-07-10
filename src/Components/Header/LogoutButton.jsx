import React from 'react'
import { LogoutIcon } from '../../assets/Icons/Icons'
import './NewButton.css'
import auth from '../../appwrite/auth'
import { Logout } from '../../store/authSlice'
import { useSelector,useDispatch } from 'react-redux'

function LogoutButton() {
  const dispatch = useDispatch();
  const handleLogoutButtom = () =>{
    auth.logOut().then(
      () => {
        dispatch(Logout());
      }
    
    ).catch(
      (error) => {
        console.log('LogoutButton :: handleLogoutButtom :: error',error);
      }
    )
    
  }
  const theme = useSelector(state => state.theme.currtheme);
  return (
    <button className= {`MoreOption_Buttons_${theme}`} onClick={handleLogoutButtom}>
        <LogoutIcon/>
    </button>
  )
}

export default LogoutButton