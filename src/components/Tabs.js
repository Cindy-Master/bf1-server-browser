// src/components/Tabs.js
import React from 'react';
import './Tabs.css';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: 'multiplayer', label: '多人模式' },
    { name: 'game', label: '游戏' },
    { name: 'favorites', label: '我的最爱' },
    { name: 'recent', label: '最近游玩' },
    { name: 'your-servers', label: '您的伺服器' },
  ];

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={`tab-button ${activeTab === tab.name ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.name)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
