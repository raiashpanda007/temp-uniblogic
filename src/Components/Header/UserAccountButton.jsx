import React from 'react'
import './NewButton.css'
import { useSelector } from 'react-redux'
function UserAccountButton() {
  const theme = useSelector(state => state.theme.currtheme);
  return (
    <button className={`MoreOption_Buttons_${theme} UserButton_${theme}`}>
        <h5>A</h5>
    </button>
  )
}

export default UserAccountButton