// App.js
import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FilterPanel from './components/FilterPanel';
import ServerList from './components/ServerList';
import ServerDetails from './components/ServerDetails';
import debounce from 'lodash.debounce'; 
import './App.css';
import backgroundImage from './images/battlefield_1_soundtrack_bg.png'; 

const App = () => {
  const [servers, setServers] = useState([]);
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem('filters');
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          gameMode: '',
          maps: [],
          modes: [],
          types: [],
          pingsites: [],
          minPlayers: 0,
          maxPlayers: 64,
          ignoreBot: true,
          name: '',
          orderBy: 'name', 
        };
  });
  const [activeTab, setActiveTab] = useState('multiplayer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleFavorite = (gameId) => {
    const updatedServers = servers.map((server) =>
      server.gameId === gameId ? { ...server, isFavorite: !server.isFavorite } : server
    );
    setServers(updatedServers);

    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    favorites[gameId] = updatedServers.find((s) => s.gameId === gameId).isFavorite;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const fetchServers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 准备请求体，包括搜索词
      const requestBody = { ...filters, activeTab };

      const response = await fetch('/api/searchServers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();

      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
      const updatedServers = data.map((server) => ({
        ...server,
        isFavorite: storedFavorites[server.gameId] || server.isFavorite,
      }));

      setServers(updatedServers);

      if (updatedServers.length === 0) {
        setError('无服务器');
      }
    } catch (err) {
      setError('API错误');
    } finally {
      setLoading(false);
    }
  }, [filters, activeTab]);

  // 防抖处理 fetchServers 函数，防止过快的 API 调用
  const debouncedFetchServers = useCallback(debounce(fetchServers, 500), [fetchServers]);

  useEffect(() => {
    debouncedFetchServers();
    return () => {
      debouncedFetchServers.cancel();
    };
  }, [debouncedFetchServers, filters]); // 将 filters 添加到依赖项数组中

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      gameMode: '',
      maps: [],
      modes: [],
      types: [],
      pingsites: [],
      minPlayers: 0,
      maxPlayers: 64,
      ignoreBot: true,
      name: '',
      orderBy: 'players', 
    });
  };

  const refreshFilters = () => {
    fetchServers();
  };

  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div className="App" style={appStyle}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {loading && <div>加载中...</div>}
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <ServerList servers={servers} error={error} toggleFavorite={toggleFavorite} />
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
                refreshFilters={refreshFilters} 
              />
            </div>
          }
        />
        <Route path="/servers/:id" element={<ServerDetails servers={servers} />} />
      </Routes>
    </div>
  );
};

export default App;
