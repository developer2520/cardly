import { React, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { TbSettings2 } from 'react-icons/tb';
import { SlChart } from "react-icons/sl";
import { TbUserCircle } from "react-icons/tb";
import { UserContext } from '../../context/userContext';
import './sidebar.css';
import TelegramLogo from './../../assets/telegram-logo.png'

export default function Sidebar() {
  const { user, loading: userLoading, error: userError } = useContext(UserContext);

  // If the user is still loading, show a loading state
  // if (userLoading) {
  //   return (
  //     <div className="sidebar">
  //       <h2 className="sidebar-title">Loading...</h2>
  //     </div>
  //   );
  // }

  // If there is an error fetching the user, show the error message
 

  return (
    <div className="sidebar">
      <img src={TelegramLogo} className='logo' alt="" />
      <div className="sidebar-link">
        <NavLink to="/home" end className="sidebar-linkk">
          <GoHome className="icon" />
          <span>Home</span>
        </NavLink>
      </div>
      <div className="sidebar-link">
        <NavLink to="/home/settings" className="sidebar-linkk">
          <TbSettings2 className="icon" />
          <span>Settings</span>
        </NavLink>
      </div>
      <div className="sidebar-link">
        <NavLink to="/home/analytics" className="sidebar-linkk">
        <SlChart className='icon' />
          <span>Stats</span>
        </NavLink>
      </div>
      <div className="sidebar-link last-link">
        <NavLink to="/home/account" className="sidebar-linkk">
          <TbUserCircle className="icon" />
          {/* Check if user is available */}
          <span>{userLoading ? "User" : userError ? "error" : user.name}</span>
        </NavLink>
      </div>
    </div>
  );
}
