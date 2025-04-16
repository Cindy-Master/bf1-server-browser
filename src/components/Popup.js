// src/components/Popup.js
import React from 'react';
import './Popup.css';

const Popup = ({ onClose, onViewDetails }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
        <button className="popup-button" onClick={onViewDetails}>
          查看详情
        </button>
      </div>
    </div>
  );
};

export default Popup;
