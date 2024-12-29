import { React, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { TbSettings2 } from 'react-icons/tb';
import { FaChartBar } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { UserContext } from '../../context/userContext';
import './sidebar.css';

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
  if (userError) {
    return (
      <div className="sidebar">
        <h2 className="sidebar-title">Error: {userError}</h2>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Taplink</h2>
      <div className="sidebar-link">
        <NavLink to="/dashboard" className="sidebar-linkk">
          <GoHome className="icon" />
          <span>Dashboard</span>
        </NavLink>
      </div>
      <div className="sidebar-link">
        <NavLink to="/settings" className="sidebar-linkk">
          <TbSettings2 className="icon" />
          <span>Settings</span>
        </NavLink>
      </div>
      <div className="sidebar-link">
        <NavLink to="/analytics" className="sidebar-linkk">
          <FaChartBar className="icon" />
          <span>Analytics</span>
        </NavLink>
      </div>
      <div className="sidebar-link last-link">
        <NavLink to="/account" className="sidebar-linkk">
          <MdAccountCircle className="icon" />
          {/* Check if user is available */}
          <span>{userLoading ? "User" : user.name}</span>
        </NavLink>
      </div>
    </div>
  );
}
