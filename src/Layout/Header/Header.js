import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css';


const Header = () => {
  return (
    <ul className='nav'>
        <li className="">
              <NavLink to="/" className="" >Home</NavLink>
        </li>
        <li className="">
              <NavLink to="/financial-statement" className="" >Financial Statements</NavLink>
        </li>
  </ul>
  );
};

export default Header;
