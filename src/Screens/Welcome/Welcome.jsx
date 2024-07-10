import React from 'react';
import './Welcome.css';
import { useSelector } from 'react-redux';
import LetterByLetterText from './LetterByLetterText';
import { ButtonComponent } from '../../Components/indexComponent';
import { Link } from 'react-router-dom';
import conf from '../../conf/config.js';
function Welcome() {
  const theme = useSelector((state) => state.theme.currtheme);
  return (
    
    <div className="Welcome">
      <div className={`Welcome_Content_${theme}`}>
        Welcome to{' '}
        <h1 className="Welcome_Content_Heading">
          <LetterByLetterText  />
        </h1>
        <span className="Welcome_Content_Info">
          Your Blogging Platform
        </span>
        <div className="Welcome_Content_Buttons">
          <Link to = {'/loginUser'} className='Link_Welcome'>
            <ButtonComponent theme={theme} label="LOGIN" className={'Welcome_Buttons'} />
          </Link>
          <Link to = {'/sign-up'} className='Link_Welcome'>
            <ButtonComponent theme={theme} label="SIGN UP"  className={'Welcome_Buttons'}/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
