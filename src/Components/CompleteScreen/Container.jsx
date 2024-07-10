import React from 'react'
import {Outlet} from 'react-router-dom'
import { Header,Loader } from '../indexComponent'

import './Container.css'
import {useSelector} from 'react-redux'

function Container() {
  const theme = useSelector(state => state.theme.currtheme)
  return (
    <div className={`Container_${theme}`}>
      <Loader/>
      <Header />
      {<Outlet />}
    </div>
  )
}

export default Container