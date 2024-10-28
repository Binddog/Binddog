import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/TopNav.css'

function TopNav() {
  return (
    <div>
      <div className='navbar'>
        <Link className='navbarMenu' to={'/home'}>Home</Link>
        <Link className='navbarMenu' to={'/docs'}>Docs</Link>
        <Link className='navbarMenu' to={'/signup'}>SignUp</Link>
        <Link className='navbarMenu' to={'/login'}>Login</Link>
        <Link className='navbarMenu' to={'/flowList'}>FlowList</Link>
      </div>
    </div>
  );
};

export default TopNav;