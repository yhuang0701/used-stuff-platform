import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MdDashboard,
  MdPerson,
  MdSettings,
  MdVpnKey,
  MdContacts,
  MdPowerSettingsNew
} from 'react-icons/md';

const SideBar = () => {
  return (
    <div className="bg-white text-gray-700 min-h-screen px-20 py-10">
      <div className="font-bold text-xl mb-8 pl-6 pt-6">Sidebar</div>
      <nav>
        <NavLink to="/dashboard" className="flex items-center p-4 hover:bg-gray-100">
          <MdDashboard className="mr-4" /> Dashboard
        </NavLink>
        <NavLink to="/profile" className="flex items-center p-4 hover:bg-gray-100">
          <MdPerson className="mr-4" /> Profile
        </NavLink>
        <NavLink to="/settings" className="flex items-center p-4 hover:bg-gray-100">
          <MdSettings className="mr-4" /> Settings
        </NavLink>
        <NavLink to="/change-password" className="flex items-center p-4 hover:bg-gray-100">
          <MdVpnKey className="mr-4" /> Change Password
        </NavLink>
        <NavLink to="/contact" className="flex items-center p-4 hover:bg-gray-100">
          <MdContacts className="mr-4" /> Change Contact Info
        </NavLink>
        <NavLink to="/logout" className="flex items-center p-4 hover:bg-gray-100">
          <MdPowerSettingsNew className="mr-4" /> Log Out
        </NavLink>
      </nav>
    </div>
  );
};

export default SideBar;
