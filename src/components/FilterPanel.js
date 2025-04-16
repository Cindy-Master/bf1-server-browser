import React, { useState, useEffect } from 'react'; 
import debounce from 'lodash.debounce'; 
import { FaSyncAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './FilterPanel.css';

const { Range } = Slider;




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


const typeOptions = [
  { value: "Official", label: "官服" },
  { value: "Unofficial", label: "私服" },
];

const FilterPanel = ({
  filters,
  setFilters,
  resetFilters,
  refreshFilters, 
}) => {
  const [openFilters, setOpenFilters] = useState({
    maps: false,
    modes: false,
    types: false,
    pingsites: false,
    sort: false, 
  });

  const [searchTerm, setSearchTerm] = useState(filters.name);

  const toggleFilter = (filterName) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const handleCheckboxChange = (filterCategory, optionValue) => {
    setFilters((prev) => {
      const currentOptions = prev[filterCategory] || [];
      if (currentOptions.includes(optionValue)) {
        return {
          ...prev,
          [filterCategory]: currentOptions.filter((item) => item !== optionValue),
        };
      } else {
        return {
          ...prev,
          [filterCategory]: [...currentOptions, optionValue],
        };
      }
    });
  };

  const handleRangeChange = (values) => {
    const [minPlayers, maxPlayers] = values;
    setFilters((prev) => ({
      ...prev,
      minPlayers,
      maxPlayers,
    }));
  };

  const handleSortChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      orderBy: e.target.value,
    }));
  };



  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilters((prev) => ({ ...prev, name: value }));
  };

  return (
    <div className="filter-panel">
      {/* 刷新按钮 */}
      <div className="refresh" onClick={refreshFilters}>
        <FaSyncAlt /> 刷新数据
      </div>
      <h3>快速过滤</h3>

      {/* 搜索栏 */}
      <input
        type="text"
        name="name"
        placeholder="以名称搜索..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* 类型过滤 */}
      <div className="filter-category">
        <button className="filter-button" onClick={() => toggleFilter('types')}>
          类型 {openFilters.types ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {openFilters.types && (
          <div className="filter-options">
            {typeOptions.map((type) => (
              <label key={type.value}>
                <input
                  type="checkbox"
                  checked={filters.types.includes(type.value)}
                  onChange={() => handleCheckboxChange('types', type.value)}
                />
                {type.label}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 地图过滤 */}
      <div className="filter-category">
        <button className="filter-button" onClick={() => toggleFilter('maps')}>
          地图 {openFilters.maps ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {openFilters.maps && (
          <div className="filter-options">
            {mapOptions.map((map) => (
              <label key={map.value}>
                <input
                  type="checkbox"
                  checked={filters.maps.includes(map.value)}
                  onChange={() => handleCheckboxChange('maps', map.value)}
                />
                {map.label}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 模式过滤 */}
      <div className="filter-category">
        <button className="filter-button" onClick={() => toggleFilter('modes')}>
          模式 {openFilters.modes ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {openFilters.modes && (
          <div className="filter-options">
            {modeOptions.map((mode) => (
              <label key={mode.value}>
                <input
                  type="checkbox"
                  checked={filters.modes.includes(mode.value)}
                  onChange={() => handleCheckboxChange('modes', mode.value)}
                />
                {mode.label}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Ping站点过滤 */}
      <div className="filter-category">
        <button className="filter-button" onClick={() => toggleFilter('pingsites')}>
          地区 {openFilters.pingsites ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {openFilters.pingsites && (
          <div className="filter-options">
            {pingsiteOptions.map((site) => (
              <label key={site.value}>
                <input
                  type="checkbox"
                  checked={filters.pingsites.includes(site.value)}
                  onChange={() => handleCheckboxChange('pingsites', site.value)}
                />
                {site.label}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 玩家数量过滤 */}
      <div className="player-count-filter">
        <div className="slider-container">
          <div className="range-display">
            <span>玩家范围: {filters.minPlayers} - {filters.maxPlayers}</span>
          </div>
          <Range
            min={0}
            max={74}
            value={[filters.minPlayers, filters.maxPlayers]}
            onChange={handleRangeChange}
            allowCross={false}
            trackStyle={[{ backgroundColor: '#1890ff' }]}
            handleStyle={[
              { borderColor: '#1890ff' },
              { borderColor: '#1890ff' }
            ]}
            railStyle={{ backgroundColor: '#ccc', height: '6px' }}
          />
        </div>
      </div>

      {/* 排序方式 */}
      <div className="filter-category">
        <button className="filter-button" onClick={() => toggleFilter('sort')}>
          排序 {openFilters.sort ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {openFilters.sort && (
          <div className="filter-options">
            <label>
              <input
                type="radio"
                name="sortOrder"
                value="name"
                checked={filters.orderBy === 'name'}
                onChange={handleSortChange}
              />
              按名称排序
            </label>
            <label>
              <input
                type="radio"
                name="sortOrder"
                value="bots"
                checked={filters.orderBy === 'bots'}
                onChange={handleSortChange}
              />
              按Bot数量排序
            </label>
            <label>
              <input
                type="radio"
                name="sortOrder"
                value="players"
                checked={filters.orderBy === 'players'}
                onChange={handleSortChange}
              />
              按玩家数量排序
            </label>
          </div>
        )}
      </div>

      {/* 忽略Bot过滤 */}
      <div className="ignore-bot-filter">
        <label>
          <input
            type="checkbox"
            name="ignoreBot"
            checked={filters.ignoreBot}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                ignoreBot: e.target.checked,
              }))
            }
          />
          忽略Bot
        </label>
      </div>

      {/* 重置过滤条件按钮 */}
      <button onClick={resetFilters}>重设过滤条件</button>
    </div>
  );
};

export default FilterPanel;
