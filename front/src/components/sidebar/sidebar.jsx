import React, { useContext, useState, useEffect } from 'react';
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
  const { user, loading: userLoading, error: userError, fetchUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { ownCards, loading: cardsLoading, error: cardsError } = useContext(OwnCardsContext);

  const [isLimitReached, setIsLimitReached] = useState(false);

  useEffect(() => {
    if (!user) fetchUser(); // Fetch user only if it is null
  }, [user]);

  // Redirect to "/" if not authenticated
  useEffect(() => {
    if (!user && userError === "User not authenticated") {
      navigate("/");
    }
  }, [user, userError, navigate]);

  const handleNewCardClick = () => {
    if (ownCards.length >= 5) {
      setIsLimitReached(true);
    } else {
      navigate("/home", { state: { createNewCard: true } });
    }
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

      {isLimitReached && <Limit onClose={() => setIsLimitReached(false)} />}

      <div className="sidebar-item last-item">
        <NavLink to="/home/account" className="sidebar-link">
          <RiSettingsLine className="sidebar-icon" />
          <span className="user_name">
            {userLoading ? "Loading..." : userError ? "Error" : user?.name || "User"}
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
