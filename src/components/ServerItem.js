// src/components/ServerItem.js
import React, { useState, useRef, useEffect } from 'react';
import {
  FaEllipsisH,
  FaUsers,
  FaStar,
  FaGamepad,
  FaMapMarkerAlt,
  FaRobot,       // 导入机器人图标
  FaUserShield,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ReactCountryFlag from 'react-country-flag'; // 导入 react-country-flag
import './ServerItem.css';
import mapImages from '../data/mapImages'; // 导入地图图片映射

// 地图选项映射
const mapOptions = [
  { value: "MP_Amiens", label: "亚眠" },
  { value: "MP_ItalianCoast", label: "帝国边境" },
  { value: "MP_ShovelTown", label: "攻占托尔" },
  { value: "MP_MountainFort", label: "格拉巴山" },
  { value: "MP_Graveyard", label: "决裂" },
  { value: "MP_FaoFortress", label: "法欧堡" },
  { value: "MP_Chateau", label: "流血宴厅" },
  { value: "MP_Scar", label: "圣康坦的伤痕" },
  { value: "MP_Suez", label: "苏伊士" },
  { value: "MP_Desert", label: "西奈沙漠" },
  { value: "MP_Forest", label: "阿尔贡森林" },
  { value: "MP_Giant", label: "庞然暗影" },
  { value: "MP_Verdun", label: "凡尔登高地" },
  { value: "MP_Trench", label: "尼维尔之夜" },
  { value: "MP_Underworld", label: "法乌克斯要塞" },
  { value: "MP_Fields", label: "苏瓦松" },
  { value: "MP_Valley", label: "加利西亚" },
  { value: "MP_Bridge", label: "勃鲁西洛夫关口" },
  { value: "MP_Tsaritsyn", label: "察里津" },
  { value: "MP_Ravines", label: "武普库夫山口" },
  { value: "MP_Volga", label: "窝瓦河" },
  { value: "MP_Islands", label: "阿尔比恩" },
  { value: "MP_Beachhead", label: "海丽丝岬" },
  { value: "MP_Harbor", label: "泽布吕赫" },
  { value: "MP_Ridge", label: "阿奇巴巴" },
  { value: "MP_River", label: "卡波雷托" },
  { value: "MP_Hell", label: "帕斯尚尔" },
  { value: "MP_Offensive", label: "索姆河" },
  { value: "MP_Naval", label: "黑尔戈兰湾" },
  { value: "MP_Blitz", label: "伦敦的呼唤：夜袭" },
  { value: "MP_London", label: "伦敦的呼唤：灾祸" },
  { value: "MP_Alps", label: "剃刀边缘" },
];

// 模式选项映射
const modeOptions = [
  { value: "BreakthroughLarge", label: "行动模式" },
  { value: "Breakthrough", label: "闪击行动" },
  { value: "Conquest", label: "征服" },
  { value: "TugOfWar", label: "前线" },
  { value: "TeamDeathMatch", label: "团队死斗" },
  { value: "Possession", label: "战争信鸽" },
  { value: "Domination", label: "抢攻" },
  { value: "Rush", label: "突袭" },
  { value: "ZoneControl", label: "空降补给" },
  { value: "AirAssault", label: "空中突击" },
];

// pingsite选项映射
const pingsiteOptions = [
  { value: "nrt", label: "日本" },
  { value: "hkg", label: "香港" },
  { value: "dub", label: "爱尔兰" },
  { value: "fra", label: "德国" },
  { value: "iad", label: "美国东部" },
  { value: "sjc", label: "美国西部" },
  { value: "brz", label: "南美" },
  { value: "jnb", label: "南非" },
  { value: "syd", label: "大洋洲" },
  { value: "dxb", label: "中东" },
];

// 映射 pingsite 到国家代码
const pingsiteToCountryCode = {
  nrt: "JP", // 日本
  hkg: "HK", // 香港
  dub: "IE", // 爱尔兰
  fra: "DE", // 德国
  iad: "US", // 美国东部
  sjc: "US", // 美国西部
  brz: "BR", // 南美 - 以巴西为代表
  jnb: "ZA", // 南非
  syd: "AU", // 大洋洲 - 以澳大利亚为代表
  dxb: "AE", // 中东 - 以阿联酋为代表
};

// 辅助函数：根据值获取对应的标签
const getLabel = (options, value) => {
  const option = options.find(opt => opt.value === value);
  return option ? option.label : value; // 如果未找到，则返回原始值
};

const ServerItem = ({ server, toggleFavorite }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleMenuToggle = () => {
    setShowMenu((prev) => !prev);
  };

  const handleViewDetails = () => {
    setShowMenu(false); // 关闭菜单
    navigate(`/servers/${server.gameId}`); // 使用 gameId 进行导航
  };

  // 点击菜单外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 获取映射后的标签
  const mapLabel = getLabel(mapOptions, server.map);
  const modeLabel = getLabel(modeOptions, server.mode);
  const pingLabel = getLabel(pingsiteOptions, server.pingsite);

  // 获取国家代码
  const countryCode = pingsiteToCountryCode[server.pingsite] || null;

  // 获取地图图片 URL
  const mapImageUrl = mapImages[server.map] || 'https://via.placeholder.com/120x70'; // 默认占位图

  return (
    <div className="server-item">
      <div className="server-header">
        {/* 地图图片作为服务器图片 */}
        <img
          src={mapImageUrl}
          alt={mapLabel} // 使用映射后的标签作为 alt 文本
          className="server-image"
        />
        <div className="server-info">
          <h3 className="server-name">
            <div className="scroll-text-container">
              <span className="scroll-text">{server.name}</span>
            </div>
          </h3>
          <p className="server-description">
            <div className="scroll-text-container">
              <span className="scroll-text">{server.description}</span>
            </div>
          </p>
          <div className="server-map-mode">
            {/* 显示国旗 */}
            {countryCode && (
              <ReactCountryFlag
                countryCode={countryCode}
                svg
                style={{
                  width: '1.5em',
                  height: '1.5em',
                  marginRight: '5px',
                }}
                title={pingLabel}
              />
            )}
            <FaMapMarkerAlt className="icon" /> {mapLabel}
            <FaGamepad className="icon" /> {modeLabel}
          </div>
        </div>
        <div className="server-stats">
          {/* 统计信息在一行内 */}
          <div className="stats-line">
            <div className="stat-item admin-count">
              <FaUserShield className="stat-icon" />
              <span>{server.specials.admin || 0}</span>
            </div>
            <div className="stat-item bot-count">
              <FaRobot className="stat-icon" />
              <span>{server.specials.bot || 0}</span>
            </div>
            <div className="stat-item players">
              <FaUsers className="stat-icon" />
              <span>
                {server.slots?.soldier || 0} / {server.slots?.max || 0}
                {server.slots?.spectator > 0 && (
                  <span className="spectators"> ({server.slots.spectator})</span>
                )}
                {server.slots?.queue > 0 && (
                  <span className="queue"> [{server.slots.queue}]</span>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="actions" ref={menuRef}>
          {/* 三点按钮 */}
          <button onClick={handleMenuToggle} className="action-button">
            <FaEllipsisH />
          </button>
          {/* 浮动菜单 */}
          {showMenu && (
            <div className="menu">
              <button onClick={handleViewDetails} className="menu-item">
                查看详情
              </button>
            </div>
          )}
          {/* 收藏按钮 */}
          <button
            onClick={() => toggleFavorite(server.gameId)} // 使用 gameId
            className="action-button favorite-button"
          >
            <FaStar color={server.isFavorite ? 'gold' : '#777'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerItem;
