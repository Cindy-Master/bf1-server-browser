// src/components/Header.js
import React from 'react';
import Tabs from './Tabs';
import './Header.css';
import logo from '../images/battlefield_1_logo.png'; // 导入图像

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="header">
      <img src={logo} alt="BattleField 1 Logo" className="header-logo" />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </header>
  );
};

export default Header;
