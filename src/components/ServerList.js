// src/components/ServerList.js
import React from 'react';
import ServerItem from './ServerItem';
import './ServerList.css';

const ServerList = ({ servers, toggleFavorite }) => {
  if (servers.length === 0) {
    return <p className="no-servers">没有找到符合条件的服务器。</p>;
  }

  return (
    <div className="server-list">
      {servers.map((server) => (
        <ServerItem
          key={server.gameId} // 使用 gameId 作为 key
          server={server}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};

export default ServerList;
