import { React, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { TbSettings2 } from 'react-icons/tb';
import { RiSettingsLine } from "react-icons/ri";
import { SlChart } from "react-icons/sl";
import { TbUserCircle } from "react-icons/tb";
import { UserContext } from '../../context/userContext';
import './sidebar.css';
import { PiPlusSquare } from "react-icons/pi";
import Logo from './../../assets/logo-cardly.png'


export default function Sidebar({onCreateNewCard}) {
  const { user, loading: userLoading, error: userError } = useContext(UserContext);
  const navigate = useNavigate()

  const handleNewCardClick = () => {
    navigate('/home', { state: { createNewCard: true } }); // Pass state for new card
  };

  return (
    <div className="sidebar">
      <img src={Logo} className="logo" alt="Logo" />
      <div className="sidebar-link">
        <NavLink to="/home" end className="sidebar-linkk">
          <GoHome className="icon" />
          <span>Home</span>
        </NavLink>
      </div>
      {/* <div className="sidebar-link">
        <NavLink to="/home/analytics" className="sidebar-linkk">
          <SlChart className="icon" />
          <span>Stats</span>
        </NavLink>
      </div> */}
      {/* <div className="sidebar-link">
        <NavLink to="/home/settings" className="sidebar-linkk">
          <TbSettings2 className="icon" />
          <span>Settings</span>
        </NavLink>
      </div> */}
       <div className="sidebar-link">
        <button onClick={handleNewCardClick} className="sidebar-linkk">
          <PiPlusSquare  className="icon" />
          <span>New </span>
        </button>
      </div>
      <div className="sidebar-link last-link">
        <NavLink to="/home/account" className="sidebar-linkk">
        <RiSettingsLine className="icon" />
          <span>{userLoading ? "User" : userError ? "error" : user.name}</span>
        </NavLink>
      </div>
    </div>
  );
}
