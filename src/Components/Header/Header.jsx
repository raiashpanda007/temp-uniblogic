import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';
import ThemeButton from './ThemeButton';
import UserAccountButton from './UserAccountButton';
import { ButtonComponent } from '../indexComponent';

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status);
  const theme = useSelector(state => state.theme.currtheme);
  const navItems = [
    {
      name: 'WELCOME',
      slug: '/',
      active: true,
      route: '/'
    },
    {
      name: 'LOGIN',
      slug: '/login',
      active: !authStatus,
      route : '/loginUser'
    },
    {
      name: 'SIGN UP',
      slug: '/signup',
      active: !authStatus,
      route : '/sign-up'
    },
    {
      name: 'HOME',
      slug: '/home',
      active: authStatus,
      route : '/home'
    },
    {
      name: 'CREATE POST',
      slug: '/create-post',
      active: authStatus,
      route : '/create-post'
    }
  ];

  return (
    <div className="Header">
      <h1 className='Header_Logo' onClick={() => navigate('/')}>{`uB`}</h1>
      <div className={`Header_Nav`}>
        <nav className='Nav'>
          <ul>
            {navItems.map(item =>
              item.active ? (
                <li key={item.slug}>
                
                  <ButtonComponent theme={theme} label={item.name} className={'Heading_Button_Size'} onClick={() => navigate(item.route)}/>
                
                </li>
              ) : null
            )
            

          }
         
          </ul>
        </nav>
      </div>

      <div className="Header_More_Options">
        <ThemeButton />
        {authStatus && <LogoutButton />}
        <UserAccountButton />
      </div>
      
    </div>
  );
}

export default Header;
