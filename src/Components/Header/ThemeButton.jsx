import React from 'react'
import {Brightness4Icon} from '../../assets/Icons/Icons'
import './NewButton.css'
import { useSelector,useDispatch } from 'react-redux'
import { setTheme } from '../../store/themeSlice'

function ThemeButton() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.currtheme);
  const HandleThemeButton = () =>{
    dispatch(setTheme());
  }
  return (
    
    <button 
      className= {`MoreOption_Buttons_${theme}`}
      onClick={HandleThemeButton}
    >
      <Brightness4Icon />
    </button>
  )
}

export default ThemeButton