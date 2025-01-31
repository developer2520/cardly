import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { RiSettingsLine } from 'react-icons/ri';
import { PiPlusSquare } from 'react-icons/pi';
import Logo from './../../assets/logo-cardly.png';
import { UserContext } from '../../context/userContext';
import { OwnCardsContext } from '../../context/ownCardsContext';
import Limit from './../limit/limit';
import './sidebar.css';

const Sidebar = ({ onCreateNewCard }) => {
  const { user, loading: userLoading, error: userError } = useContext(UserContext);
  const navigate = useNavigate();
  const { ownCards, loading: cardsLoading, error: cardsError } = useContext(OwnCardsContext);

  const [isLimitReached, setIsLimitReached] = useState(false); // State for tracking limit visibility

  const handleNewCardClick = () => {
    if (ownCards.length >= 5) {
      setIsLimitReached(true); // Show limit message if 5 pages are reached
    } else {
      navigate('/home', { state: { createNewCard: true } });
    }
  };

  const handleLimitClose = () => {
    setIsLimitReached(false); // Close limit message when "Got it!" is clicked
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
        <button onClick={handleNewCardClick} className="sidebar-link sidebar-button">
          <PiPlusSquare className="sidebar-icon" />
          <span className="sidebar-tex">New</span>
        </button>
      </div>

      {isLimitReached && <Limit onClose={handleLimitClose} />} {/* Pass onClose function to Limit component */}

      <div className="sidebar-item last-item">
        <NavLink to="/home/account" className="sidebar-link">
          <RiSettingsLine className="sidebar-icon" />
          <span className="user_name">{userLoading ? 'User' : userError ? 'Error' : user.name}</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
