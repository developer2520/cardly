import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { RiSettingsLine } from 'react-icons/ri';
import { PiPlusSquare } from 'react-icons/pi';
import Logo from './../../assets/logo-cardly.png';
import { UserContext } from '../../context/userContext';
import './sidebar.css';

const Sidebar = ({ onCreateNewCard }) => {
  const { user, loading: userLoading, error: userError } = useContext(UserContext);
  const navigate = useNavigate();

  const handleNewCardClick = () => {
    navigate('/home', { state: { createNewCard: true } });
  };

  return (
    <div className="sidebar">
      <img src={Logo} className="sidebar-logo" alt="Logo" />

      <div className="sidebar-item">
        <NavLink to="/home" end className="sidebar-link">
          <GoHome className="sidebar-icon" />
          <span>Home</span>
        </NavLink>
      </div>

      <div className="sidebar-item">
        <button onClick={handleNewCardClick} className="sidebar-link">
          <PiPlusSquare className="sidebar-icon" />
          <span className="sidebar-tex">New</span>
        </button>
      </div>

      <div className="sidebar-item last-item">
        <NavLink to="/home/account" className="sidebar-link">
          <RiSettingsLine className="sidebar-icon" />
          <span>{userLoading ? 'User' : userError ? 'Error' : user.name}</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;