// src/components/ServerDetails.js
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import './ServerDetails.css';

const ServerDetails = ({ servers }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const serverId = parseInt(id, 10);
  const server = servers.find((s) => s.id === serverId);

  if (!server) {
    return <p className="not-found">服务器未找到。</p>;
  }

  return (
    <div className="server-details-page">
      {/* 顶部导航栏 */}
      <nav className="navbar">
        <Link to="/" className="nav-link">
          首页
        </Link>
        <Link to="/" className="nav-link">
          服务器列表
        </Link>
        <Link to="/" className="nav-link">
          玩家查询
        </Link>
        <Link to="/" className="nav-link">
          个人中心
        </Link>
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft /> 返回
        </button>
      </nav>

      {/* 服务器详情内容 */}
      <div className="server-details-container">
        {/* 服务器详情标题 */}
        <div className="server-title-section">
          <h2 className="server-title">{server.name}</h2>
          <p className="server-rules">
            Visit our discord to report cheaters and learn our rules. Keep the game chat clean.
            No politics. No profanities/obscenities. No toxicity. No slurs. Respect the admins.
            Violation of these guidelines will result in a kick/ban.
          </p>
          <div className="server-provider">
            <span>-{server.provider}-</span>
            <div className="provider-logo">
              GO respawn noob
            </div>
          </div>
        </div>

        {/* 服务器基本信息 */}
        <div className="server-basic-info">
          <div><strong>类型：</strong> {server.type} - {server.gameMode}</div>
          <div><strong>地区：</strong> {server.region}</div>
          <div><strong>模式名称：</strong> {server.gameMode}</div>
          <div><strong>地图名称：</strong> {server.map}</div>
          <div><strong>玩家：</strong> {server.currentPlayers} / {server.maxPlayers}</div>
          <div><strong>收藏：</strong> {server.favorites}</div>
        </div>

        {/* 中央按钮 */}
        <div className="central-buttons">
          <button className="central-button">网络数据</button>
          <button className="central-button">管理面板</button>
          <button className="central-button">玩家列表</button>
        </div>

        {/* 服务器设置 */}
        <div className="server-settings">
          <h3>服务器设置</h3>
          <div className="settings-item">
            <label>友军伤害：</label>
            <span>是</span>
          </div>
          <div className="settings-item">
            <label>使用回合前后恢复：</label>
            <span>是</span>
          </div>
          <div className="settings-item">
            <label>比例：</label>
            <div className="ratio-settings">
              <span>步兵重生时间：50</span>
              <span>字形增量：125</span>
              <span>重生时间：50</span>
            </div>
          </div>
          <div className="settings-item">
            <label>武器：</label>
            <span>制式枪炮：是</span>
          </div>
          <div className="settings-item">
            <label>击杀镜头：</label>
            <span>否</span>
          </div>
        </div>

        {/* 地图轮换 */}
        <div className="map-rotation">
          <h3>地图轮换</h3>
          <div className="maps-grid">
            {server.mapsRotation.map((map, index) => (
              <div key={index} className="map-item">
                <div className="map-image-container">
                  <img src={map.image} alt={map.name} className="map-image" />
                  <span className="map-name">{map.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerDetails;
